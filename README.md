# Kovoco SQL Audit Configurator

A local web application that helps SQL Server database administrators configure SQL Server Audit through a guided, approachable interface. Instead of navigating the clunky SSMS audit checkbox tree, administrators walk through a step-by-step wizard that translates human-readable categories into correct T-SQL scripts.

**This tool generates scripts only. It never executes audit configuration changes directly.**

## What It Does

- Connects live to SQL Server instances (2016+) and reads metadata
- Translates SQL Server Audit's technical action groups into plain-English categories (Security Changes, Login Activity, Backup & Restore, Schema Changes, Data Access, Change Control)
- Detects the SQL Server version and edition, adjusting available features accordingly
- Discovers running applications and lets you exclude known application traffic from auditing
- Supports DISA STIG compliance baselines with version-specific action group mappings
- Estimates audit log volume and warns about high-volume selections before you commit
- Imports existing audit configurations for modification
- Generates idempotent T-SQL scripts with explanatory comments and a companion rollback script

## Requirements

- **Python 3.10+**
- **ODBC Driver 17 for SQL Server** (installed on the machine running the tool)
- **SQL Server 2016 SP1 or later** (target instance)
- The connecting login needs `VIEW SERVER STATE` and `CONTROL SERVER` permissions for full functionality

## Setup

1. Clone or download this project.

2. Create a virtual environment and install dependencies:

   ```bash
   cd sql-audit-tool
   python -m venv venv
   source venv/bin/activate        # Linux/macOS
   venv\Scripts\activate           # Windows
   pip install -r requirements.txt
   ```

3. Run the application:

   ```bash
   python app.py
   ```

4. Open your browser to `http://localhost:5000`.

## Project Structure

```
sql-audit-tool/
  app.py                  # Flask backend — SQL Server connectivity, script generation
  requirements.txt        # Python dependencies (flask, pyodbc)
  templates/
    index.html            # Main HTML template with Blue Jay branding
  static/
    css/
      style.css           # Kovoco Brand v2.0 styles
    js/
      app.js              # Frontend application (wizard, categories, volume estimation)
```

## Wizard Steps

| Step | Purpose |
|------|---------|
| **Connect** | Enter SQL Server instance details (Windows or SQL authentication) |
| **Import** | Detect and optionally import existing audit configurations |
| **Categories** | Select what to audit using category cards (not checkboxes) |
| **Applications** | Discover and exclude known application traffic |
| **Databases** | Select databases and configure object-level auditing via search |
| **Target** | Configure audit log destination (file, Security Log, or Application Log) |
| **Review** | Inspect the generated T-SQL with syntax highlighting |
| **Export** | Copy or download the configuration and rollback scripts |

## Branding

The interface follows the **Kovoco Brand Identity Guide v2.0** (March 2026):

- **Deep Navy** (#0D2B4E) — navigation, headers, script viewer
- **Kovoco Blue** (#146BCD) — links, charts, logo accent
- **Jay Orange** (#E85D24) — primary CTA buttons, alerts (ACTION role)
- **Wing Teal** (#2AA876) — success states, completed steps (STATUS role)
- **Pale Sky** (#F4F6FA) — page backgrounds
- Typography: Inter (headings), Nunito Sans (body), Cabin (callouts)
- Iconography: Lucide outline-style SVG icons
- Blue Jay appears as the hero illustration, topbar icon, and background watermark

## Notes

- SQL Server Express edition does not support auditing. The tool detects this and shows a clear message.
- The `SCHEMA_OBJECT_ACCESS_GROUP` required by STIG generates high volume on busy systems. The tool warns about this.
- Application exclusions use a composite key of `program_name + host_name + login_name` to avoid accidentally excluding DBA activity from the same host.
- All generated scripts include `IF EXISTS` / `IF NOT EXISTS` safety checks and are safe to run multiple times.

## License

Proprietary. Kovoco Inc. All rights reserved.

