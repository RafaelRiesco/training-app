import { exercises } from './data/exercises.js';
import { musclesData } from './data/muscles.js';
import { testsData } from './data/tests.js';
import { trackerSessions } from './data/tracker-sessions.js';
import { testResultFields } from './data/test-result-fields.js';
import { bodyFields } from './data/body-fields.js';
import { watchMetrics } from './data/watch-metrics.js';
import { defaultNutritionLog, supplements } from './data/nutrition-defaults.js';
import { CollapsibleList } from './core/collapsible-list.js';
import { TabGroup } from './core/tab-group.js';
import { Store } from './core/store.js';
import { StaticRepository } from './core/repository.js';
import { PageController } from './core/page-controller.js';
import { Router } from './core/router.js';

// ─── REPOSITORIES ─────────────────────────────
// All StaticRepository today; swapping any one of these to an ApiRepository
// later (e.g. smartwatchRepo -> ApiRepository('/api/smartwatch/latest')) is
// the entire migration, since every caller already goes through .get().
const exercisesRepo = new StaticRepository(exercises);
const musclesRepo = new StaticRepository(musclesData);
const testsRepo = new StaticRepository(testsData);
const trackerSessionsRepo = new StaticRepository(trackerSessions);
const testResultFieldsRepo = new StaticRepository(testResultFields);
const bodyFieldsRepo = new StaticRepository(bodyFields);
const watchMetricsRepo = new StaticRepository(watchMetrics);
const nutritionLogRepo = new StaticRepository(defaultNutritionLog);
const supplementsRepo = new StaticRepository(supplements);

// ─── STATE ───────────────────────────────────
let currentWeek = 0;
const storage = new Store();

const exLists = new Map();

function renderExItem(containerId, ex, i) {
  return `
    <div class="ex-row" id="row-${containerId}-${i}" data-action="toggle-ex" data-container="${containerId}" data-idx="${i}">
      <span class="ex-idx">${i+1}</span>
      <div>
        <div class="ex-name">${ex.name}</div>
        <div class="ex-spec">${ex.spec}</div>
      </div>
      ${ex.badge==='surf' ? '<span class="ex-badge surf">Surf</span>' : '<span class="ex-badge"></span>'}
      <span class="ex-chev">▼</span>
    </div>
    <div class="ex-detail" id="det-${containerId}-${i}">
      <div class="detail-grid">
        <div class="detail-section">
          <div class="dl">Músculos</div>
          <div class="muscle-tags">${ex.muscles.map(m=>`<span class="muscle-tag">${m}</span>`).join('')}</div>
          <div class="dl" style="margin-top:10px">Clave técnica</div>
          <div class="dt">${ex.tip}</div>
        </div>
        <div class="detail-section">
          <div class="dl">Transferencia al surf</div>
          <div class="surf-box">🌊 ${ex.surf}</div>
        </div>
      </div>
    </div>
  `;
}

function buildExRows(containerId, exs) {
  const list = new CollapsibleList(containerId, exs, (ex, i) => renderExItem(containerId, ex, i), { detailClass: 'visible' });
  list.render();
  exLists.set(containerId, list);
}

function toggleEx(cid, i) {
  exLists.get(cid)?.toggle(`row-${cid}-${i}`, `det-${cid}-${i}`);
}

const mcLists = new Map();

function renderMcItem(groupId, m, i) {
  return `
    <div class="muscle-card" id="mc-${groupId}-${i}" data-action="toggle-mc" data-group="${groupId}" data-idx="${i}">
      <div class="mc-header">
        <div class="mc-color" style="background:${m.color}"></div>
        <div class="mc-meta">
          <div class="mc-name">${m.name}</div>
          <div class="mc-sub">${m.role}</div>
        </div>
        <span style="font-size:11px;color:var(--text3)">▼</span>
      </div>
      <div class="mc-body" id="mcb-${groupId}-${i}">
        <p>${m.why}</p>
        <div class="ev-box"><div class="ev-src">Evidencia</div>${m.evidence}</div>
      </div>
    </div>
  `;
}

function buildMusculos(groupId, muscles) {
  const list = new CollapsibleList(`mus-${groupId}`, muscles, (m, i) => renderMcItem(groupId, m, i), { toggleMode: 'style' });
  list.render();
  mcLists.set(groupId, list);
}

function toggleMc(gid, i) {
  mcLists.get(gid)?.toggle(`mc-${gid}-${i}`, `mcb-${gid}-${i}`);
}

