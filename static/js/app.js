/* ============================================================
   Kovoco SQL Audit Configurator — Frontend Application
   Brand Guide v2.0 — Lucide icons, Deep Navy/Orange/Teal palette
   ============================================================ */

// ---------------------------------------------------------------------------
// Lucide SVG icon helpers (outline style per brand guide s7)
// ---------------------------------------------------------------------------
const ICONS = {
  shield:     '<svg class="lucide" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  shieldCheck:'<svg class="lucide" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>',
  lock:       '<svg class="lucide" viewBox="0 0 24 24"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
  user:       '<svg class="lucide" viewBox="0 0 24 24"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  hardDrive:  '<svg class="lucide" viewBox="0 0 24 24"><line x1="22" x2="2" y1="12" y2="12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/><line x1="6" x2="6.01" y1="16" y2="16"/><line x1="10" x2="10.01" y1="16" y2="16"/></svg>',
  database:   '<svg class="lucide" viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>',
  search:     '<svg class="lucide" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
  settings:   '<svg class="lucide" viewBox="0 0 24 24"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>',
  fileText:   '<svg class="lucide" viewBox="0 0 24 24"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>',
  folder:     '<svg class="lucide" viewBox="0 0 24 24"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>',
  keyRound:   '<svg class="lucide" viewBox="0 0 24 24"><path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"/><circle cx="16.5" cy="7.5" r=".5"/></svg>',
  clipboardList:'<svg class="lucide" viewBox="0 0 24 24"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>',
  alertTriangle:'<svg class="lucide lucide-sm" viewBox="0 0 24 24"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>',
  checkCircle:'<svg class="lucide lucide-sm" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>',
  info:       '<svg class="lucide lucide-sm" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>',
  xCircle:    '<svg class="lucide lucide-sm" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>',
  sparkles:   '<svg class="lucide" viewBox="0 0 24 24"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>',
  download:   '<svg class="lucide" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>',
  refreshCw:  '<svg class="lucide" viewBox="0 0 24 24"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>',
  server:     '<svg class="lucide" viewBox="0 0 24 24"><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/></svg>',
  copy:       '<svg class="lucide lucide-sm" viewBox="0 0 24 24"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>',
  plus:       '<svg class="lucide lucide-sm" viewBox="0 0 24 24"><path d="M5 12h14"/><path d="M12 5v14"/></svg>',
};

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------
const state = {
  connectionId: null,
  serverMeta: null,
  currentStep: 0,
  categories: new Set(['audit_integrity']),
  stigEnabled: false,
  exclusions: [],
  applications: [],
  databases: [],
  selectedDatabases: new Set(),
  databaseObjects: {},
  target: {
    type: 'file',
    filePath: 'C:\\SQLAudit\\',
    maxSize: 100,
    maxRolloverFiles: 10,
    reserveDiskSpace: false,
    queueDelay: 1000,
    onFailure: 'CONTINUE',
  },
  existingAudits: [],
  existingSpecs: [],
  volumeEstimate: { loginsPerHour: 0, estimatedDailyLogins: 0 },
  generatedScript: '',
  rollbackScript: '',
  warnings: [],
  auditName: 'KovocoAudit',
};

const steps = [
  { id: 'connect',      label: 'Connect' },
  { id: 'import',       label: 'Import' },
  { id: 'categories',   label: 'Categories' },
  { id: 'applications', label: 'Applications' },
  { id: 'databases',    label: 'Databases' },
  { id: 'target',       label: 'Target' },
  { id: 'review',       label: 'Review' },
  { id: 'export',       label: 'Export' },
];

// Category definitions — icons are now Lucide SVG, iconClass uses v2.0 palette
const CATEGORIES = {
  security: {
    icon: ICONS.lock, iconClass: 'blue',
    title: 'Security Changes',
    desc: 'Tracks changes to logins, users, roles, permissions, and ownership.',
    groups: ['SERVER_ROLE_MEMBER_CHANGE_GROUP','DATABASE_ROLE_MEMBER_CHANGE_GROUP',
             'SCHEMA_OBJECT_PERMISSION_CHANGE_GROUP','DATABASE_PERMISSION_CHANGE_GROUP',
             'SERVER_PERMISSION_CHANGE_GROUP','DATABASE_OWNERSHIP_CHANGE_GROUP',
             'SERVER_OBJECT_PERMISSION_CHANGE_GROUP','USER_CHANGE_PASSWORD_GROUP',
             'DATABASE_PRINCIPAL_CHANGE_GROUP','SERVER_PRINCIPAL_CHANGE_GROUP'],
  },
  login: {
    icon: ICONS.user, iconClass: 'teal',
    title: 'Login Activity',
    desc: 'Tracks successful logins, failed login attempts, and logouts.',
    groups: ['FAILED_LOGIN_GROUP','SUCCESSFUL_LOGIN_GROUP','LOGOUT_GROUP'],
    volumeWarning: true,
  },
  backup: {
    icon: ICONS.hardDrive, iconClass: 'navy',
    title: 'Backup & Restore',
    desc: 'Tracks all backup and restore operations.',
    groups: ['BACKUP_RESTORE_GROUP'],
  },
  schema: {
    icon: ICONS.database, iconClass: 'blue',
    title: 'Schema Changes',
    desc: 'Tracks DDL changes \u2014 creating, altering, or dropping objects like tables, views, stored procedures, and functions.',
    groups: ['SCHEMA_OBJECT_CHANGE_GROUP','DATABASE_OBJECT_CHANGE_GROUP','SERVER_OBJECT_CHANGE_GROUP','DATABASE_CHANGE_GROUP'],
  },
  data_access: {
    icon: ICONS.search, iconClass: 'orange',
    title: 'Data Access',
    desc: 'Tracks who reads or changes data in specific tables or runs specific procedures. Use sparingly \u2014 auditing data access on busy objects generates enormous log volume.',
    groups: [],
    requiresObjectSelection: true,
  },
  change_control: {
    icon: ICONS.settings, iconClass: 'navy',
    title: 'Change Control',
    desc: 'Tracks server and database configuration changes, trace flag modifications, and operational changes.',
    groups: ['DATABASE_OBJECT_CHANGE_GROUP','SERVER_OPERATION_GROUP','DATABASE_OPERATION_GROUP','TRACE_CHANGE_GROUP'],
  },
  audit_integrity: {
    icon: ICONS.shieldCheck, iconClass: 'blue',
    title: 'Audit Integrity',
    desc: 'Changes to the audit configuration itself are always tracked. This ensures the audit trail cannot be silently modified.',
    groups: ['AUDIT_CHANGE_GROUP','SERVER_AUDIT_CHANGE_GROUP','DATABASE_AUDIT_SPECIFICATION_CHANGE_GROUP','SERVER_AUDIT_SPECIFICATION_CHANGE_GROUP'],
    locked: true,
  },
};

