"""
SQL Server Audit Configuration Tool - Backend
Kovoco Inc.
"""

import json
import pyodbc
from datetime import datetime
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Store active connections keyed by a simple id
connections: dict[str, pyodbc.Connection] = {}
connection_meta: dict[str, dict] = {}


def get_conn(conn_id: str) -> pyodbc.Connection:
    if conn_id not in connections:
        raise ValueError("Connection not found. Please reconnect.")
    return connections[conn_id]


# ---------------------------------------------------------------------------
# Pages
# ---------------------------------------------------------------------------

@app.route("/")
def index():
    return render_template("index.html")


# ---------------------------------------------------------------------------
# Connection
# ---------------------------------------------------------------------------

@app.route("/api/connect", methods=["POST"])
def connect():
    data = request.json
    server = data.get("server", "")
    auth_type = data.get("authType", "windows")
    username = data.get("username", "")
    password = data.get("password", "")
    trust_cert = data.get("trustCert", True)

    try:
        if auth_type == "windows":
            conn_str = (
                f"DRIVER={{ODBC Driver 17 for SQL Server}};"
                f"SERVER={server};"
                f"DATABASE=master;"
                f"Trusted_Connection=yes;"
            )
        else:
            conn_str = (
                f"DRIVER={{ODBC Driver 17 for SQL Server}};"
                f"SERVER={server};"
                f"DATABASE=master;"
                f"UID={username};"
                f"PWD={password};"
            )

        if trust_cert:
            conn_str += "TrustServerCertificate=yes;"

        conn = pyodbc.connect(conn_str, timeout=10)
        cursor = conn.cursor()

        # Gather instance metadata
        cursor.execute("""
            SELECT
                SERVERPROPERTY('ProductMajorVersion') AS MajorVersion,
                SERVERPROPERTY('ProductLevel') AS ProductLevel,
                SERVERPROPERTY('Edition') AS Edition,
                SERVERPROPERTY('ServerName') AS ServerName,
                SERVERPROPERTY('ProductVersion') AS FullVersion
        """)
        row = cursor.fetchone()
        major = int(row.MajorVersion)
        edition = str(row.Edition)
        server_name = str(row.ServerName)
        full_version = str(row.FullVersion)
        product_level = str(row.ProductLevel)

        # Check for Express edition (no audit support pre-2016 SP1)
        is_express = "Express" in edition
        audit_supported = True
        if is_express and major < 13:
            audit_supported = False
        if is_express and major == 13 and "SP1" not in product_level:
            audit_supported = False

        conn_id = f"{server_name}_{id(conn)}"
        connections[conn_id] = conn
        connection_meta[conn_id] = {
            "server": server,
            "serverName": server_name,
            "majorVersion": major,
            "fullVersion": full_version,
            "edition": edition,
            "productLevel": product_level,
            "auditSupported": audit_supported,
        }

        return jsonify({
            "success": True,
            "connectionId": conn_id,
            **connection_meta[conn_id],
        })

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 400


@app.route("/api/disconnect", methods=["POST"])
def disconnect():
    conn_id = request.json.get("connectionId")
    if conn_id in connections:
        try:
            connections[conn_id].close()
        except Exception:
            pass
        del connections[conn_id]
        connection_meta.pop(conn_id, None)
    return jsonify({"success": True})


# ---------------------------------------------------------------------------
# Existing audit detection
# ---------------------------------------------------------------------------