const testLists = new Map();

function renderTestItem(dayId, t, idx) {
  return `
    <div class="test-block" id="tb-${dayId}-${idx}">
      <div class="tb-header" data-action="toggle-test" data-day="${dayId}" data-idx="${idx}">
        <div class="tb-num">${t.num}</div>
        <div class="tb-meta">
          <div class="tb-name">${t.name}</div>
          <div class="tb-sub">${t.sub}</div>
        </div>
        <span class="tb-badge">${t.badge}</span>
        <span class="tb-chev">▼</span>
      </div>
      <div class="tb-body" id="tbb-${dayId}-${idx}">
        <div class="note-box" style="margin-bottom:10px">${t.note}</div>
        <div class="sec-lbl">Series</div>
        <table class="series-tbl">
          <tr>${t.series[0].length===4?'<th>Serie</th><th>Peso / Zona</th><th>Reps</th><th>Pausa</th>':'<th>Punto</th><th>Zona</th><th>Dónde</th><th>—</th>'}</tr>
          ${t.series.map(s=>`<tr class="${s[0].includes('🎯')?'target':''}"><td>${s[0]}</td><td>${s[1]}</td><td>${s[2]}</td><td>${s[3]}</td></tr>`).join('')}
        </table>
        <div class="sec-lbl" style="margin-top:12px">Técnica</div>
        <div class="chips">${t.cues.map(c=>`<span class="chip ${c.g?'g':'r'}">${c.g?'✓':'✗'} ${c.t}</span>`).join('')}</div>
      </div>
    </div>
  `;
}

function buildTests(dayId, tests) {
  const list = new CollapsibleList(`tests-${dayId}`, tests, (t, idx) => renderTestItem(dayId, t, idx), { toggleMode: 'style' });
  list.render();
  testLists.set(dayId, list);
}

function toggleTest(dayId, idx) {
  testLists.get(dayId)?.toggle(`tb-${dayId}-${idx}`, `tbb-${dayId}-${idx}`);
}

function formatStatValue(value, { decimals = 0, suffix = '', fallback = '—' } = {}) {
  if (value === null || value === undefined || value === '' || Number.isNaN(Number(value))) return fallback;
  return `${Number(value).toLocaleString('es-ES', { maximumFractionDigits: decimals, minimumFractionDigits: decimals })}${suffix}`;
}

function getCompletedTrainingWeeks() {
  return Object.keys(localStorage)
    .filter(k => k.startsWith('tracker-w'))
    .map(k => k.replace('tracker-w', ''))
    .filter(k => /^\d+$/.test(k))
    .sort((a, b) => Number(a) - Number(b));
}

function getCompletedTrainingCount() {
  return getCompletedTrainingWeeks().reduce((total, week) => {
    const saved = storage.get(`tracker-w${week}`) || {};
    const completed = Object.keys(saved)
      .filter(k => /^\d+$/.test(k))
      .filter(k => saved[k] === 'done').length;
    return total + completed;
  }, 0);
}

function getCompletedGymTonnage() {
  const totals = { lower: 0, upper: 0 };
  getCompletedTrainingWeeks().forEach(week => {
    const saved = storage.get(`tracker-w${week}`) || {};
    Object.keys(saved)
      .filter(k => /^\d+$/.test(k))
      .forEach(idx => {
        if (saved[idx] !== 'done') return;
        const session = trackerSessions[Number(idx)];
        if (!session || session.type !== 'gym') return;
        const label = session.name.toLowerCase().includes('upper') ? 'upper' : 'lower';
        for (let ei = 0; ei < session.exs.length; ei += 1) {
          const sets = parseInt(saved[`gym-${idx}`]?.[`s${ei}`], 10) || 0;
          const reps = parseInt(saved[`gym-${idx}`]?.[`r${ei}`], 10) || 0;
          const kg = parseFloat(saved[`gym-${idx}`]?.[`k${ei}`]) || 0;
          totals[label] += sets * reps * kg;
        }
      });
  });
  return totals;
}