const STIG_ACTIVATES = ['security','login','backup','schema','change_control','audit_integrity'];

// ---------------------------------------------------------------------------
// API helpers
// ---------------------------------------------------------------------------
async function api(path, body = {}) {
  const res = await fetch(`/api${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return res.json();
}

// ---------------------------------------------------------------------------
// Toast — uses Lucide icons instead of emoji
// ---------------------------------------------------------------------------
function toast(msg, type = 'info') {
  const c = document.getElementById('toasts');
  const iconMap = {
    info:    `<span class="toast-icon info">${ICONS.info}</span>`,
    success: `<span class="toast-icon success">${ICONS.checkCircle}</span>`,
    error:   `<span class="toast-icon error">${ICONS.xCircle}</span>`,
    warning: `<span class="toast-icon warning">${ICONS.alertTriangle}</span>`,
  };
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = `${iconMap[type] || iconMap.info}<span>${msg}</span>`;
  c.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 300); }, 4000);
}

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------
function goToStep(idx) {
  if (idx < 0 || idx >= steps.length) return;
  state.currentStep = idx;
  renderStepper();
  renderMainContent();
}

function nextStep() { goToStep(state.currentStep + 1); }
function prevStep() { goToStep(state.currentStep - 1); }

function renderStepper() {
  const ul = document.getElementById('stepper');
  ul.innerHTML = steps.map((s, i) => {
    let cls = '';
    if (i === state.currentStep) cls = 'active';
    else if (i < state.currentStep) cls = 'completed';
    return `<li class="${cls}" data-step="${i + 1}" onclick="goToStep(${i})">${s.label}</li>`;
  }).join('');
}

// ---------------------------------------------------------------------------
// Volume estimation
// ---------------------------------------------------------------------------
function getEstimatedVolume() {
  let total = 0;
  const daily = state.volumeEstimate.estimatedDailyLogins || 100;

  if (state.categories.has('login')) total += daily;
  if (state.categories.has('security')) total += Math.round(daily * 0.15);
  if (state.categories.has('backup')) total += 50;
  if (state.categories.has('schema')) total += Math.round(daily * 0.08);
  if (state.categories.has('change_control')) total += Math.round(daily * 0.1);
  if (state.categories.has('audit_integrity')) total += 20;
  if (state.categories.has('data_access')) total += 5000;
  if (state.stigEnabled) total = Math.max(total, daily * 2);

  for (const db of Object.keys(state.databaseObjects)) {
    total += (state.databaseObjects[db]?.length || 0) * 500;
  }

  return total;
}

function volumeColor(vol) {
  if (vol < 10000) return 'green';
  if (vol < 100000) return 'yellow';
  return 'red';
}

function renderVolumeSidebar() {
  const el = document.getElementById('volume-panel');
  const vol = getEstimatedVolume();
  const color = volumeColor(vol);
  const pct = Math.min(100, (vol / 150000) * 100);
  const mb = (vol * 500 / 1024 / 1024).toFixed(1);

  // Map to CSS color vars
  const cssColor = color === 'green' ? 'var(--teal)' : color === 'yellow' ? 'var(--orange)' : '#c0392b';

  el.innerHTML = `
    <h4>Est. Daily Volume</h4>
    <div class="volume-bar-track">
      <div class="volume-bar-fill ${color}" style="width:${pct}%"></div>
    </div>
    <div class="volume-number" style="color:${cssColor}">${vol.toLocaleString()}</div>
    <div class="volume-label">events/day (~${mb} MB)</div>
  `;
}

// ---------------------------------------------------------------------------
// Render main panels
// ---------------------------------------------------------------------------
function renderMainContent() {
  const mc = document.getElementById('main-content');
  renderVolumeSidebar();

  const renderers = {
    0: renderConnect,
    1: renderImport,
    2: renderCategories,
    3: renderApplications,
    4: renderDatabases,
    5: renderTarget,
    6: renderReview,
    7: renderExport,
  };

  mc.innerHTML = (renderers[state.currentStep] || renderConnect)();

  if (state.currentStep === 2) bindCategoryCards();
  if (state.currentStep === 5) bindTargetPanel();
}

// ---------------------------------------------------------------------------
// Step 0: Connect
// ---------------------------------------------------------------------------
function renderConnect() {
  return `
    <div class="step-panel active">
      <div class="connect-panel">
        <div class="connect-hero">
          ${bluejayHeroSVG()}
          <h2>Connect to SQL Server</h2>
          <p style="color:var(--midgray);font-size:.9rem;margin-top:6px;">
            Enter your instance details to begin configuring auditing.
          </p>
        </div>
        <div class="form-group">
          <label>Server / Instance</label>
          <input type="text" id="inp-server" placeholder="e.g. SQLPROD01\\MSSQLSERVER or 10.0.0.5,1433" value="">
        </div>
        <div class="form-group">
          <label>Authentication</label>
          <select id="inp-auth" onchange="toggleAuthFields()">
            <option value="windows">Windows Authentication</option>
            <option value="sql">SQL Server Authentication</option>
          </select>
        </div>
        <div id="sql-auth-fields" style="display:none">
          <div class="form-row">
            <div class="form-group">
              <label>Username</label>
              <input type="text" id="inp-user" placeholder="sa">
            </div>
            <div class="form-group">
              <label>Password</label>
              <input type="password" id="inp-pass">
            </div>
          </div>
        </div>
        <div class="form-group">
          <label class="form-check">
            <input type="checkbox" id="inp-trust" checked> Trust server certificate
          </label>
        </div>
        <div class="btn-group" style="justify-content:center">
          <button class="btn btn-primary" onclick="doConnect()" id="btn-connect">
            Connect
          </button>
        </div>
      </div>
    </div>
  `;
}

function toggleAuthFields() {
  const v = document.getElementById('inp-auth').value;
  document.getElementById('sql-auth-fields').style.display = v === 'sql' ? 'block' : 'none';
}

async function doConnect() {
  const btn = document.getElementById('btn-connect');
  btn.innerHTML = '<span class="spinner"></span> Connecting...';
  btn.disabled = true;

  const data = {
    server: document.getElementById('inp-server').value.trim(),
    authType: document.getElementById('inp-auth').value,
    username: document.getElementById('inp-user')?.value || '',
    password: document.getElementById('inp-pass')?.value || '',
    trustCert: document.getElementById('inp-trust').checked,
  };

  const res = await api('/connect', data);

  if (res.success) {
    state.connectionId = res.connectionId;
    state.serverMeta = res;

    document.getElementById('topbar-server').textContent = res.serverName;
    document.getElementById('topbar-badge').textContent = `SQL ${2008 + (res.majorVersion - 10)} ${res.edition.split(' ')[0]}`;
    document.getElementById('topbar-badge').style.display = 'inline';

    if (!res.auditSupported) {
      toast('Audit is not supported on this edition/version.', 'error');
      btn.innerHTML = 'Connect';
      btn.disabled = false;
      return;
    }

    toast(`Connected to ${res.serverName}`, 'success');

    Promise.all([
      api('/existing-audits', { connectionId: state.connectionId }),
      api('/applications', { connectionId: state.connectionId }),
      api('/databases', { connectionId: state.connectionId }),
      api('/volume-estimate', { connectionId: state.connectionId }),
    ]).then(([audits, apps, dbs, vol]) => {
      state.existingAudits = audits.audits || [];
      state.existingSpecs = audits.specs || [];
      state.applications = apps.applications || [];
      state.databases = dbs.databases || [];
      state.volumeEstimate = vol;
      renderVolumeSidebar();
    });

    nextStep();
  } else {
    toast(res.error || 'Connection failed', 'error');
    btn.innerHTML = 'Connect';
    btn.disabled = false;
  }
}

// ---------------------------------------------------------------------------
// Step 1: Import
// ---------------------------------------------------------------------------
function renderImport() {
  const audCount = state.existingAudits.length;
  const specCount = state.existingSpecs.length;
  const hasExisting = audCount > 0;

  let auditSummary = '';
  if (hasExisting) {
    auditSummary = `
      <div class="warning-banner blue">
        <span class="warning-icon">${ICONS.info}</span>
        <div>
          <strong>${state.serverMeta?.serverName}</strong> has
          <strong>${audCount}</strong> server audit(s) and
          <strong>${specCount}</strong> audit specification detail(s) configured.
        </div>
      </div>
      <div style="margin-bottom:8px">
        ${state.existingAudits.map(a => `
          <div class="info-box" style="padding:14px;margin-bottom:8px;">
            <strong>${a.name}</strong> &mdash; ${a.status} &mdash; ${a.type}
            ${a.path ? `<br><small style="color:var(--midgray)">${a.path}</small>` : ''}
          </div>
        `).join('')}
      </div>
    `;
  }

  return `
    <div class="step-panel active">
      <div class="step-header">
        <h2>Existing Configuration</h2>
        <p>We detected whether this instance already has auditing configured.</p>
      </div>
      ${hasExisting ? auditSummary : `
        <div class="warning-banner green">
          <span class="warning-icon">${ICONS.checkCircle}</span>
          <div>No existing audit configuration detected. You're starting fresh.</div>
        </div>
      `}
      <div class="import-choices" style="margin-top:24px;">
        <div class="import-choice" onclick="nextStep()">
          <div class="icon">${ICONS.sparkles}</div>
          <h3>Start Fresh</h3>
          <p>Create a new audit configuration from scratch.</p>
        </div>
        ${hasExisting ? `
        <div class="import-choice" onclick="importExisting()">
          <div class="icon">${ICONS.download}</div>
          <h3>Import Existing</h3>
          <p>Load current configuration and modify it.</p>
        </div>
        ` : `
        <div class="import-choice" style="opacity:.4;cursor:default">
          <div class="icon">${ICONS.download}</div>
          <h3>Import Existing</h3>
          <p>No existing configuration to import.</p>
        </div>
        `}
      </div>
      <div class="btn-group">
        <button class="btn btn-secondary" onclick="prevStep()">Back</button>
      </div>
    </div>
  `;
}

function importExisting() {
  const actionSet = new Set(state.existingSpecs.map(s => s.action));
  for (const [key, cat] of Object.entries(CATEGORIES)) {
    if (cat.groups.some(g => actionSet.has(g))) {
      state.categories.add(key);
    }
  }
  toast('Imported existing configuration', 'success');
  nextStep();
}

// ---------------------------------------------------------------------------
// Step 2: Categories
// ---------------------------------------------------------------------------
function renderCategories() {
  const cards = Object.entries(CATEGORIES).map(([key, cat]) => {
    const isSelected = state.categories.has(key);
    const isLocked = cat.locked;
    let cls = 'category-card';
    if (isSelected) cls += ' selected';
    if (isLocked) cls += ' locked';

    const groups = cat.groups.length
      ? cat.groups.map(g => `<code style="font-size:.7rem;color:var(--midgray)">${g}</code>`).join(', ')
      : '<em style="font-size:.72rem;color:var(--midgray)">Configured via object selection in the Databases step</em>';

    return `
      <div class="${cls}" data-cat="${key}" ${isLocked ? '' : `onclick="toggleCategory('${key}')"`}>
        <div class="card-icon ${cat.iconClass}">${cat.icon}</div>
        ${isLocked ? '' : '<div class="toggle-track"></div>'}
        <h3>${cat.title}</h3>
        <p>${cat.desc}</p>
        ${cat.volumeWarning && isSelected ? '<span class="card-badge badge-orange">Volume warning</span>' : ''}
        <div class="card-details">${groups}</div>
      </div>
    `;
  }).join('');

  const stigSelected = state.stigEnabled;
  const stigCls = `category-card stig-card${stigSelected ? ' selected' : ''}`;

  return `
    <div class="step-panel active">
      <div class="step-header">
        <h2>What do you want to audit?</h2>
        <p>Select the categories that match your auditing goals. Each category maps to specific SQL Server audit action groups.</p>
      </div>
      <div class="card-grid">
        ${cards}
        <div class="${stigCls}" data-cat="stig" onclick="toggleStig()">
          <div class="card-icon navy">${ICONS.shield}</div>
          <div class="toggle-track"></div>
          <h3>STIG Compliance</h3>
          <p>Activate the DISA STIG baseline for your SQL Server version. Locks required categories and adds all mandated action groups.</p>
          ${stigSelected ? '<span class="card-badge badge-orange">All STIG groups active</span>' : ''}
        </div>
      </div>
      <div class="btn-group">
        <button class="btn btn-secondary" onclick="prevStep()">Back</button>
        <button class="btn btn-primary" onclick="nextStep()">Continue</button>
      </div>
    </div>
  `;
}

function bindCategoryCards() { /* click handlers are inline */ }

function toggleCategory(key) {
  if (CATEGORIES[key]?.locked) return;
  if (state.stigEnabled && STIG_ACTIVATES.includes(key)) return;
  if (state.categories.has(key)) state.categories.delete(key);
  else state.categories.add(key);
  renderMainContent();
}

function toggleStig() {
  state.stigEnabled = !state.stigEnabled;
  if (state.stigEnabled) {
    STIG_ACTIVATES.forEach(k => state.categories.add(k));
  }
  renderMainContent();
}

// ---------------------------------------------------------------------------
// Step 3: Applications
// ---------------------------------------------------------------------------
function renderApplications() {
  const apps = state.applications;
  const excluded = new Set(state.exclusions.map(e => `${e.programName}|${e.hostName}|${e.loginName}`));

  let tableRows = '';
  if (apps.length === 0) {
    tableRows = `<tr><td colspan="6" class="empty-state"><div class="icon">${ICONS.search}</div><p>No active application sessions detected.</p></td></tr>`;
  } else {
    tableRows = apps.map(a => {
      const key = `${a.programName}|${a.hostName}|${a.loginName}`;
      const isExcluded = excluded.has(key);
      return `
        <tr>
          <td><strong>${escHtml(a.programName)}</strong></td>
          <td>${escHtml(a.hostName)}</td>
          <td>${escHtml(a.loginName)}</td>
          <td>${escHtml(a.clientInterface)}</td>
          <td style="text-align:center">${a.sessionCount}</td>
          <td>
            <div class="app-toggle ${isExcluded ? 'on' : ''}"
                 onclick="toggleExclusion('${escAttr(a.programName)}','${escAttr(a.hostName)}','${escAttr(a.loginName)}')"></div>
          </td>
        </tr>
      `;
    }).join('');
  }

  const exclWarnings = state.exclusions.map(e => `
    <div class="warning-banner orange">
      <span class="warning-icon">${ICONS.alertTriangle}</span>
      <div>Changes made by <strong>${escHtml(e.programName)}</strong> from <strong>${escHtml(e.hostName)}</strong> as <strong>${escHtml(e.loginName)}</strong> will <strong>NOT</strong> be audited. If an administrator uses a different tool to modify the same data, that WILL be audited.</div>
    </div>
  `).join('');

  return `
    <div class="step-panel active">
      <div class="step-header">
        <h2>Application Exclusions</h2>
        <p>Exclude known application traffic that already has its own audit logging. Toggle the switch to exclude an application.</p>
      </div>
      ${exclWarnings}
      <table class="data-table">
        <thead>
          <tr>
            <th>Application</th>
            <th>Hostname</th>
            <th>Login</th>
            <th>Interface</th>
            <th>Sessions</th>
            <th>Exclude</th>
          </tr>
        </thead>
        <tbody>${tableRows}</tbody>
      </table>
      <div style="margin-top:12px">
        <button class="btn btn-ghost" onclick="refreshApps()">${ICONS.refreshCw} Refresh</button>
      </div>
      <div class="btn-group">
        <button class="btn btn-secondary" onclick="prevStep()">Back</button>
        <button class="btn btn-primary" onclick="nextStep()">Continue</button>
      </div>
    </div>
  `;
}

function toggleExclusion(prog, host, login) {
  const idx = state.exclusions.findIndex(e => e.programName === prog && e.hostName === host && e.loginName === login);
  if (idx >= 0) state.exclusions.splice(idx, 1);
  else state.exclusions.push({ programName: prog, hostName: host, loginName: login });
  renderMainContent();
}

async function refreshApps() {
  const res = await api('/applications', { connectionId: state.connectionId });
  state.applications = res.applications || [];
  renderMainContent();
  toast('Refreshed application list', 'success');
}

// ---------------------------------------------------------------------------
// Step 4: Databases
// ---------------------------------------------------------------------------
function renderDatabases() {
  const chips = state.databases.map(db => {
    const sel = state.selectedDatabases.has(db.name);
    return `<div class="db-chip ${sel ? 'selected' : ''}" onclick="toggleDb('${escAttr(db.name)}')">${escHtml(db.name)}</div>`;
  }).join('');

  let objectPanels = '';
  for (const dbName of state.selectedDatabases) {
    const objs = state.databaseObjects[dbName] || [];
    const objPills = objs.map((o, i) => `
      <span class="object-pill">
        ${escHtml(o.schema)}.${escHtml(o.name)} (${o.actions.join(',')})
        <span class="remove" onclick="removeObject('${escAttr(dbName)}', ${i})">\u00D7</span>
      </span>
    `).join('');

    objectPanels += `
      <div class="info-box">
        <h3>${escHtml(dbName)}</h3>
        <div class="search-box">
          <span class="search-icon">${ICONS.search}</span>
          <input type="text" placeholder="Search tables, views, procedures..."
                 oninput="searchObjects('${escAttr(dbName)}', this.value)"
                 id="search-${dbName}">
        </div>
        <div id="results-${dbName}"></div>
        <div style="margin-top:8px">${objPills || '<span style="color:var(--midgray);font-size:.82rem">No objects selected for auditing</span>'}</div>
      </div>
    `;
  }

  return `
    <div class="step-panel active">
      <div class="step-header">
        <h2>Database Configuration</h2>
        <p>Select databases to configure object-level auditing. This is optional \u2014 server-level categories already cover most needs.</p>
      </div>
      ${state.databases.length === 0 ? `<div class="warning-banner orange"><span class="warning-icon">${ICONS.alertTriangle}</span><div>No user databases found.</div></div>` : ''}
      <div class="db-chips">${chips}</div>
      ${objectPanels}
      <div class="btn-group">
        <button class="btn btn-secondary" onclick="prevStep()">Back</button>
        <button class="btn btn-primary" onclick="nextStep()">Continue</button>
      </div>
    </div>
  `;
}

function toggleDb(name) {
  if (state.selectedDatabases.has(name)) state.selectedDatabases.delete(name);
  else state.selectedDatabases.add(name);
  renderMainContent();
}

let searchTimeout = null;
async function searchObjects(dbName, query) {
  clearTimeout(searchTimeout);
  if (query.length < 2) {
    document.getElementById(`results-${dbName}`).innerHTML = '';
    return;
  }
  searchTimeout = setTimeout(async () => {
    const res = await api('/objects', { connectionId: state.connectionId, database: dbName, search: query });
    const results = res.objects || [];
    const el = document.getElementById(`results-${dbName}`);
    if (!results.length) {
      el.innerHTML = '<p style="color:var(--midgray);font-size:.82rem">No matching objects</p>';
      return;
    }
    el.innerHTML = `<table class="data-table" style="margin-bottom:12px">
      <thead><tr><th>Schema</th><th>Object</th><th>Type</th><th>Actions</th><th></th></tr></thead>
      <tbody>${results.map(o => `
        <tr>
          <td>${escHtml(o.schema)}</td>
          <td><strong>${escHtml(o.name)}</strong></td>
          <td><span style="font-size:.75rem;color:var(--midgray)">${escHtml(o.type)}</span></td>
          <td>
            <div class="action-checks">
              ${['SELECT','INSERT','UPDATE','DELETE','EXECUTE'].map(a => {
                const checked = a !== 'SELECT' && a !== 'EXECUTE' ? 'checked' : '';
                return `<label class="action-check"><input type="checkbox" ${checked} data-action="${a}" data-schema="${escAttr(o.schema)}" data-name="${escAttr(o.name)}"> ${a}</label>`;
              }).join('')}
            </div>
          </td>
          <td><button class="btn btn-ghost" style="padding:4px 10px;font-size:.78rem" onclick="addObject('${escAttr(dbName)}','${escAttr(o.schema)}','${escAttr(o.name)}')">${ICONS.plus} Add</button></td>
        </tr>
      `).join('')}</tbody>
    </table>`;
  }, 300);
}

function addObject(dbName, schema, name) {
  if (!state.databaseObjects[dbName]) state.databaseObjects[dbName] = [];
  const checks = document.querySelectorAll(`input[data-schema="${schema}"][data-name="${name}"]:checked`);
  const actions = Array.from(checks).map(c => c.dataset.action);
  if (!actions.length) { toast('Select at least one action', 'warning'); return; }
  if (state.databaseObjects[dbName].some(o => o.schema === schema && o.name === name)) {
    toast('Object already added', 'warning');
    return;
  }
  state.databaseObjects[dbName].push({ schema, name, actions, principal: 'public' });
  renderMainContent();
}

function removeObject(dbName, idx) {
  state.databaseObjects[dbName].splice(idx, 1);
  renderMainContent();
}

// ---------------------------------------------------------------------------
// Step 5: Target
// ---------------------------------------------------------------------------
function renderTarget() {
  const t = state.target;

  return `
    <div class="step-panel active">
      <div class="step-header">
        <h2>Audit Target</h2>
        <p>Configure where audit log data is written. File-based targets are recommended for most environments.</p>
      </div>
      <div class="target-options">
        <div class="target-option ${t.type === 'file' ? 'selected' : ''}" onclick="setTargetType('file')">
          <div class="icon">${ICONS.folder}</div>
          <h4>File</h4>
          <p>Most flexible and performant. Recommended.</p>
        </div>
        <div class="target-option ${t.type === 'security_log' ? 'selected' : ''}" onclick="setTargetType('security_log')">
          <div class="icon">${ICONS.lock}</div>
          <h4>Security Log</h4>
          <p>Windows Security Log. Required by some compliance frameworks.</p>
        </div>
        <div class="target-option ${t.type === 'app_log' ? 'selected' : ''}" onclick="setTargetType('app_log')">
          <div class="icon">${ICONS.clipboardList}</div>
          <h4>Application Log</h4>
          <p>Windows Application Log. Not recommended for production.</p>
        </div>
      </div>

      ${t.type === 'file' ? renderFileTarget() : ''}
      ${t.type === 'security_log' ? `<div class="warning-banner orange"><span class="warning-icon">${ICONS.alertTriangle}</span><div>The SQL Server service account needs the <strong>"Generate security audits"</strong> privilege in Local Security Policy.</div></div>` : ''}
      ${t.type === 'app_log' ? `<div class="warning-banner red"><span class="warning-icon">${ICONS.alertTriangle}</span><div>Application Log has size limitations and is generally not recommended for production audit logging.</div></div>` : ''}

      ${renderOnFailure()}
      ${renderDiskEstimate()}

      <div class="btn-group">
        <button class="btn btn-secondary" onclick="prevStep()">Back</button>
        <button class="btn btn-primary" onclick="nextStep()">Continue</button>
      </div>
    </div>
  `;
}

function renderFileTarget() {
  const t = state.target;
  return `
    <div class="target-detail">
      <div class="setting-row">
        <label>File Path</label>
        <div>
          <input type="text" id="inp-filepath" value="${escAttr(t.filePath)}" onchange="state.target.filePath=this.value">
          <div class="setting-hint">UNC paths or local drives on the SQL Server host.</div>
        </div>
      </div>
      <div class="setting-row">
        <label>Max File Size (MB)</label>
        <div>
          <input type="number" id="inp-maxsize" value="${t.maxSize}" min="1" onchange="state.target.maxSize=parseInt(this.value)">
          <div class="setting-hint">Each audit file grows to this size before rolling over.</div>
        </div>
      </div>
      <div class="setting-row">
        <label>Max Rollover Files</label>
        <div>
          <input type="number" id="inp-maxfiles" value="${t.maxRolloverFiles}" min="1" onchange="state.target.maxRolloverFiles=parseInt(this.value)">
          <div class="setting-hint">Oldest files are recycled when this limit is reached.</div>
        </div>
      </div>
      <div class="setting-row">
        <label>Queue Delay (ms)</label>
        <div>
          <input type="number" id="inp-qdelay" value="${t.queueDelay}" min="0" onchange="state.target.queueDelay=parseInt(this.value)">
          <div class="setting-hint">Buffer writes. 0 = synchronous (can impact performance). Default: 1000ms.</div>
        </div>
      </div>
      <div class="setting-row">
        <label>Reserve Disk Space</label>
        <div>
          <label class="form-check">
            <input type="checkbox" id="inp-reserve" ${t.reserveDiskSpace ? 'checked' : ''} onchange="state.target.reserveDiskSpace=this.checked">
            Pre-allocate space on disk
          </label>
          <div class="setting-hint">Guarantees space but uses it immediately.</div>
        </div>
      </div>
    </div>
  `;
}

function renderOnFailure() {
  const t = state.target;
  return `
    <div style="margin-top:24px">
      <h3 style="font-size:1rem;margin-bottom:12px">On Failure Behavior</h3>
      <div class="failure-badges">
        <div class="failure-badge ${t.onFailure === 'CONTINUE' ? 'selected' : ''}" onclick="setOnFailure('CONTINUE')">
          CONTINUE
          <small>Keep running if audit fails</small>
        </div>
        <div class="failure-badge ${t.onFailure === 'FAIL_OPERATION' ? 'selected' : ''}" onclick="setOnFailure('FAIL_OPERATION')">
          FAIL_OPERATION
          <small>Block the operation that triggered the audit</small>
        </div>
        <div class="failure-badge ${t.onFailure === 'SHUTDOWN' ? 'selected' : ''}" onclick="setOnFailure('SHUTDOWN')">
          SHUTDOWN
          <small>Stop SQL Server if audit fails</small>
        </div>
      </div>
      ${t.onFailure === 'SHUTDOWN' ? `<div class="warning-banner red" style="margin-top:12px"><span class="warning-icon">${ICONS.alertTriangle}</span><div><strong>SHUTDOWN</strong> means SQL Server will stop entirely if it cannot write audit logs. This is required by high-security environments but will surprise most administrators.</div></div>` : ''}
      ${t.onFailure === 'CONTINUE' ? `<div class="warning-banner orange" style="margin-top:12px"><span class="warning-icon">${ICONS.alertTriangle}</span><div><strong>CONTINUE</strong> means audit events may be lost during write failures. Acceptable for most environments.</div></div>` : ''}
    </div>
  `;
}

function renderDiskEstimate() {
  const vol = getEstimatedVolume();
  const dailyMb = (vol * 500 / 1024 / 1024).toFixed(1);
  const weeklyMb = (dailyMb * 7).toFixed(0);
  const monthlyMb = (dailyMb * 30).toFixed(0);

  return `
    <div class="disk-estimate">
      <div>
        <div class="big-number">${dailyMb} MB</div>
        <div class="label">estimated per day</div>
      </div>
      <div style="border-left:1px solid var(--border);padding-left:20px">
        <div><strong>${weeklyMb} MB</strong> <span style="color:var(--midgray);font-size:.82rem">per week</span></div>
        <div><strong>${monthlyMb} MB</strong> <span style="color:var(--midgray);font-size:.82rem">per month</span></div>
      </div>
      <div style="border-left:1px solid var(--border);padding-left:20px">
        <div style="font-size:.82rem;color:var(--midgray)">Based on ~500 bytes per audit event and your current selections of <strong>${vol.toLocaleString()}</strong> events/day.</div>
      </div>
    </div>
  `;
}

function setTargetType(t) { state.target.type = t; renderMainContent(); }
function setOnFailure(v) { state.target.onFailure = v; renderMainContent(); }
function bindTargetPanel() { /* inputs use inline onchange */ }

// ---------------------------------------------------------------------------
// Step 6: Review
// ---------------------------------------------------------------------------
async function renderReviewAsync() {
  const vol = getEstimatedVolume();

  const dbConfigs = [];
  for (const dbName of state.selectedDatabases) {
    const objs = state.databaseObjects[dbName] || [];
    if (objs.length) dbConfigs.push({ name: dbName, objects: objs });
  }

  const res = await api('/generate-script', {
    connectionId: state.connectionId,
    categories: Array.from(state.categories),
    exclusions: state.exclusions,
    target: state.target,
    databases: dbConfigs,
    stigEnabled: state.stigEnabled,
    auditName: state.auditName,
    estimatedVolume: vol,
  });

  state.generatedScript = res.script || '-- Error generating script';
  state.rollbackScript = res.rollback || '';
  state.warnings = res.warnings || [];

  renderReviewContent();
}

function renderReview() {
  setTimeout(renderReviewAsync, 50);
  return `
    <div class="step-panel active" id="review-panel">
      <div class="step-header">
        <h2>Review Configuration</h2>
        <p>Review the generated T-SQL script before exporting. Nothing is executed \u2014 this tool only generates scripts.</p>
      </div>
      <div style="text-align:center;padding:40px"><span class="spinner dark"></span> Generating script...</div>
    </div>
  `;
}

function renderReviewContent() {
  const panel = document.getElementById('review-panel');
  if (!panel) return;

  const warningsHtml = state.warnings.map(w => `
    <div class="warning-banner orange">
      <span class="warning-icon">${ICONS.alertTriangle}</span><div>${escHtml(w)}</div>
    </div>
  `).join('');

  panel.innerHTML = `
    <div class="step-header">
      <h2>Review Configuration</h2>
      <p>Review the generated T-SQL script before exporting. Nothing is executed \u2014 this tool only generates scripts.</p>
    </div>
    ${warningsHtml}
    <div class="form-group" style="max-width:300px;margin-bottom:20px">
      <label>Audit Name</label>
      <input type="text" value="${escAttr(state.auditName)}" onchange="state.auditName=this.value" style="font-family:'Fira Code',monospace">
    </div>
    <div class="script-container">
      <div class="script-toolbar">
        <div class="tab active" onclick="showScript('main')">Configuration Script</div>
        <div class="tab" onclick="showScript('rollback')">Rollback Script</div>
        <div class="script-actions">
          <button class="script-btn" onclick="copyScript()">${ICONS.copy} Copy</button>
          <button class="script-btn" onclick="downloadScript()">${ICONS.download} Download .sql</button>
        </div>
      </div>
      <pre class="script-body" id="script-body">${highlightSQL(state.generatedScript)}</pre>
    </div>
    <div class="btn-group">
      <button class="btn btn-secondary" onclick="prevStep()">Back</button>
      <button class="btn btn-primary" onclick="nextStep()">Export</button>
    </div>
  `;
}

function showScript(which) {
  const body = document.getElementById('script-body');
  const tabs = document.querySelectorAll('.script-toolbar .tab');
  tabs.forEach((t, i) => t.classList.toggle('active', (which === 'main' ? i === 0 : i === 1)));
  body.innerHTML = highlightSQL(which === 'main' ? state.generatedScript : state.rollbackScript);
}

function copyScript() {
  navigator.clipboard.writeText(state.generatedScript).then(() => toast('Copied to clipboard', 'success'));
}

function downloadScript() {
  const blob = new Blob([state.generatedScript], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${state.auditName}_config.sql`;
  a.click();
}

// ---------------------------------------------------------------------------
// Step 7: Export
// ---------------------------------------------------------------------------
function renderExport() {
  return `
    <div class="step-panel active">
      <div class="step-header" style="text-align:center;">
        ${bluejayHeroSVG()}
        <h2 style="margin-top:16px">Configuration Complete</h2>
        <p>Your audit configuration script is ready. Review it carefully and execute it on your SQL Server instance using SSMS or sqlcmd.</p>
      </div>
      <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap;margin-top:24px">
        <button class="btn btn-primary" onclick="copyScript()">${ICONS.copy} Copy Configuration Script</button>
        <button class="btn btn-secondary" onclick="downloadScript()">${ICONS.download} Download .sql File</button>
        <button class="btn btn-secondary" onclick="downloadRollback()">${ICONS.download} Download Rollback Script</button>
      </div>
      <div style="max-width:600px;margin:32px auto 0;text-align:center;">
        <div class="warning-banner blue" style="text-align:left">
          <span class="warning-icon">${ICONS.shieldCheck}</span>
          <div>
            <strong>Next steps:</strong><br>
            1. Review the generated script in a test environment first.<br>
            2. Execute using an account with CONTROL SERVER permission.<br>
            3. Verify the audit is running: <code style="font-size:.8rem">SELECT * FROM sys.server_audits</code><br>
            4. Monitor disk usage on the audit target path.
          </div>
        </div>
      </div>
      <div class="btn-group" style="justify-content:center">
        <button class="btn btn-ghost" onclick="goToStep(0)">Configure Another Instance</button>
      </div>
    </div>
  `;
}

function downloadRollback() {
  const blob = new Blob([state.rollbackScript], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${state.auditName}_rollback.sql`;
  a.click();
}

// ---------------------------------------------------------------------------
// SQL Syntax Highlighting (simple)
// ---------------------------------------------------------------------------
function highlightSQL(sql) {
  if (!sql) return '';
  let s = escHtml(sql);

  s = s.replace(/(--[^\n]*)/g, '<span class="sql-comment">$1</span>');
  s = s.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="sql-comment">$1</span>');
  s = s.replace(/('(?:[^']|'')*')/g, '<span class="sql-string">$1</span>');

  const kw = ['CREATE','ALTER','DROP','SELECT','FROM','WHERE','AND','OR','NOT','INSERT','UPDATE','DELETE','EXECUTE',
              'BEGIN','END','IF','EXISTS','USE','GO','ON','OFF','WITH','STATE','FOR','ADD','SET','TO','BY',
              'SERVER','AUDIT','SPECIFICATION','DATABASE','FILE','FILEPATH','MAXSIZE','MAX_ROLLOVER_FILES',
              'RESERVE_DISK_SPACE','QUEUE_DELAY','ON_FAILURE','CONTINUE','SHUTDOWN','FAIL_OPERATION',
              'OBJECT','LIKE','JOIN','NULL','INTO','AS','TOP','ORDER','GROUP','COUNT','DISTINCT',
              'TABLE','VIEW','PROCEDURE','FUNCTION','SCHEMA','INDEX','TRIGGER','N'];
  const kwRe = new RegExp(`\\b(${kw.join('|')})\\b`, 'g');
  s = s.replace(kwRe, (m) => `<span class="sql-keyword">${m}</span>`);
  s = s.replace(/\b(\d+)\b/g, '<span class="sql-number">$1</span>');

  return s;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function escHtml(s) {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

function escAttr(s) {
  return String(s).replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

// ---------------------------------------------------------------------------
// Blue Jay SVG — updated with Deep Navy #0D2B4E instead of Steel #002D72
// ---------------------------------------------------------------------------
function bluejayHeroSVG() {
  return `<svg viewBox="0 0 200 200" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="jg1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#3a8ee6"/>
        <stop offset="100%" style="stop-color:#146BCD"/>
      </linearGradient>
      <linearGradient id="jg2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#0D2B4E"/>
        <stop offset="100%" style="stop-color:#164578"/>
      </linearGradient>
    </defs>
    <ellipse cx="100" cy="120" rx="50" ry="55" fill="url(#jg1)"/>
    <path d="M65 105 Q40 130 55 155 Q75 145 80 125 Z" fill="url(#jg2)"/>
    <path d="M62 115 Q42 135 52 152" stroke="white" stroke-width="1.5" fill="none" opacity="0.3"/>
    <path d="M67 110 Q47 132 55 148" stroke="white" stroke-width="1" fill="none" opacity="0.2"/>
    <line x1="58" y1="120" x2="72" y2="115" stroke="white" stroke-width="1.2" opacity="0.4"/>
    <line x1="54" y1="128" x2="70" y2="122" stroke="white" stroke-width="1" opacity="0.3"/>
    <line x1="52" y1="136" x2="68" y2="130" stroke="white" stroke-width="1" opacity="0.25"/>
    <circle cx="115" cy="82" r="28" fill="url(#jg1)"/>
    <path d="M110 58 Q118 35 130 55 Q122 50 115 58 Z" fill="url(#jg2)"/>
    <path d="M115 62 Q125 40 138 52" fill="url(#jg1)"/>
    <circle cx="124" cy="78" r="8" fill="white"/>
    <circle cx="125" cy="77" r="4.5" fill="#0D2B4E"/>
    <circle cx="126.5" cy="75.5" r="1.5" fill="white"/>
    <path d="M140 84 L160 82 L140 90 Z" fill="#2C2C2C"/>
    <path d="M95 98 Q115 110 138 96" stroke="#0D2B4E" stroke-width="2.5" fill="none"/>
    <ellipse cx="105" cy="145" rx="30" ry="22" fill="white" opacity="0.3"/>
    <path d="M60 155 Q40 175 30 185 Q50 180 65 170 Z" fill="url(#jg2)"/>
    <path d="M65 160 Q48 178 38 188 Q55 182 68 172 Z" fill="url(#jg1)" opacity="0.7"/>
    <line x1="50" y1="170" x2="60" y2="162" stroke="white" stroke-width="0.8" opacity="0.3"/>
    <path d="M90 172 L85 190 L80 185 M85 190 L90 185" stroke="#2C2C2C" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M110 172 L108 190 L103 185 M108 190 L113 185" stroke="#2C2C2C" stroke-width="2" fill="none" stroke-linecap="round"/>
  </svg>`;
}

// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  renderStepper();
  renderMainContent();
  renderVolumeSidebar();
});