@app.route("/api/existing-audits", methods=["POST"])
def existing_audits():
    conn_id = request.json.get("connectionId")
    try:
        conn = get_conn(conn_id)
        cursor = conn.cursor()

        # Server audits
        cursor.execute("SELECT name, status_desc, audit_file_path, type_desc FROM sys.server_audits")
        audits = [{"name": r.name, "status": r.status_desc, "path": r.audit_file_path, "type": r.type_desc} for r in cursor.fetchall()]

        # Server audit specs
        cursor.execute("""
            SELECT sas.name AS spec_name, sa.name AS audit_name,
                   sasd.audit_action_name, sasd.class_desc
            FROM sys.server_audit_specification_details sasd
            JOIN sys.server_audit_specifications sas ON sasd.server_specification_id = sas.server_specification_id
            JOIN sys.server_audits sa ON sas.audit_guid = sa.audit_guid
        """)
        specs = [{"specName": r.spec_name, "auditName": r.audit_name, "action": r.audit_action_name, "classDesc": r.class_desc} for r in cursor.fetchall()]

        return jsonify({"success": True, "audits": audits, "specs": specs})
    except Exception as e:
        return jsonify({"success": True, "audits": [], "specs": [], "warning": str(e)})


# ---------------------------------------------------------------------------
# Applications discovery
# ---------------------------------------------------------------------------

@app.route("/api/applications", methods=["POST"])
def applications():
    conn_id = request.json.get("connectionId")
    try:
        conn = get_conn(conn_id)
        cursor = conn.cursor()
        cursor.execute("""
            SELECT
                s.host_name,
                s.program_name,
                s.login_name,
                s.client_interface_name,
                COUNT(*) AS session_count,
                MAX(s.login_time) AS last_login
            FROM sys.dm_exec_sessions s
            WHERE s.is_user_process = 1
                AND s.program_name IS NOT NULL
                AND s.program_name != ''
            GROUP BY s.host_name, s.program_name, s.login_name, s.client_interface_name
            ORDER BY COUNT(*) DESC
        """)
        apps = []
        for r in cursor.fetchall():
            apps.append({
                "hostName": r.host_name or "",
                "programName": r.program_name or "",
                "loginName": r.login_name or "",
                "clientInterface": r.client_interface_name or "",
                "sessionCount": r.session_count,
                "lastLogin": str(r.last_login) if r.last_login else "",
            })
        return jsonify({"success": True, "applications": apps})
    except Exception as e:
        return jsonify({"success": True, "applications": [], "warning": str(e)})


# ---------------------------------------------------------------------------
# Database listing
# ---------------------------------------------------------------------------

@app.route("/api/databases", methods=["POST"])
def databases():
    conn_id = request.json.get("connectionId")
    try:
        conn = get_conn(conn_id)
        cursor = conn.cursor()
        cursor.execute("""
            SELECT name, database_id, state_desc, compatibility_level
            FROM sys.databases
            WHERE database_id > 4 AND state = 0
            ORDER BY name
        """)
        dbs = [{"name": r.name, "id": r.database_id, "state": r.state_desc, "compatLevel": r.compatibility_level} for r in cursor.fetchall()]
        return jsonify({"success": True, "databases": dbs})
    except Exception as e:
        return jsonify({"success": True, "databases": [], "warning": str(e)})


# ---------------------------------------------------------------------------
# Object search within a database
# ---------------------------------------------------------------------------

@app.route("/api/objects", methods=["POST"])
def objects():
    conn_id = request.json.get("connectionId")
    db_name = request.json.get("database")
    search = request.json.get("search", "")
    try:
        conn = get_conn(conn_id)
        cursor = conn.cursor()
        cursor.execute(f"USE [{db_name}]")
        cursor.execute("""
            SELECT TOP 50
                s.name AS schema_name,
                o.name AS object_name,
                o.type_desc
            FROM sys.objects o
            JOIN sys.schemas s ON o.schema_id = s.schema_id
            WHERE o.type IN ('U','V','P','FN','IF','TF')
                AND (o.name LIKE ? OR s.name LIKE ?)
            ORDER BY s.name, o.name
        """, f"{search}%", f"{search}%")
        objs = [{"schema": r.schema_name, "name": r.object_name, "type": r.type_desc} for r in cursor.fetchall()]
        cursor.execute("USE [master]")
        return jsonify({"success": True, "objects": objs})
    except Exception as e:
        return jsonify({"success": True, "objects": [], "warning": str(e)})