function getDashboardMetrics() {
  const bodySaved = storage.get('body-results') || {};
  const watchSaved = storage.get('watch-data') || {};
  const nutritionSaved = storage.get('nutrition-today') || [];
  const caloriesConsumed = nutritionSaved.reduce((sum, meal) => sum + (parseFloat(meal.kcal) || 0), 0);

  return {
    bodyFat: parseFloat(bodySaved['b-grasa']),
    weight: parseFloat(bodySaved['b-peso']),
    caloriesBurned: parseFloat(watchSaved['calories-burned']),
    caloriesConsumed,
    vo2: parseFloat(watchSaved.vo2),
    completedSessions: getCompletedTrainingCount(),
    tonnage: getCompletedGymTonnage(),
    currentWeek
  };
}

function buildDashboard() {
  const container = document.getElementById('dashboard-stats');
  if (!container) return;
  const metrics = getDashboardMetrics();
  const cards = [
    { label:'Grasa corporal', value: formatStatValue(metrics.bodyFat, { decimals: 1, suffix: '%' }), sub:'Último día medido' },
    { label:'Peso', value: formatStatValue(metrics.weight, { decimals: 1, suffix: ' kg' }), sub:'Último registro' },
    { label:'Calorías quemadas', value: formatStatValue(metrics.caloriesBurned, { decimals: 0, suffix: ' kcal' }), sub:'Desde smartwatch' },
    { label:'Calorías consumidas', value: formatStatValue(metrics.caloriesConsumed, { decimals: 0, suffix: ' kcal' }), sub:'Desde nutrición' },
    { label:'Lower tonnage', value: formatStatValue(metrics.tonnage.lower, { decimals: 0, suffix: ' kg' }), sub:'Entrenos completados' },
    { label:'Upper tonnage', value: formatStatValue(metrics.tonnage.upper, { decimals: 0, suffix: ' kg' }), sub:'Entrenos completados' },
    { label:'VO2 max', value: formatStatValue(metrics.vo2, { decimals: 1, suffix: ' ml/kg/min' }), sub:'Último registro' },
    { label:'Semana actual', value: `Sem ${metrics.currentWeek}`, sub:'Del tracker semanal' }
  ];

  container.innerHTML = cards.map(card => `
    <div class="stat-card">
      <div class="stat-val">${card.value}</div>
      <div class="stat-label">${card.label}</div>
      <div class="stat-sublabel">${card.sub}</div>
    </div>
  `).join('');
}

async function buildTracker() {
  const trackerSessions = await trackerSessionsRepo.get();
  const c = document.getElementById('tracker-sessions');
  const key = `tracker-w${currentWeek}`;
  const saved = storage.get(key) || {};

  c.innerHTML = trackerSessions.map((s, i) => {
    const state = saved[i] || 'pending';
    const isGym = s.type === 'gym';
    const gymData = isGym ? (saved[`gym-${i}`] || {}) : {};
    return `
    <div class="session-card">
      <div class="session-head">
        <span class="session-day">${s.day}</span>
        <span class="session-name">${s.name}</span>
        <div class="session-status">
          <button class="status-btn ${state==='done'?'done':''}" data-action="set-status" data-idx="${i}" data-status="done">${state==='done'?'✓ Hecho':'Marcar hecho'}</button>
          <button class="status-btn ${state==='skip'?'skip':''}" style="margin-left:4px" data-action="set-status" data-idx="${i}" data-status="skip">${state==='skip'?'— Skip':'Skip'}</button>
        </div>
      </div>
      ${isGym ? `
      <div class="session-exs">
        <div class="session-ex-row" style="font-size:10px;color:var(--text3);border-bottom:1px solid var(--border);padding-bottom:6px;">
          <span>Ejercicio</span><span style="text-align:center">Series</span><span style="text-align:center">Reps</span><span style="text-align:center">Kg</span>
        </div>
        ${s.exs.map((ex, ei) => `
        <div class="session-ex-row">
          <span class="sex-name">${ex}</span>
          <input class="sex-input" type="number" placeholder="—" value="${gymData[`s${ei}`]||''}" data-onchange="save-gym" data-si="${i}" data-ei="${ei}" data-type="s" min="0">
          <input class="sex-input" type="number" placeholder="—" value="${gymData[`r${ei}`]||''}" data-onchange="save-gym" data-si="${i}" data-ei="${ei}" data-type="r" min="0">
          <input class="sex-input" type="number" placeholder="—" value="${gymData[`k${ei}`]||''}" data-onchange="save-gym" data-si="${i}" data-ei="${ei}" data-type="k" min="0">
        </div>`).join('')}
      </div>` : `
      <div class="session-exs">
        ${s.exs.map(ex=>`<div style="padding:5px 0;border-bottom:1px solid var(--border);font-size:12px;color:var(--text2)">${ex}</div>`).join('')}
      </div>`}
    </div>`;
  }).join('');
  buildDashboard();
}

function setStatus(i, st) {
  const key = `tracker-w${currentWeek}`;
  const saved = storage.get(key) || {};
  saved[i] = saved[i] === st ? 'pending' : st;
  storage.set(key, saved);
  buildTracker();
  buildDashboard();
}

function saveGym(si, ei, type, val) {
  const key = `tracker-w${currentWeek}`;
  const saved = storage.get(key) || {};
  if (!saved[`gym-${si}`]) saved[`gym-${si}`] = {};
  saved[`gym-${si}`][`${type}${ei}`] = val;
  storage.set(key, saved);
  buildDashboard();
}

function changeWeek(dir) {
  currentWeek += dir;
  document.getElementById('week-label').textContent = `Semana ${currentWeek}`;
  document.getElementById('phase-badge').textContent = currentWeek < 1 ? 'Semana 0 · Tests' : `Semana ${currentWeek} · ${currentWeek <= 4 ? 'Fase 1' : currentWeek <= 8 ? 'Fase 2' : 'Fase 3'}`;
  buildTracker();
  buildDashboard();
}

async function buildProgress() {
  const [testResultFields, bodyFields] = await Promise.all([testResultFieldsRepo.get(), bodyFieldsRepo.get()]);
  const testGrid = document.getElementById('test-results-grid');
  const bodyGrid = document.getElementById('body-results-grid');
  const saved = storage.get('test-results') || {};
  const bodySaved = storage.get('body-results') || {};

  testGrid.innerHTML = testResultFields.map(f => `
    <div class="test-result-card">
      <div class="tr-label">${f.label}</div>
      <input class="tr-input" type="number" value="${saved[f.key]||''}" placeholder="—" data-onchange="save-test-result" data-key="${f.key}">
      <div class="tr-date" style="margin-top:2px">${f.unit} · Sem 0</div>
    </div>
  `).join('');

  bodyGrid.innerHTML = bodyFields.map(f => `
    <div class="test-result-card">
      <div class="tr-label">${f.label}</div>
      <input class="tr-input" type="number" value="${bodySaved[f.key]||''}" placeholder="—" data-onchange="save-body-result" data-key="${f.key}">
      <div class="tr-date" style="margin-top:2px">${f.unit}</div>
    </div>
  `).join('');

  buildCharts();
  buildDashboard();
}

function saveTestResult(key, val) {
  const saved = storage.get('test-results') || {};
  saved[key] = parseFloat(val) || null;
  storage.set('test-results', saved);
  buildCharts();
  buildDashboard();
}

function saveBodyResult(key, val) {
  const saved = storage.get('body-results') || {};
  saved[key] = parseFloat(val) || null;
  storage.set('body-results', saved);
  buildDashboard();
}

function buildCharts() {
  const labels = ['Sem 0','Sem 6','Sem 12','Sem 18','Sem 24'];
  const saved = storage.get('chart-data') || {};
  buildBarChart('chart-deadlift', labels, saved.dl || [0,0,0,0,0], 'kg', '#534AB7');
  buildBarChart('chart-pullups', labels, saved.pu || [10,0,0,0,0], 'reps', '#0F6E56');
  buildBarChart('chart-cooper', labels, saved.coop || [0,0,0,0,0], 'm', '#E6A829');
}

function buildBarChart(containerId, labels, values, unit, color) {
  const c = document.getElementById(containerId);
  if (!c) return;
  const max = Math.max(...values, 1);
  c.innerHTML = labels.map((l, i) => {
    const h = Math.round((values[i]/max)*72);
    return `<div class="bar-col">
      <div class="bar-val">${values[i]||'—'}</div>
      <div class="bar" style="height:${h}px;background:${i===values.filter(v=>v>0).length-1?'var(--sun)':color}"></div>
      <div class="bar-label">${l}</div>
    </div>`;
  }).join('');
}