# ---------------------------------------------------------------------------
# Volume estimation
# ---------------------------------------------------------------------------

@app.route("/api/volume-estimate", methods=["POST"])
def volume_estimate():
    conn_id = request.json.get("connectionId")
    try:
        conn = get_conn(conn_id)
        cursor = conn.cursor()

        # Login frequency
        cursor.execute("""
            SELECT COUNT(*) AS cnt
            FROM sys.dm_exec_sessions
            WHERE login_time >= DATEADD(HOUR, -1, GETDATE())
                AND is_user_process = 1
        """)
        logins_per_hour = cursor.fetchone().cnt

        return jsonify({
            "success": True,
            "loginsPerHour": logins_per_hour,
            "estimatedDailyLogins": logins_per_hour * 24,
        })
    except Exception as e:
        return jsonify({"success": True, "loginsPerHour": 0, "estimatedDailyLogins": 0, "warning": str(e)})


# ---------------------------------------------------------------------------
# Script generation
# ---------------------------------------------------------------------------

@app.route("/api/generate-script", methods=["POST"])
def generate_script():
    data = request.json
    conn_id = data.get("connectionId", "")
    meta = connection_meta.get(conn_id, {})

    categories = data.get("categories", [])
    exclusions = data.get("exclusions", [])
    target = data.get("target", {})
    databases_config = data.get("databases", [])
    stig_enabled = data.get("stigEnabled", False)
    audit_name = data.get("auditName", "KovocoAudit")
    estimated_volume = data.get("estimatedVolume", 0)

    server_name = meta.get("serverName", "UNKNOWN")
    major_version = meta.get("majorVersion", 14)
    now = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC")

    # Build action groups from categories
    action_groups = set()
    category_names = []

    category_map = {
        "security": {
            "label": "Security Changes",
            "groups": [
                "SERVER_ROLE_MEMBER_CHANGE_GROUP", "DATABASE_ROLE_MEMBER_CHANGE_GROUP",
                "SCHEMA_OBJECT_PERMISSION_CHANGE_GROUP", "DATABASE_PERMISSION_CHANGE_GROUP",
                "SERVER_PERMISSION_CHANGE_GROUP", "DATABASE_OWNERSHIP_CHANGE_GROUP",
                "SERVER_OBJECT_PERMISSION_CHANGE_GROUP", "USER_CHANGE_PASSWORD_GROUP",
                "DATABASE_PRINCIPAL_CHANGE_GROUP", "SERVER_PRINCIPAL_CHANGE_GROUP",
            ],
        },
        "login": {
            "label": "Login Activity",
            "groups": ["FAILED_LOGIN_GROUP", "SUCCESSFUL_LOGIN_GROUP", "LOGOUT_GROUP"],
        },
        "backup": {
            "label": "Backup & Restore",
            "groups": ["BACKUP_RESTORE_GROUP"],
        },
        "schema": {
            "label": "Schema Changes",
            "groups": [
                "SCHEMA_OBJECT_CHANGE_GROUP", "DATABASE_OBJECT_CHANGE_GROUP",
                "SERVER_OBJECT_CHANGE_GROUP", "DATABASE_CHANGE_GROUP",
            ],
        },
        "change_control": {
            "label": "Change Control",
            "groups": [
                "DATABASE_OBJECT_CHANGE_GROUP", "SERVER_OPERATION_GROUP",
                "DATABASE_OPERATION_GROUP", "TRACE_CHANGE_GROUP",
            ],
        },
        "audit_integrity": {
            "label": "Audit Integrity (always included)",
            "groups": [
                "AUDIT_CHANGE_GROUP", "SERVER_AUDIT_CHANGE_GROUP",
                "DATABASE_AUDIT_SPECIFICATION_CHANGE_GROUP",
                "SERVER_AUDIT_SPECIFICATION_CHANGE_GROUP",
            ],
        },
    }

    # Always include audit integrity
    if "audit_integrity" not in categories:
        categories.append("audit_integrity")

    for cat in categories:
        if cat in category_map:
            category_names.append(category_map[cat]["label"])
            action_groups.update(category_map[cat]["groups"])

    # STIG groups
    if stig_enabled:
        category_names.append("STIG Compliance")
        stig_groups = [
            "APPLICATION_ROLE_CHANGE_PASSWORD_GROUP", "AUDIT_CHANGE_GROUP",
            "BACKUP_RESTORE_GROUP", "DATABASE_CHANGE_GROUP",
            "DATABASE_OBJECT_CHANGE_GROUP", "DATABASE_OBJECT_OWNERSHIP_CHANGE_GROUP",
            "DATABASE_OBJECT_PERMISSION_CHANGE_GROUP", "DATABASE_OPERATION_GROUP",
            "DATABASE_OWNERSHIP_CHANGE_GROUP", "DATABASE_PERMISSION_CHANGE_GROUP",
            "DATABASE_PRINCIPAL_CHANGE_GROUP", "DATABASE_PRINCIPAL_IMPERSONATION_GROUP",
            "DATABASE_ROLE_MEMBER_CHANGE_GROUP", "FAILED_LOGIN_GROUP",
            "LOGIN_CHANGE_PASSWORD_GROUP", "LOGOUT_GROUP",
            "SCHEMA_OBJECT_ACCESS_GROUP", "SCHEMA_OBJECT_CHANGE_GROUP",
            "SCHEMA_OBJECT_OWNERSHIP_CHANGE_GROUP", "SCHEMA_OBJECT_PERMISSION_CHANGE_GROUP",
            "SERVER_OBJECT_CHANGE_GROUP", "SERVER_OBJECT_OWNERSHIP_CHANGE_GROUP",
            "SERVER_OBJECT_PERMISSION_CHANGE_GROUP", "SERVER_OPERATION_GROUP",
            "SERVER_PERMISSION_CHANGE_GROUP", "SERVER_PRINCIPAL_CHANGE_GROUP",
            "SERVER_PRINCIPAL_IMPERSONATION_GROUP", "SERVER_ROLE_MEMBER_CHANGE_GROUP",
            "SERVER_STATE_CHANGE_GROUP", "SUCCESSFUL_LOGIN_GROUP",
            "TRACE_CHANGE_GROUP", "USER_CHANGE_PASSWORD_GROUP",
        ]
        action_groups.update(stig_groups)

    # Add version-specific groups
    if major_version >= 15 and "security" in categories:
        action_groups.add("SENSITIVITY_CLASSIFICATION_CHANGE_GROUP")

    # Build WHERE predicate
    where_parts = []
    # System exclusions (always)
    where_parts.append("    -- System exclusions (always applied)")
    where_parts.append("    [application_name] = 'SQLServerCEIP'")
    where_parts.append("    OR [application_name] LIKE 'SQLAgent - TSQL JobStep%'")
    where_parts.append("    OR [application_name] = 'Microsoft SQL Server Management Studio - Transact-SQL IntelliSense'")
    where_parts.append("    OR [application_name] = 'SQLServerCEIP'")

    # Application exclusions
    for exc in exclusions:
        pn = exc.get("programName", "").replace("'", "''")
        ln = exc.get("loginName", "").replace("'", "''")
        hn = exc.get("hostName", "").replace("'", "''")
        where_parts.append(f"    -- Excluded: [{pn}] from [{hn}] as [{ln}]")
        where_parts.append(
            f"    OR ([application_name] = '{pn}'\n"
            f"        AND [server_principal_name] = '{ln}'\n"
            f"        AND [host_name] = '{hn}')"
        )

    where_clause = "\nWHERE NOT (\n" + "\n".join(where_parts) + "\n)"

    # Target config
    target_type = target.get("type", "file")
    file_path = target.get("filePath", "C:\\SQLAudit\\")
    max_size = target.get("maxSize", 100)
    max_files = target.get("maxRolloverFiles", 10)
    reserve = target.get("reserveDiskSpace", False)
    queue_delay = target.get("queueDelay", 1000)
    on_failure = target.get("onFailure", "CONTINUE")

    if target_type == "file":
        target_sql = (
            f"TO FILE (\n"
            f"    FILEPATH = N'{file_path}',\n"
            f"    MAXSIZE = {max_size} MB,\n"
            f"    MAX_ROLLOVER_FILES = {max_files},\n"
            f"    RESERVE_DISK_SPACE = {'ON' if reserve else 'OFF'}\n"
            f")"
        )
    elif target_type == "security_log":
        target_sql = "TO SECURITY_LOG"
    else:
        target_sql = "TO APPLICATION_LOG"

    # Warnings
    warnings = []
    if "SUCCESSFUL_LOGIN_GROUP" in action_groups:
        warnings.append("SUCCESSFUL_LOGIN_GROUP included — may generate high volume on busy instances.")
    if "SCHEMA_OBJECT_ACCESS_GROUP" in action_groups:
        warnings.append("SCHEMA_OBJECT_ACCESS_GROUP logs every data access on every schema object — expect extreme volume on busy systems.")
    if estimated_volume > 100000:
        warnings.append(f"Estimated {estimated_volume:,} events/day — ensure adequate disk space and monitor growth.")

    # Build header
    cats_str = "\n".join(f"  - {c}" for c in category_names)
    exc_str = "\n".join(f"  - {e.get('programName','?')} ({e.get('hostName','?')} / {e.get('loginName','?')})" for e in exclusions) if exclusions else "  (none)"
    warn_str = "\n".join(f"  - {w}" for w in warnings) if warnings else "  (none)"
    est_mb = round(estimated_volume * 500 / 1024 / 1024, 1) if estimated_volume else "N/A"

    stig_line = ""
    if stig_enabled:
        stig_label = f"SQL Server {major_version - 11 + 2008} STIG" if major_version >= 13 else "SQL Server STIG"
        stig_line = f"\nSTIG Compliance: Enabled ({stig_label})\n"

    header = f"""/*
============================================================
SQL Server Audit Configuration
Generated: {now}
Instance:  {server_name}
Tool:      Kovoco SQL Audit Configurator v1.0

Categories selected:
{cats_str}
{stig_line}
Application exclusions:
{exc_str}

Estimated daily volume: ~{estimated_volume:,} events (~{est_mb} MB)

WARNINGS:
{warn_str}
============================================================
*/"""

    # Main script
    sorted_groups = sorted(action_groups)
    spec_lines = ",\n".join(f"    ADD ({g})" for g in sorted_groups)

    script = f"""{header}

-- ============================================
-- Step 1: Create or replace the Server Audit
-- ============================================

-- Disable existing audit if it exists
IF EXISTS (SELECT 1 FROM sys.server_audits WHERE name = '{audit_name}')
BEGIN
    ALTER SERVER AUDIT [{audit_name}] WITH (STATE = OFF);
    DROP SERVER AUDIT [{audit_name}];
END
GO

CREATE SERVER AUDIT [{audit_name}]
{target_sql}
WITH (
    QUEUE_DELAY = {queue_delay},
    ON_FAILURE = {on_failure}
)
{where_clause};
GO

-- Enable the audit
ALTER SERVER AUDIT [{audit_name}] WITH (STATE = ON);
GO

-- ============================================
-- Step 2: Create the Server Audit Specification
-- ============================================

IF EXISTS (SELECT 1 FROM sys.server_audit_specifications WHERE name = '{audit_name}_ServerSpec')
BEGIN
    ALTER SERVER AUDIT SPECIFICATION [{audit_name}_ServerSpec] WITH (STATE = OFF);
    DROP SERVER AUDIT SPECIFICATION [{audit_name}_ServerSpec];
END
GO

CREATE SERVER AUDIT SPECIFICATION [{audit_name}_ServerSpec]
FOR SERVER AUDIT [{audit_name}]
{spec_lines}
WITH (STATE = ON);
GO
"""

    # Database audit specs
    for db_config in databases_config:
        db_name = db_config.get("name", "")
        db_objects = db_config.get("objects", [])
        if not db_objects:
            continue

        obj_lines = []
        for obj in db_objects:
            schema = obj.get("schema", "dbo")
            name = obj.get("name", "")
            actions = obj.get("actions", ["INSERT", "UPDATE", "DELETE"])
            principal = obj.get("principal", "public")
            action_str = ", ".join(actions)
            obj_lines.append(f"    ADD ({action_str} ON OBJECT::[{schema}].[{name}] BY [{principal}])")

        if obj_lines:
            obj_spec = ",\n".join(obj_lines)
            spec_name = f"{audit_name}_DbSpec_{db_name}"
            script += f"""
-- ============================================
-- Database Audit Specification: [{db_name}]
-- ============================================
USE [{db_name}];
GO

IF EXISTS (SELECT 1 FROM sys.database_audit_specifications WHERE name = '{spec_name}')
BEGIN
    ALTER DATABASE AUDIT SPECIFICATION [{spec_name}] WITH (STATE = OFF);
    DROP DATABASE AUDIT SPECIFICATION [{spec_name}];
END
GO

CREATE DATABASE AUDIT SPECIFICATION [{spec_name}]
FOR SERVER AUDIT [{audit_name}]
{obj_spec}
WITH (STATE = ON);
GO

USE [master];
GO
"""

    # Rollback script
    rollback = f"""
-- ============================================
-- ROLLBACK SCRIPT
-- Run this to undo the audit configuration
-- ============================================
"""
    for db_config in databases_config:
        db_name = db_config.get("name", "")
        db_objects = db_config.get("objects", [])
        if db_objects:
            spec_name = f"{audit_name}_DbSpec_{db_name}"
            rollback += f"""
USE [{db_name}];
GO
IF EXISTS (SELECT 1 FROM sys.database_audit_specifications WHERE name = '{spec_name}')
BEGIN
    ALTER DATABASE AUDIT SPECIFICATION [{spec_name}] WITH (STATE = OFF);
    DROP DATABASE AUDIT SPECIFICATION [{spec_name}];
END
GO
USE [master];
GO
"""

    rollback += f"""
IF EXISTS (SELECT 1 FROM sys.server_audit_specifications WHERE name = '{audit_name}_ServerSpec')
BEGIN
    ALTER SERVER AUDIT SPECIFICATION [{audit_name}_ServerSpec] WITH (STATE = OFF);
    DROP SERVER AUDIT SPECIFICATION [{audit_name}_ServerSpec];
END
GO

IF EXISTS (SELECT 1 FROM sys.server_audits WHERE name = '{audit_name}')
BEGIN
    ALTER SERVER AUDIT [{audit_name}] WITH (STATE = OFF);
    DROP SERVER AUDIT [{audit_name}];
END
GO
"""

    return jsonify({
        "success": True,
        "script": script,
        "rollback": rollback,
        "warnings": warnings,
    })


# ---------------------------------------------------------------------------
# Available audit actions (for version discovery)
# ---------------------------------------------------------------------------

@app.route("/api/audit-actions", methods=["POST"])
def audit_actions():
    conn_id = request.json.get("connectionId")
    try:
        conn = get_conn(conn_id)
        cursor = conn.cursor()
        cursor.execute("""
            SELECT DISTINCT name, class_desc, covering_action_name
            FROM sys.dm_audit_actions
            ORDER BY class_desc, name
        """)
        actions = [{"name": r.name, "classDesc": r.class_desc, "covering": r.covering_action_name} for r in cursor.fetchall()]
        return jsonify({"success": True, "actions": actions})
    except Exception as e:
        return jsonify({"success": True, "actions": [], "warning": str(e)})


if __name__ == "__main__":
    app.run(debug=True, port=5000)