async function buildWatchGrid() {
  const watchMetrics = await watchMetricsRepo.get();
  const saved = storage.get('watch-data') || {};
  const c = document.getElementById('watch-grid');
  c.innerHTML = watchMetrics.map(m => {
    const val = saved[m.key] || '';
    const adv = val ? m.advice(parseFloat(val)) : null;
    return `
    <div class="watch-metric">
      <div class="wm-icon">${m.icon}</div>
      <input class="wm-input" type="number" value="${val}" placeholder="—" data-onchange="save-watch" data-key="${m.key}">
      <div class="wm-unit">${m.unit}</div>
      <div class="wm-label">${m.label}</div>
      ${adv ? `<div class="wm-status ${adv.cls}">${adv.txt}</div>` : `<div class="wm-unit" style="margin-top:4px">Bueno: ${m.good}</div>`}
    </div>`;
  }).join('');
  updateHrvAdvice(saved);
}

function saveWatch(key, val) {
  const saved = storage.get('watch-data') || {};
  saved[key] = parseFloat(val) || null;
  storage.set('watch-data', saved);
  buildWatchGrid();
  buildDashboard();
}

function updateHrvAdvice(saved) {
  const hrv = saved.hrv || 0;
  const bat = saved.battery || 0;
  const sleep = saved.sleep || 0;
  const adv = document.getElementById('hrv-advice');
  if (!hrv && !bat) { adv.innerHTML = 'Ingresa tu HRV y Body Battery arriba para recibir recomendación de carga del día.'; return; }
  const score = (hrv>50?3:hrv>35?2:1) + (bat>70?3:bat>40?2:1) + (sleep>=7.5?3:sleep>=6.5?2:1);
  let msg, color;
  if (score >= 8) { msg = '<strong>Día verde ✓</strong> — Todas las señales son positivas. Entrena con intensidad normal o ligeramente aumentada. Buena sesión para intentar un PR.'; color='#7FC99A'; }
  else if (score >= 5) { msg = '<strong>Día amarillo ⚡</strong> — Recuperación moderada. Completa el entrenamiento planificado pero no fuerces más allá del RPE objetivo. Prioriza la técnica sobre el peso.'; color='var(--sun)'; }
  else { msg = '<strong>Día rojo ⚠️</strong> — Recuperación baja. Reemplaza el entrenamiento de fuerza por movilidad o yoga. Si debes entrenar, reduce el volumen un 30% y el peso un 20%.'; color='var(--coral)'; }
  adv.innerHTML = `<span style="color:${color}">${msg}</span>`;
}

function buildSleepBars() {
  const saved = storage.get('sleep-data') || { deep:90, rem:80, light:120, awake:20 };
  const total = saved.deep + saved.rem + saved.light + saved.awake;
  const phases = [
    { name:'Sueño profundo', key:'deep', color:'#534AB7' },
    { name:'REM', key:'rem', color:'#0F6E56' },
    { name:'Ligero', key:'light', color:'#1A6B8A' },
    { name:'Despierto', key:'awake', color:'#D95B3A' }
  ];
  const c = document.getElementById('sleep-bars');
  c.innerHTML = phases.map(p => `
    <div class="sleep-row">
      <div class="sleep-phase">${p.name}</div>
      <div class="sleep-bar-bg">
        <div class="sleep-bar-fill" style="width:${Math.round((saved[p.key]/total)*100)}%;background:${p.color}"></div>
      </div>
      <input class="sex-input" style="width:60px;font-size:11px" type="number" value="${saved[p.key]}" placeholder="min" data-onchange="save-sleep" data-key="${p.key}">
    </div>
  `).join('');
}

function saveSleep(key, val) {
  const saved = storage.get('sleep-data') || {};
  saved[key] = parseInt(val) || 0;
  storage.set('sleep-data', saved);
  buildSleepBars();
}

// ─── NUTRICIÓN ────────────────────────────────
function buildMacroRings() {
  const c = document.getElementById('macro-rings');
  const macros = [
    { name:'Proteína', val:150, max:150, unit:'g', color:'#534AB7' },
    { name:'Carbohidratos', val:250, max:250, unit:'g', color:'#E6A829' },
    { name:'Grasas', val:70, max:70, unit:'g', color:'#0F6E56' },
    { name:'Calorías', val:2200, max:2200, unit:'kcal', color:'#D95B3A' }
  ];
  c.innerHTML = macros.map(m => {
    const pct = Math.min(m.val/m.max, 1);
    const r = 28; const circ = 2*Math.PI*r;
    const dash = pct*circ;
    return `<div class="macro-ring">
      <svg class="ring-svg" viewBox="0 0 70 70">
        <circle class="ring-bg" cx="35" cy="35" r="${r}"/>
        <circle class="ring-fill" cx="35" cy="35" r="${r}" stroke="${m.color}"
          stroke-dasharray="${dash} ${circ}" stroke-dashoffset="${circ/4}" transform="rotate(-90 35 35)"/>
      </svg>
      <div class="ring-val">${m.val}</div>
      <div class="ring-label">${m.name} (${m.unit})</div>
    </div>`;
  }).join('');
}

async function buildNutritionLog() {
  const c = document.getElementById('nutrition-log');
  const saved = storage.get('nutrition-today') || await nutritionLogRepo.get();
  c.innerHTML = saved.map((meal, i) => `
    <div class="meal-card">
      <div class="meal-head" data-action="toggle-meal" data-idx="${i}">
        <span class="meal-name">${meal.name}</span>
        <span class="meal-kcal">${meal.kcal} kcal</span>
        <span style="font-size:11px;color:var(--text3);margin-left:8px">▼</span>
      </div>
      <div class="meal-body" id="meal-${i}">
        ${meal.foods.map(f=>`
          <div class="food-row">
            <span class="food-name">${f.name}</span>
            <div class="food-macros">
              <span class="food-macro">P: ${f.p}g</span>
              <span class="food-macro">C: ${f.c}g</span>
              <span class="food-macro">G: ${f.f}g</span>
            </div>
          </div>`).join('')}
      </div>
    </div>
  `).join('');
}

function toggleMeal(i) {
  const body = document.getElementById(`meal-${i}`);
  body.classList.toggle('open');
}

function addMeal() {
  const name = prompt('Nombre de la comida:');
  if (!name) return;
  const saved = storage.get('nutrition-today') || [];
  saved.push({ name, kcal:0, foods:[] });
  storage.set('nutrition-today', saved);
  buildNutritionLog();
  buildDashboard();
}

async function buildSupplements() {
  const supplements = await supplementsRepo.get();
  const c = document.getElementById('supplement-grid');
  const saved = storage.get('supps-today') || {};
  c.innerHTML = supplements.map(s => `
    <div class="supp-card">
      <div class="supp-name">${s.name}</div>
      <div class="supp-dose">${s.dose}</div>
      <div class="supp-time">${s.time}</div>
      <div class="supp-check" data-action="toggle-supp" data-key="${s.key}">
        <div class="check-box ${saved[s.key]?'checked':''}" id="supp-${s.key}">${saved[s.key]?'✓':''}</div>
        <span>${saved[s.key]?'Tomado':'Marcar tomado'}</span>
      </div>
    </div>
  `).join('');
}

function toggleSupp(key) {
  const saved = storage.get('supps-today') || {};
  saved[key] = !saved[key];
  storage.set('supps-today', saved);
  buildSupplements();
}

// ─── NAVIGATION ──────────────────────────────
const pageMeta = {
  dashboard: { title:'Dashboard', sub:'Vista general del programa' },
  rutinas: { title:'Rutinas', sub:'4 rutinas del ciclo de entrenamiento' },
  musculos: { title:'Grupos musculares', sub:'Anatomía del programa con evidencia científica' },
  tests: { title:'Tests semana 0', sub:'Protocolo de evaluación baseline' },
  tracker: { title:'Tracker semanal', sub:'Registro de sesiones y pesos' },
  progreso: { title:'Progreso', sub:'Evolución de tests y medidas corporales' },
  smartwatch: { title:'Smartwatch', sub:'Datos del Huawei Band 11 Pro' },
  nutricion: { title:'Nutrición', sub:'Macros, comidas y suplementos diarios' }
};

// Each page's render logic wrapped in a PageController: `once: true` builds
// a page a single time (rutinas/musculos/tests/dashboard, matching the old
// eager build-at-startup behavior); `once: false` rebuilds every visit
// (tracker/progreso/smartwatch/nutricion, since they re-read localStorage).
class DashboardController extends PageController {
  constructor() { super({ once: false }); }
  async render() { buildDashboard(); }
}

class RutinasController extends PageController {
  constructor() { super({ once: true }); }
  async render() {
    const exercises = await exercisesRepo.get();
    ['r1','r2','r3','r4'].forEach(r => {
      buildExRows(`ex-${r}-warm`, exercises[r].warm);
      buildExRows(`ex-${r}-main`, exercises[r].main);
      buildExRows(`ex-${r}-fin`, exercises[r].fin);
    });
  }
}

class MusculosController extends PageController {
  constructor() { super({ once: true }); }
  async render() {
    const musclesData = await musclesRepo.get();
    Object.keys(musclesData).forEach(g => buildMusculos(g, musclesData[g]));
  }
}

class TestsController extends PageController {
  constructor() { super({ once: true }); }
  async render() {
    const testsData = await testsRepo.get();
    Object.keys(testsData).forEach(d => buildTests(d, testsData[d]));
  }
}

class TrackerController extends PageController {
  constructor() { super({ once: false }); }
  async render() { await buildTracker(); }
}

class ProgresoController extends PageController {
  constructor() { super({ once: false }); }
  async render() { await buildProgress(); }
}

class SmartwatchController extends PageController {
  constructor() { super({ once: false }); }
  async render() { await buildWatchGrid(); buildSleepBars(); }
}

class NutricionController extends PageController {
  constructor() { super({ once: false }); }
  async render() { buildMacroRings(); await buildNutritionLog(); await buildSupplements(); }
}

const pageControllers = {
  dashboard: new DashboardController(),
  rutinas: new RutinasController(),
  musculos: new MusculosController(),
  tests: new TestsController(),
  tracker: new TrackerController(),
  progreso: new ProgresoController(),
  smartwatch: new SmartwatchController(),
  nutricion: new NutricionController()
};

const router = new Router(pageControllers, pageMeta);

const rutinaTabs = new TabGroup('page-rutinas');
const musculosTabs = new TabGroup('page-musculos');
const testsTabs = new TabGroup('page-tests');

function showRutina(id, btn) {
  rutinaTabs.activate(`rut-${id}`, btn);
}

function showMusculos(id, btn) {
  musculosTabs.activate(`mus-${id}`, btn);
}

function showTests(id, btn) {
  testsTabs.activate(`tests-${id}`, btn);
}

// ─── DATE ─────────────────────────────────────
function updateDate() {
  const now = new Date();
  const days = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
  const months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
  document.getElementById('date-display').textContent = `${days[now.getDay()]} ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
}

// ─── EVENT DELEGATION ─────────────────────────
// type="module" scripts don't expose top-level functions on window, so every
// inline onclick/onchange from the old markup is replaced by data-action /
// data-onchange attributes handled here via delegation.
const clickActions = {
  'show-page': el => router.showPage(el.dataset.page),
  'show-rutina': el => showRutina(el.dataset.rutina, el),
  'show-musculos': el => showMusculos(el.dataset.musculos, el),
  'show-tests': el => showTests(el.dataset.tests, el),
  'change-week': el => changeWeek(parseInt(el.dataset.dir, 10)),
  'add-meal': () => addMeal(),
  'toggle-ex': el => toggleEx(el.dataset.container, parseInt(el.dataset.idx, 10)),
  'toggle-mc': el => toggleMc(el.dataset.group, parseInt(el.dataset.idx, 10)),
  'toggle-test': el => toggleTest(el.dataset.day, parseInt(el.dataset.idx, 10)),
  'set-status': el => setStatus(parseInt(el.dataset.idx, 10), el.dataset.status),
  'toggle-meal': el => toggleMeal(parseInt(el.dataset.idx, 10)),
  'toggle-supp': el => toggleSupp(el.dataset.key)
};

const changeActions = {
  'save-gym': el => saveGym(parseInt(el.dataset.si, 10), parseInt(el.dataset.ei, 10), el.dataset.type, el.value),
  'save-test-result': el => saveTestResult(el.dataset.key, el.value),
  'save-body-result': el => saveBodyResult(el.dataset.key, el.value),
  'save-watch': el => saveWatch(el.dataset.key, el.value),
  'save-sleep': el => saveSleep(el.dataset.key, el.value)
};

document.addEventListener('click', e => {
  const el = e.target.closest('[data-action]');
  if (!el) return;
  const action = clickActions[el.dataset.action];
  if (action) action(el);
});

document.addEventListener('change', e => {
  const el = e.target.closest('[data-onchange]');
  if (!el) return;
  const action = changeActions[el.dataset.onchange];
  if (action) action(el);
});

// ─── INIT ─────────────────────────────────────
async function init() {
  updateDate();
  await pageControllers.dashboard.activate();
  await pageControllers.rutinas.activate();
  await pageControllers.musculos.activate();
  await pageControllers.tests.activate();
  await pageControllers.tracker.activate();
}

init();
