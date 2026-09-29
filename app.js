(function(){
const useState=React.useState,useEffect=React.useEffect,useRef=React.useRef,useCallback=React.useCallback;
const SCRIPT_URL="https://script.google.com/macros/s/AKfycbzs1NZtl1mpTczBNKjC1oPniGU7Z8b-MGkQvnHtqIr00LexI6_t8AzyI_SUIS6hTongow/exec";
window.storage={get:async function(k){try{const r=await fetch(SCRIPT_URL+"?key="+encodeURIComponent(k)+"&t="+Date.now());const d=await r.json();return(!d||d.error)?null:d;}catch(e){return null;}},set:async function(k,v){try{const r=await fetch(SCRIPT_URL,{method:"POST",headers:{"Content-Type":"text/plain"},body:JSON.stringify({action:"set",key:k,value:v})});const d=await r.json();return(d&&d.error)?null:d;}catch(e){return null;}},delete:async function(k){try{const r=await fetch(SCRIPT_URL,{method:"POST",headers:{"Content-Type":"text/plain"},body:JSON.stringify({action:"delete",key:k})});return await r.json();}catch(e){return null;}},list:async function(p){try{const r=await fetch(SCRIPT_URL,{method:"POST",headers:{"Content-Type":"text/plain"},body:JSON.stringify({action:"list",prefix:p})});return await r.json();}catch(e){return{keys:[]};}}};const TODAY = new Date();
TODAY.setHours(0, 0, 0, 0);
const LOGO_B64 = "./logo.png";
const LOGIN_IMG = "data:image/png;base64,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";
function addDays(d, n) {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r.toISOString().split('T')[0];
}
function parseD(s) {
  if (!s) return null;
  const d = new Date(s + 'T00:00:00');
  return isNaN(d) ? null : d;
}
function fmtD(s) {
  if (!s) return '';
  const d = parseD(s);
  if (!d) return '';
  return d.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}
function fmtDt(ts) {
  if (!ts) return '';
  const d = new Date(ts);
  return d.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }) + " " + d.toLocaleTimeString('es-AR', {
    hour: '2-digit',
    minute: '2-digit'
  });
}
function isOverdue(t) {
  if (t.done || !t.dueDate) return false;
  return parseD(t.dueDate) < TODAY;
}
function isDueSoon(t) {
  if (t.done || !t.dueDate) return false;
  const d = parseD(t.dueDate);
  if (!d) return false;
  const diff = (d - TODAY) / (1000 * 60 * 60 * 24);
  return diff >= 0 && diff <= 3;
}
const DEF_MODS = [{
  id: "onboarding",
  name: "Onboarding",
  icon: "⛺",
  active: true,
  color: "#4ECDC4",
  phase: "Campamento Base",
  tasks: [{
    id: "ob1",
    label: "Bienvenida y recorrido",
    done: false,
    xp: 50,
    dueDate: addDays(TODAY, 2),
    minutes: [],
    comments: []
  }, {
    id: "ob2",
    label: "Configurar accesos",
    done: false,
    xp: 50,
    dueDate: addDays(TODAY, 5),
    minutes: [],
    comments: []
  }, {
    id: "ob3",
    label: "Reunión con el equipo",
    done: false,
    xp: 75,
    dueDate: addDays(TODAY, 7),
    minutes: [],
    comments: []
  }, {
    id: "ob4",
    label: "Entrega de materiales",
    done: false,
    xp: 50,
    dueDate: addDays(TODAY, 10),
    minutes: [],
    comments: []
  }, {
    id: "ob5",
    label: "Primera semana",
    done: false,
    xp: 100,
    dueDate: addDays(TODAY, 14),
    minutes: [],
    comments: []
  }]
}, {
  id: "carrera",
  name: "Plan de Carrera",
  icon: "🏠",
  active: true,
  color: "#FFD700",
  phase: "Barrio Residencial",
  tasks: [{
    id: "ca1",
    label: "Definición de rol",
    done: false,
    xp: 80,
    dueDate: addDays(TODAY, -3),
    minutes: [],
    comments: []
  }, {
    id: "ca2",
    label: "Objetivos del período",
    done: false,
    xp: 80,
    dueDate: addDays(TODAY, 8),
    minutes: [],
    comments: []
  }, {
    id: "ca3",
    label: "Mapa de competencias",
    done: false,
    xp: 100,
    dueDate: addDays(TODAY, 20),
    minutes: [],
    comments: []
  }, {
    id: "ca4",
    label: "Plan de desarrollo",
    done: false,
    xp: 120,
    dueDate: addDays(TODAY, 30),
    minutes: [],
    comments: []
  }]
}, {
  id: "capacitacion",
  name: "Capacitación",
  icon: "🏫",
  active: true,
  color: "#C77DFF",
  phase: "Distrito Educativo",
  tasks: [{
    id: "cp1",
    label: "Diagnóstico de necesidades",
    done: false,
    xp: 60,
    dueDate: addDays(TODAY, 5),
    minutes: [],
    comments: []
  }, {
    id: "cp2",
    label: "Cursos completados",
    done: false,
    xp: 100,
    dueDate: addDays(TODAY, 25),
    minutes: [],
    comments: []
  }, {
    id: "cp3",
    label: "Certificación obtenida",
    done: false,
    xp: 150,
    dueDate: addDays(TODAY, 45),
    minutes: [],
    comments: []
  }, {
    id: "cp4",
    label: "Transferencia al puesto",
    done: false,
    xp: 80,
    dueDate: addDays(TODAY, 60),
    minutes: [],
    comments: []
  }]
}, {
  id: "evaluacion",
  name: "Evaluación",
  icon: "🏢",
  active: true,
  color: "#FF6B35",
  phase: "Centro Comercial",
  tasks: [{
    id: "ev1",
    label: "Autoevaluación",
    done: false,
    xp: 80,
    dueDate: addDays(TODAY, 12),
    minutes: [],
    comments: []
  }, {
    id: "ev2",
    label: "Evaluación del líder",
    done: false,
    xp: 80,
    dueDate: addDays(TODAY, 18),
    minutes: [],
    comments: []
  }, {
    id: "ev3",
    label: "Feedback 360",
    done: false,
    xp: 100,
    dueDate: addDays(TODAY, 25),
    minutes: [],
    comments: []
  }, {
    id: "ev4",
    label: "Reunión de cierre",
    done: false,
    xp: 120,
    dueDate: addDays(TODAY, 35),
    minutes: [],
    comments: []
  }]
}, {
  id: "mentorias",
  name: "Mentorías",
  icon: "📚",
  active: false,
  color: "#A8E6CF",
  phase: "Biblioteca",
  tasks: [{
    id: "me1",
    label: "Asignación mentor-mentee",
    done: false,
    xp: 60,
    dueDate: null,
    minutes: [],
    comments: []
  }, {
    id: "me2",
    label: "Primer encuentro",
    done: false,
    xp: 80,
    dueDate: null,
    minutes: [],
    comments: []
  }, {
    id: "me3",
    label: "Seguimiento x3",
    done: false,
    xp: 120,
    dueDate: null,
    minutes: [],
    comments: []
  }, {
    id: "me4",
    label: "Cierre del programa",
    done: false,
    xp: 100,
    dueDate: null,
    minutes: [],
    comments: []
  }]
}, {
  id: "bienestar",
  name: "Bienestar",
  icon: "🌳",
  active: false,
  color: "#52B788",
  phase: "Parque Central",
  tasks: [{
    id: "bi1",
    label: "Encuesta de clima",
    done: false,
    xp: 60,
    dueDate: null,
    minutes: [],
    comments: []
  }, {
    id: "bi2",
    label: "Plan de beneficios",
    done: false,
    xp: 70,
    dueDate: null,
    minutes: [],
    comments: []
  }, {
    id: "bi3",
    label: "Actividad de equipo",
    done: false,
    xp: 100,
    dueDate: null,
    minutes: [],
    comments: []
  }]
}, {
  id: "sucesion",
  name: "Sucesión",
  icon: "🏛️",
  active: false,
  color: "#FF6B35",
  phase: "Palacio Municipal",
  tasks: [{
    id: "su1",
    label: "Puestos clave",
    done: false,
    xp: 100,
    dueDate: null,
    minutes: [],
    comments: []
  }, {
    id: "su2",
    label: "Mapeo sucesores",
    done: false,
    xp: 120,
    dueDate: null,
    minutes: [],
    comments: []
  }, {
    id: "su3",
    label: "Plan aceleración",
    done: false,
    xp: 140,
    dueDate: null,
    minutes: [],
    comments: []
  }, {
    id: "su4",
    label: "Review directivos",
    done: false,
    xp: 100,
    dueDate: null,
    minutes: [],
    comments: []
  }]
}, {
  id: "feedback",
  name: "Cultura Feedback",
  icon: "💬",
  active: false,
  color: "#4488FF",
  phase: "Plaza Pública",
  tasks: [{
    id: "fe1",
    label: "Taller de feedback",
    done: false,
    xp: 80,
    dueDate: null,
    minutes: [],
    comments: []
  }, {
    id: "fe2",
    label: "Ciclo de check-ins",
    done: false,
    xp: 80,
    dueDate: null,
    minutes: [],
    comments: []
  }, {
    id: "fe3",
    label: "Dashboard activo",
    done: false,
    xp: 100,
    dueDate: null,
    minutes: [],
    comments: []
  }]
}];
const DEF_TEAM = [{
  id: "u1",
  name: "Valentina Ríos",
  role: "Product Lead",
  emoji: "👩‍💻",
  level: 8,
  xp: 4100,
  skills: ["Liderazgo", "UX"],
  status: "active",
  email: "",
  pin: "1234"
}, {
  id: "u2",
  name: "Martín Fuentes",
  role: "Ing. Full Stack",
  emoji: "👨‍🔬",
  level: 6,
  xp: 2900,
  skills: ["React", "Python"],
  status: "away",
  email: "",
  pin: "1234"
}, {
  id: "u3",
  name: "Lucía Benítez",
  role: "Data Lead",
  emoji: "🧠",
  level: 10,
  xp: 5500,
  skills: ["ML", "SQL"],
  status: "busy",
  email: "",
  pin: "1234"
}];
const EMOJIS = ["👩‍💻", "👨‍💼", "🧠", "👩‍🔬", "👨‍🎨", "👩‍🏫", "🦸", "🧑‍🚀", "👩‍🔧", "🧑‍💻", "🎯", "⚡", "🦊", "🐉", "🌟"];
const SCOL = {
  active: "#A8E6CF",
  away: "#FFD700",
  busy: "#FF4757"
};
async function loadSaved() {
  try {
    const r = await window.storage.get("tc-v7");
    if (r && r.value) {
      const d = JSON.parse(r.value);
      if (d.modules && d.team) return d;
    }
  } catch (e) {}
  return null;
}
async function persist(s) {
  try {
    await window.storage.set("tc-v7", JSON.stringify({
      ...s,
      ts: Date.now()
    }));
    return true;
  } catch (e) {
    return false;
  }
}
function getDailyWeather() {
  const d = new Date();
  const seed = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  const r = n => {
    let x = Math.sin(seed * 9301 + n * 49297 + 233) * 233280;
    return x - Math.floor(x);
  };
  const types = ["clear", "clouds", "rain", "wind", "cloudy"];
  return types[Math.floor(r(1) * types.length)];
}
function CityCanvas({
  modules,
  team,
  dayMode,
  severaData = null
}) {
  const ref = useRef(null),
    tickRef = useRef(0),
    rafRef = useRef(null);
  const activeMods = modules.filter(m => m.active);
  const doneKey = activeMods.map(m => m.tasks.filter(t => t.done).length).join(",");
  const overdueKey = activeMods.map(m => m.tasks.filter(t => isOverdue(t)).length).join(",");
  const weather = getDailyWeather();
  const hardPhases = severaData ? severaData.phases || [] : [];
  const hardRoot = hardPhases.find(p => !p.belongsTo);
  const hardRootName = hardRoot?.name || "";
  const hardMods = hardPhases.filter(p => p.belongsTo === hardRootName && hardRootName !== "");
  const hardTasks = hardPhases.filter(p => p.belongsTo && p.belongsTo !== hardRootName);
  const hardDone = hardTasks.filter(t => t.isCompleted).length;
  const hardTot = hardTasks.length;
  const hardPct = hardTot ? hardDone / hardTot : hardMods.length && hardMods.every(m => m.isCompleted) ? 1 : 0;
  const hardKey = hardDone + "-" + hardTot;
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    const W = cv.width,
      H = cv.height;
    const particles = [];
    if (weather === "rain" || weather === "cloudy" || weather === "clouds") {
      for (let i = 0; i < 6; i++) particles.push({
        type: "cloud",
        x: (i * 160 + Math.random() * 60) % W,
        y: 10 + Math.random() * 40,
        w: 60 + Math.random() * 80,
        speed: .3 + Math.random() * .4,
        alpha: .7 + Math.random() * .3
      });
    }
    if (weather === "rain") {
      for (let i = 0; i < 40; i++) particles.push({
        type: "rain",
        x: Math.random() * W,
        y: Math.random() * H,
        speed: 6 + Math.random() * 4,
        angle: 0.2
      });
    }
    if (weather === "wind") {
      for (let i = 0; i < 8; i++) particles.push({
        type: "cloud",
        x: i * 120 % W,
        y: 5 + Math.random() * 50,
        w: 40 + Math.random() * 60,
        speed: 1.2 + Math.random() * .8,
        alpha: .5 + Math.random() * .3
      });
      for (let i = 0; i < 12; i++) particles.push({
        type: "wind",
        x: Math.random() * W,
        y: 20 + Math.random() * 160,
        len: 30 + Math.random() * 50,
        speed: 3 + Math.random() * 3,
        alpha: .2 + Math.random() * .3
      });
    }
    if (weather === "clear" && dayMode) {
      for (let i = 0; i < 6; i++) particles.push({
        type: "ray",
        angle: i / 6 * Math.PI * 2,
        phase: Math.random() * Math.PI * 2
      });
    }
    function fr(x, y, w, h, c) {
      ctx.fillStyle = c;
      ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
    }
    function pct(m) {
      return m.tasks.length ? m.tasks.filter(t => t.done).length / m.tasks.length : 0;
    }
    function drawCloud(x, y, w, alpha) {
      ctx.globalAlpha = alpha;
      ctx.fillStyle = dayMode ? "#e2e8f0" : "#8899AA";
      const h2 = w * 0.38;
      ctx.beginPath();
      ctx.ellipse(x + w * .5, y + h2 * .6, w * .38, h2 * .55, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(x + w * .28, y + h2 * .75, w * .26, h2 * .42, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(x + w * .72, y + h2 * .75, w * .24, h2 * .38, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.rect(x, y + h2 * .55, w, h2 * .5);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
    function drawTent(x, g, col, p, lit) {
      const s = p === 0 ? 0 : p < .25 ? 1 : p < .5 ? 2 : p < .75 ? 3 : p < 1 ? 4 : 5;
      if (!s) return;
      const cx = x + 40;
      if (s >= 1) {
        fr(x + 10, g - 8, 60, 8, col + "33");
        fr(x + 15, g - 18, 4, 10, dayMode ? "#5C6B7A" : "#2A3F58");
        fr(x + 55, g - 18, 4, 10, dayMode ? "#5C6B7A" : "#2A3F58");
        fr(x + 35, g - 22, 4, 14, dayMode ? "#5C6B7A" : "#2A3F58");
      }
      if (s >= 2) {
        ctx.fillStyle = col + "44";
        ctx.beginPath();
        ctx.moveTo(cx, g - 55);
        ctx.lineTo(x + 5, g - 5);
        ctx.lineTo(x + 75, g - 5);
        ctx.closePath();
        ctx.fill();
      }
      if (s >= 3) {
        ctx.fillStyle = col + "88";
        ctx.beginPath();
        ctx.moveTo(cx, g - 58);
        ctx.lineTo(x + 8, g - 6);
        ctx.lineTo(x + 72, g - 6);
        ctx.closePath();
        ctx.fill();
      }
      if (s >= 4) {
        ctx.fillStyle = col;
        ctx.beginPath();
        ctx.moveTo(cx, g - 62);
        ctx.lineTo(x + 6, g - 6);
        ctx.lineTo(x + 74, g - 6);
        ctx.closePath();
        ctx.fill();
        fr(cx - 1, g - 68, 2, 8, "#E8EDF2");
        fr(cx - 3, g - 70, 6, 4, col);
      }
      if (s === 5) {
        ctx.fillStyle = col;
        ctx.beginPath();
        ctx.moveTo(cx, g - 62);
        ctx.lineTo(x + 6, g - 6);
        ctx.lineTo(x + 74, g - 6);
        ctx.closePath();
        ctx.fill();
        fr(cx - 1, g - 70, 2, 10, "#E8EDF2");
        ctx.fillStyle = "#FF6B35";
        fr(cx, g - 78, 12, 8);
      }
    }
    function drawHouse(x, g, col, p, lit) {
      const s = p === 0 ? 0 : p < .25 ? 1 : p < .5 ? 2 : p < .75 ? 3 : p < 1 ? 4 : 5;
      if (!s) return;
      const wallC = dayMode ? col + "CC" : col;
      const roofC = dayMode ? col : col;
      if (s >= 1) fr(x + 5, g - 12, 70, 12, dayMode ? "#8B9DAE" : "#1A2840");
      if (s >= 3) {
        fr(x + 8, g - 50, 64, 38, wallC + "77");
        ctx.fillStyle = roofC + "66";
        ctx.beginPath();
        ctx.moveTo(x + 3, g - 50);
        ctx.lineTo(x + 40, g - 80);
        ctx.lineTo(x + 77, g - 50);
        ctx.closePath();
        ctx.fill();
      }
      if (s === 5) {
        fr(x + 8, g - 52, 64, 40, wallC);
        ctx.fillStyle = roofC;
        ctx.beginPath();
        ctx.moveTo(x + 2, g - 52);
        ctx.lineTo(x + 40, g - 86);
        ctx.lineTo(x + 78, g - 52);
        ctx.closePath();
        ctx.fill();
        fr(x + 19, g - 50, 16, 24, dayMode ? "#1a3a5c" : "#0D1117");
        ctx.fillStyle = lit ? dayMode ? "#FFF9C4" : "#FFD700BB" : dayMode ? "#b0c4d8" : "#1A2840";
        ctx.fillRect(x + 21, g - 48, 12, 20);
        fr(x + 33, g - 60, 8, 4, col);
      }
    }
    function drawSchool(x, g, col, p, lit) {
      const s = p === 0 ? 0 : p < .25 ? 1 : p < .5 ? 2 : p < .75 ? 3 : p < 1 ? 4 : 5;
      if (!s) return;
      if (s >= 3) fr(x + 5, g - 60, 70, 46, dayMode ? col + "99" : col + "66");
      if (s === 5) {
        fr(x + 5, g - 64, 70, 50, dayMode ? col + "CC" : col);
        fr(x + 36, g - 90, 8, 8, col);
        fr(x + 38, g - 94, 4, 5, dayMode ? "#334455" : "#E8EDF2");
      }
    }
    function drawOffice(x, g, col, p, lit) {
      const s = p === 0 ? 0 : p < .25 ? 1 : p < .5 ? 2 : p < .75 ? 3 : p < 1 ? 4 : 5;
      if (!s) return;
      if (s >= 2) fr(x + 8, g - 75, 64, 59, dayMode ? col + "44" : col + "22");
      if (s >= 3) fr(x + 8, g - 75, 64, 59, dayMode ? col + "88" : col + "55");
      if (s >= 4) fr(x + 8, g - 78, 64, 62, dayMode ? col + "BB" : col + "99");
      if (s === 5) {
        fr(x + 8, g - 80, 64, 64, dayMode ? col + "EE" : col);
        fr(x + 38, g - 98, 4, 8, dayMode ? "#334455" : "#E8EDF2");
      }
    }
    function drawLib(x, g, col, p, lit) {
      const s = p === 0 ? 0 : p < .25 ? 1 : p < .5 ? 2 : p < .75 ? 3 : p < 1 ? 4 : 5;
      if (!s) return;
      if (s >= 3) {
        fr(x + 6, g - 62, 68, 48, dayMode ? col + "88" : col + "66");
        ctx.fillStyle = dayMode ? col + "55" : col + "33";
        ctx.beginPath();
        ctx.arc(x + 40, g - 62, 34, Math.PI, 0);
        ctx.fill();
      }
      if (s === 5) {
        fr(x + 6, g - 66, 68, 52, dayMode ? col + "EE" : col);
        fr(x + 35, g - 76, 10, 6, col);
      }
    }
    function drawPark(x, g, col, p, lit) {
      const s = p === 0 ? 0 : p < .25 ? 1 : p < .5 ? 2 : p < .75 ? 3 : p < 1 ? 4 : 5;
      if (!s) return;
      const gc = dayMode ? "#2d8a4e" : col;
      if (s >= 3) {
        [[x + 12, g - 70], [x + 55, g - 68]].forEach(([tx, ty]) => {
          fr(tx + 4, ty + 40, 4, 30, dayMode ? "#5C3A1E" : gc + "AA");
          ctx.fillStyle = dayMode ? gc + "DD" : gc + "77";
          ctx.beginPath();
          ctx.arc(tx + 6, ty + 20, 16, 0, Math.PI * 2);
          ctx.fill();
        });
      }
      if (s === 5) {
        [[x + 12, g - 74], [x + 55, g - 72]].forEach(([tx, ty]) => {
          fr(tx + 4, ty + 44, 4, 30, dayMode ? "#5C3A1E" : "#5C3A1E");
          ctx.fillStyle = dayMode ? gc : gc;
          ctx.beginPath();
          ctx.arc(tx + 6, ty + 20, 20, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = dayMode ? "#52cc7a" : "#52B788";
          ctx.beginPath();
          ctx.arc(tx + 3, ty + 14, 13, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.fillStyle = gc;
        ctx.beginPath();
        ctx.arc(x + 40, g - 20, 10, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    function drawPalace(x, g, col, p, lit) {
      const s = p === 0 ? 0 : p < .25 ? 1 : p < .5 ? 2 : p < .75 ? 3 : p < 1 ? 4 : 5;
      if (!s) return;
      if (s >= 3) fr(x + 6, g - 72, 68, 54, dayMode ? col + "88" : col + "66");
      if (s >= 4) {
        fr(x + 6, g - 74, 68, 56, dayMode ? col + "CC" : col + "99");
      }
      if (s === 5) {
        fr(x + 6, g - 76, 68, 60, dayMode ? col + "EE" : col);
        fr(x + 28, g - 106, 24, 32, col);
        fr(x + 36, g - 114, 8, 10, dayMode ? "#334455" : "#E8EDF2");
      }
    }
    function drawPlaza(x, g, col, p, lit) {
      const s = p === 0 ? 0 : p < .25 ? 1 : p < .5 ? 2 : p < .75 ? 3 : p < 1 ? 4 : 5;
      if (!s) return;
      if (s >= 4) {
        [x + 10, x + 30, x + 50, x + 65].forEach(px2 => fr(px2, g - 58, 8, 34, dayMode ? col + "BB" : col + "AA"));
        fr(x + 3, g - 60, 74, 6, col);
      }
      if (s === 5) {
        [x + 10, x + 30, x + 50, x + 65].forEach(px2 => fr(px2, g - 62, 8, 36, dayMode ? col + "EE" : col));
        ctx.fillStyle = col;
        ctx.beginPath();
        ctx.arc(x + 40, g - 50, 9, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    const DFN = {
      onboarding: drawTent,
      carrera: drawHouse,
      capacitacion: drawSchool,
      evaluacion: drawOffice,
      mentorias: drawLib,
      bienestar: drawPark,
      sucesion: drawPalace,
      feedback: drawPlaza
    };
    function render() {
      tickRef.current++;
      const t = tickRef.current;
      ctx.clearRect(0, 0, W, H);
      const sky = ctx.createLinearGradient(0, 0, 0, H);
      if (dayMode) {
        if (weather === "rain" || weather === "cloudy") {
          sky.addColorStop(0, "#7a9bbf");
          sky.addColorStop(1, "#a8bfd0");
        } else {
          sky.addColorStop(0, "#5ba3d9");
          sky.addColorStop(.6, "#87ceeb");
          sky.addColorStop(1, "#b8dff5");
        }
      } else {
        sky.addColorStop(0, "#001a1a");
        sky.addColorStop(.6, "#002a2a");
        sky.addColorStop(1, "#003535");
      }
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, H);
      if (dayMode) {
        const sx = W - 90,
          sy = 38,
          sr = 22;
        if (weather === "clear" || weather === "wind") {
          ctx.save();
          ctx.translate(sx, sy);
          for (let i = 0; i < 8; i++) {
            ctx.rotate(Math.PI / 4);
            const al = 0.4 + 0.3 * Math.sin(t * .04 + i);
            ctx.strokeStyle = `rgba(255,220,50,${al})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(sr + 3, 0);
            ctx.lineTo(sr + 10 + Math.sin(t * .05 + i) * 3, 0);
            ctx.stroke();
          }
          ctx.restore();
        }
        ctx.fillStyle = "#FFE066";
        ctx.beginPath();
        ctx.arc(sx, sy, sr, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#FFCC00";
        ctx.beginPath();
        ctx.arc(sx - 3, sy - 3, sr - 4, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = "#FFF5C0";
        ctx.beginPath();
        ctx.arc(W - 80, 32, 19, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#001a1a";
        ctx.beginPath();
        ctx.arc(W - 71, 28, 15, 0, Math.PI * 2);
        ctx.fill();
        for (let i = 0; i < 60; i++) {
          const sx2 = (i * 137 + 11) % W,
            sy2 = (i * 83 + 5) % (H * .5),
            al = .15 + .65 * Math.abs(Math.sin(i + t * .012));
          ctx.fillStyle = `rgba(255,255,255,${al.toFixed(2)})`;
          ctx.fillRect(sx2, sy2, i % 5 === 0 ? 1.5 : .7, i % 5 === 0 ? 1.5 : .7);
        }
      }
      particles.forEach(p2 => {
        if (p2.type === "cloud") {
          p2.x = (p2.x + p2.speed) % (W + p2.w + 20) - p2.w * 0.1;
          drawCloud(p2.x, p2.y, p2.w, p2.alpha * (0.85 + 0.15 * Math.sin(t * .02 + p2.x)));
        }
        if (p2.type === "rain") {
          p2.x = (p2.x + p2.angle * p2.speed + W) % W;
          p2.y = (p2.y + p2.speed) % H;
          ctx.globalAlpha = 0.55;
          ctx.strokeStyle = dayMode ? "#6699bb" : "#4488aa";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p2.x, p2.y);
          ctx.lineTo(p2.x + p2.angle * 6, p2.y + 10);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
        if (p2.type === "wind") {
          p2.x = (p2.x + p2.speed * 2) % (W + p2.len + 20);
          ctx.globalAlpha = p2.alpha * (0.5 + 0.5 * Math.sin(t * .06 + p2.y));
          ctx.strokeStyle = dayMode ? "#88aabb" : "#336677";
          ctx.lineWidth = 1;
          ctx.setLineDash([p2.len * .4, p2.len * .2, p2.len * .2, p2.len * .2]);
          ctx.beginPath();
          ctx.moveTo(p2.x - p2.len, p2.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.globalAlpha = 1;
        }
      });
      const ground = H - 28;
      if (dayMode) {
        ctx.fillStyle = "#3a7d44";
        ctx.fillRect(0, ground, W, H - ground);
        ctx.fillStyle = "#2d6636";
        ctx.fillRect(0, ground, W, 10);
        ctx.fillStyle = "#ffffff33";
        for (let i = 0; i < W; i += 52) ctx.fillRect(i, ground + 4, 24, 2);
        ctx.fillStyle = "#2d6636";
        ctx.fillRect(0, ground - 2, W, 2);
      } else {
        ctx.fillStyle = "#001a1a";
        ctx.fillRect(0, ground, W, H - ground);
        ctx.fillStyle = "#002020";
        ctx.fillRect(0, ground, W, 14);
        ctx.fillStyle = "#004949AA";
        for (let i = 0; i < W; i += 52) ctx.fillRect(i, ground + 6, 24, 2);
        ctx.fillStyle = "#003535";
        ctx.fillRect(0, ground - 2, W, 2);
      }
      if (weather === "rain") {
        for (let i = 0; i < 8; i++) {
          const px2 = 50 + i * 110 + Math.sin(t * .03 + i) * 10;
          ctx.globalAlpha = 0.2 + 0.1 * Math.sin(t * .08 + i);
          ctx.fillStyle = dayMode ? "#aaccee" : "#224466";
          ctx.beginPath();
          ctx.ellipse(px2, ground + 8, 18, 4, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }
      if (!activeMods.length) {
        ctx.font = "9px 'Press Start 2P',monospace";
        ctx.fillStyle = dayMode ? "#557766" : "#2A3F58";
        ctx.textAlign = "center";
        ctx.fillText("ACTIVÁ MÓDULOS PARA CONSTRUIR", W / 2, H / 2);
        rafRef.current = requestAnimationFrame(render);
        return;
      }
      const margin = 14,
        slotW = Math.floor((W - margin * 2) / activeMods.length);
      const lit = dayMode ? true : t % 90 < 72;
      activeMods.forEach((mod, i) => {
        const p = pct(mod),
          bx = margin + i * slotW + Math.floor((slotW - 80) / 2);
        (DFN[mod.buildingType || mod.id] || drawOffice)(bx, ground, mod.color, p, lit);
        const od = mod.tasks.filter(t2 => isOverdue(t2)).length;
        if (od > 0) {
          ctx.fillStyle = "#FF4757";
          ctx.beginPath();
          ctx.arc(bx + 72, ground - 92, 7, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#fff";
          ctx.font = "bold 8px sans-serif";
          ctx.textAlign = "center";
          ctx.fillText("!", bx + 72, ground - 89);
        }
        ctx.font = "5px 'Press Start 2P',monospace";
        ctx.fillStyle = p > 0 ? mod.color + (dayMode ? "DD" : "BB") : dayMode ? "#446655" : "#2A3F58";
        ctx.textAlign = "center";
        ctx.fillText(mod.name.length > 12 ? mod.name.slice(0, 11) + "…" : mod.name, bx + 40, ground + 16);
        const tot = mod.tasks.length;
        for (let d = 0; d < tot; d++) {
          const dx = bx + 40 - tot * 5 + d * 10 + 5;
          ctx.fillStyle = d < mod.tasks.filter(t2 => t2.done).length ? mod.color : dayMode ? "#99bbaa" : "#2A3F58";
          ctx.beginPath();
          ctx.arc(dx, ground + 23, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      const nc = Math.min(team.length, 5);
      for (let ci = 0; ci < nc; ci++) {
        const sp = .24 + ci * .08,
          gx = (t * sp + ci * 180) % (W + 28) - 14;
        ctx.font = "13px serif";
        ctx.textAlign = "left";
        ctx.fillText(team[ci]?.emoji || "🚶", gx, ground + 2);
      }
      if (hardTot > 0) {
        const bx = W - 100;
        const p = hardPct;
        const s = p === 0 ? 0 : p < .25 ? 1 : p < .5 ? 2 : p < .75 ? 3 : p < 1 ? 4 : 5;
        const col = "#7dc9b2";
        if (s >= 1) {
          ctx.fillStyle = dayMode ? "#3a6b6b" : "#002a2a";
          ctx.fillRect(bx + 10, ground - 8, 60, 8);
        }
        if (s >= 2) {
          ctx.fillStyle = col + "44";
          ctx.fillRect(bx + 15, ground - 40, 50, 32);
        }
        if (s >= 3) {
          ctx.fillStyle = col + "88";
          ctx.fillRect(bx + 15, ground - 55, 50, 47);
        }
        if (s >= 4) {
          ctx.fillStyle = col + "CC";
          ctx.fillRect(bx + 15, ground - 70, 50, 62);
          for (let r = 0; r < 4; r++) {
            ctx.fillStyle = col + "44";
            ctx.fillRect(bx + 19, ground - 65 + r * 14, 42, 10);
          }
          if ((t + 7) % 20 > 10) {
            ctx.fillStyle = "#7dc9b2";
            ctx.beginPath();
            ctx.arc(bx + 58, ground - 62, 3, 0, Math.PI * 2);
            ctx.fill();
          }
          if ((t + 14) % 30 > 15) {
            ctx.fillStyle = "#A8E6CF";
            ctx.beginPath();
            ctx.arc(bx + 58, ground - 48, 3, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        if (s === 5) {
          ctx.fillStyle = col;
          ctx.fillRect(bx + 15, ground - 75, 50, 67);
          for (let r = 0; r < 5; r++) {
            ctx.fillStyle = dayMode ? "#004040" : "#001a1a";
            ctx.fillRect(bx + 19, ground - 70 + r * 13, 42, 9);
          }
          ctx.fillStyle = dayMode ? "#3a6b6b" : "#004949";
          ctx.fillRect(bx + 38, ground - 90, 4, 18);
          ctx.fillStyle = "#7dc9b2";
          ctx.beginPath();
          ctx.arc(bx + 40, ground - 92, 4, 0, Math.PI * 2);
          ctx.fill();
          if (t % 15 < 8) {
            ctx.fillStyle = "#FF4757";
            ctx.beginPath();
            ctx.arc(bx + 40, ground - 92, 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        ctx.font = "5px 'Press Start 2P',monospace";
        ctx.fillStyle = "#7dc9b2";
        ctx.textAlign = "center";
        ctx.fillText("HARD", bx + 40, ground + 16);
        const dPct = Math.round(hardPct * 100);
        ctx.font = "5px 'Press Start 2P',monospace";
        ctx.fillStyle = "#7dc9b2";
        ctx.fillText(dPct + "%", bx + 40, ground + 24);
        for (let d = 0; d < hardTot && d < 10; d++) {
          const dx = bx + 40 - Math.min(hardTot, 10) * 5 + d * 10 + 5;
          ctx.fillStyle = d < hardDone ? "#7dc9b2" : dayMode ? "#99bbaa" : "#2A3F58";
          ctx.beginPath();
          ctx.arc(dx, ground + 30, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      rafRef.current = requestAnimationFrame(render);
    }
    render();
    return () => cancelAnimationFrame(rafRef.current);
  }, [activeMods.length, doneKey, overdueKey, team.length, dayMode, weather, hardKey]);
  return React.createElement("canvas", {
    ref: ref,
    width: 900,
    height: 220,
    style: {
      width: "100%",
      height: 220,
      imageRendering: "pixelated",
      display: "block"
    }
  });
}
function GanttCanvas({
  modules,
  projStart,
  projEnd,
  hardPhases = [],
  showHard = true
}) {
  const ref = useRef(null);
  const am = modules.filter(m => m.active);
  const doneKey = am.map(m => m.tasks.filter(t => t.done).length).join(",");
  const dateKey = am.map(m => m.tasks.map(t => t.dueDate || "").join("|")).join(";");
  const hardKey = hardPhases.map(p => p.guid).join(",");
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    const allTaskDates = am.flatMap(m => m.tasks.flatMap(t => [t.startDate, t.dueDate])).filter(Boolean).map(d => parseD(d)).filter(Boolean).sort((a, b) => a - b);
    const hardDatesAll = hardPhases.flatMap(p => [p.startDate, p.deadline]).filter(Boolean).map(d => parseD(d)).filter(Boolean).sort((a, b) => a - b);
    const allDatesForRange = [...allTaskDates, ...hardDatesAll].sort((a, b) => a - b);
    const autoStart = allDatesForRange.length ? allDatesForRange[0] : new Date();
    const autoEnd = allDatesForRange.length ? allDatesForRange[allDatesForRange.length - 1] : new Date(TODAY.getTime() + 60 * 864e5);
    const startD = parseD(projStart) || autoStart;
    const endD = parseD(projEnd) || autoEnd;
    const totalDays = Math.max(1, Math.round((endD - startD) / 864e5));
    const W = 920,
      rowH = 44,
      headerH = 48,
      leftW = 140,
      padR = 16;
    const hardRows = showHard && hardPhases.length ? hardPhases : [];
    const hardRootForCount = hardPhases.find(p => !p.belongsTo);
    const hardRootNameForCount = hardRootForCount?.name || "";
    const hardModCount = hardPhases.filter(p => p.belongsTo === hardRootNameForCount && hardRootNameForCount !== "").length || hardRows.length;
    const totalRows = Math.max(am.length, 1) + (hardRows.length ? hardModCount + 1 : 0);
    const H = headerH + totalRows * rowH + 12;
    cv.width = W;
    cv.height = H;
    ctx.clearRect(0, 0, W, H);
    const chartW = W - leftW - padR;
    function xOfD(d) {
      const days = Math.round((d - startD) / 864e5);
      return leftW + Math.max(0, Math.min(1, days / totalDays)) * chartW;
    }
    function xOf(s) {
      return xOfD(parseD(s) || TODAY);
    }
    ctx.fillStyle = "#0D1117";
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = "#1E2D40";
    ctx.lineWidth = 0.5;
    const mc = new Date(startD);
    mc.setDate(1);
    while (mc <= endD) {
      const x = xOfD(mc);
      if (x >= leftW) {
        ctx.beginPath();
        ctx.moveTo(x, headerH);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      mc.setMonth(mc.getMonth() + 1);
    }
    ctx.fillStyle = "#080C12";
    ctx.fillRect(0, 0, W, headerH);
    ctx.fillStyle = "#1A2332";
    ctx.fillRect(0, 0, leftW, headerH);
    ctx.font = "10px Inter,sans-serif";
    ctx.fillStyle = "#7A8FA6";
    ctx.textAlign = "left";
    ctx.fillText("MÓDULO / FASE", 10, headerH / 2 + 4);
    ctx.textAlign = "center";
    const mc2 = new Date(startD);
    mc2.setDate(1);
    while (mc2 <= endD) {
      const x = xOfD(mc2);
      if (x >= leftW) {
        ctx.fillStyle = "#4A5E72";
        ctx.font = "bold 9px Inter,sans-serif";
        ctx.fillText(mc2.toLocaleDateString('es-AR', {
          month: 'short'
        }).toUpperCase(), x + 16, 16);
        ctx.fillStyle = "#2A3F58";
        ctx.font = "8px Inter,sans-serif";
        ctx.fillText("'" + mc2.getFullYear().toString().slice(2), x + 16, 30);
      }
      mc2.setMonth(mc2.getMonth() + 1);
    }
    if (am.length === 0 && hardRows.length === 0) {
      ctx.fillStyle = "#2A3F58";
      ctx.font = "9px 'Press Start 2P',monospace";
      ctx.textAlign = "center";
      ctx.fillText("ACTIVÁ MÓDULOS PARA VER EL GANTT", W / 2, H / 2);
      return;
    }
    am.forEach((mod, i) => {
      const y = headerH + i * rowH;
      ctx.fillStyle = i % 2 === 0 ? "#0D1117" : "#0F1620";
      ctx.fillRect(0, y, W, rowH);
      ctx.fillStyle = "#1A2332";
      ctx.fillRect(0, y, leftW, rowH);
      ctx.strokeStyle = "#1E2D40";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(0, y + rowH);
      ctx.lineTo(W, y + rowH);
      ctx.stroke();
      ctx.font = "14px serif";
      ctx.textAlign = "left";
      ctx.fillText(mod.icon, 6, y + rowH / 2 + 6);
      ctx.font = "10px Inter,sans-serif";
      ctx.fillStyle = "#E8EDF2";
      ctx.textAlign = "left";
      ctx.fillText(mod.name.length > 14 ? mod.name.slice(0, 13) + "…" : mod.name, 26, y + rowH / 2 + 4);
      const tWD = mod.tasks.filter(t => t.dueDate);
      const tDates = tWD.map(t => parseD(t.dueDate)).filter(Boolean).sort((a, b) => a - b);
      const pBarEnd = tDates.length ? tDates[tDates.length - 1] : endD;
      const xPS = xOfD(startD),
        xPE = Math.min(W - padR, xOfD(pBarEnd));
      const barY = y + rowH / 2 - 5;
      if (xPE > xPS) {
        ctx.fillStyle = "#1E2D40";
        ctx.fillRect(xPS, barY, xPE - xPS, 10);
        ctx.strokeStyle = "#2A3F58";
        ctx.lineWidth = 1;
        ctx.strokeRect(xPS, barY, xPE - xPS, 10);
      }
      const p = mod.tasks.length ? mod.tasks.filter(t => t.done).length / mod.tasks.length : 0;
      if (p > 0) {
        ctx.fillStyle = mod.color + "CC";
        ctx.fillRect(xPS, barY, (xPE - xPS) * p, 10);
      }
      tWD.forEach(t => {
        const tx = xOf(t.dueDate);
        if (tx < leftW || tx > W - padR) return;
        const ov = isOverdue(t),
          sn = isDueSoon(t);
        ctx.fillStyle = ov ? "#FF4757" : sn ? "#FFD700" : t.done ? mod.color : "#2A3F58";
        ctx.strokeStyle = ov ? "#FF4757" : sn ? "#FFD700" : mod.color;
        ctx.lineWidth = ov || sn ? 1.5 : 1;
        ctx.beginPath();
        ctx.arc(tx, y + rowH / 2, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        if (ov) {
          ctx.fillStyle = "#FF4757";
          ctx.font = "bold 8px sans-serif";
          ctx.textAlign = "center";
          ctx.fillText("!", tx, y + rowH / 2 + 3);
        }
      });
      ctx.font = "bold 8px 'Press Start 2P',monospace";
      ctx.fillStyle = mod.color;
      ctx.textAlign = "left";
      ctx.fillText(Math.round(p * 100) + "%", Math.min(xPE + 6, W - 30), y + rowH / 2 + 4);
    });
    if (hardRows.length > 0) {
      const root = hardPhases.find(p => !p.belongsTo);
      const rootName = root?.name || "";
      const hardMods = hardPhases.filter(p => p.belongsTo === rootName && rootName !== "");
      const hardTasksByMod = {};
      hardPhases.filter(p => p.belongsTo && p.belongsTo !== rootName).forEach(p => {
        if (!hardTasksByMod[p.belongsTo]) hardTasksByMod[p.belongsTo] = [];
        hardTasksByMod[p.belongsTo].push(p);
      });
      const ganttHardRows = hardMods.length ? hardMods : hardRows;
      const sepY = headerH + am.length * rowH;
      ctx.fillStyle = "#7dc9b222";
      ctx.fillRect(0, sepY, W, rowH);
      ctx.fillStyle = "#1A2332";
      ctx.fillRect(0, sepY, leftW, rowH);
      ctx.fillStyle = "#7dc9b2";
      ctx.font = "bold 8px 'Press Start 2P',monospace";
      ctx.textAlign = "left";
      ctx.fillText("🔗 HARD", 8, sepY + rowH / 2 + 4);
      ctx.strokeStyle = "#7dc9b244";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, sepY + rowH);
      ctx.lineTo(W, sepY + rowH);
      ctx.stroke();
      ganttHardRows.forEach((mod, i) => {
        const tasks = hardTasksByMod[mod.name] || [];
        const y = sepY + rowH + i * rowH;
        ctx.fillStyle = i % 2 === 0 ? "#001a1a" : "#002020";
        ctx.fillRect(0, y, W, rowH);
        ctx.fillStyle = "#001a1a";
        ctx.fillRect(0, y, leftW, rowH);
        ctx.strokeStyle = "#7dc9b222";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(0, y + rowH);
        ctx.lineTo(W, y + rowH);
        ctx.stroke();
        ctx.font = "11px serif";
        ctx.textAlign = "left";
        ctx.fillText("🔗", 6, y + rowH / 2 + 5);
        ctx.font = "10px Inter,sans-serif";
        ctx.fillStyle = "#7dc9b2";
        ctx.textAlign = "left";
        ctx.fillText(mod.name.length > 14 ? mod.name.slice(0, 13) + "…" : mod.name, 22, y + rowH / 2 + 4);
        const taskDates = tasks.map(t => parseD(t.startDate)).filter(Boolean).sort((a, b) => a - b);
        const taskEnds = tasks.map(t => parseD(t.deadline)).filter(Boolean).sort((a, b) => a - b);
        const barStart = parseD(mod.startDate) || (taskDates.length ? taskDates[0] : null);
        const barEnd = parseD(mod.deadline) || (taskEnds.length ? taskEnds[taskEnds.length - 1] : null);
        const doneTasks = tasks.filter(t => t.isCompleted).length;
        const totTasks = tasks.length;
        const pct = totTasks ? doneTasks / totTasks : mod.isCompleted ? 1 : 0;
        const barY2 = y + rowH / 2 - 5;
        if (barStart && barEnd) {
          const xs = xOfD(barStart),
            xe = Math.min(W - padR, xOfD(barEnd));
          if (xe > xs) {
            ctx.fillStyle = "#7dc9b211";
            ctx.fillRect(xs, barY2, xe - xs, 10);
            ctx.strokeStyle = "#7dc9b244";
            ctx.lineWidth = 1;
            ctx.strokeRect(xs, barY2, xe - xs, 10);
            if (pct > 0) {
              ctx.fillStyle = mod.isCompleted ? "#7dc9b2BB" : "#7dc9b277";
              ctx.fillRect(xs, barY2, (xe - xs) * pct, 10);
            }
            ctx.fillStyle = mod.isCompleted ? "#A8E6CF" : "#7dc9b2";
            ctx.beginPath();
            ctx.arc(Math.min(xe, W - padR), y + rowH / 2, 5, 0, Math.PI * 2);
            ctx.fill();
            tasks.forEach(t => {
              if (!t.deadline) return;
              const tx = xOf(t.deadline);
              if (tx < leftW || tx > W - padR) return;
              ctx.fillStyle = t.isCompleted ? "#A8E6CF66" : "#7dc9b244";
              ctx.beginPath();
              ctx.arc(tx, y + rowH / 2, 3, 0, Math.PI * 2);
              ctx.fill();
            });
            ctx.font = "bold 8px 'Press Start 2P',monospace";
            ctx.fillStyle = "#7dc9b2";
            ctx.textAlign = "left";
            ctx.fillText(Math.round(pct * 100) + "%", Math.min(xe + 6, W - 40), y + rowH / 2 + 4);
          } else {
            ctx.fillStyle = "#7dc9b2";
            ctx.beginPath();
            ctx.arc(xs, y + rowH / 2, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.font = "bold 8px 'Press Start 2P',monospace";
            ctx.fillStyle = "#7dc9b2";
            ctx.textAlign = "left";
            ctx.fillText(Math.round(pct * 100) + "%", Math.min(xs + 10, W - 40), y + rowH / 2 + 4);
          }
        } else {
          ctx.font = "bold 8px 'Press Start 2P',monospace";
          ctx.fillStyle = "#7dc9b244";
          ctx.textAlign = "left";
          ctx.fillText(Math.round(pct * 100) + "%", leftW + 8, y + rowH / 2 + 4);
          ctx.fillStyle = "#7dc9b211";
          ctx.fillRect(leftW + 4, barY2, chartW - 8, 10);
        }
      });
    }
    const todayX = xOfD(TODAY);
    if (todayX >= leftW && todayX <= W - padR) {
      ctx.strokeStyle = "#FF4757AA";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(todayX, headerH);
      ctx.lineTo(todayX, H);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = "#FF4757";
      ctx.font = "bold 8px Inter,sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("HOY", todayX, headerH - 8);
    }
  }, [am.length, doneKey, dateKey, projStart, projEnd, hardKey, showHard]);
  return React.createElement("div", {
    style: {
      overflowX: "auto",
      background: "#0D1117"
    }
  }, React.createElement("canvas", {
    ref: ref,
    width: 920,
    height: 200,
    style: {
      display: "block"
    }
  }));
}
function TaskModal({
  task,
  mod,
  session,
  onClose,
  onUpdate,
  adminName
}) {
  const [commentText, setCommentText] = useState("");
  const [hourDate, setHourDate] = useState(TODAY.toISOString().split('T')[0]);
  const [hourAmount, setHourAmount] = useState("");
  const [hourNote, setHourNote] = useState("");
  const px = s => ({
    fontFamily: "'Press Start 2P',monospace",
    ...s
  });
  const isAdmin = session.role === "admin";
  const oBadge = {
    display: "inline-flex",
    alignItems: "center",
    background: "#FF475722",
    border: "1px solid #FF475766",
    color: "#FF4757",
    fontFamily: "'Press Start 2P',monospace",
    fontSize: 5,
    padding: "2px 5px"
  };
  const sBadge = {
    display: "inline-flex",
    alignItems: "center",
    background: "#FFD70022",
    border: "1px solid #FFD70066",
    color: "#FFD700",
    fontFamily: "'Press Start 2P',monospace",
    fontSize: 5,
    padding: "2px 5px"
  };
  const addComment = () => {
    if (!commentText.trim()) return;
    const comment = {
      id: "c" + Date.now(),
      text: commentText.trim(),
      ts: Date.now(),
      authorId: session.id,
      authorName: session.name,
      authorEmoji: session.emoji || "💬"
    };
    onUpdate({
      ...task,
      comments: [...(task.comments || []), comment]
    });
    setCommentText("");
  };
  const markMinuteSeen = minuteId => {
    const updated = (task.minutes || []).map(m => m.id === minuteId ? {
      ...m,
      seenBy: [...(m.seenBy || []).filter(x => x.id !== session.id), {
        id: session.id,
        name: session.name,
        ts: Date.now()
      }]
    } : m);
    onUpdate({
      ...task,
      minutes: updated
    });
  };
  const deleteComment = cId => {
    onUpdate({
      ...task,
      comments: (task.comments || []).filter(c => c.id !== cId)
    });
  };
  const addHours = () => {
    const h = parseFloat(hourAmount);
    if (!h || h <= 0) return;
    const entry = {
      id: "h" + Date.now(),
      date: hourDate,
      hours: h,
      note: hourNote.trim(),
      authorId: session.id,
      authorName: session.name,
      authorEmoji: session.emoji || "⏱",
      authorRole: isAdmin ? "admin" : "team"
    };
    onUpdate({
      ...task,
      hoursLog: [...(task.hoursLog || []), entry]
    });
    setHourAmount("");
    setHourNote("");
  };
  const deleteHours = hId => {
    const entry = (task.hoursLog || []).find(h => h.id === hId);
    if (!entry) return;
    if (!isAdmin && entry.authorId !== session.id) return;
    onUpdate({
      ...task,
      hoursLog: (task.hoursLog || []).filter(h => h.id !== hId)
    });
  };
  const minutes = task.minutes || [];
  const comments = task.comments || [];
  const hoursLog = task.hoursLog || [];
  const visibleHours = isAdmin ? hoursLog : hoursLog.filter(h => h.authorId === session.id);
  const adminHours = hoursLog.filter(h => h.authorRole === "admin");
  const teamHours = hoursLog.filter(h => h.authorRole === "team");
  const totalAdmin = adminHours.reduce((a, h) => a + h.hours, 0);
  const totalTeam = teamHours.reduce((a, h) => a + h.hours, 0);
  const myTotal = visibleHours.reduce((a, h) => a + h.hours, 0);
  const inp = {
    background: "#0D1117",
    border: "1px solid #2A3F58",
    color: "#E8EDF2",
    padding: "6px 8px",
    fontSize: 12,
    fontFamily: "Inter,sans-serif",
    outline: "none"
  };
  return React.createElement("div", {
    style: {
      position: "fixed",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      background: "rgba(0,0,0,0.9)",
      zIndex: 300,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 12
    }
  }, React.createElement("div", {
    style: {
      background: "#0D1117",
      border: `1px solid ${mod.color}66`,
      maxWidth: 600,
      width: "100%",
      maxHeight: "94vh",
      overflow: "auto",
      boxShadow: `0 0 40px ${mod.color}22`
    }
  }, React.createElement("div", {
    style: {
      background: "#080C12",
      padding: "12px 16px",
      borderBottom: "1px solid #1E2D40",
      display: "flex",
      gap: 10,
      alignItems: "center",
      position: "sticky",
      top: 0,
      zIndex: 10
    }
  }, React.createElement("span", {
    style: {
      fontSize: 20
    }
  }, mod.icon), React.createElement("div", {
    style: {
      flex: 1
    }
  }, React.createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: 13,
      marginBottom: 2
    }
  }, task.label), React.createElement("div", {
    style: px({
      fontSize: 5,
      color: mod.color
    })
  }, mod.name, " · ", mod.phase)), React.createElement("button", {
    onClick: onClose,
    style: {
      background: "none",
      border: "none",
      color: "#7A8FA6",
      cursor: "pointer",
      fontSize: 20,
      lineHeight: 1,
      marginLeft: 8
    }
  }, "×")), React.createElement("div", {
    style: {
      padding: 16
    }
  }, React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 16,
      flexWrap: "wrap",
      alignItems: "center"
    }
  }, React.createElement("span", {
    style: {
      background: task.done ? "#A8E6CF22" : "#FF6B3522",
      border: `1px solid ${task.done ? "#A8E6CF44" : "#FF6B3544"}`,
      color: task.done ? "#A8E6CF" : "#FF6B35",
      fontFamily: "'Press Start 2P',monospace",
      fontSize: 6,
      padding: "3px 9px"
    }
  }, task.done ? "✓ COMPLETADA" : "EN CURSO"), task.startDate && React.createElement("span", {
    style: {
      fontSize: 10,
      color: "#7A8FA6"
    }
  }, "📅 ", fmtD(task.startDate)), task.dueDate && React.createElement("span", {
    style: isOverdue(task) ? oBadge : isDueSoon(task) ? sBadge : {
      fontSize: 11,
      color: "#7A8FA6"
    }
  }, isOverdue(task) ? "⚠ VENCE " : isDueSoon(task) ? "⏰ VENCE " : "🏁 ", fmtD(task.dueDate), task.duration ? ` · ${task.duration}d` : ""), React.createElement("span", {
    style: px({
      fontSize: 6,
      color: "#FFD700",
      marginLeft: "auto"
    })
  }, "+", task.xp, " XP")), React.createElement("div", {
    style: {
      marginBottom: 18
    }
  }, React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 10
    }
  }, React.createElement("div", {
    style: px({
      fontSize: 7,
      color: "#52B788",
      letterSpacing: 1
    })
  }, "⏱ HORAS TRABAJADAS"), isAdmin && hoursLog.length > 0 && React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      marginLeft: "auto",
      flexWrap: "wrap"
    }
  }, totalAdmin > 0 && React.createElement("span", {
    style: {
      fontSize: 10,
      background: "#FFD70022",
      border: "1px solid #FFD70044",
      color: "#FFD700",
      padding: "2px 7px",
      fontFamily: "'Press Start 2P',monospace",
      fontSize: 6
    }
  }, "👑 ", totalAdmin, "h"), totalTeam > 0 && React.createElement("span", {
    style: {
      fontSize: 10,
      background: "#4ECDC422",
      border: "1px solid #4ECDC444",
      color: "#4ECDC4",
      padding: "2px 7px",
      fontFamily: "'Press Start 2P',monospace",
      fontSize: 6
    }
  }, "🏙️ ", totalTeam, "h")), !isAdmin && myTotal > 0 && React.createElement("span", {
    style: {
      fontSize: 10,
      background: "#4ECDC422",
      border: "1px solid #4ECDC444",
      color: "#4ECDC4",
      padding: "2px 7px",
      fontFamily: "'Press Start 2P',monospace",
      fontSize: 6,
      marginLeft: "auto"
    }
  }, "MIS HORAS: ", myTotal, "h")), visibleHours.length === 0 ? React.createElement("div", {
    style: {
      color: "#2A3F58",
      fontSize: 12,
      padding: "6px 0 10px"
    }
  }, "Sin horas registradas aún.") : React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 5,
      marginBottom: 12
    }
  }, isAdmin ? ["admin", "team"].map(roleGroup => {
    const group = hoursLog.filter(h => h.authorRole === roleGroup);
    if (!group.length) return null;
    const groupTotal = group.reduce((a, h) => a + h.hours, 0);
    const groupCol = roleGroup === "admin" ? "#FFD700" : "#4ECDC4";
    const groupLabel = roleGroup === "admin" ? "👑 EQUIPO ADMIN" : "🏙️ CLIENTES / EQUIPO";
    return React.createElement("div", {
      key: roleGroup
    }, React.createElement("div", {
      style: {
        fontSize: 10,
        color: groupCol,
        fontFamily: "'Press Start 2P',monospace",
        marginBottom: 5,
        display: "flex",
        justifyContent: "space-between"
      }
    }, React.createElement("span", null, groupLabel), React.createElement("span", null, groupTotal, "h total")), group.sort((a, b) => a.date.localeCompare(b.date)).map(h => React.createElement("div", {
      key: h.id,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 9px",
        background: "#0D1117",
        border: `1px solid ${groupCol}22`,
        marginBottom: 3
      }
    }, React.createElement("span", {
      style: {
        fontSize: 12,
        flexShrink: 0
      }
    }, h.authorEmoji), React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 600,
        color: "#E8EDF2"
      }
    }, h.authorName, " ", React.createElement("span", {
      style: {
        color: groupCol,
        fontFamily: "'Press Start 2P',monospace",
        fontSize: 7
      }
    }, h.hours, "h")), h.note && React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#7A8FA6",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }
    }, h.note)), React.createElement("span", {
      style: {
        fontSize: 10,
        color: "#2A3F58",
        whiteSpace: "nowrap",
        flexShrink: 0
      }
    }, fmtD(h.date)), React.createElement("button", {
      onClick: () => deleteHours(h.id),
      style: {
        background: "none",
        border: "none",
        color: "#2A3F5888",
        cursor: "pointer",
        fontSize: 13,
        lineHeight: 1,
        flexShrink: 0
      },
      title: "Eliminar"
    }, "×"))));
  }) : visibleHours.sort((a, b) => a.date.localeCompare(b.date)).map(h => React.createElement("div", {
    key: h.id,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "6px 9px",
      background: "#0D1117",
      border: "1px solid #4ECDC422",
      marginBottom: 3
    }
  }, React.createElement("span", {
    style: {
      fontSize: 12
    }
  }, h.authorEmoji), React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      color: "#E8EDF2"
    }
  }, "Vos ", React.createElement("span", {
    style: {
      color: "#4ECDC4",
      fontFamily: "'Press Start 2P',monospace",
      fontSize: 7
    }
  }, h.hours, "h")), h.note && React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#7A8FA6"
    }
  }, h.note)), React.createElement("span", {
    style: {
      fontSize: 10,
      color: "#2A3F58",
      whiteSpace: "nowrap"
    }
  }, fmtD(h.date)), React.createElement("button", {
    onClick: () => deleteHours(h.id),
    style: {
      background: "none",
      border: "none",
      color: "#2A3F5888",
      cursor: "pointer",
      fontSize: 13,
      lineHeight: 1
    },
    title: "Eliminar"
  }, "×")))), React.createElement("div", {
    style: {
      background: "#0A0F18",
      border: "1px solid #52B78833",
      padding: 10
    }
  }, React.createElement("div", {
    style: px({
      fontSize: 6,
      color: "#52B788",
      marginBottom: 8
    })
  }, "+ REGISTRAR HORAS"), React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "110px 70px 1fr",
      gap: 6,
      marginBottom: 6
    }
  }, React.createElement("div", null, React.createElement("div", {
    style: {
      fontSize: 9,
      color: "#7A8FA6",
      marginBottom: 3
    }
  }, "FECHA"), React.createElement("input", {
    type: "date",
    value: hourDate,
    onChange: e => setHourDate(e.target.value),
    style: {
      ...inp,
      width: "100%",
      fontSize: 11
    }
  })), React.createElement("div", null, React.createElement("div", {
    style: {
      fontSize: 9,
      color: "#7A8FA6",
      marginBottom: 3
    }
  }, "HORAS"), React.createElement("input", {
    type: "number",
    min: "0.5",
    max: "24",
    step: "0.5",
    placeholder: "0",
    value: hourAmount,
    onChange: e => setHourAmount(e.target.value),
    onKeyDown: e => e.key === "Enter" && addHours(),
    style: {
      ...inp,
      width: "100%",
      textAlign: "center"
    }
  })), React.createElement("div", null, React.createElement("div", {
    style: {
      fontSize: 9,
      color: "#7A8FA6",
      marginBottom: 3
    }
  }, "NOTA (opcional)"), React.createElement("input", {
    type: "text",
    placeholder: "¿En qué trabajaste?",
    value: hourNote,
    onChange: e => setHourNote(e.target.value),
    onKeyDown: e => e.key === "Enter" && addHours(),
    style: {
      ...inp,
      width: "100%"
    }
  }))), React.createElement("button", {
    onClick: addHours,
    style: {
      background: hourAmount ? "#52B78822" : "transparent",
      border: `1px solid ${hourAmount ? "#52B788" : "#2A3F58"}`,
      color: hourAmount ? "#52B788" : "#2A3F58",
      fontFamily: "'Press Start 2P',monospace",
      fontSize: 6,
      padding: "6px 14px",
      cursor: "pointer",
      width: "100%",
      transition: "all .15s"
    }
  }, "⏱ REGISTRAR ", hourAmount ? `${hourAmount}h` : ""))), React.createElement("div", {
    style: {
      marginBottom: 16
    }
  }, React.createElement("div", {
    style: px({
      fontSize: 7,
      color: "#4ECDC4",
      letterSpacing: 1,
      marginBottom: 10
    })
  }, "📋 MINUTAS ", minutes.length > 0 && React.createElement("span", {
    style: {
      color: "#7A8FA6"
    }
  }, "(", minutes.length, ")")), minutes.length === 0 ? React.createElement("div", {
    style: {
      color: "#2A3F58",
      fontSize: 12,
      padding: "8px 0"
    }
  }, "Sin minutas registradas aún.") : React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, minutes.map(mn => {
    const seen = (mn.seenBy || []).find(x => x.id === session.id);
    return React.createElement("div", {
      key: mn.id,
      style: {
        background: "#1A2332",
        border: `1px solid ${seen ? "#4ECDC444" : "#2A3F58"}`,
        padding: 11
      }
    }, React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 7,
        gap: 8
      }
    }, React.createElement("div", null, React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#E8EDF2",
        fontWeight: 600,
        marginBottom: 2
      }
    }, mn.subject || "Minuta"), React.createElement("div", {
      style: {
        fontSize: 10,
        color: "#7A8FA6"
      }
    }, mn.author, " → ", mn.sentTo, " · ", fmtDt(mn.ts))), seen ? React.createElement("span", {
      style: px({
        fontSize: 5,
        color: "#A8E6CF",
        background: "#A8E6CF11",
        border: "1px solid #A8E6CF33",
        padding: "2px 6px",
        whiteSpace: "nowrap"
      })
    }, "✓ VISTO") : !isAdmin && React.createElement("button", {
      onClick: () => markMinuteSeen(mn.id),
      style: {
        background: "#4ECDC422",
        border: "1px solid #4ECDC4",
        color: "#4ECDC4",
        fontFamily: "'Press Start 2P',monospace",
        fontSize: 5,
        padding: "3px 8px",
        cursor: "pointer",
        whiteSpace: "nowrap"
      }
    }, "MARCAR VISTO")), React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#E8EDF2",
        whiteSpace: "pre-wrap",
        lineHeight: 1.7,
        background: "#0D1117",
        padding: "8px 10px",
        borderLeft: "2px solid #4ECDC4"
      }
    }, mn.text), (mn.seenBy || []).length > 0 && React.createElement("div", {
      style: {
        marginTop: 7,
        fontSize: 10,
        color: "#7A8FA6",
        display: "flex",
        alignItems: "center",
        gap: 4,
        flexWrap: "wrap"
      }
    }, React.createElement("span", null, "Visto por:"), (mn.seenBy || []).map(sv => React.createElement("span", {
      key: sv.id,
      style: {
        background: "#A8E6CF11",
        border: "1px solid #A8E6CF22",
        color: "#A8E6CF",
        padding: "1px 6px",
        fontSize: 10
      }
    }, sv.name))), isAdmin && !(mn.seenBy || []).length && React.createElement("div", {
      style: {
        marginTop: 5,
        fontSize: 10,
        color: "#2A3F58"
      }
    }, "Nadie lo vio aún"));
  }))), React.createElement("div", null, React.createElement("div", {
    style: px({
      fontSize: 7,
      color: "#C77DFF",
      letterSpacing: 1,
      marginBottom: 10
    })
  }, "💬 COMENTARIOS ", comments.length > 0 && React.createElement("span", {
    style: {
      color: "#7A8FA6"
    }
  }, "(", comments.length, ")")), comments.length === 0 ? React.createElement("div", {
    style: {
      color: "#2A3F58",
      fontSize: 12,
      padding: "8px 0"
    }
  }, "Sin comentarios aún.") : React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 7,
      marginBottom: 12
    }
  }, comments.map(c => {
    const isOwn = c.authorId === session.id,
      canDelete = isAdmin || isOwn;
    return React.createElement("div", {
      key: c.id,
      style: {
        background: isOwn ? "#1A2332" : "#151E2D",
        border: `1px solid ${isOwn ? "#C77DFF33" : "#2A3F58"}`,
        padding: "9px 12px"
      }
    }, React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 5
      }
    }, React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 6
      }
    }, React.createElement("span", {
      style: {
        fontSize: 14
      }
    }, c.authorEmoji || "💬"), React.createElement("span", {
      style: {
        fontSize: 11,
        fontWeight: 600,
        color: isOwn ? "#C77DFF" : "#E8EDF2"
      }
    }, c.authorName), React.createElement("span", {
      style: {
        fontSize: 10,
        color: "#2A3F58"
      }
    }, fmtDt(c.ts))), canDelete && React.createElement("button", {
      onClick: () => deleteComment(c.id),
      style: {
        background: "none",
        border: "none",
        color: "#2A3F58",
        cursor: "pointer",
        fontSize: 12,
        lineHeight: 1,
        padding: "0 2px"
      },
      title: "Eliminar"
    }, "×")), React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#E8EDF2",
        lineHeight: 1.6
      }
    }, c.text));
  })), React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      alignItems: "flex-start"
    }
  }, React.createElement("span", {
    style: {
      fontSize: 16,
      flexShrink: 0,
      marginTop: 6
    }
  }, session.emoji || "💬"), React.createElement("div", {
    style: {
      flex: 1
    }
  }, React.createElement("textarea", {
    value: commentText,
    onChange: e => setCommentText(e.target.value),
    onKeyDown: e => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        addComment();
      }
    },
    placeholder: "Escribí un comentario... (Enter para enviar)",
    style: {
      background: "#0D1117",
      border: "1px solid #2A3F58",
      color: "#E8EDF2",
      padding: "8px 10px",
      fontSize: 12,
      fontFamily: "Inter,sans-serif",
      outline: "none",
      width: "100%",
      resize: "none",
      minHeight: 58,
      lineHeight: 1.6
    }
  }), React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 5
    }
  }, React.createElement("span", {
    style: {
      fontSize: 10,
      color: "#2A3F58"
    }
  }, "Enter para enviar · Shift+Enter = nueva línea"), React.createElement("button", {
    onClick: addComment,
    style: {
      background: commentText.trim() ? "#C77DFF22" : "transparent",
      border: `1px solid ${commentText.trim() ? "#C77DFF" : "#2A3F58"}`,
      color: commentText.trim() ? "#C77DFF" : "#2A3F58",
      fontFamily: "'Press Start 2P',monospace",
      fontSize: 6,
      padding: "5px 10px",
      cursor: "pointer"
    }
  }, "COMENTAR"))))))));
}
const STORE_KEY = "tc-multiproject-v2";
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzs1NZtl1mpTczBNKjC1oPniGU7Z8b-MGkQvnHtqIr00LexI6_t8AzyI_SUIS6hTongow/exec";
async function loadAll() {
  try {
    const r = await window.storage.get(STORE_KEY);
    if (r && r.value) return JSON.parse(r.value);
  } catch (e) {}
  return null;
}
async function saveAll(data) {
  try {
    await window.storage.set(STORE_KEY, JSON.stringify({
      ...data,
      ts: Date.now()
    }));
    return true;
  } catch (e) {
    return false;
  }
}
function makeProject(name, adminEmail = "", tipo = "") {
  return {
    id: "p" + Date.now() + Math.random().toString(36).slice(2, 6),
    name,
    projectName: name,
    tipo,
    clientId: "",
    team: [],
    modules: JSON.parse(JSON.stringify(DEF_MODS)),
    projStart: addDays(TODAY, -7),
    projEnd: addDays(TODAY, 60),
    projAdminEmail: adminEmail,
    projAdminPin: "1111",
    adminName: "Admin del Proyecto",
    adminEmail: adminEmail,
    createdAt: Date.now()
  };
}
function getRolesForEmail(email, appState) {
  const roles = [];
  const e = email.toLowerCase().trim();
  if (!e) return roles;
  if ((appState.superadminEmails || ["nicolas.garcia@visma.com"]).map(x => x.toLowerCase()).includes(e)) roles.push({
    type: "superadmin",
    label: "👑 Superadmin",
    color: "#FFD700",
    desc: "Gestionar todos los proyectos"
  });
  appState.projects.forEach(p => {
    if (p.projAdminEmail && p.projAdminEmail.toLowerCase() === e) roles.push({
      type: "projadmin",
      label: "🏗️ Admin de Ciudad",
      color: "#FFD700AA",
      desc: p.projectName || p.name,
      projectId: p.id,
      pin: p.projAdminPin || "1111"
    });
  });
  appState.projects.forEach(p => {
    p.team.forEach(m => {
      if (m.email && m.email.toLowerCase() === e) {
        const isEclient = m.esRole === "eclient";
        roles.push({
          type: isEclient ? "eclient" : "team",
          label: isEclient ? "🛍️ Cliente E-shop" : "🏙️ Ciudadano",
          color: isEclient ? "#52B788" : "#4ECDC4",
          desc: p.projectName || p.name,
          projectId: p.id,
          memberId: m.id,
          memberName: m.name,
          memberEmoji: m.emoji,
          pin: m.pin || "1234"
        });
      }
    });
  });
  return roles;
}
function MiniCityPreview({
  modules
}) {
  const ref = useRef(null);
  const am = modules.filter(m => m.active);
  const doneKey = am.map(m => m.tasks.filter(t => t.done).length).join(",");
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    const W = 300,
      H = 100;
    ctx.clearRect(0, 0, W, H);
    const sky = ctx.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0, "#04080F");
    sky.addColorStop(1, "#0D1117");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#FFF5C0";
    ctx.beginPath();
    ctx.arc(W - 22, 14, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#0A1018";
    ctx.beginPath();
    ctx.arc(W - 18, 11, 6, 0, Math.PI * 2);
    ctx.fill();
    for (let i = 0; i < 40; i++) {
      const sx = (i * 137 + 11) % W,
        sy = (i * 83 + 5) % (H * .55);
      ctx.fillStyle = `rgba(255,255,255,${(0.1 + 0.4 * Math.abs(Math.sin(i))).toFixed(2)})`;
      ctx.fillRect(sx, sy, .8, .8);
    }
    const ground = H - 16;
    ctx.fillStyle = "#0D1520";
    ctx.fillRect(0, ground, W, 16);
    ctx.fillStyle = "#111C28";
    ctx.fillRect(0, ground, W, 9);
    ctx.fillStyle = "#FFD70022";
    for (let i = 0; i < W; i += 40) ctx.fillRect(i, ground + 4, 18, 2);
    if (am.length > 0) {
      const slotW = Math.floor((W - 20) / am.length);
      am.forEach((mod, i) => {
        const p = mod.tasks.length ? mod.tasks.filter(t => t.done).length / mod.tasks.length : 0;
        const bx = 10 + i * slotW + Math.floor((slotW - 20) / 2);
        const bh = Math.max(6, Math.round(60 * Math.max(p, 0.08)));
        ctx.fillStyle = mod.color + (p > 0 ? "CC" : "22");
        ctx.fillRect(bx, ground - bh, 20, bh);
        if (p > 0 && bh > 12) {
          ctx.fillStyle = mod.color + "44";
          for (let r = 0; r < 2; r++) for (let c = 0; c < 2; c++) if ((i + r + c) % 2 === 0) ctx.fillRect(bx + 2 + c * 8, ground - bh + 4 + r * 10, 6, 7);
        }
        const od = mod.tasks.filter(t => isOverdue(t)).length;
        if (od > 0) {
          ctx.fillStyle = "#FF4757";
          ctx.beginPath();
          ctx.arc(bx + 16, ground - bh + 4, 4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = mod.color + "99";
        ctx.font = "5px monospace";
        ctx.textAlign = "center";
        ctx.fillText(Math.round(p * 100) + "%", bx + 10, ground + 10);
      });
    } else {
      ctx.fillStyle = "#2A3F58";
      ctx.font = "5px monospace";
      ctx.textAlign = "center";
      ctx.fillText("SIN MÓDULOS", W / 2, H / 2);
    }
  }, [am.length, doneKey]);
  return React.createElement("canvas", {
    ref: ref,
    width: 300,
    height: 100,
    style: {
      width: "100%",
      height: 100,
      display: "block",
      imageRendering: "pixelated"
    }
  });
}
function ProjectCard({
  proj,
  role,
  onOpen,
  onPrint,
  onDelete,
  canDelete
}) {
  const px = s => ({
    fontFamily: "'Press Start 2P',monospace",
    ...s
  });
  const am = proj.modules.filter(m => m.active);
  const totalXP = proj.modules.reduce((a, m) => a + m.tasks.filter(t => t.done).reduce((b, t) => b + t.xp, 0), 0);
  const possXP = am.reduce((a, m) => a + m.tasks.reduce((b, t) => b + t.xp, 0), 0);
  const pct = possXP > 0 ? Math.round(totalXP / possXP * 100) : 0;
  const overdue = proj.modules.flatMap(m => m.active ? m.tasks.filter(t => isOverdue(t)) : []).length;
  const doneTasks = proj.modules.reduce((a, m) => a + m.tasks.filter(t => t.done).length, 0);
  const totalTasks = proj.modules.reduce((a, m) => a + m.tasks.length, 0);
  const roleCol = role === "superadmin" || role === "projadmin" ? "#FFD700" : role === "eclient" ? "#52B788" : "#4ECDC4";
  const roleLabel = role === "superadmin" ? "👑 SUPER" : role === "projadmin" ? "🏗️ ADMIN" : role === "eclient" ? "🛍️ E-SHOP" : "🏙️ CIUDADANO";
  const allDueDates = proj.modules.flatMap(m => m.tasks.filter(t => t.dueDate).map(t => t.dueDate)).sort();
  const firstDate = proj.projStart || (allDueDates.length ? allDueDates[0] : null);
  const lastDate = allDueDates.length ? allDueDates[allDueDates.length - 1] : proj.projEnd || null;
  const unreadMsgs = (proj.messages || []).filter(m => !m.read).length;
  const overdueAlerts = (proj.messages || []).filter(m => !m.read && m.type === "overdue").length;
  return React.createElement("div", {
    style: {
      background: "#1A2332",
      border: `1px solid ${overdueAlerts > 0 ? "#FF475766" : "#2A3F58"}`,
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      transition: "border-color .15s",
      position: "relative"
    },
    onMouseEnter: e => e.currentTarget.style.borderColor = roleCol,
    onMouseLeave: e => e.currentTarget.style.borderColor = overdueAlerts > 0 ? "#FF475766" : "#2A3F58"
  }, (unreadMsgs > 0 || overdueAlerts > 0) && React.createElement("div", {
    style: {
      position: "absolute",
      top: 6,
      right: 6,
      display: "flex",
      gap: 4,
      zIndex: 2
    }
  }, overdueAlerts > 0 && React.createElement("span", {
    style: {
      background: "#FF4757",
      color: "white",
      borderRadius: 10,
      fontSize: 9,
      fontWeight: 700,
      padding: "2px 7px",
      fontFamily: "sans-serif",
      boxShadow: "0 0 8px #FF475799"
    }
  }, "⚠️ ", overdueAlerts), unreadMsgs > overdueAlerts && React.createElement("span", {
    style: {
      background: "#C77DFF",
      color: "white",
      borderRadius: 10,
      fontSize: 9,
      fontWeight: 700,
      padding: "2px 7px",
      fontFamily: "sans-serif"
    }
  }, "💬 ", unreadMsgs)), React.createElement(MiniCityPreview, {
    modules: proj.modules
  }), React.createElement("div", {
    style: {
      padding: 12
    }
  }, React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 8,
      marginBottom: 7
    }
  }, React.createElement("div", {
    style: {
      flex: 1
    }
  }, React.createElement("div", {
    style: px({
      fontSize: 8,
      color: "#E8EDF2",
      marginBottom: 3,
      lineHeight: 1.5
    })
  }, proj.projectName || proj.name), React.createElement("div", {
    style: {
      fontSize: 10,
      color: "#7A8FA6",
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, proj.tipo && React.createElement("span", {
    style: {
      fontFamily: "'Press Start 2P',monospace",
      fontSize: 6,
      color: "#FFD700",
      background: "#FFD70022",
      border: "1px solid #FFD70044",
      padding: "2px 6px"
    }
  }, proj.tipo), React.createElement("span", null, proj.team.length, " ciudadano", proj.team.length !== 1 ? "s" : "", " · ", am.length, " módulo", am.length !== 1 ? "s" : ""))), React.createElement("div", {
    style: {
      textAlign: "right",
      flexShrink: 0
    }
  }, React.createElement("div", {
    style: px({
      fontSize: 13,
      color: pct === 100 ? "#A8E6CF" : roleCol
    })
  }, pct, "%"), React.createElement("div", {
    style: {
      fontSize: 9,
      color: roleCol,
      fontFamily: "'Press Start 2P',monospace",
      marginTop: 2
    }
  }, roleLabel))), React.createElement("div", {
    style: {
      height: 5,
      background: "#0D1117",
      marginBottom: 8,
      overflow: "hidden"
    }
  }, React.createElement("div", {
    style: {
      height: "100%",
      width: `${pct}%`,
      background: pct === 100 ? "#A8E6CF" : roleCol,
      transition: "width .5s"
    }
  })), React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 4,
      marginBottom: 5,
      fontSize: 10
    }
  }, React.createElement("span", {
    style: {
      color: "#4ECDC466",
      fontSize: 9
    }
  }, "📅"), React.createElement("span", {
    style: {
      color: firstDate ? "#7A8FA6" : "#2A3F58"
    }
  }, firstDate ? fmtD(firstDate) : "sin inicio"), React.createElement("span", {
    style: {
      color: "#2A3F58",
      fontSize: 9
    }
  }, "→"), React.createElement("span", {
    style: {
      color: lastDate ? parseD(lastDate) < TODAY && doneTasks < totalTasks ? "#FF4757" : "#7A8FA6" : "#2A3F58"
    }
  }, lastDate ? fmtD(lastDate) : "sin fin")), proj.clientId && React.createElement("div", {
    style: {
      fontSize: 10,
      color: "#7A8FA6",
      marginBottom: 5
    }
  }, "🪪 ID: ", React.createElement("span", {
    style: {
      color: "#4ECDC4",
      fontFamily: "monospace"
    }
  }, proj.clientId)), React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      marginBottom: 10,
      fontSize: 10,
      color: "#7A8FA6",
      flexWrap: "wrap"
    }
  }, React.createElement("span", null, doneTasks, "/", totalTasks, " tareas"), overdue > 0 && React.createElement("span", {
    style: {
      color: "#FF4757",
      fontFamily: "'Press Start 2P',monospace",
      fontSize: 8
    }
  }, "⚠", overdue, " venc.")), React.createElement("div", {
    style: {
      display: "flex",
      gap: 6
    }
  }, React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onOpen();
    },
    style: {
      flex: 1,
      background: roleCol,
      color: "#0D1117",
      border: "none",
      fontFamily: "'Press Start 2P',monospace",
      fontSize: 6,
      padding: "7px",
      cursor: "pointer"
    }
  }, "▶ ABRIR"), React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onPrint();
    },
    style: {
      background: "#0D1117",
      border: "1px solid #2A3F58",
      color: "#7A8FA6",
      fontFamily: "'Press Start 2P',monospace",
      fontSize: 6,
      padding: "7px 9px",
      cursor: "pointer"
    },
    title: "Ver resumen"
  }, "🖨"), canDelete && React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onDelete();
    },
    style: {
      background: "#0D1117",
      border: "1px solid #FF475733",
      color: "#FF4757",
      fontFamily: "'Press Start 2P',monospace",
      fontSize: 6,
      padding: "7px 9px",
      cursor: "pointer"
    }
  }, "✕"))));
}
function PrintReport({
  proj,
  onClose,
  severaData = null
}) {
  const [printHard, setPrintHard] = useState(true);
  const am = proj.modules.filter(m => m.active);
  const totalXP = proj.modules.reduce((a, m) => a + m.tasks.filter(t => t.done).reduce((b, t) => b + t.xp, 0), 0);
  const possXP = am.reduce((a, m) => a + m.tasks.reduce((b, t) => b + t.xp, 0), 0);
  const cPct = possXP > 0 ? Math.round(totalXP / possXP * 100) : 0;
  const now = new Date().toLocaleDateString('es-AR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
  const sTitle = {
    fontSize: 11,
    fontWeight: 700,
    color: "#475569",
    letterSpacing: 1,
    textTransform: "uppercase",
    borderBottom: "2px solid #e2e8f0",
    paddingBottom: 6,
    marginBottom: 14,
    marginTop: 20,
    fontFamily: "monospace"
  };
  const hardPhases = severaData ? severaData.phases || [] : [];
  const doDownload = () => {
    const el = document.getElementById("tc-print-body");
    if (!el) return;
    const html = `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><title>${proj.projectName} — ManduHubCity</title><style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Segoe UI',Arial,sans-serif;color:#1e293b;background:white;padding:24px;max-width:820px;margin:0 auto}@media print{body{padding:0;max-width:none}@page{size:A4;margin:15mm 12mm}}table{border-collapse:collapse;width:100%}td,th{padding:5px 8px;border:1px solid #e2e8f0;font-size:12px}th{background:#f8fafc;font-size:10px;color:#64748b;text-align:left}</style></head><body>${el.innerHTML}</body></html>`;
    const b = new Blob([html], {
        type: "text/html"
      }),
      u = URL.createObjectURL(b),
      a = document.createElement("a");
    a.href = u;
    a.download = `ManduHubCity-${(proj.projectName || "proyecto").replace(/\s/g, "-")}.html`;
    a.click();
    URL.revokeObjectURL(u);
  };
  return React.createElement("div", {
    style: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "white",
      zIndex: 500,
      overflowY: "auto",
      fontFamily: "'Segoe UI',Arial,sans-serif",
      color: "#1e293b"
    }
  }, React.createElement("div", {
    style: {
      background: "#004949",
      padding: "10px 20px",
      display: "flex",
      alignItems: "center",
      gap: 12,
      position: "sticky",
      top: 0,
      zIndex: 10,
      borderBottom: "1px solid #006060",
      flexWrap: "wrap"
    }
  }, React.createElement("button", {
    onClick: onClose,
    style: {
      background: "none",
      border: "1px solid #006060",
      color: "#7dc9b2",
      fontFamily: "'Press Start 2P',monospace",
      fontSize: 6,
      padding: "5px 10px",
      cursor: "pointer"
    }
  }, "← VOLVER"), React.createElement("span", {
    style: {
      fontSize: 12,
      color: "#d4f0e8",
      fontWeight: 600,
      flex: 1
    }
  }, proj.projectName, " — Resumen"), severaData && React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, React.createElement("span", {
    style: {
      fontSize: 11,
      color: "#7dc9b2"
    }
  }, "🔗 Hard"), React.createElement("div", {
    style: {
      width: 32,
      height: 16,
      position: "relative",
      cursor: "pointer"
    },
    onClick: () => setPrintHard(h => !h)
  }, React.createElement("div", {
    style: {
      width: 32,
      height: 16,
      background: printHard ? "#7dc9b2" : "#2A3F58",
      transition: "background .2s"
    }
  }), React.createElement("div", {
    style: {
      position: "absolute",
      top: 2,
      left: printHard ? 16 : 2,
      width: 12,
      height: 12,
      background: "white",
      transition: "left .2s"
    }
  }))), React.createElement("button", {
    onClick: doDownload,
    style: {
      background: "#7dc9b2",
      color: "#004949",
      border: "none",
      fontFamily: "'Press Start 2P',monospace",
      fontSize: 7,
      padding: "7px 14px",
      cursor: "pointer"
    }
  }, "↓ DESCARGAR HTML")), React.createElement("div", {
    id: "tc-print-body",
    style: {
      maxWidth: 760,
      margin: "0 auto",
      padding: "24px 20px"
    }
  }, React.createElement("div", {
    style: {
      borderBottom: "3px solid #0f172a",
      paddingBottom: 12,
      marginBottom: 20
    }
  }, React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 800,
      marginBottom: 4
    }
  }, "🏙️ ", proj.projectName), React.createElement("div", {
    style: {
      fontSize: 12,
      color: "#64748b"
    }
  }, "Resumen de avance · ", now, " · Admin: ", proj.adminName || "—")), React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 10,
      marginBottom: 20
    }
  }, [{
    l: "Ciudad",
    v: cPct + "%"
  }, {
    l: "Módulos",
    v: am.length
  }, {
    l: "XP Total",
    v: totalXP.toLocaleString()
  }, {
    l: "Ciudadanos",
    v: proj.team.length
  }].map(s => React.createElement("div", {
    key: s.l,
    style: {
      background: "#f8fafc",
      border: "1px solid #e2e8f0",
      padding: "10px",
      textAlign: "center"
    }
  }, React.createElement("div", {
    style: {
      fontSize: 20,
      fontWeight: 800,
      marginBottom: 3
    }
  }, s.v), React.createElement("div", {
    style: {
      fontSize: 10,
      color: "#64748b",
      textTransform: "uppercase",
      letterSpacing: .5
    }
  }, s.l)))), React.createElement("div", {
    style: sTitle
  }, "📊 GANTT — AVANCE POR MÓDULO"), React.createElement("div", {
    style: {
      border: "1px solid #e2e8f0",
      marginBottom: 20
    }
  }, React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "150px 1fr 50px 70px",
      background: "#f1f5f9",
      padding: "7px 10px",
      fontSize: 10,
      color: "#64748b",
      fontWeight: 600,
      borderBottom: "1px solid #e2e8f0"
    }
  }, React.createElement("span", null, "MÓDULO"), React.createElement("span", null, "PROGRESO"), React.createElement("span", {
    style: {
      textAlign: "right"
    }
  }, "%"), React.createElement("span", {
    style: {
      textAlign: "right"
    }
  }, "TAREAS")), am.map((mod, i) => {
    const done = mod.tasks.filter(t => t.done).length,
      tot = mod.tasks.length,
      p = tot ? Math.round(done / tot * 100) : 0;
    const startD = parseD(proj.projStart) || new Date(),
      endD = parseD(proj.projEnd) || new Date(TODAY.getTime() + 60 * 864e5);
    const totalD = Math.max(1, (endD - startD) / 864e5),
      todayOff = Math.round((TODAY - startD) / 864e5);
    const todayPct = Math.max(0, Math.min(100, todayOff / totalD * 100));
    return React.createElement("div", {
      key: mod.id,
      style: {
        display: "grid",
        gridTemplateColumns: "150px 1fr 50px 70px",
        padding: "9px 10px",
        alignItems: "center",
        background: i % 2 === 0 ? "white" : "#fafafa",
        borderBottom: "1px solid #f1f5f9"
      }
    }, React.createElement("span", {
      style: {
        fontSize: 12,
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
        gap: 4
      }
    }, mod.icon, " ", mod.name.length > 14 ? mod.name.slice(0, 13) + "…" : mod.name), React.createElement("div", {
      style: {
        position: "relative",
        height: 12,
        background: "#e2e8f0",
        margin: "0 10px"
      }
    }, React.createElement("div", {
      style: {
        height: "100%",
        width: `${p}%`,
        background: mod.color
      }
    }), React.createElement("div", {
      style: {
        position: "absolute",
        left: `${todayPct}%`,
        top: -2,
        width: 2,
        height: 16,
        background: "#ef4444",
        transform: "translateX(-50%)"
      }
    })), React.createElement("span", {
      style: {
        textAlign: "right",
        fontWeight: 700,
        fontSize: 11,
        color: mod.color
      }
    }, p, "%"), React.createElement("span", {
      style: {
        textAlign: "right",
        fontSize: 11,
        color: "#64748b"
      }
    }, done, "/", tot));
  })), React.createElement("div", {
    style: sTitle
  }, "📋 MÓDULOS Y TAREAS"), am.map(mod => {
    const done = mod.tasks.filter(t => t.done).length,
      tot = mod.tasks.length,
      pMod = tot ? Math.round(done / tot * 100) : 0;
    return React.createElement("div", {
      key: mod.id,
      style: {
        marginBottom: 18
      }
    }, React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 14px",
        background: mod.color + "22",
        borderLeft: `4px solid ${mod.color}`,
        marginBottom: 2
      }
    }, React.createElement("span", {
      style: {
        fontSize: 18
      }
    }, mod.icon), React.createElement("div", {
      style: {
        flex: 1
      }
    }, React.createElement("div", {
      style: {
        fontWeight: 700,
        fontSize: 14,
        color: "#1e293b"
      }
    }, mod.name), React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#64748b"
      }
    }, mod.phase)), React.createElement("div", {
      style: {
        textAlign: "right"
      }
    }, React.createElement("div", {
      style: {
        fontWeight: 700,
        fontSize: 13,
        color: mod.color
      }
    }, pMod, "%"), React.createElement("div", {
      style: {
        fontSize: 10,
        color: "#64748b"
      }
    }, done, "/", tot, " tareas"))), React.createElement("div", {
      style: {
        height: 4,
        background: "#e2e8f0",
        marginBottom: 6
      }
    }, React.createElement("div", {
      style: {
        height: "100%",
        width: `${pMod}%`,
        background: mod.color
      }
    })), mod.tasks.map(t => {
      const ov = isOverdue(t),
        sn = isDueSoon(t);
      const hLog = t.hoursLog || [];
      const hAdmin = hLog.filter(h => h.authorRole === "admin").reduce((a, h) => a + (parseFloat(h.hours) || 0), 0);
      const hTeam = hLog.filter(h => h.authorRole === "team").reduce((a, h) => a + (parseFloat(h.hours) || 0), 0);
      const hasHours = hAdmin > 0 || hTeam > 0;
      const hasMins = (t.minutes || []).length > 0;
      return React.createElement("div", {
        key: t.id,
        style: {
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "7px 10px 7px 14px",
          borderBottom: "1px solid #f1f5f9",
          background: t.done ? "#f8fafc" : "white"
        }
      }, React.createElement("div", {
        style: {
          width: 16,
          height: 16,
          border: `2px solid ${t.done ? mod.color : "#cbd5e1"}`,
          background: t.done ? mod.color : "white",
          borderRadius: 3,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, t.done && React.createElement("span", {
        style: {
          color: "white",
          fontSize: 10,
          fontWeight: 700
        }
      }, "✓")), React.createElement("span", {
        style: {
          flex: 1,
          fontSize: 12,
          color: t.done ? "#94a3b8" : "#1e293b",
          textDecoration: t.done ? "line-through" : "none"
        }
      }, t.label), React.createElement("div", {
        style: {
          display: "flex",
          gap: 6,
          alignItems: "center",
          flexShrink: 0
        }
      }, t.startDate && React.createElement("span", {
        style: {
          fontSize: 10,
          color: "#64748b",
          background: "#f1f5f9",
          padding: "2px 6px",
          borderRadius: 3
        }
      }, fmtD(t.startDate)), t.startDate && t.dueDate && React.createElement("span", {
        style: {
          fontSize: 10,
          color: "#cbd5e1"
        }
      }, "→"), t.dueDate && React.createElement("span", {
        style: {
          fontSize: 10,
          fontWeight: 600,
          color: t.done ? "#94a3b8" : ov ? "#dc2626" : sn ? "#d97706" : "#475569",
          background: t.done ? "#f1f5f9" : ov ? "#fef2f2" : sn ? "#fffbeb" : "#f1f5f9",
          padding: "2px 6px",
          borderRadius: 3
        }
      }, fmtD(t.dueDate), t.duration ? ` · ${t.duration}d` : "")), React.createElement("span", {
        style: {
          fontSize: 9,
          fontWeight: 700,
          color: t.done ? "#16a34a" : ov ? "#dc2626" : sn ? "#d97706" : "#64748b",
          background: t.done ? "#dcfce7" : ov ? "#fee2e2" : sn ? "#fef3c7" : "#f1f5f9",
          padding: "2px 7px",
          borderRadius: 10,
          flexShrink: 0,
          whiteSpace: "nowrap"
        }
      }, t.done ? "✓ Hecha" : ov ? "⚠ Vencida" : sn ? "⏰ Próxima" : "En curso"), hAdmin > 0 && React.createElement("span", {
        style: {
          fontSize: 9,
          color: "#b45309",
          background: "#fef3c7",
          padding: "2px 6px",
          borderRadius: 10,
          flexShrink: 0
        }
      }, hAdmin, "h adm"), hTeam > 0 && React.createElement("span", {
        style: {
          fontSize: 9,
          color: "#0369a1",
          background: "#dbeafe",
          padding: "2px 6px",
          borderRadius: 10,
          flexShrink: 0
        }
      }, hTeam, "h cli"), hasMins && React.createElement("span", {
        style: {
          fontSize: 9,
          color: "#7c3aed",
          background: "#ede9fe",
          padding: "2px 6px",
          borderRadius: 10,
          flexShrink: 0
        }
      }, "📋", (t.minutes || []).length));
    }));
  }), React.createElement("div", {
    style: {
      marginTop: 20,
      paddingTop: 10,
      borderTop: "1px solid #e2e8f0",
      display: "flex",
      justifyContent: "space-between",
      fontSize: 10,
      color: "#94a3b8"
    }
  }, React.createElement("span", null, "ManduHubCity · ", proj.projectName), React.createElement("span", null, now)), printHard && hardPhases.length > 0 && (() => {
    const root = hardPhases.find(p => !p.belongsTo);
    const rootName = root?.name || "";
    const hardMods = hardPhases.filter(p => p.belongsTo === rootName && rootName !== "");
    const tasksByMod = {};
    hardPhases.filter(p => p.belongsTo && p.belongsTo !== rootName).forEach(p => {
      if (!tasksByMod[p.belongsTo]) tasksByMod[p.belongsTo] = [];
      tasksByMod[p.belongsTo].push(p);
    });
    return React.createElement("div", {
      style: {
        marginTop: 24
      }
    }, React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        color: "#0f766e",
        borderBottom: "2px solid #0f766e",
        paddingBottom: 6,
        marginBottom: 14
      }
    }, "🔗 Implementación Hard (Severa) — ", severaData?.name), hardMods.map(mod => {
      const tasks = tasksByMod[mod.name] || [];
      const done = tasks.filter(t => t.isCompleted).length;
      const tot = tasks.length;
      const pct = tot ? Math.round(done / tot * 100) : mod.isCompleted ? 100 : 0;
      const modHD = (proj.hardData || {})[mod.guid] || {
        notes: "",
        hoursLog: []
      };
      const modHrs = modHD.hoursLog.reduce((a, h) => a + (parseFloat(h.hours) || 0), 0);
      const isLate = !mod.isCompleted && mod.deadline && parseD(mod.deadline) < TODAY;
      return React.createElement("div", {
        key: mod.guid,
        style: {
          marginBottom: 16
        }
      }, React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 14px",
          background: "#f0fdf4",
          borderLeft: "4px solid #0f766e",
          marginBottom: 2
        }
      }, React.createElement("span", {
        style: {
          fontSize: 18
        }
      }, "🔗"), React.createElement("div", {
        style: {
          flex: 1
        }
      }, React.createElement("div", {
        style: {
          fontWeight: 700,
          fontSize: 14,
          color: "#065f46"
        }
      }, mod.name), React.createElement("div", {
        style: {
          fontSize: 11,
          color: "#64748b"
        }
      }, "SEVERA HARD")), React.createElement("div", {
        style: {
          textAlign: "right"
        }
      }, React.createElement("div", {
        style: {
          fontWeight: 700,
          fontSize: 13,
          color: "#0f766e"
        }
      }, pct, "%"), React.createElement("div", {
        style: {
          fontSize: 10,
          color: "#64748b"
        }
      }, done, "/", tot, " tareas", modHrs > 0 ? ` · ${modHrs}h` : "")), React.createElement("div", {
        style: {
          marginLeft: 8,
          textAlign: "right",
          fontSize: 10,
          color: "#64748b"
        }
      }, mod.startDate && React.createElement("div", null, fmtD(mod.startDate)), mod.deadline && React.createElement("div", {
        style: {
          color: mod.isCompleted ? "#94a3b8" : isLate ? "#dc2626" : "#64748b",
          fontWeight: isLate ? 700 : 400
        }
      }, fmtD(mod.deadline)))), React.createElement("div", {
        style: {
          height: 4,
          background: "#d1fae5",
          marginBottom: 4
        }
      }, React.createElement("div", {
        style: {
          height: "100%",
          width: `${pct}%`,
          background: "#0f766e"
        }
      })), modHD.notes && React.createElement("div", {
        style: {
          padding: "4px 14px 6px",
          fontSize: 11,
          color: "#475569",
          fontStyle: "italic",
          background: "#f8fafc",
          borderLeft: "2px solid #d1fae5"
        }
      }, "📝 ", modHD.notes), tasks.map(t => {
        const tHD = (proj.hardData || {})[t.guid] || {
          notes: "",
          hoursLog: []
        };
        const tHrs = tHD.hoursLog.reduce((a, h) => a + (parseFloat(h.hours) || 0), 0);
        const tLate = !t.isCompleted && t.deadline && parseD(t.deadline) < TODAY;
        return React.createElement("div", {
          key: t.guid,
          style: {
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "7px 10px 7px 22px",
            borderBottom: "1px solid #f1f5f9",
            background: t.isCompleted ? "#f8fafc" : "white"
          }
        }, React.createElement("div", {
          style: {
            width: 16,
            height: 16,
            border: `2px solid ${t.isCompleted ? "#0f766e" : "#cbd5e1"}`,
            background: t.isCompleted ? "#0f766e" : "white",
            borderRadius: 3,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }
        }, t.isCompleted && React.createElement("span", {
          style: {
            color: "white",
            fontSize: 10,
            fontWeight: 700
          }
        }, "✓")), React.createElement("span", {
          style: {
            flex: 1,
            fontSize: 12,
            color: t.isCompleted ? "#94a3b8" : "#1e293b",
            textDecoration: t.isCompleted ? "line-through" : "none"
          }
        }, t.name), React.createElement("div", {
          style: {
            display: "flex",
            gap: 6,
            alignItems: "center",
            flexShrink: 0
          }
        }, t.startDate && React.createElement("span", {
          style: {
            fontSize: 10,
            color: "#64748b",
            background: "#f1f5f9",
            padding: "2px 6px",
            borderRadius: 3
          }
        }, fmtD(t.startDate)), t.startDate && t.deadline && React.createElement("span", {
          style: {
            fontSize: 10,
            color: "#cbd5e1"
          }
        }, "→"), t.deadline && React.createElement("span", {
          style: {
            fontSize: 10,
            fontWeight: 600,
            color: t.isCompleted ? "#94a3b8" : tLate ? "#dc2626" : "#475569",
            background: t.isCompleted ? "#f1f5f9" : tLate ? "#fef2f2" : "#f1f5f9",
            padding: "2px 6px",
            borderRadius: 3
          }
        }, fmtD(t.deadline))), React.createElement("span", {
          style: {
            fontSize: 9,
            fontWeight: 700,
            color: t.isCompleted ? "#16a34a" : tLate ? "#dc2626" : "#64748b",
            background: t.isCompleted ? "#dcfce7" : tLate ? "#fee2e2" : "#f1f5f9",
            padding: "2px 7px",
            borderRadius: 10,
            flexShrink: 0
          }
        }, t.isCompleted ? "✓ Hecha" : tLate ? "⚠ Vencida" : "En curso"), tHrs > 0 && React.createElement("span", {
          style: {
            fontSize: 9,
            color: "#0369a1",
            background: "#dbeafe",
            padding: "2px 6px",
            borderRadius: 10,
            flexShrink: 0
          }
        }, tHrs, "h"), tHD.notes && React.createElement("span", {
          style: {
            fontSize: 9,
            color: "#7c3aed",
            background: "#ede9fe",
            padding: "2px 6px",
            borderRadius: 10,
            flexShrink: 0
          }
        }, "📝"));
      }));
    }));
  })()));
}
function HardCommentBox({
  mod,
  proj,
  session,
  onSave
}) {
  const [text, setText] = React.useState("");
  const key = "hard_comments_" + (mod.guid || mod.name);
  const comments = proj.hardData && proj.hardData[key] ? proj.hardData[key] : [];
  const send = () => {
    if (!text.trim()) return;
    const c = {
      id: "hc" + Date.now(),
      text: text.trim(),
      authorName: session.name,
      authorEmoji: session.emoji || "💬",
      ts: Date.now()
    };
    const updatedHardData = {
      ...(proj.hardData || {}),
      [key]: [...comments, c]
    };
    onSave({
      ...proj,
      hardData: updatedHardData
    });
    setText("");
  };
  if (!comments.length && !text) return React.createElement("div", {
    style: {
      marginTop: 6
    }
  }, React.createElement("input", {
    placeholder: "Agregar comentario al módulo...",
    style: {
      width: "100%",
      background: "transparent",
      border: "none",
      borderBottom: "1px solid #7dc9b233",
      padding: "5px 0",
      fontSize: 12,
      color: "#7dc9b2",
      outline: "none",
      fontFamily: "Inter"
    },
    value: text,
    onChange: e => setText(e.target.value),
    onKeyDown: e => {
      if (e.key === "Enter") {
        e.preventDefault();
        send();
      }
    }
  }));
  return React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, comments.length > 0 && React.createElement("div", {
    style: {
      marginBottom: 6
    }
  }, comments.slice(-3).map(c => React.createElement("div", {
    key: c.id,
    style: {
      display: "flex",
      gap: 6,
      marginBottom: 4,
      fontSize: 11
    }
  }, React.createElement("span", null, c.authorEmoji), React.createElement("span", {
    style: {
      color: D.textMuted
    }
  }, c.authorName, ":"), React.createElement("span", {
    style: {
      color: D.text,
      flex: 1
    }
  }, c.text)))), React.createElement("div", {
    style: {
      display: "flex",
      gap: 6
    }
  }, React.createElement("input", {
    placeholder: "Comentar...",
    style: {
      flex: 1,
      background: "transparent",
      border: "none",
      borderBottom: "1px solid #7dc9b233",
      padding: "4px 0",
      fontSize: 12,
      color: "#7dc9b2",
      outline: "none",
      fontFamily: "Inter"
    },
    value: text,
    onChange: e => setText(e.target.value),
    onKeyDown: e => {
      if (e.key === "Enter") {
        e.preventDefault();
        send();
      }
    }
  }), text && React.createElement("button", {
    onClick: send,
    style: {
      background: "#7dc9b2",
      color: "#004949",
      border: "none",
      fontFamily: "'Press Start 2P',monospace",
      fontSize: 6,
      padding: "4px 8px",
      cursor: "pointer"
    }
  }, "OK")));
}
function MessagesView({
  projects,
  onUpdate,
  session
}) {
  const [filter, setFilter] = useState("unread");
  const typeIcon = {
    comment: "💬",
    minute: "📋",
    hours: "⏱",
    overdue: "⚠️"
  };
  const typeLabel = {
    comment: "Comentario",
    minute: "Minuta",
    hours: "Horas cargadas",
    overdue: "Tarea vencida"
  };
  const typeBg = {
    comment: "#C77DFF22",
    minute: "#4ECDC422",
    hours: "#52B78822",
    overdue: "#FF475722"
  };
  const typeBorder = {
    comment: "#C77DFF44",
    minute: "#4ECDC444",
    hours: "#52B78844",
    overdue: "#FF475744"
  };
  const typeColor = {
    comment: "#C77DFF",
    minute: "#4ECDC4",
    hours: "#52B788",
    overdue: "#FF4757"
  };
  const allMessages = [];
  projects.forEach(({
    proj,
    role
  }) => {
    (proj.messages || []).forEach(msg => {
      allMessages.push({
        ...msg,
        proj,
        role
      });
    });
  });
  allMessages.sort((a, b) => new Date(b.date) - new Date(a.date));
  const shown = allMessages.filter(m => {
    if (filter === "unread") return !m.read;
    if (filter === "overdue") return m.type === "overdue";
    return true;
  });
  const markRead = msg => {
    const proj = {
      ...msg.proj,
      messages: (msg.proj.messages || []).map(m => m.id === msg.id ? {
        ...m,
        read: true
      } : m)
    };
    onUpdate(proj);
  };
  const markAllRead = () => {
    const grouped = {};
    allMessages.filter(m => !m.read).forEach(m => {
      if (!grouped[m.proj.id]) grouped[m.proj.id] = {
        ...m.proj
      };
      grouped[m.proj.id].messages = (grouped[m.proj.id].messages || []).map(msg => ({
        ...msg,
        read: true
      }));
    });
    Object.values(grouped).forEach(proj => onUpdate(proj));
  };
  const unreadCount = allMessages.filter(m => !m.read).length;
  return React.createElement("div", null, React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 16,
      flexWrap: "wrap"
    }
  }, React.createElement("div", {
    style: {
      fontFamily: "'Press Start 2P',monospace",
      fontSize: 7,
      color: "#4ECDC4"
    }
  }, "📬 MENSAJES Y ALERTAS"), unreadCount > 0 && React.createElement("span", {
    style: {
      background: "#FF4757",
      color: "white",
      borderRadius: 10,
      fontSize: 10,
      fontWeight: 700,
      padding: "2px 8px"
    }
  }, unreadCount, " sin leer"), React.createElement("div", {
    style: {
      marginLeft: "auto",
      display: "flex",
      gap: 6
    }
  }, [{
    id: "unread",
    label: "Sin leer"
  }, {
    id: "overdue",
    label: "⚠️ Vencidas"
  }, {
    id: "all",
    label: "Todos"
  }].map(f => React.createElement("div", {
    key: f.id,
    onClick: () => setFilter(f.id),
    style: {
      padding: "5px 12px",
      border: `1px solid ${filter === f.id ? "#4ECDC4" : "#2A3F58"}`,
      color: filter === f.id ? "#4ECDC4" : "#7A8FA6",
      cursor: "pointer",
      fontSize: 11,
      background: filter === f.id ? "#4ECDC422" : "transparent"
    }
  }, f.label)), unreadCount > 0 && React.createElement("button", {
    onClick: markAllRead,
    style: {
      padding: "5px 12px",
      background: "transparent",
      border: "1px solid #2A3F58",
      color: "#7A8FA6",
      cursor: "pointer",
      fontSize: 11,
      fontFamily: "Inter"
    }
  }, "✓ Marcar todos leídos"))), shown.length === 0 && React.createElement("div", {
    style: {
      background: "#1A2332",
      border: "1px dashed #2A3F58",
      padding: 48,
      textAlign: "center",
      color: "#7A8FA6",
      fontSize: 12
    }
  }, filter === "unread" ? "✅ No hay mensajes sin leer" : "No hay mensajes"), React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, shown.map(msg => React.createElement("div", {
    key: msg.id,
    style: {
      background: msg.read ? "#0F1620" : "#1A2332",
      border: `1px solid ${msg.read ? "#1E2D40" : typeBorder[msg.type] || "#2A3F58"}`,
      padding: 14,
      opacity: msg.read ? 0.7 : 1
    }
  }, React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 10
    }
  }, React.createElement("div", {
    style: {
      background: typeBg[msg.type],
      border: `1px solid ${typeBorder[msg.type]}`,
      color: typeColor[msg.type],
      padding: "4px 8px",
      fontFamily: "'Press Start 2P',monospace",
      fontSize: 6,
      flexShrink: 0,
      whiteSpace: "nowrap"
    }
  }, typeIcon[msg.type], " ", typeLabel[msg.type]), React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap",
      alignItems: "center",
      marginBottom: 4
    }
  }, React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      color: "#E8EDF2"
    }
  }, msg.proj.projectName || msg.proj.name), msg.proj.clientId && React.createElement("span", {
    style: {
      fontSize: 10,
      color: "#4ECDC4",
      fontFamily: "monospace"
    }
  }, "🪪", msg.proj.clientId), React.createElement("span", {
    style: {
      fontSize: 10,
      color: "#7A8FA6"
    }
  }, "›"), React.createElement("span", {
    style: {
      fontSize: 10,
      color: "#7A8FA6"
    }
  }, msg.modName), React.createElement("span", {
    style: {
      fontSize: 10,
      color: "#7A8FA6"
    }
  }, "›"), React.createElement("span", {
    style: {
      fontSize: 10,
      color: "#7A8FA6"
    }
  }, msg.taskLabel)), React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      alignItems: "center",
      marginBottom: 4
    }
  }, React.createElement("span", {
    style: {
      fontSize: 13
    }
  }, msg.authorEmoji), React.createElement("span", {
    style: {
      fontSize: 11,
      color: "#7A8FA6"
    }
  }, msg.authorName), React.createElement("span", {
    style: {
      fontSize: 10,
      color: "#2A3F58"
    }
  }, "·"), React.createElement("span", {
    style: {
      fontSize: 10,
      color: "#2A3F58"
    }
  }, new Date(msg.date).toLocaleDateString('es-AR'))), React.createElement("div", {
    style: {
      fontSize: 12,
      color: msg.type === "overdue" ? "#FF4757" : "#E8EDF2",
      background: "#0D1117",
      padding: "6px 10px",
      borderLeft: `2px solid ${typeColor[msg.type] || "#2A3F58"}`
    }
  }, msg.text)), React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 4,
      flexShrink: 0
    }
  }, !msg.read && React.createElement("button", {
    onClick: () => markRead(msg),
    style: {
      background: "transparent",
      border: "1px solid #2A3F58",
      color: "#7A8FA6",
      fontFamily: "'Press Start 2P',monospace",
      fontSize: 6,
      padding: "4px 8px",
      cursor: "pointer",
      whiteSpace: "nowrap"
    }
  }, "✓ LEÍDO")))))));
}
function HardView({
  projects,
  appsScriptUrl
}) {
  const [severaData, setSeveraData] = useState({});
  const [loading, setLoading] = useState({});
  const [filter, setFilter] = useState("all");
  const linked = projects.filter(({
    proj
  }) => proj.severaProjectId);
  const shown = filter === "linked" ? linked : filter === "unlinked" ? projects.filter(({
    proj
  }) => !proj.severaProjectId) : projects;
  const loadSevera = async proj => {
    if (severaData[proj.id] || loading[proj.id]) return;
    setLoading(l => ({
      ...l,
      [proj.id]: true
    }));
    try {
      const res = await fetch(appsScriptUrl + "?action=getSeveraProject&projectNumber=" + encodeURIComponent(proj.severaProjectId) + "&t=" + Date.now());
      const data = await res.json();
      setSeveraData(d => ({
        ...d,
        [proj.id]: data
      }));
    } catch (e) {
      setSeveraData(d => ({
        ...d,
        [proj.id]: {
          error: e.message
        }
      }));
    }
    setLoading(l => ({
      ...l,
      [proj.id]: false
    }));
  };
  useEffect(() => {
    linked.forEach(({
      proj
    }) => loadSevera(proj));
  }, [linked.length]);
  const statusColor = ph => {
    if (ph.isCompleted) return "#A8E6CF";
    if (ph.status && ph.status.toLowerCase().includes("progress")) return "#FFD700";
    return "#7A8FA6";
  };
  const statusIcon = ph => ph.isCompleted ? "✅" : "🔄";
  return React.createElement("div", {
    style: {
      padding: "0 0 20px"
    }
  }, React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 16,
      alignItems: "center",
      flexWrap: "wrap"
    }
  }, React.createElement("span", {
    style: {
      fontFamily: "'Press Start 2P',monospace",
      fontSize: 7,
      color: "#7dc9b2"
    }
  }, "🔗 PROYECTOS HARD"), React.createElement("div", {
    style: {
      marginLeft: "auto",
      display: "flex",
      gap: 6
    }
  }, [{
    id: "all",
    label: "Todos"
  }, {
    id: "linked",
    label: "Vinculados"
  }, {
    id: "unlinked",
    label: "Sin vincular"
  }].map(f => React.createElement("div", {
    key: f.id,
    onClick: () => setFilter(f.id),
    style: {
      padding: "5px 12px",
      border: `1px solid ${filter === f.id ? "#7dc9b2" : "#2A3F58"}`,
      color: filter === f.id ? "#7dc9b2" : "#7A8FA6",
      cursor: "pointer",
      fontSize: 11,
      background: filter === f.id ? "#7dc9b222" : "transparent"
    }
  }, f.label)))), shown.length === 0 && React.createElement("div", {
    style: {
      background: "#1A2332",
      border: "1px dashed #2A3F58",
      padding: 48,
      textAlign: "center",
      color: "#7A8FA6",
      fontSize: 12
    }
  }, "No hay proyectos para mostrar"), React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))",
      gap: 16
    }
  }, shown.map(({
    proj
  }) => {
    const sv = severaData[proj.id];
    const isLoading = loading[proj.id];
    const hasLink = !!proj.severaProjectId;
    return React.createElement("div", {
      key: proj.id,
      style: {
        background: "#1A2332",
        border: `1px solid ${hasLink && sv && !sv.error ? "#7dc9b266" : "#2A3F58"}`,
        padding: 14
      }
    }, React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "flex-start",
        gap: 8,
        marginBottom: 10
      }
    }, React.createElement("div", {
      style: {
        flex: 1
      }
    }, React.createElement("div", {
      style: {
        fontWeight: 600,
        fontSize: 13,
        color: "#E8EDF2",
        marginBottom: 3
      }
    }, proj.projectName || proj.name), React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        flexWrap: "wrap",
        alignItems: "center"
      }
    }, proj.clientId && React.createElement("span", {
      style: {
        fontSize: 10,
        color: "#4ECDC4",
        fontFamily: "monospace"
      }
    }, "🪪 ", proj.clientId), proj.tipo && React.createElement("span", {
      style: {
        fontFamily: "'Press Start 2P',monospace",
        fontSize: 6,
        color: "#FFD700",
        background: "#FFD70022",
        border: "1px solid #FFD70044",
        padding: "2px 5px"
      }
    }, proj.tipo))), hasLink ? React.createElement("span", {
      style: {
        fontFamily: "'Press Start 2P',monospace",
        fontSize: 6,
        color: "#7dc9b2",
        background: "#7dc9b222",
        border: "1px solid #7dc9b244",
        padding: "3px 6px",
        flexShrink: 0
      }
    }, "🔗 #", proj.severaProjectId) : React.createElement("span", {
      style: {
        fontFamily: "'Press Start 2P',monospace",
        fontSize: 6,
        color: "#2A3F58",
        background: "transparent",
        border: "1px solid #2A3F58",
        padding: "3px 6px",
        flexShrink: 0
      }
    }, "SIN VINCULAR")), hasLink && React.createElement(React.Fragment, null, isLoading && React.createElement("div", {
      style: {
        color: "#7A8FA6",
        fontSize: 11,
        padding: "8px 0"
      }
    }, "⏳ Cargando datos de Severa..."), sv && sv.error && React.createElement("div", {
      style: {
        color: "#FF4757",
        fontSize: 11,
        padding: "8px 0"
      }
    }, "⚠️ ", sv.error), sv && !sv.error && React.createElement(React.Fragment, null, React.createElement("div", {
      style: {
        background: "#0D1117",
        border: "1px solid #2A3F58",
        padding: 10,
        marginBottom: 10
      }
    }, React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 6
      }
    }, React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#7dc9b2",
        fontWeight: 600
      }
    }, sv.name), React.createElement("span", {
      style: {
        fontSize: 10,
        color: sv.isOpen ? "#A8E6CF" : "#7A8FA6",
        background: sv.isOpen ? "#A8E6CF22" : "#2A3F5844",
        border: `1px solid ${sv.isOpen ? "#A8E6CF44" : "#2A3F58"}`,
        padding: "2px 8px"
      }
    }, sv.isOpen ? "Abierto" : "Cerrado")), React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#7A8FA6",
        marginBottom: 4
      }
    }, "👤 ", sv.customer), React.createElement("div", {
      style: {
        display: "flex",
        gap: 12,
        fontSize: 10,
        color: "#7A8FA6"
      }
    }, sv.startDate && React.createElement("span", null, "📅 ", fmtD(sv.startDate)), sv.deadline && React.createElement("span", null, "🏁 ", fmtD(sv.deadline)))), sv.phases && sv.phases.length > 0 && React.createElement(React.Fragment, null, React.createElement("div", {
      style: {
        fontFamily: "'Press Start 2P',monospace",
        fontSize: 6,
        color: "#7A8FA6",
        marginBottom: 7
      }
    }, "FASES / MÓDULOS"), sv.phases.map(ph => React.createElement("div", {
      key: ph.guid,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 0",
        borderBottom: "1px solid #1A2332"
      }
    }, React.createElement("span", {
      style: {
        fontSize: 12,
        flexShrink: 0
      }
    }, statusIcon(ph)), React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, React.createElement("div", {
      style: {
        fontSize: 11,
        color: statusColor(ph),
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }
    }, ph.name), ph.belongsTo && React.createElement("div", {
      style: {
        fontSize: 9,
        color: "#2A3F58"
      }
    }, "↳ ", ph.belongsTo)), React.createElement("div", {
      style: {
        fontSize: 9,
        color: "#7A8FA6",
        flexShrink: 0,
        textAlign: "right"
      }
    }, ph.startDate && React.createElement("div", null, fmtD(ph.startDate)), ph.deadline && React.createElement("div", {
      style: {
        color: ph.isCompleted ? "#A8E6CF" : parseD(ph.deadline) < TODAY ? "#FF4757" : "#7A8FA6"
      }
    }, fmtD(ph.deadline))))), React.createElement("div", {
      style: {
        marginTop: 8
      }
    }, React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        fontSize: 10,
        color: "#7A8FA6",
        marginBottom: 3
      }
    }, React.createElement("span", null, sv.phases.filter(p => p.isCompleted).length, "/", sv.phases.length, " fases completadas"), React.createElement("span", {
      style: {
        fontFamily: "'Press Start 2P',monospace",
        fontSize: 6,
        color: "#7dc9b2"
      }
    }, sv.phases.length ? Math.round(sv.phases.filter(p => p.isCompleted).length / sv.phases.length * 100) : 0, "%")), React.createElement("div", {
      style: {
        height: 4,
        background: "#0D1117",
        overflow: "hidden"
      }
    }, React.createElement("div", {
      style: {
        height: "100%",
        width: `${sv.phases.length ? Math.round(sv.phases.filter(p => p.isCompleted).length / sv.phases.length * 100) : 0}%`,
        background: "#7dc9b2",
        transition: "width .5s"
      }
    })))))), !hasLink && React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#2A3F58",
        marginTop: 4
      }
    }, "Configurá el Project ID de Severa en ⚙ Config para vincular este proyecto."));
  })));
}
function TalentCity() {
  const [appState, setAppState] = useState(null);
  const [screen, setScreen] = useState("login");
  const [session, setSession] = useState(null);
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [printProjectId, setPrintProjectId] = useState(null);
  const [toast, setToast] = useState(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPin, setLoginPin] = useState("");
  const [loginStep, setLoginStep] = useState("email");
  const [loginRoles, setLoginRoles] = useState([]);
  const [loginError, setLoginError] = useState("");
  const [showNewProj, setShowNewProj] = useState(false);
  const [newProjName, setNewProjName] = useState("");
  const [newProjTipo, setNewProjTipo] = useState("");
  const [dashTab, setDashTab] = useState("projects");
  const [dayMode, setDayMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTipo, setFilterTipo] = useState("");
  const [filterAdmin, setFilterAdmin] = useState("");
  const [templates, setTemplates] = useState([]);
  const [loadingTemplates, setLoadingTemplates] = useState(false);
  useEffect(() => {
    loadAll().then(d => {
      if (d && d.projects) {
        setAppState(d);
      } else {
        const defaultProj = makeProject("Mi Ciudad", "");
        const init = {
          projects: [defaultProj],
          superadminEmails: ["nicolas.garcia@visma.com"],
          superadminPin: "0000",
          superadminName: "Nicolás García"
        };
        setAppState(init);
      }
    });
    loadTemplates();
  }, []);
  const loadTemplates = async () => {
    setLoadingTemplates(true);
    try {
      const res = await fetch(APPS_SCRIPT_URL + "?action=getTemplates&t=" + Date.now());
      const data = await res.json();
      if (Array.isArray(data)) setTemplates(data);
    } catch (e) {
      console.error("Error loading templates:", e);
    }
    setLoadingTemplates(false);
  };
  const showToast = (msg, type = "ok") => {
    setToast({
      msg,
      type
    });
    setTimeout(() => setToast(null), 2800);
  };
  const persist2 = async (ns, silent = true) => {
    const ok = await saveAll(ns);
    if (!ok && !silent) showToast("Error al guardar", "error");
    return ok;
  };
  const updApp = ns => setAppState(ns);
  const ToastEl = toast ? React.createElement("div", {
    style: {
      position: "fixed",
      bottom: 18,
      right: 18,
      zIndex: 900,
      background: "#1E2D40",
      border: `1px solid ${toast.type === "error" ? "#FF4757" : "#4ECDC4"}`,
      padding: "10px 14px",
      maxWidth: 280,
      fontFamily: "'Press Start 2P',monospace",
      animation: "slideIn .3s ease"
    }
  }, React.createElement("div", {
    style: {
      fontSize: 5,
      color: toast.type === "error" ? "#FF4757" : "#4ECDC4",
      marginBottom: 3
    }
  }, toast.type === "error" ? "ERROR" : "✓ OK"), React.createElement("div", {
    style: {
      fontSize: 12,
      fontFamily: "Inter,sans-serif"
    }
  }, toast.msg), React.createElement("style", null, `@keyframes slideIn{from{transform:translateX(120%);opacity:0}to{transform:translateX(0);opacity:1}}`)) : null;
  if (!appState) return React.createElement("div", {
    style: {
      background: "#0D1117",
      color: "#4ECDC4",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Press Start 2P',monospace",
      fontSize: 10
    }
  }, "CARGANDO...");
  const LoginScreen = () => {
    const px2 = s => ({
      fontFamily: "'Press Start 2P',monospace",
      ...s
    });
    const handleEmailNext = () => {
      const e = loginEmail.toLowerCase().trim();
      if (!e || !e.includes("@")) {
        setLoginError("Ingresá un email válido");
        return;
      }
      const roles = getRolesForEmail(e, appState);
      if (roles.length === 0) {
        setLoginError("No encontramos una cuenta con ese email.\nContactá al administrador.");
        return;
      }
      setLoginRoles(roles);
      setLoginStep("pin");
      setLoginError("");
      setLoginPin("");
    };
    const handlePinSubmit = () => {
      const e = loginEmail.toLowerCase().trim();
      const matched = loginRoles.filter(r => {
        const expected = r.type === "superadmin" ? appState.superadminPin || "0000" : r.pin || "1111";
        return loginPin === expected;
      });
      if (matched.length === 0) {
        setLoginError("PIN incorrecto");
        setLoginPin("");
        return;
      }
      const isSuperadmin = matched.some(r => r.type === "superadmin");
      const isProjAdmin = matched.some(r => r.type === "projadmin");
      const isTeam = matched.some(r => r.type === "team");
      const isEclient = matched.some(r => r.type === "eclient");
      const teamRole = matched.find(r => r.type === "team");
      const eclientRole = matched.find(r => r.type === "eclient");
      const projAdminRole = matched.find(r => r.type === "projadmin");
      const memberRole = eclientRole || teamRole;
      setSession({
        email: e,
        name: isSuperadmin ? appState.superadminName || "Superadmin" : isProjAdmin ? projAdminRole?.desc || "Admin" : memberRole?.memberName || e,
        emoji: memberRole ? memberRole.memberEmoji : isSuperadmin ? "👑" : "🏗️",
        isSuperadmin,
        isProjAdmin,
        isTeam,
        isEclient,
        matchedRoles: matched
      });
      setScreen("dashboard");
      setLoginError("");
    };
    const inputStyle = {
      width: "100%",
      background: "transparent",
      border: "none",
      borderBottom: "1.5px solid rgba(255,255,255,0.2)",
      padding: "8px 0",
      fontSize: 14,
      color: "#fff",
      outline: "none",
      fontFamily: "DM Sans,Inter,sans-serif",
      transition: "border-color .2s",
      boxSizing: "border-box"
    };
    const labelStyle = {
      display: "block",
      fontSize: 11,
      color: "rgba(255,255,255,0.5)",
      marginBottom: 6,
      letterSpacing: "0.5px",
      textTransform: "uppercase"
    };
    const btnStyle = {
      width: "100%",
      padding: 13,
      background: "#BEDE7A",
      color: "#004949",
      border: "none",
      borderRadius: 8,
      fontSize: 14,
      fontWeight: 600,
      cursor: "pointer",
      fontFamily: "DM Sans,Inter,sans-serif",
      marginTop: 8
    };
    return React.createElement("div", {
      style: {
        background: "#004949",
        minHeight: "100vh",
        display: "flex",
        fontFamily: "DM Sans,Inter,sans-serif"
      }
    }, React.createElement("div", {
      style: {
        width: 380,
        flexShrink: 0,
        padding: "56px 48px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }
    }, React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 14,
        marginBottom: 44
      }
    }, React.createElement("span", {
      style: {
        fontSize: 26,
        fontWeight: 700,
        color: "#f5f0e8",
        letterSpacing: "-0.5px"
      }
    }, "mandü"), React.createElement("div", {
      style: {
        width: 1.5,
        height: 28,
        background: "rgba(255,255,255,0.3)"
      }
    }), React.createElement("span", {
      style: {
        fontSize: 22,
        fontWeight: 400,
        color: "#f5f0e8",
        letterSpacing: "-0.3px"
      }
    }, "Hub City")), loginStep === "email" && React.createElement(React.Fragment, null, React.createElement("div", {
      style: {
        marginBottom: 20
      }
    }, React.createElement("label", {
      style: {
        ...labelStyle
      }
    }, "Usuario"), React.createElement("input", {
      autoFocus: true,
      type: "email",
      value: loginEmail,
      onChange: e => {
        setLoginEmail(e.target.value);
        setLoginError("");
      },
      onKeyDown: e => e.key === "Enter" && handleEmailNext(),
      placeholder: "email@empresa.com",
      style: {
        ...inputStyle,
        borderBottomColor: loginError ? "#FF4757" : "rgba(255,255,255,0.2)"
      }
    })), loginError && React.createElement("div", {
      style: {
        color: "#FF4757",
        fontSize: 11,
        marginBottom: 8
      }
    }, "⚠ ", loginError), React.createElement("button", {
      onClick: handleEmailNext,
      style: {
        ...btnStyle
      }
    }, "Ingresar"), React.createElement("div", {
      style: {
        fontSize: 11,
        color: "rgba(255,255,255,0.25)",
        marginTop: 12,
        textAlign: "center"
      }
    }, appState.projects.length, " proyecto", appState.projects.length !== 1 ? "s" : "", " activo", appState.projects.length !== 1 ? "s" : "")), loginStep === "pin" && React.createElement(React.Fragment, null, React.createElement("button", {
      onClick: () => {
        setLoginStep("email");
        setLoginError("");
        setLoginPin("");
      },
      style: {
        background: "none",
        border: "none",
        color: "rgba(255,255,255,0.4)",
        cursor: "pointer",
        fontSize: 13,
        padding: 0,
        marginBottom: 20,
        textAlign: "left",
        fontFamily: "DM Sans,Inter,sans-serif"
      }
    }, "← volver"), React.createElement("div", {
      style: {
        marginBottom: 16,
        padding: "10px 14px",
        background: "rgba(255,255,255,0.05)",
        borderRadius: 6
      }
    }, React.createElement("div", {
      style: {
        fontSize: 11,
        color: "rgba(255,255,255,0.4)",
        marginBottom: 4
      }
    }, "TUS ROLES"), loginRoles.map((r, i) => React.createElement("div", {
      key: i,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 4
      }
    }, React.createElement("span", {
      style: {
        fontSize: 14
      }
    }, r.type === "superadmin" ? "👑" : r.type === "projadmin" ? "🏗️" : "🏙️"), React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#f5f0e8"
      }
    }, React.createElement("span", {
      style: {
        color: r.color,
        fontWeight: 600
      }
    }, r.label), " · ", r.desc)))), React.createElement("div", {
      style: {
        marginBottom: 20
      }
    }, React.createElement("label", {
      style: {
        ...labelStyle
      }
    }, "PIN de acceso"), React.createElement("input", {
      autoFocus: true,
      type: "password",
      maxLength: 8,
      value: loginPin,
      onChange: e => {
        setLoginPin(e.target.value);
        setLoginError("");
      },
      onKeyDown: e => e.key === "Enter" && handlePinSubmit(),
      placeholder: "••••",
      style: {
        ...inputStyle,
        letterSpacing: 8,
        fontSize: 20,
        textAlign: "center",
        borderBottomColor: loginError ? "#FF4757" : "rgba(255,255,255,0.2)"
      }
    })), loginError && React.createElement("div", {
      style: {
        color: "#FF4757",
        fontSize: 11,
        marginBottom: 8
      }
    }, "⚠ ", loginError), React.createElement("button", {
      onClick: handlePinSubmit,
      style: {
        ...btnStyle
      }
    }, "Ingresar")), React.createElement("div", {
      style: {
        marginTop: "auto",
        paddingTop: 48,
        fontSize: 11,
        color: "rgba(255,255,255,0.2)"
      }
    }, "mandü ", React.createElement("span", {
      style: {
        color: "rgba(255,255,255,0.35)"
      }
    }, "by Visma"))), React.createElement("div", {
      style: {
        flex: 1,
        overflow: "hidden"
      }
    }, React.createElement("img", {
      src: LOGIN_IMG,
      alt: "Hub City",
      style: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block"
      }
    })));
  };
  const Dashboard = () => {
    const px2 = s => ({
      fontFamily: "'Press Start 2P',monospace",
      ...s
    });
    const {
      isSuperadmin,
      isProjAdmin,
      isTeam,
      isEclient,
      matchedRoles
    } = session;
    const myProjects = [];
    if (isSuperadmin) {
      appState.projects.forEach(p => myProjects.push({
        proj: p,
        role: "superadmin"
      }));
    } else {
      matchedRoles.filter(r => r.type === "projadmin").forEach(r => {
        const p = appState.projects.find(x => x.id === r.projectId);
        if (p && !myProjects.find(x => x.proj.id === p.id)) myProjects.push({
          proj: p,
          role: "projadmin"
        });
      });
      matchedRoles.filter(r => r.type === "team").forEach(r => {
        const p = appState.projects.find(x => x.id === r.projectId);
        if (p && !myProjects.find(x => x.proj.id === p.id)) myProjects.push({
          proj: p,
          role: "team"
        });
      });
      matchedRoles.filter(r => r.type === "eclient").forEach(r => {
        const p = appState.projects.find(x => x.id === r.projectId);
        if (p && !myProjects.find(x => x.proj.id === p.id)) myProjects.push({
          proj: p,
          role: "eclient"
        });
      });
    }
    const canCreate = isSuperadmin || isProjAdmin;
    const importEshopClients = async () => {
      try {
        const res = await fetch(APPS_SCRIPT_URL + "?action=getEshopClients&t=" + Date.now());
        const clients = await res.json();
        if (!Array.isArray(clients) || !clients.length) return;
        let changed = false;
        let ns = {
          ...appState
        };
        clients.forEach(c => {
          if (!c.proyecto || !c.usuario_email) return;
          const tipo = c.tipo || "Eshop";
          const esRole = tipo.toLowerCase() === "autoimple" ? "eclient" : "eclient";
          const emoji = tipo.toLowerCase() === "autoimple" ? "🔧" : "🛍️";
          const roleName = tipo.toLowerCase() === "autoimple" ? "AutoImple" : "Cliente E-shop";
          const existing = ns.projects.find(p => p.clientId === String(c.cliente_id) || p.projectName === c.proyecto);
          if (existing) {
            const hasUser = existing.team.some(m => m.email.toLowerCase() === c.usuario_email.toLowerCase());
            if (!hasUser && c.usuario_email) {
              existing.team.push({
                id: "u" + Date.now() + Math.random().toString(36).slice(2, 4),
                name: c.usuario_nombre || c.usuario_email,
                role: roleName,
                emoji,
                level: 1,
                xp: 0,
                skills: [],
                status: "active",
                email: c.usuario_email.toLowerCase(),
                pin: String(c.usuario_pin || "1234"),
                esRole
              });
              changed = true;
            }
            return;
          }
          const proj = makeProject(c.proyecto, c.admin_email || "", tipo);
          proj.clientId = String(c.cliente_id || "");
          proj.projAdminPin = String(c.admin_pin || "1111");
          proj.projAdminEmail = c.admin_email || "";
          if (templates.length) {
            const contratoMods = (c.modulos || "").split(",").map(m => m.trim().toLowerCase()).filter(Boolean);
            const isEshopLike = tipo.toLowerCase().includes("eshop") || tipo.toLowerCase().includes("autoimple");
            const allTemplateMods = buildModulesFromTemplate(tipo, isEshopLike);
            if (allTemplateMods.length) {
              proj.modules = allTemplateMods.map(m => ({
                ...m,
                active: contratoMods.length === 0 || contratoMods.some(cm => m.name.toLowerCase().includes(cm) || cm.includes(m.name.toLowerCase()))
              }));
            }
          }
          if (c.usuario_email) {
            proj.team.push({
              id: "u" + Date.now() + Math.random().toString(36).slice(2, 4),
              name: c.usuario_nombre || c.usuario_email,
              role: roleName,
              emoji,
              level: 1,
              xp: 0,
              skills: [],
              status: "active",
              email: c.usuario_email.toLowerCase(),
              pin: String(c.usuario_pin || "1234"),
              esRole
            });
          }
          ns = {
            ...ns,
            projects: [...ns.projects, proj]
          };
          changed = true;
        });
        if (changed) {
          updApp(ns);
          persist2(ns);
          showToast("✅ Clientes E-shop/AutoImple importados");
        }
      } catch (e) {
        console.error("Eshop import error:", e);
      }
    };
    const [migrating, setMigrating] = useState(false);
    const [migrateMsg, setMigrateMsg] = useState("");
    const runMigration = async () => {
      setMigrating(true);
      setMigrateMsg("Leyendo datos de migración...");
      try {
        const res = await fetch(APPS_SCRIPT_URL + "?action=getMigration&t=" + Date.now());
        const rows = await res.json();
        if (!Array.isArray(rows) || !rows.length) {
          setMigrateMsg("⚠️ No hay filas en la pestaña 'migracion'.");
          setMigrating(false);
          return;
        }
        let ns = {
          ...appState
        };
        let imported = 0,
          errors = [];
        rows.forEach((row, idx) => {
          try {
            const existing = ns.projects.find(p => p.clientId === String(row.cliente_id) || p.projectName === row.cliente);
            if (existing) {
              if (row.modulo) {
                let mod = existing.modules.find(m => m.name === row.modulo);
                if (!mod) {
                  const COLORS = ["#4ECDC4", "#FFD700", "#C77DFF", "#FF6B35", "#A8E6CF", "#52B788", "#4488FF", "#FF4757"];
                  mod = {
                    id: "mod" + Date.now() + idx,
                    name: row.modulo,
                    icon: "🏗️",
                    buildingType: "evaluacion",
                    active: true,
                    color: COLORS[existing.modules.length % COLORS.length],
                    phase: "Migrado",
                    tasks: []
                  };
                  existing.modules.push(mod);
                }
                if (row.tarea && !mod.tasks.find(t => t.label === row.tarea)) {
                  mod.tasks.push({
                    id: "t" + Date.now() + idx,
                    label: row.tarea,
                    done: row.estado === "done" || row.estado === "hecha" || row.estado === "completada",
                    xp: 80,
                    startDate: row.fecha_inicio || null,
                    dueDate: row.fecha_fin || null,
                    duration: null,
                    minutes: [],
                    comments: [],
                    hoursLog: []
                  });
                }
              }
            } else {
              const proj = makeProject(row.cliente || "Sin nombre", row.admin_email || "", "HUB");
              proj.clientId = String(row.cliente_id || "");
              proj.severaProjectId = String(row.severa_id || "");
              proj.projAdminEmail = row.admin_email || "";
              if (row.modulo) {
                const COLORS = ["#4ECDC4", "#FFD700", "#C77DFF", "#FF6B35", "#A8E6CF", "#52B788", "#4488FF", "#FF4757"];
                const mod = {
                  id: "mod" + Date.now() + idx,
                  name: row.modulo,
                  icon: "🏗️",
                  buildingType: "evaluacion",
                  active: true,
                  color: COLORS[0],
                  phase: "Migrado",
                  tasks: []
                };
                if (row.tarea) mod.tasks.push({
                  id: "t" + Date.now() + idx,
                  label: row.tarea,
                  done: row.estado === "done" || row.estado === "hecha" || row.estado === "completada",
                  xp: 80,
                  startDate: row.fecha_inicio || null,
                  dueDate: row.fecha_fin || null,
                  duration: null,
                  minutes: [],
                  comments: [],
                  hoursLog: []
                });
                proj.modules = [mod];
              }
              ns = {
                ...ns,
                projects: [...ns.projects, proj]
              };
            }
            imported++;
          } catch (e) {
            errors.push(`Fila ${idx + 2}: ${e.message}`);
          }
        });
        updApp(ns);
        persist2(ns);
        if (!errors.length) {
          await fetch(APPS_SCRIPT_URL, {
            method: "POST",
            headers: {
              "Content-Type": "text/plain"
            },
            body: JSON.stringify({
              action: "clearMigration"
            })
          });
          setMigrateMsg(`✅ ${imported} filas importadas correctamente. La pestaña 'migracion' fue limpiada.`);
        } else {
          setMigrateMsg(`⚠️ ${imported} importadas, ${errors.length} errores:\n${errors.join("\n")}`);
        }
      } catch (e) {
        setMigrateMsg("❌ Error: " + e.message);
      }
      setMigrating(false);
    };
    useEffect(() => {
      if (isSuperadmin && templates.length) importEshopClients();
    }, [templates.length]);
    const tiposDisponibles = [...new Set(templates.map(t => t.tipo).filter(Boolean))];
    const BUILDING_CYCLE = ["onboarding", "carrera", "capacitacion", "evaluacion", "mentorias", "bienestar", "sucesion", "feedback"];
    const buildModulesFromTemplate = (tipo, chainDates = false) => {
      if (!tipo || !templates.length) return JSON.parse(JSON.stringify(DEF_MODS));
      const rows = templates.filter(t => t.tipo === tipo);
      if (!rows.length) return JSON.parse(JSON.stringify(DEF_MODS));
      const modMap = {};
      const modOrder = [];
      rows.forEach(r => {
        if (!r.modulo) return;
        if (!modMap[r.modulo]) {
          modMap[r.modulo] = {
            name: r.modulo,
            tasks: []
          };
          modOrder.push(r.modulo);
        }
        if (r.tarea) modMap[r.modulo].tasks.push({
          id: "t" + Date.now() + Math.random().toString(36).slice(2, 6),
          label: r.tarea,
          done: false,
          xp: 80,
          startDate: null,
          duration: r.dias || null,
          dueDate: null,
          minutes: [],
          comments: [],
          hoursLog: []
        });
      });
      const COLORS = ["#4ECDC4", "#FFD700", "#C77DFF", "#FF6B35", "#A8E6CF", "#52B788", "#4488FF", "#FF4757"];
      const BT_ICONS = {
        onboarding: "⛺",
        carrera: "🏠",
        capacitacion: "🏫",
        evaluacion: "🏢",
        mentorias: "📚",
        bienestar: "🌳",
        sucesion: "🏛️",
        feedback: "💬"
      };
      const BT_PHASES = {
        onboarding: "Campamento Base",
        carrera: "Barrio Residencial",
        capacitacion: "Distrito Educativo",
        evaluacion: "Centro Comercial",
        mentorias: "Biblioteca",
        bienestar: "Parque Central",
        sucesion: "Palacio Municipal",
        feedback: "Plaza Pública"
      };
      const mods = modOrder.map((name, i) => ({
        id: "mod" + Date.now() + i + Math.random().toString(36).slice(2, 4),
        name,
        buildingType: BUILDING_CYCLE[i % BUILDING_CYCLE.length],
        icon: BT_ICONS[BUILDING_CYCLE[i % BUILDING_CYCLE.length]],
        phase: BT_PHASES[BUILDING_CYCLE[i % BUILDING_CYCLE.length]],
        active: true,
        color: COLORS[i % COLORS.length],
        tasks: modMap[name].tasks
      }));
      if (chainDates) {
        let moduleStart = TODAY.toISOString().split('T')[0];
        mods.forEach(mod => {
          let latestEnd = moduleStart;
          mod.tasks.forEach(t => {
            t.startDate = moduleStart;
            const dias = t.duration || 1;
            t.dueDate = addDays(moduleStart, dias);
            if (t.dueDate > latestEnd) latestEnd = t.dueDate;
          });
          moduleStart = addDays(latestEnd, 1);
        });
      }
      return mods;
    };
    const handleCreate = () => {
      if (!newProjName.trim()) return;
      const adminEmail = isProjAdmin && !isSuperadmin ? session.email : "";
      const proj = makeProject(newProjName.trim(), adminEmail, newProjTipo);
      if (newProjTipo && templates.length) {
        const isEshop = newProjTipo.toLowerCase().includes("eshop") || newProjTipo.toLowerCase().includes("e-shop");
        proj.modules = buildModulesFromTemplate(newProjTipo, isEshop);
      }
      if (isProjAdmin && !isSuperadmin) proj.projAdminEmail = session.email;
      const ns = {
        ...appState,
        projects: [...appState.projects, proj]
      };
      updApp(ns);
      persist2(ns);
      setNewProjName("");
      setNewProjTipo("");
      setShowNewProj(false);
      showToast("🏙️ " + proj.projectName + " creado");
    };
    const handleDelete = id => {
      if (!confirm("¿Eliminar este proyecto permanentemente?")) return;
      const ns = {
        ...appState,
        projects: appState.projects.filter(p => p.id !== id)
      };
      updApp(ns);
      persist2(ns);
      showToast("Proyecto eliminado");
    };
    const handleOpen = (proj, role) => {
      setActiveProjectId(proj.id);
      setSession(prev => ({
        ...prev,
        activeRole: role,
        activeProjectId: proj.id
      }));
      setScreen("project");
    };
    const filteredProjects = myProjects.filter(({
      proj
    }) => {
      const matchName = !searchQuery || (proj.projectName || proj.name).toLowerCase().includes(searchQuery.toLowerCase()) || (proj.clientId || "").toLowerCase().includes(searchQuery.toLowerCase()) || proj.modules.some(m => m.ticket && String(m.ticket).includes(searchQuery.trim()));
      const matchTipo = !filterTipo || (proj.tipo || "") === filterTipo;
      const matchAdmin = !filterAdmin || (proj.projAdminEmail || "") === filterAdmin || (proj.adminEmail || "") === filterAdmin;
      return matchName && matchTipo && matchAdmin;
    });
    const allTipos = [...new Set(myProjects.map(({
      proj
    }) => proj.tipo).filter(Boolean))];
    const allAdmins = [...new Set(myProjects.map(({
      proj
    }) => proj.projAdminEmail || proj.adminEmail).filter(Boolean))];
    const nameColor = isSuperadmin ? "#FFD700" : isProjAdmin ? "#FFD700AA" : "#4ECDC4";
    const nameLabel = isSuperadmin ? "👑 Superadmin" : isProjAdmin ? "🏗️ Admin de Proyecto" : "🏙️ Ciudadano";
    return React.createElement("div", {
      style: {
        background: "#0D1117",
        minHeight: "100vh",
        color: "#E8EDF2",
        fontFamily: "Inter,sans-serif"
      }
    }, React.createElement("div", {
      style: {
        background: "#004949",
        borderBottom: "1px solid #006060",
        padding: "0 20px",
        height: 50,
        display: "flex",
        alignItems: "center",
        gap: 12,
        position: "sticky",
        top: 0,
        zIndex: 50
      }
    }, React.createElement("img", {
      src: LOGO_B64,
      alt: "Mandú",
      style: {
        height: 30,
        flexShrink: 0,
        opacity: .95
      }
    }), React.createElement("div", {
      style: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        gap: 8
      }
    }, React.createElement("span", {
      style: {
        fontSize: 12,
        color: "#d4f0e8",
        fontWeight: 600
      }
    }, session.emoji, " ", session.name), React.createElement("span", {
      style: {
        fontFamily: "'Press Start 2P',monospace",
        fontSize: 6,
        color: nameColor
      }
    }, nameLabel)), React.createElement("button", {
      onClick: () => setDayMode(d => !d),
      style: {
        background: "rgba(0,0,0,0.2)",
        border: "1px solid #006060",
        color: dayMode ? "#FFE066" : "#7dc9b2",
        fontSize: 16,
        padding: "3px 9px",
        cursor: "pointer",
        lineHeight: 1.3
      }
    }, dayMode ? "🌙" : "☀️"), canCreate && React.createElement("button", {
      onClick: () => setShowNewProj(s => !s),
      style: {
        background: "#7dc9b2",
        color: "#004949",
        border: "none",
        fontFamily: "'Press Start 2P',monospace",
        fontSize: 7,
        padding: "6px 14px",
        cursor: "pointer",
        flexShrink: 0
      }
    }, "+ NUEVO PROYECTO"), isSuperadmin && React.createElement("button", {
      onClick: runMigration,
      disabled: migrating,
      style: {
        background: migrating ? "#2A3F58" : "transparent",
        border: "1px solid #7dc9b244",
        color: "#7dc9b2",
        fontFamily: "'Press Start 2P',monospace",
        fontSize: 6,
        padding: "5px 10px",
        cursor: "pointer",
        flexShrink: 0
      }
    }, "📥 ", migrating ? "IMPORTANDO..." : "MIGRACIÓN"), React.createElement("button", {
      onClick: () => {
        setSession(null);
        setScreen("login");
        setLoginStep("email");
        setLoginEmail("");
        setLoginPin("");
      },
      style: {
        background: "none",
        border: "1px solid #006060",
        color: "rgba(255,255,255,0.55)",
        fontFamily: "'Press Start 2P',monospace",
        fontSize: 6,
        padding: "5px 10px",
        cursor: "pointer",
        flexShrink: 0
      }
    }, "SALIR")), migrateMsg && React.createElement("div", {
      style: {
        background: migrateMsg.startsWith("✅") ? "#7dc9b222" : migrateMsg.startsWith("⚠") ? "#FFD70022" : "#FF475722",
        border: `1px solid ${migrateMsg.startsWith("✅") ? "#7dc9b244" : migrateMsg.startsWith("⚠") ? "#FFD70044" : "#FF475744"}`,
        padding: "10px 16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 12
      }
    }, React.createElement("pre", {
      style: {
        fontSize: 11,
        color: "#E8EDF2",
        margin: 0,
        whiteSpace: "pre-wrap",
        fontFamily: "monospace"
      }
    }, migrateMsg), React.createElement("button", {
      onClick: () => setMigrateMsg(""),
      style: {
        background: "none",
        border: "none",
        color: "#7A8FA6",
        cursor: "pointer",
        fontSize: 16,
        flexShrink: 0
      }
    }, "×")), React.createElement("div", {
      style: {
        background: "#080C12",
        borderBottom: "1px solid #1E2D40"
      }
    }, React.createElement("div", {
      style: {
        maxWidth: 1100,
        margin: "0 auto",
        padding: "0 20px",
        display: "flex"
      }
    }, [{
      id: "projects",
      label: "🏙 MIS CIUDADES"
    }, {
      id: "export",
      label: "📊 EXPORTAR"
    }, {
      id: "hard",
      label: "🔗 HARD"
    }, {
      id: "messages",
      label: "📬 MENSAJES"
    }].map(t => {
      const unread = t.id === "messages" ? myProjects.reduce((a, {
        proj
      }) => a + (proj.messages || []).filter(m => !m.read).length, 0) : 0;
      return React.createElement("button", {
        key: t.id,
        onClick: () => setDashTab(t.id),
        style: {
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "10px 16px",
          color: dashTab === t.id ? "#4ECDC4" : "#7A8FA6",
          borderBottom: dashTab === t.id ? "2px solid #4ECDC4" : "2px solid transparent",
          fontFamily: "'Press Start 2P',monospace",
          fontSize: 7,
          position: "relative"
        }
      }, t.label, unread > 0 && React.createElement("span", {
        style: {
          position: "absolute",
          top: 6,
          right: 2,
          background: "#FF4757",
          color: "white",
          borderRadius: "50%",
          fontSize: 8,
          fontFamily: "sans-serif",
          fontWeight: 700,
          minWidth: 14,
          height: 14,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 2px"
        }
      }, unread));
    }))), React.createElement("div", {
      style: {
        maxWidth: 1100,
        margin: "0 auto",
        padding: 20
      }
    }, dashTab === "projects" && React.createElement(React.Fragment, null, showNewProj && canCreate && React.createElement("div", {
      style: {
        background: "#1A2332",
        border: "1px solid #FFD70066",
        padding: 16,
        marginBottom: 20
      }
    }, React.createElement("div", {
      style: {
        fontFamily: "'Press Start 2P',monospace",
        fontSize: 8,
        color: "#FFD700",
        marginBottom: 12
      }
    }, "▸ NUEVA CIUDAD / PROYECTO"), React.createElement("div", {
      style: {
        display: "flex",
        gap: 10,
        marginBottom: tiposDisponibles.length ? 12 : 0,
        flexWrap: "wrap"
      }
    }, React.createElement("input", {
      autoFocus: true,
      style: {
        background: "#0D1117",
        border: "1px solid #2A3F58",
        color: "#E8EDF2",
        padding: "9px 12px",
        fontSize: 13,
        fontFamily: "Inter",
        outline: "none",
        flex: 1,
        minWidth: 200
      },
      placeholder: "Nombre del proyecto…",
      value: newProjName,
      onChange: e => setNewProjName(e.target.value),
      onKeyDown: e => e.key === "Enter" && handleCreate()
    }), React.createElement("button", {
      onClick: handleCreate,
      style: {
        background: "#7dc9b2",
        color: "#004949",
        border: "none",
        fontFamily: "'Press Start 2P',monospace",
        fontSize: 7,
        padding: "9px 16px",
        cursor: "pointer"
      }
    }, "CREAR"), React.createElement("button", {
      onClick: () => {
        setShowNewProj(false);
        setNewProjName("");
        setNewProjTipo("");
      },
      style: {
        background: "transparent",
        color: "#7A8FA6",
        border: "1px solid #2A3F58",
        fontFamily: "'Press Start 2P',monospace",
        fontSize: 7,
        padding: "9px 14px",
        cursor: "pointer"
      }
    }, "CANCELAR")), tiposDisponibles.length > 0 && React.createElement("div", null, React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#7A8FA6",
        marginBottom: 8
      }
    }, "TIPO DE PROYECTO ", React.createElement("span", {
      style: {
        color: "#2A3F58",
        fontSize: 10
      }
    }, "(precarga módulos y tareas del Sheet)")), React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        flexWrap: "wrap",
        marginBottom: 8
      }
    }, React.createElement("div", {
      onClick: () => setNewProjTipo(""),
      style: {
        padding: "7px 14px",
        border: `1px solid ${!newProjTipo ? "#7dc9b2" : "#2A3F58"}`,
        color: !newProjTipo ? "#7dc9b2" : "#7A8FA6",
        cursor: "pointer",
        fontSize: 12,
        background: !newProjTipo ? "#7dc9b222" : "transparent"
      }
    }, "Sin plantilla"), tiposDisponibles.map(tipo => React.createElement("div", {
      key: tipo,
      onClick: () => setNewProjTipo(tipo),
      style: {
        padding: "7px 14px",
        border: `1px solid ${newProjTipo === tipo ? "#FFD700" : "#2A3F58"}`,
        color: newProjTipo === tipo ? "#FFD700" : "#7A8FA6",
        cursor: "pointer",
        background: newProjTipo === tipo ? "#FFD70022" : "transparent",
        fontFamily: "'Press Start 2P',monospace",
        fontSize: 9
      }
    }, tipo))), newProjTipo && React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#7dc9b2"
      }
    }, "✓ ", templates.filter(t => t.tipo === newProjTipo && t.modulo).map(t => t.modulo).filter((v, i, a) => a.indexOf(v) === i).length, " módulos · ", templates.filter(t => t.tipo === newProjTipo && t.tarea).length, " tareas preconfiguradas"))), React.createElement("div", {
      style: {
        display: "flex",
        gap: 10,
        marginBottom: 16,
        flexWrap: "wrap",
        alignItems: "center"
      }
    }, React.createElement("div", {
      style: {
        position: "relative",
        flex: 1,
        minWidth: 200
      }
    }, React.createElement("span", {
      style: {
        position: "absolute",
        left: 10,
        top: "50%",
        transform: "translateY(-50%)",
        color: "#2A3F58",
        fontSize: 14
      }
    }, "🔍"), React.createElement("input", {
      style: {
        background: "#1A2332",
        border: "1px solid #2A3F58",
        color: "#E8EDF2",
        padding: "8px 12px 8px 32px",
        fontSize: 13,
        fontFamily: "Inter",
        outline: "none",
        width: "100%",
        boxSizing: "border-box"
      },
      placeholder: "Buscar ciudad, ID cliente o N° ticket…",
      value: searchQuery,
      onChange: e => setSearchQuery(e.target.value)
    })), allTipos.length > 0 && React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        alignItems: "center",
        flexWrap: "wrap"
      }
    }, React.createElement("span", {
      style: {
        fontSize: 11,
        color: "#7A8FA6"
      }
    }, "TIPO:"), React.createElement("div", {
      onClick: () => setFilterTipo(""),
      style: {
        padding: "6px 12px",
        border: `1px solid ${!filterTipo ? "#7dc9b2" : "#2A3F58"}`,
        color: !filterTipo ? "#7dc9b2" : "#7A8FA6",
        cursor: "pointer",
        fontSize: 11,
        background: !filterTipo ? "#7dc9b222" : "transparent"
      }
    }, "Todos"), allTipos.map(tipo => React.createElement("div", {
      key: tipo,
      onClick: () => setFilterTipo(filterTipo === tipo ? "" : tipo),
      style: {
        padding: "6px 12px",
        border: `1px solid ${filterTipo === tipo ? "#FFD700" : "#2A3F58"}`,
        color: filterTipo === tipo ? "#FFD700" : "#7A8FA6",
        cursor: "pointer",
        background: filterTipo === tipo ? "#FFD70022" : "transparent",
        fontFamily: "'Press Start 2P',monospace",
        fontSize: 8
      }
    }, tipo))), allAdmins.length > 0 && React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        alignItems: "center"
      }
    }, React.createElement("span", {
      style: {
        fontSize: 11,
        color: "#7A8FA6"
      }
    }, "ADMIN:"), React.createElement("select", {
      value: filterAdmin,
      onChange: e => setFilterAdmin(e.target.value),
      style: {
        background: "#1A2332",
        border: "1px solid #2A3F58",
        color: "#E8EDF2",
        padding: "6px 10px",
        fontSize: 12,
        fontFamily: "Inter",
        outline: "none",
        cursor: "pointer"
      }
    }, React.createElement("option", {
      value: ""
    }, "Todos"), allAdmins.map(a => React.createElement("option", {
      key: a,
      value: a
    }, a)))), React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#2A3F58"
      }
    }, filteredProjects.length, "/", myProjects.length)), filteredProjects.length === 0 ? React.createElement("div", {
      style: {
        background: "#1A2332",
        border: "1px dashed #2A3F58",
        padding: 48,
        textAlign: "center"
      }
    }, myProjects.length === 0 ? React.createElement(React.Fragment, null, React.createElement("div", {
      style: px2({
        fontSize: 8,
        color: "#2A3F58",
        marginBottom: 12
      })
    }, "SIN PROYECTOS ASIGNADOS"), canCreate && React.createElement("button", {
      onClick: () => setShowNewProj(true),
      style: {
        background: "#FFD700",
        color: "#0D1117",
        border: "none",
        fontFamily: "'Press Start 2P',monospace",
        fontSize: 8,
        padding: "10px 20px",
        cursor: "pointer"
      }
    }, "+ CREAR PRIMER PROYECTO"), !canCreate && React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#2A3F58"
      }
    }, "Contactá al administrador.")) : React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#7A8FA6"
      }
    }, "No hay proyectos que coincidan.")) : React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
        gap: 16
      }
    }, filteredProjects.map(({
      proj,
      role
    }) => React.createElement(ProjectCard, {
      key: proj.id,
      proj: proj,
      role: role,
      onOpen: () => handleOpen(proj, role),
      onPrint: () => {
        setPrintProjectId(proj.id);
        setScreen("print");
      },
      onDelete: () => handleDelete(proj.id),
      canDelete: isSuperadmin || role === "projadmin" && proj.projAdminEmail === session.email
    })))), dashTab === "export" && (() => {
      const rows = myProjects.map(({
        proj: p,
        role: r
      }) => {
        const am2 = p.modules.filter(m => m.active);
        const allActive = am2.flatMap(m => m.tasks);
        const doneTasks2 = allActive.filter(t => t.done).length;
        const totalTasks2 = allActive.length;
        const overdueTasks = allActive.filter(t => isOverdue(t)).length;
        const doneModules = am2.filter(m => m.tasks.length > 0 && m.tasks.every(t => t.done)).length;
        const allDueDates2 = p.modules.flatMap(m => m.tasks.filter(t => t.dueDate).map(t => t.dueDate)).sort();
        const firstD = p.projStart || (allDueDates2.length ? allDueDates2[0] : null);
        const lastD = allDueDates2.length ? allDueDates2[allDueDates2.length - 1] : p.projEnd || null;
        const possXP2 = am2.reduce((a, m) => a + m.tasks.reduce((b, t) => b + t.xp, 0), 0);
        const earnedXP = am2.reduce((a, m) => a + m.tasks.filter(t => t.done).reduce((b, t) => b + t.xp, 0), 0);
        const pct2 = possXP2 > 0 ? Math.round(earnedXP / possXP2 * 100) : 0;
        const allHours = allActive.flatMap(t => t.hoursLog || []);
        const hoursAdmin = allHours.filter(h => h.authorRole === "admin").reduce((a, h) => a + h.hours, 0);
        const hoursTeam = allHours.filter(h => h.authorRole === "team").reduce((a, h) => a + h.hours, 0);
        return {
          p,
          r,
          firstD,
          lastD,
          am2,
          doneModules,
          doneTasks2,
          totalTasks2,
          overdueTasks,
          pct2,
          earnedXP,
          hoursAdmin,
          hoursTeam
        };
      });
      const downloadCSV = () => {
        const h = ["Proyecto", "ID Cliente", "Tipo", "Rol", "Fecha Inicio", "Fecha Fin", "Módulos Activos", "Módulos Completados", "Tareas Totales", "Tareas Realizadas", "Tareas Vencidas", "Hs Admin", "Hs Cliente", "% Avance"];
        const body = rows.map(({
          p,
          r,
          firstD,
          lastD,
          am2,
          doneModules,
          doneTasks2,
          totalTasks2,
          overdueTasks,
          pct2,
          hoursAdmin,
          hoursTeam
        }) => [`"${p.projectName || p.name}"`, p.clientId || "—", p.tipo || "—", r, firstD ? fmtD(firstD) : "—", lastD ? fmtD(lastD) : "—", am2.length, doneModules, totalTasks2, doneTasks2, overdueTasks, hoursAdmin, hoursTeam, pct2 + "%"].join(","));
        const blob = new Blob(["\uFEFF", [h.join(","), ...body].join("\n")], {
          type: "text/csv;charset=utf-8"
        });
        const u = URL.createObjectURL(blob),
          a = document.createElement("a");
        a.href = u;
        a.download = `ManduHubCity-${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(u);
      };
      const th = {
        padding: "9px 12px",
        textAlign: "left",
        fontSize: 10,
        color: "#7A8FA6",
        fontWeight: 600,
        borderBottom: "1px solid #2A3F58",
        whiteSpace: "nowrap",
        background: "#080C12"
      };
      const td = {
        padding: "9px 12px",
        fontSize: 12,
        borderBottom: "1px solid #1A2332",
        verticalAlign: "middle"
      };
      const totM = rows.reduce((a, r) => a + r.am2.length, 0);
      const totMD = rows.reduce((a, r) => a + r.doneModules, 0);
      const totT = rows.reduce((a, r) => a + r.totalTasks2, 0);
      const totD = rows.reduce((a, r) => a + r.doneTasks2, 0);
      const totO = rows.reduce((a, r) => a + r.overdueTasks, 0);
      const totHA = rows.reduce((a, r) => a + r.hoursAdmin, 0);
      const totHT = rows.reduce((a, r) => a + r.hoursTeam, 0);
      return React.createElement("div", null, React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 16,
          flexWrap: "wrap"
        }
      }, React.createElement("div", {
        style: {
          flex: 1
        }
      }, React.createElement("div", {
        style: px2({
          fontSize: 7,
          color: "#4ECDC4",
          marginBottom: 4
        })
      }, "▸ PLANILLA DE PROYECTOS"), React.createElement("div", {
        style: {
          fontSize: 12,
          color: "#7A8FA6"
        }
      }, rows.length, " proyecto", rows.length !== 1 ? "s" : " ", " · Exportá como CSV para abrir en Excel / Google Sheets")), React.createElement("button", {
        onClick: downloadCSV,
        style: {
          background: "#4ECDC4",
          color: "#0D1117",
          border: "none",
          fontFamily: "'Press Start 2P',monospace",
          fontSize: 7,
          padding: "8px 16px",
          cursor: "pointer",
          flexShrink: 0
        }
      }, "↓ DESCARGAR CSV")), rows.length === 0 ? React.createElement("div", {
        style: {
          background: "#1A2332",
          border: "1px dashed #2A3F58",
          padding: 32,
          textAlign: "center",
          color: "#2A3F58",
          fontSize: 12
        }
      }, "Sin proyectos para exportar.") : React.createElement("div", {
        style: {
          overflowX: "auto"
        }
      }, React.createElement("table", {
        style: {
          width: "100%",
          borderCollapse: "collapse",
          background: "#0D1117",
          border: "1px solid #2A3F58",
          minWidth: 900
        }
      }, React.createElement("thead", null, React.createElement("tr", null, ["PROYECTO", "ID CLIENTE", "TIPO", "FECHA INICIO", "FECHA FIN", "MÓDULOS", "MOD. COMPL.", "TAREAS", "REALIZADAS", "VENCIDAS", "HS ADMIN", "HS CLIENTE", "AVANCE"].map(h2 => React.createElement("th", {
        key: h2,
        style: th
      }, h2)))), React.createElement("tbody", null, rows.map(({
        p,
        r,
        firstD,
        lastD,
        am2,
        doneModules,
        doneTasks2,
        totalTasks2,
        overdueTasks,
        pct2,
        hoursAdmin,
        hoursTeam
      }, i) => {
        const rc = r === "superadmin" || r === "projadmin" ? "#FFD70099" : "#4ECDC499";
        const lastLate = lastD && parseD(lastD) < TODAY && doneTasks2 < totalTasks2;
        return React.createElement("tr", {
          key: p.id,
          style: {
            background: i % 2 === 0 ? "#0D1117" : "#0F1822"
          }
        }, React.createElement("td", {
          style: {
            ...td,
            maxWidth: 180
          }
        }, React.createElement("div", {
          style: {
            fontWeight: 600,
            color: "#E8EDF2",
            marginBottom: 2,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          }
        }, p.projectName || p.name), React.createElement("div", {
          style: {
            fontSize: 8,
            color: rc,
            fontFamily: "'Press Start 2P',monospace"
          }
        }, r === "superadmin" ? "👑 SUPER" : r === "projadmin" ? "🏗️ ADMIN" : "🏙️ CIUDADANO")), React.createElement("td", {
          style: {
            ...td,
            textAlign: "center"
          }
        }, p.clientId ? React.createElement("span", {
          style: {
            fontFamily: "monospace",
            fontSize: 11,
            color: "#4ECDC4"
          }
        }, p.clientId) : React.createElement("span", {
          style: {
            color: "#2A3F58"
          }
        }, "—")), React.createElement("td", {
          style: {
            ...td,
            textAlign: "center"
          }
        }, p.tipo ? React.createElement("span", {
          style: {
            fontFamily: "'Press Start 2P',monospace",
            fontSize: 7,
            color: "#FFD700",
            background: "#FFD70022",
            border: "1px solid #FFD70044",
            padding: "3px 7px",
            whiteSpace: "nowrap"
          }
        }, p.tipo) : React.createElement("span", {
          style: {
            color: "#2A3F58"
          }
        }, "—")), React.createElement("td", {
          style: {
            ...td,
            color: "#7A8FA6",
            whiteSpace: "nowrap"
          }
        }, firstD ? fmtD(firstD) : React.createElement("span", {
          style: {
            color: "#2A3F58"
          }
        }, "—")), React.createElement("td", {
          style: {
            ...td,
            whiteSpace: "nowrap",
            color: lastLate ? "#FF4757" : "#7A8FA6"
          }
        }, lastD ? fmtD(lastD) + (lastLate ? " ⚠" : "") : React.createElement("span", {
          style: {
            color: "#2A3F58"
          }
        }, "—")), React.createElement("td", {
          style: {
            ...td,
            textAlign: "center",
            color: "#4ECDC4",
            fontWeight: 600
          }
        }, am2.length), React.createElement("td", {
          style: {
            ...td,
            textAlign: "center",
            color: doneModules === am2.length && am2.length > 0 ? "#A8E6CF" : "#7A8FA6",
            fontWeight: doneModules === am2.length && am2.length > 0 ? 700 : 400
          }
        }, doneModules, "/", am2.length), React.createElement("td", {
          style: {
            ...td,
            textAlign: "center",
            color: "#7A8FA6"
          }
        }, totalTasks2), React.createElement("td", {
          style: {
            ...td,
            textAlign: "center",
            color: doneTasks2 === totalTasks2 && totalTasks2 > 0 ? "#A8E6CF" : "#E8EDF2",
            fontWeight: 600
          }
        }, doneTasks2), React.createElement("td", {
          style: {
            ...td,
            textAlign: "center"
          }
        }, overdueTasks > 0 ? React.createElement("span", {
          style: {
            color: "#FF4757",
            fontFamily: "'Press Start 2P',monospace",
            fontSize: 9
          }
        }, "⚠ ", overdueTasks) : React.createElement("span", {
          style: {
            color: "#A8E6CF",
            fontSize: 11
          }
        }, "✓ 0")), React.createElement("td", {
          style: {
            ...td,
            textAlign: "center",
            color: hoursAdmin > 0 ? "#FFD700" : "#2A3F58",
            fontWeight: hoursAdmin > 0 ? 600 : 400
          }
        }, hoursAdmin > 0 ? `${hoursAdmin}h` : "—"), React.createElement("td", {
          style: {
            ...td,
            textAlign: "center",
            color: hoursTeam > 0 ? "#4ECDC4" : "#2A3F58",
            fontWeight: hoursTeam > 0 ? 600 : 400
          }
        }, hoursTeam > 0 ? `${hoursTeam}h` : "—"), React.createElement("td", {
          style: {
            ...td,
            minWidth: 110
          }
        }, React.createElement("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 6
          }
        }, React.createElement("div", {
          style: {
            flex: 1,
            height: 6,
            background: "#1A2332",
            overflow: "hidden"
          }
        }, React.createElement("div", {
          style: {
            height: "100%",
            width: `${pct2}%`,
            background: pct2 === 100 ? "#A8E6CF" : pct2 > 60 ? "#4ECDC4" : "#FFD700"
          }
        })), React.createElement("span", {
          style: {
            fontSize: 10,
            fontWeight: 700,
            color: pct2 === 100 ? "#A8E6CF" : pct2 > 60 ? "#4ECDC4" : "#FFD700",
            minWidth: 32,
            textAlign: "right"
          }
        }, pct2, "%"))));
      })), React.createElement("tfoot", null, React.createElement("tr", {
        style: {
          background: "#1A2332",
          borderTop: "2px solid #2A3F58"
        }
      }, React.createElement("td", {
        style: {
          ...td,
          fontWeight: 700,
          color: "#7A8FA6",
          fontSize: 10
        },
        colSpan: 5
      }, "TOTALES (", rows.length, " proyectos)"), React.createElement("td", {
        style: {
          ...td,
          textAlign: "center",
          fontWeight: 700,
          color: "#4ECDC4"
        }
      }, totM), React.createElement("td", {
        style: {
          ...td,
          textAlign: "center",
          fontWeight: 700,
          color: "#7A8FA6"
        }
      }, totMD, "/", totM), React.createElement("td", {
        style: {
          ...td,
          textAlign: "center",
          fontWeight: 700,
          color: "#7A8FA6"
        }
      }, totT), React.createElement("td", {
        style: {
          ...td,
          textAlign: "center",
          fontWeight: 700,
          color: "#A8E6CF"
        }
      }, totD), React.createElement("td", {
        style: {
          ...td,
          textAlign: "center",
          fontWeight: 700,
          color: totO > 0 ? "#FF4757" : "#A8E6CF"
        }
      }, totO > 0 ? `⚠ ${totO}` : "✓ 0"), React.createElement("td", {
        style: {
          ...td,
          textAlign: "center",
          fontWeight: 700,
          color: totHA > 0 ? "#FFD700" : "#2A3F58"
        }
      }, totHA > 0 ? `${totHA}h` : "—"), React.createElement("td", {
        style: {
          ...td,
          textAlign: "center",
          fontWeight: 700,
          color: totHT > 0 ? "#4ECDC4" : "#2A3F58"
        }
      }, totHT > 0 ? `${totHT}h` : "—"), React.createElement("td", {
        style: td
      }))))));
    })(), dashTab === "hard" && React.createElement(HardView, {
      projects: myProjects,
      appsScriptUrl: APPS_SCRIPT_URL
    }), dashTab === "messages" && React.createElement(MessagesView, {
      projects: myProjects,
      onUpdate: proj => {
        const ns = {
          ...appState,
          projects: appState.projects.map(p => p.id === proj.id ? proj : p)
        };
        updApp(ns);
        persist2(ns);
      },
      session: session
    })));
  };
  const activeProject = appState.projects.find(p => p.id === activeProjectId);
  const updateProject = updatedProj => {
    const ns = {
      ...appState,
      projects: appState.projects.map(p => p.id === updatedProj.id ? updatedProj : p)
    };
    updApp(ns);
    persist2(ns);
  };
  if (screen === "login") return React.createElement(React.Fragment, null, React.createElement(LoginScreen, null), ToastEl);
  if (screen === "dashboard") return React.createElement(React.Fragment, null, React.createElement(Dashboard, null), ToastEl);
  if (screen === "print") {
    const pj = appState.projects.find(p => p.id === printProjectId);
    if (!pj) return React.createElement(React.Fragment, null, ToastEl);
    return React.createElement(React.Fragment, null, React.createElement(PrintReport, {
      proj: pj,
      onClose: () => setScreen("dashboard")
    }), ToastEl);
  }
  if (screen === "project" && activeProject) {
    const activeRole = session.activeRole || "team";
    const isAdminRole = activeRole === "superadmin" || activeRole === "projadmin";
    const isEclientRole = activeRole === "eclient";
    const teamMember = activeProject.team.find(m => m.email === session.email);
    const projSession = {
      ...session,
      role: isAdminRole ? "admin" : isEclientRole ? "eclient" : "team",
      id: teamMember?.id || session.email,
      name: teamMember?.name || session.name,
      emoji: teamMember?.emoji || session.emoji,
      esRole: teamMember?.esRole || ""
    };
    return React.createElement(React.Fragment, null, React.createElement(ProjectApp, {
      proj: activeProject,
      session: projSession,
      allProjects: appState.projects,
      appState: appState,
      onUpdate: updateProject,
      onBack: () => setScreen("dashboard"),
      onPrint: () => {
        setPrintProjectId(activeProjectId);
        setScreen("print");
      },
      onSwitchProject: id => setActiveProjectId(id),
      showToast: showToast,
      dayMode: dayMode,
      setDayMode: setDayMode
    }), ToastEl);
  }
  return React.createElement(React.Fragment, null, React.createElement(LoginScreen, null), ToastEl);
}
function ProjectApp({
  proj,
  session,
  allProjects,
  appState,
  onUpdate,
  onBack,
  onPrint,
  onSwitchProject,
  showToast,
  dayMode,
  setDayMode
}) {
  const isAdmin = session.role === "admin" || session.role === "projadmin";
  const isEclient = session.role === "eclient";
  const canEditTasks = isAdmin || isEclient;
  const [severaCache, setSeveraCache] = useState(null);
  const [showHard, setShowHard] = useState(true);
  const [expandedHard, setExpandedHard] = useState({});
  useEffect(() => {
    if (!proj.severaProjectId) return;
    const url = APPS_SCRIPT_URL + "?action=getSeveraProject&projectNumber=" + encodeURIComponent(proj.severaProjectId) + "&t=" + Date.now();
    fetch(url).then(r => r.json()).then(d => {
      if (!d.error) setSeveraCache(d);
    }).catch(() => {});
  }, [proj.severaProjectId]);
  useEffect(() => {
    const overdueTasks = [];
    proj.modules.filter(m => m.active).forEach(mod => {
      mod.tasks.filter(t => !t.done && t.dueDate && parseD(t.dueDate) < TODAY).forEach(t => {
        const alreadyMsg = (proj.messages || []).some(m => m.type === "overdue" && m.taskId === t.id && m.date && new Date(m.date).toDateString() === TODAY.toDateString());
        if (!alreadyMsg) overdueTasks.push({
          mod,
          task: t
        });
      });
    });
    if (!overdueTasks.length) return;
    let ns = proj;
    overdueTasks.forEach(({
      mod,
      task
    }) => {
      ns = {
        ...ns,
        messages: [...(ns.messages || []), {
          id: "msg" + Date.now() + Math.random().toString(36).slice(2, 4),
          type: "overdue",
          modId: mod.id,
          modName: mod.name,
          taskId: task.id,
          taskLabel: task.label,
          authorId: "system",
          authorName: "Sistema",
          authorEmoji: "⚠️",
          text: `Tarea vencida el ${fmtD(task.dueDate)}`,
          date: new Date().toISOString(),
          read: false
        }]
      };
    });
    onUpdate(ns);
  }, []);
  const [view, setView] = useState("ciudad");
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState(null);
  const [toast, setToast] = useState(null);
  const [taskModal, setTaskModal] = useState(null);
  const [emailModal, setEmailModal] = useState(null);
  const [emailTo, setEmailTo] = useState([]);
  const [emailSubject, setEmailSubject] = useState("");
  const [minuteText, setMinuteText] = useState("");
  const [selEmoji, setSelEmoji] = useState(0);
  const [addingMember, setAddingMember] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    role: "",
    emoji: "👩‍💻",
    skills: "",
    status: "active",
    email: "",
    pin: "1234"
  });
  const [confirmDel, setConfirmDel] = useState(null);
  const [addingTask, setAddingTask] = useState(null);
  const [newTask, setNewTask] = useState({
    label: "",
    startDate: "",
    duration: "",
    dueDate: ""
  });
  const [editingName, setEditingName] = useState(false);
  const [expandedMinutes, setExpandedMinutes] = useState({});
  const [addingMod, setAddingMod] = useState(false);
  const [newMod, setNewMod] = useState({
    name: "",
    buildingType: "onboarding",
    color: "#4ECDC4",
    ticket: ""
  });
  const [editingMod, setEditingMod] = useState(null);
  const [cityImg, setCityImg] = useState(null);
  const [saEmails, setSaEmails] = useState(() => appState.superadminEmails || ["nicolas.garcia@visma.com"]);
  const [saPin, setSaPin] = useState("");
  const S = proj;
  const upd = ns => onUpdate(ns);
  const save = useCallback(async ns => {
    setSaving(true);
    const target = ns || proj;
    onUpdate(target);
    try {
      const fullState = {
        ...appState,
        projects: appState.projects.map(p => p.id === target.id ? target : p)
      };
      await saveAll(fullState);
    } catch (e) {}
    setSaving(false);
    setSavedAt(new Date());
  }, [proj, onUpdate, appState]);
  const localShowToast = (msg, type = "ok") => {
    setToast({
      msg,
      type
    });
    setTimeout(() => setToast(null), 2800);
  };
  const _showToast = localShowToast;
  useEffect(() => {
    if (!S) return;
    const cv = document.createElement("canvas");
    cv.width = 960;
    cv.height = 220;
    const ctx = cv.getContext("2d");
    const W = 960,
      H = 220;
    function fr(x, y, w, h, c) {
      ctx.fillStyle = c;
      ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
    }
    function pct(m) {
      return m.tasks.length ? m.tasks.filter(t => t.done).length / m.tasks.length : 0;
    }
    const sky = ctx.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0, "#04080F");
    sky.addColorStop(.65, "#0D1117");
    sky.addColorStop(1, "#0F1922");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#FFF5C0";
    ctx.beginPath();
    ctx.arc(W - 80, 32, 19, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#0A1018";
    ctx.beginPath();
    ctx.arc(W - 71, 28, 15, 0, Math.PI * 2);
    ctx.fill();
    const ground = H - 28;
    ctx.fillStyle = "#0D1520";
    ctx.fillRect(0, ground, W, H - ground);
    ctx.fillStyle = "#111C28";
    ctx.fillRect(0, ground, W, 14);
    ctx.fillStyle = "#FFD70033";
    for (let i = 0; i < W; i += 52) ctx.fillRect(i, ground + 6, 24, 2);
    ctx.fillStyle = "#1A2840";
    ctx.fillRect(0, ground - 2, W, 2);
    function dTent(x, g, col, p) {
      const s = p === 0 ? 0 : p < .25 ? 1 : p < .5 ? 2 : p < .75 ? 3 : p < 1 ? 4 : 5;
      if (!s) return;
      const cx = x + 40;
      if (s >= 2) {
        ctx.fillStyle = col + "44";
        ctx.beginPath();
        ctx.moveTo(cx, g - 55);
        ctx.lineTo(x + 5, g - 5);
        ctx.lineTo(x + 75, g - 5);
        ctx.closePath();
        ctx.fill();
      }
      if (s >= 3) {
        ctx.fillStyle = col + "88";
        ctx.beginPath();
        ctx.moveTo(cx, g - 58);
        ctx.lineTo(x + 8, g - 6);
        ctx.lineTo(x + 72, g - 6);
        ctx.closePath();
        ctx.fill();
      }
      if (s >= 4) {
        ctx.fillStyle = col;
        ctx.beginPath();
        ctx.moveTo(cx, g - 62);
        ctx.lineTo(x + 6, g - 6);
        ctx.lineTo(x + 74, g - 6);
        ctx.closePath();
        ctx.fill();
        fr(cx - 1, g - 68, 2, 8, "#E8EDF2");
        fr(cx - 3, g - 70, 6, 4, col);
      }
      if (s === 5) {
        fr(cx, g - 78, 12, 8, "#FF6B35");
      }
    }
    function dHouse(x, g, col, p) {
      const s = p === 0 ? 0 : p < .25 ? 1 : p < .5 ? 2 : p < .75 ? 3 : p < 1 ? 4 : 5;
      if (!s) return;
      if (s >= 1) fr(x + 5, g - 12, 70, 12, "#1A2840");
      if (s >= 3) {
        fr(x + 8, g - 50, 64, 38, col + "77");
        ctx.fillStyle = col + "66";
        ctx.beginPath();
        ctx.moveTo(x + 3, g - 50);
        ctx.lineTo(x + 40, g - 80);
        ctx.lineTo(x + 77, g - 50);
        ctx.closePath();
        ctx.fill();
      }
      if (s === 5) {
        fr(x + 8, g - 52, 64, 40, col);
        ctx.fillStyle = col;
        ctx.beginPath();
        ctx.moveTo(x + 2, g - 52);
        ctx.lineTo(x + 40, g - 86);
        ctx.lineTo(x + 78, g - 52);
        ctx.closePath();
        ctx.fill();
      }
    }
    function dSchool(x, g, col, p) {
      const s = p === 0 ? 0 : p < .25 ? 1 : p < .5 ? 2 : p < .75 ? 3 : p < 1 ? 4 : 5;
      if (!s) return;
      if (s >= 3) fr(x + 5, g - 60, 70, 46, col + "66");
      if (s === 5) {
        fr(x + 5, g - 64, 70, 50, col);
        fr(x + 36, g - 90, 8, 8, col);
      }
    }
    function dOffice(x, g, col, p) {
      const s = p === 0 ? 0 : p < .25 ? 1 : p < .5 ? 2 : p < .75 ? 3 : p < 1 ? 4 : 5;
      if (!s) return;
      if (s >= 2) fr(x + 8, g - 75, 64, 59, col + "22");
      if (s >= 3) fr(x + 8, g - 75, 64, 59, col + "55");
      if (s >= 4) fr(x + 8, g - 78, 64, 62, col + "99");
      if (s === 5) {
        fr(x + 8, g - 80, 64, 64, col);
        fr(x + 38, g - 98, 4, 8, "#E8EDF2");
      }
    }
    function dLib(x, g, col, p) {
      const s = p === 0 ? 0 : p < .25 ? 1 : p < .5 ? 2 : p < .75 ? 3 : p < 1 ? 4 : 5;
      if (!s) return;
      if (s >= 3) {
        fr(x + 6, g - 62, 68, 48, col + "66");
        ctx.fillStyle = col + "33";
        ctx.beginPath();
        ctx.arc(x + 40, g - 62, 34, Math.PI, 0);
        ctx.fill();
      }
      if (s === 5) {
        fr(x + 6, g - 66, 68, 52, col);
      }
    }
    function dPark(x, g, col, p) {
      const s = p === 0 ? 0 : p < .25 ? 1 : p < .5 ? 2 : p < .75 ? 3 : p < 1 ? 4 : 5;
      if (!s) return;
      if (s >= 3) {
        [[x + 12, g - 70], [x + 55, g - 68]].forEach(([tx, ty]) => {
          fr(tx + 4, ty + 40, 4, 30, col + "AA");
          ctx.fillStyle = col + "77";
          ctx.beginPath();
          ctx.arc(tx + 6, ty + 20, 16, 0, Math.PI * 2);
          ctx.fill();
        });
      }
      if (s === 5) {
        [[x + 12, g - 74], [x + 55, g - 72]].forEach(([tx, ty]) => {
          fr(tx + 4, ty + 44, 4, 30, "#5C3A1E");
          ctx.fillStyle = col;
          ctx.beginPath();
          ctx.arc(tx + 6, ty + 20, 20, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.fillStyle = col;
        ctx.beginPath();
        ctx.arc(x + 40, g - 20, 10, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    function dPalace(x, g, col, p) {
      const s = p === 0 ? 0 : p < .25 ? 1 : p < .5 ? 2 : p < .75 ? 3 : p < 1 ? 4 : 5;
      if (!s) return;
      if (s >= 3) fr(x + 6, g - 72, 68, 54, col + "66");
      if (s >= 4) {
        fr(x + 6, g - 74, 68, 56, col + "99");
        [x + 8, x + 18, x + 54, x + 64].forEach(cx2 => fr(cx2, g - 74, 8, 56, col + "BB"));
      }
      if (s === 5) {
        fr(x + 6, g - 76, 68, 60, col);
        fr(x + 28, g - 106, 24, 32, col);
        fr(x + 36, g - 114, 8, 10, "#E8EDF2");
      }
    }
    function dPlaza(x, g, col, p) {
      const s = p === 0 ? 0 : p < .25 ? 1 : p < .5 ? 2 : p < .75 ? 3 : p < 1 ? 4 : 5;
      if (!s) return;
      if (s >= 4) {
        [x + 10, x + 30, x + 50, x + 65].forEach(px2 => fr(px2, g - 58, 8, 34, col + "AA"));
        fr(x + 3, g - 60, 74, 6, col);
      }
      if (s === 5) {
        [x + 10, x + 30, x + 50, x + 65].forEach(px2 => fr(px2, g - 62, 8, 36, col));
        ctx.fillStyle = col;
        ctx.beginPath();
        ctx.arc(x + 40, g - 50, 9, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    const DFN2 = {
      onboarding: dTent,
      carrera: dHouse,
      capacitacion: dSchool,
      evaluacion: dOffice,
      mentorias: dLib,
      bienestar: dPark,
      sucesion: dPalace,
      feedback: dPlaza
    };
    const am2 = S.modules.filter(m => m.active);
    if (am2.length > 0) {
      const margin = 14,
        slotW = Math.floor((W - margin * 2) / am2.length);
      am2.forEach((mod, i) => {
        const p = pct(mod),
          bx = margin + i * slotW + Math.floor((slotW - 80) / 2);
        const fn = DFN2[mod.buildingType || mod.id] || dOffice;
        fn(bx, ground, mod.color, p);
        ctx.font = "bold 10px monospace";
        ctx.fillStyle = mod.color;
        ctx.textAlign = "center";
        ctx.fillText(Math.round(p * 100) + "%", bx + 40, ground + 14);
        ctx.font = "9px monospace";
        ctx.fillStyle = mod.color + "AA";
        ctx.fillText(mod.name.length > 10 ? mod.name.slice(0, 9) + "…" : mod.name, bx + 40, ground + 25);
      });
    }
    setCityImg(cv.toDataURL("image/png"));
  }, [S?.modules]);
  const px = s => ({
    fontFamily: "'Press Start 2P',monospace",
    ...s
  });
  const aMods = S.modules.filter(m => m.active);
  const totalXP = S.modules.reduce((a, m) => a + m.tasks.filter(t => t.done).reduce((b, t) => b + t.xp, 0), 0);
  const possXP = aMods.reduce((a, m) => a + m.tasks.reduce((b, t) => b + t.xp, 0), 0);
  const cityPct = possXP > 0 ? Math.round(totalXP / possXP * 100) : 0;
  const doneTasks = S.modules.reduce((a, m) => a + m.tasks.filter(t => t.done).length, 0);
  const pendingTasks = S.modules.reduce((a, m) => a + (m.active ? m.tasks.filter(t => !t.done).length : 0), 0);
  const allOverdue = S.modules.flatMap(m => m.active ? m.tasks.filter(t => isOverdue(t)).map(t => ({
    ...t,
    modName: m.name,
    modColor: m.color
  })) : []);
  const myProjects = isAdmin ? allProjects : allProjects.filter(p => p.team.some(m => m.email === session.email));
  const D = dayMode ? {
    app: "#f0f7f4",
    nav: "#004949",
    navBorder: "#006060",
    panel: "#ffffff",
    panelBorder: "#c8e6dc",
    card: "#f8fdfa",
    cardBorder: "#c8e6dc",
    text: "#0a2a20",
    textSub: "#2a6e5a",
    textMuted: "#5a9a86",
    inp: "#ffffff",
    inpBorder: "#6aaa90",
    accent: "#004949",
    accentText: "#ffffff",
    tabActive: "#004949",
    tabActiveBorder: "#004949",
    xBarBg: "#c8e6dc"
  } : {
    app: "#002b2b",
    nav: "#001a1a",
    navBorder: "#004949",
    panel: "#003030",
    panelBorder: "#005050",
    card: "#003838",
    cardBorder: "#004949",
    text: "#d4f0e8",
    textSub: "#7dc9b2",
    textMuted: "#4a8a76",
    inp: "#001a1a",
    inpBorder: "#004949",
    accent: "#7dc9b2",
    accentText: "#001a1a",
    tabActive: "#7dc9b2",
    tabActiveBorder: "#7dc9b2",
    xBarBg: "#001a1a"
  };
  const C = {
    app: {
      background: D.app,
      minHeight: "100vh",
      color: D.text,
      fontFamily: "Inter,sans-serif",
      fontSize: 14
    },
    nav: {
      background: D.nav,
      borderBottom: `1px solid ${D.navBorder}`,
      padding: "0 14px",
      display: "flex",
      alignItems: "center",
      height: 46,
      position: "sticky",
      top: 0,
      zIndex: 50,
      overflowX: "auto"
    },
    panel: {
      background: D.panel,
      border: `1px solid ${D.panelBorder}`,
      padding: 14
    },
    card: {
      background: D.card,
      border: `1px solid ${D.cardBorder}`,
      padding: 12
    },
    inp: {
      background: D.inp,
      border: `1px solid ${D.inpBorder}`,
      color: D.text,
      padding: "7px 9px",
      fontSize: 12,
      fontFamily: "Inter,sans-serif",
      outline: "none",
      width: "100%"
    },
    dateInp: {
      background: D.inp,
      border: `1px solid ${D.inpBorder}`,
      color: D.text,
      padding: "4px 6px",
      fontSize: 11,
      fontFamily: "Inter,sans-serif",
      outline: "none"
    },
    nb: a => ({
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: "0 9px",
      height: 46,
      fontSize: 11,
      fontWeight: 600,
      color: a ? D.accentText : "rgba(255,255,255,0.6)",
      borderBottom: a ? `2px solid ${D.accentText}` : "2px solid transparent"
    }),
    btn: v => {
      const m = {
        p: {
          background: D.accent,
          color: D.accentText,
          border: "none"
        },
        t: {
          background: "transparent",
          color: D.accent,
          border: `1px solid ${D.accent}`
        },
        g: {
          background: "transparent",
          color: D.textMuted,
          border: `1px solid ${D.cardBorder}`
        },
        d: {
          background: "transparent",
          color: "#FF4757",
          border: "1px solid #FF475744"
        }
      };
      return {
        ...m[v],
        fontFamily: "'Press Start 2P',monospace",
        fontSize: 6,
        padding: "6px 11px",
        cursor: "pointer"
      };
    },
    xBar: {
      height: 5,
      background: D.xBarBg,
      overflow: "hidden"
    },
    xFill: (p, c) => ({
      height: "100%",
      width: `${p}%`,
      background: c || D.accent,
      transition: "width .5s"
    }),
    oBadge: {
      display: "inline-flex",
      alignItems: "center",
      background: "#FF475722",
      border: "1px solid #FF475766",
      color: "#FF4757",
      fontFamily: "'Press Start 2P',monospace",
      fontSize: 5,
      padding: "2px 5px"
    },
    sBadge: {
      display: "inline-flex",
      alignItems: "center",
      background: "#FFD70022",
      border: "1px solid #FFD70066",
      color: "#FFD700",
      fontFamily: "'Press Start 2P',monospace",
      fontSize: 5,
      padding: "2px 5px"
    }
  };
  const openTask = (task, mod) => setTaskModal({
    task,
    mod
  });
  const addMessage = (ns, type, mod, task, text, author) => {
    const msg = {
      id: "msg" + Date.now() + Math.random().toString(36).slice(2, 4),
      type,
      modId: mod.id,
      modName: mod.name,
      taskId: task.id,
      taskLabel: task.label,
      authorId: author.id || author.authorId || "",
      authorName: author.name || author.authorName || "",
      authorEmoji: author.emoji || author.authorEmoji || "💬",
      text,
      date: new Date().toISOString(),
      read: false
    };
    return {
      ...ns,
      messages: [...(ns.messages || []), msg]
    };
  };
  const updateTask = (modId, updatedTask, prevTask) => {
    let ns = {
      ...S,
      modules: S.modules.map(m => m.id === modId ? {
        ...m,
        tasks: m.tasks.map(t => t.id === updatedTask.id ? updatedTask : t)
      } : m)
    };
    const mod = S.modules.find(m => m.id === modId);
    if (mod && prevTask && !isAdmin) {
      const newComments = (updatedTask.comments || []).filter(c => !(prevTask.comments || []).find(p => p.id === c.id));
      newComments.forEach(c => {
        ns = addMessage(ns, "comment", mod, updatedTask, c.text, {
          id: c.authorId,
          name: c.authorName,
          emoji: c.authorEmoji
        });
      });
      const newHours = (updatedTask.hoursLog || []).filter(h => !(prevTask.hoursLog || []).find(p => p.id === h.id));
      newHours.forEach(h => {
        ns = addMessage(ns, "hours", mod, updatedTask, `${h.hours}h — ${h.note || "sin nota"}`, {
          id: h.authorId,
          name: h.authorName,
          emoji: h.authorEmoji
        });
      });
    }
    upd(ns);
    save(ns);
    setTaskModal(prev => prev ? {
      ...prev,
      task: updatedTask
    } : null);
  };
  const openEmailModal = (task, mod) => {
    setEmailModal({
      task,
      mod
    });
    setEmailTo(S.team.filter(m => m.email).map(m => m.id));
    setEmailSubject(`[${S.projectName}] ${mod.name} — ${task.label}`);
    setMinuteText("");
  };
  const registerMinute = () => {
    if (!minuteText.trim()) {
      _showToast("Escribí algo en la minuta", "error");
      return;
    }
    const recipients = S.team.filter(m => emailTo.includes(m.id));
    const minute = {
      id: "m" + Date.now(),
      text: minuteText.trim(),
      ts: Date.now(),
      sentTo: recipients.length ? recipients.map(m => m.name).join(", ") : "Sin destinatarios",
      author: S.adminName || "Admin",
      subject: emailSubject,
      seenBy: []
    };
    let ns = {
      ...S,
      modules: S.modules.map(m => m.id === emailModal.mod.id ? {
        ...m,
        tasks: m.tasks.map(t => t.id === emailModal.task.id ? {
          ...t,
          minutes: [...(t.minutes || []), minute]
        } : t)
      } : m)
    };
    ns = addMessage(ns, "minute", emailModal.mod, emailModal.task, minuteText.trim(), {
      id: session.id,
      name: session.name,
      emoji: session.emoji || "📋"
    });
    upd(ns);
    save(ns);
    _showToast("📋 Minuta registrada");
    setEmailModal(null);
  };
  const BUILDING_TYPES = [{
    id: "onboarding",
    label: "⛺ Campamento",
    phase: "Campamento Base"
  }, {
    id: "carrera",
    label: "🏠 Casa",
    phase: "Barrio Residencial"
  }, {
    id: "capacitacion",
    label: "🏫 Escuela",
    phase: "Distrito Educativo"
  }, {
    id: "evaluacion",
    label: "🏢 Oficina",
    phase: "Centro Comercial"
  }, {
    id: "mentorias",
    label: "📚 Biblioteca",
    phase: "Biblioteca"
  }, {
    id: "bienestar",
    label: "🌳 Parque",
    phase: "Parque Central"
  }, {
    id: "sucesion",
    label: "🏛️ Palacio",
    phase: "Palacio Municipal"
  }, {
    id: "feedback",
    label: "💬 Plaza",
    phase: "Plaza Pública"
  }];
  const MOD_COLORS = ["#4ECDC4", "#FFD700", "#C77DFF", "#FF6B35", "#A8E6CF", "#52B788", "#4488FF", "#FF4757"];
  const adminTabs = [{
    id: "ciudad",
    label: "🏙 CIUDAD"
  }, {
    id: "equipo",
    label: "👥 EQUIPO"
  }, {
    id: "modulos",
    label: "🏗 MÓDULOS"
  }, {
    id: "gantt",
    label: "📊 GANTT"
  }, {
    id: "chat",
    label: "💬 CHAT"
  }, {
    id: "imprimir",
    label: "🖨 IMPRIMIR"
  }, {
    id: "config",
    label: "⚙ CONFIG"
  }];
  const teamTabs = [{
    id: "ciudad",
    label: "🏙 CIUDAD"
  }, {
    id: "tareas",
    label: "📋 MIS TAREAS"
  }, {
    id: "gantt",
    label: "📊 GANTT"
  }, {
    id: "chat",
    label: "💬 CHAT"
  }, {
    id: "imprimir",
    label: "🖨 IMPRIMIR"
  }];
  const eclientTabs = [{
    id: "ciudad",
    label: "🏙 CIUDAD"
  }, {
    id: "tareas",
    label: "📋 TAREAS"
  }, {
    id: "equipo",
    label: "👥 MI EQUIPO"
  }, {
    id: "gantt",
    label: "📊 GANTT"
  }, {
    id: "chat",
    label: "💬 CHAT"
  }, {
    id: "imprimir",
    label: "🖨 IMPRIMIR"
  }];
  const tabs = isAdmin ? adminTabs : isEclient ? eclientTabs : teamTabs;
  const renderEmailModal = () => {
    if (!emailModal) return null;
    const {
      task,
      mod
    } = emailModal;
    return React.createElement("div", {
      style: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.88)",
        zIndex: 400,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16
      }
    }, React.createElement("div", {
      style: {
        background: "#0D1117",
        border: "1px solid #4ECDC4",
        maxWidth: 560,
        width: "100%",
        maxHeight: "90vh",
        overflow: "auto"
      }
    }, React.createElement("div", {
      style: {
        background: "#080C12",
        padding: "12px 16px",
        borderBottom: "1px solid #1E2D40",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }
    }, React.createElement("div", {
      style: px({
        fontSize: 8,
        color: "#4ECDC4"
      })
    }, "📋 REGISTRAR MINUTA"), React.createElement("button", {
      onClick: () => setEmailModal(null),
      style: {
        background: "none",
        border: "none",
        color: "#7A8FA6",
        cursor: "pointer",
        fontSize: 20,
        lineHeight: 1
      }
    }, "×")), React.createElement("div", {
      style: {
        padding: 16
      }
    }, React.createElement("div", {
      style: {
        background: "#1A2332",
        border: `1px solid ${mod.color}44`,
        padding: 11,
        marginBottom: 12,
        display: "flex",
        alignItems: "center",
        gap: 9
      }
    }, React.createElement("span", {
      style: {
        fontSize: 20
      }
    }, mod.icon), React.createElement("div", null, React.createElement("div", {
      style: {
        fontWeight: 600,
        fontSize: 13
      }
    }, task.label), React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#7A8FA6"
      }
    }, mod.name, task.dueDate ? " · " + fmtD(task.dueDate) : ""))), React.createElement("div", {
      style: {
        marginBottom: 10
      }
    }, React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#7A8FA6",
        marginBottom: 4
      }
    }, "REGISTRADO POR"), React.createElement("input", {
      style: {
        ...C.inp,
        width: "60%"
      },
      value: S.adminName || "",
      onChange: e => upd({
        ...S,
        adminName: e.target.value
      })
    })), React.createElement("div", {
      style: {
        marginBottom: 10
      }
    }, React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#7A8FA6",
        marginBottom: 5
      }
    }, "DESTINATARIOS"), S.team.map(m => React.createElement("div", {
      key: m.id,
      onClick: () => setEmailTo(prev => prev.includes(m.id) ? prev.filter(x => x !== m.id) : [...prev, m.id]),
      style: {
        display: "flex",
        alignItems: "center",
        gap: 7,
        padding: "5px 8px",
        background: emailTo.includes(m.id) ? "#1A2332" : "transparent",
        border: `1px solid ${emailTo.includes(m.id) ? "#2A3F58" : "transparent"}`,
        cursor: "pointer",
        marginBottom: 3
      }
    }, React.createElement("input", {
      type: "checkbox",
      checked: emailTo.includes(m.id),
      onChange: () => {},
      style: {
        accentColor: "#4ECDC4",
        width: 12,
        height: 12,
        cursor: "pointer"
      }
    }), React.createElement("span", {
      style: {
        fontSize: 14
      }
    }, m.emoji), React.createElement("div", {
      style: {
        flex: 1
      }
    }, React.createElement("div", {
      style: {
        fontSize: 12,
        fontWeight: 600
      }
    }, m.name), React.createElement("div", {
      style: {
        fontSize: 10,
        color: m.email ? "#7A8FA6" : "#FF475788"
      }
    }, m.email || "sin email"))))), React.createElement("div", {
      style: {
        marginBottom: 10
      }
    }, React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#7A8FA6",
        marginBottom: 4
      }
    }, "ASUNTO"), React.createElement("input", {
      style: C.inp,
      value: emailSubject,
      onChange: e => setEmailSubject(e.target.value)
    })), React.createElement("div", {
      style: {
        marginBottom: 12
      }
    }, React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#7A8FA6",
        marginBottom: 4
      }
    }, "MINUTA ", React.createElement("span", {
      style: {
        color: "#FF4757"
      }
    }, "*")), React.createElement("textarea", {
      autoFocus: true,
      value: minuteText,
      onChange: e => setMinuteText(e.target.value),
      placeholder: "Puntos tratados:\n- ...\n\nDecisiones:\n- ...\n\nPróximos pasos:\n- ...",
      style: {
        ...C.inp,
        minHeight: 100,
        resize: "vertical",
        lineHeight: 1.7,
        padding: "9px 11px"
      }
    })), React.createElement("div", {
      style: {
        background: "#0A1018",
        border: "1px solid #1E2D40",
        borderLeft: "3px solid #4ECDC4",
        padding: "8px 12px",
        marginBottom: 12,
        fontSize: 11,
        color: "#7A8FA6",
        lineHeight: 1.7
      }
    }, "La minuta queda guardada en el historial de la tarea. El equipo puede marcarla como vista.", S.team.filter(m => emailTo.includes(m.id) && m.email).length > 0 && S.adminEmail && React.createElement("span", null, " · Podés abrirla en Gmail.")), React.createElement("div", {
      style: {
        display: "flex",
        gap: 7,
        justifyContent: "flex-end",
        flexWrap: "wrap"
      }
    }, React.createElement("button", {
      style: C.btn("g"),
      onClick: () => setEmailModal(null)
    }, "CANCELAR"), S.team.filter(m => emailTo.includes(m.id) && m.email).length > 0 && S.adminEmail && React.createElement("button", {
      style: {
        ...C.btn("g"),
        color: "#A8E6CF",
        borderColor: "#A8E6CF44"
      },
      onClick: () => {
        const to = encodeURIComponent(S.team.filter(m => emailTo.includes(m.id) && m.email).map(m => m.email).join(","));
        const su = encodeURIComponent(emailSubject);
        const bo = encodeURIComponent(`Tarea: ${task.label}\nMódulo: ${mod.name}\n\n--- MINUTA ---\n${minuteText}`);
        window.open(`https://mail.google.com/mail/?view=cm&to=${to}&su=${su}&body=${bo}`, "_blank");
      }
    }, "↗ ABRIR EN GMAIL"), React.createElement("button", {
      style: {
        ...C.btn("t"),
        background: "#4ECDC422",
        ...(!minuteText.trim() ? {
          opacity: .4
        } : {})
      },
      onClick: registerMinute
    }, "📋 REGISTRAR")))));
  };
  const [chatMsg, setChatMsg] = useState("");
  const chatEndRef = useRef(null);
  useEffect(() => {
    const interval = setInterval(() => {
      if (view === "chat") loadAll().then(d => {
        if (d?.projects) {
          const updated = d.projects.find(p => p.id === S.id);
          if (updated && (updated.chat || []).length !== (S.chat || []).length) upd(updated);
        }
      });
    }, 12000);
    return () => clearInterval(interval);
  }, [view, S.id, (S.chat || []).length]);
  useEffect(() => {
    if (view === "chat" && chatEndRef.current) chatEndRef.current.scrollIntoView({
      behavior: "smooth"
    });
  }, [view, (S.chat || []).length]);
  const sendChat = () => {
    if (!chatMsg.trim()) return;
    const msg = {
      id: "c" + Date.now(),
      authorId: session.id || session.email,
      authorName: session.name,
      authorEmoji: session.emoji || "💬",
      text: chatMsg.trim(),
      ts: Date.now()
    };
    const ns = {
      ...S,
      chat: [...(S.chat || []), msg]
    };
    upd(ns);
    save(ns);
    setChatMsg("");
  };
  const renderChatView = () => {
    const msgs = S.chat || [];
    const members = [...S.team];
    if (S.adminName) members.unshift({
      name: S.adminName,
      emoji: "🏗️"
    });
    return React.createElement("div", {
      style: {
        padding: 14,
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 120px)",
        minHeight: 400
      }
    }, React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 12
      }
    }, React.createElement("div", {
      style: px({
        fontSize: 7,
        color: D.accent,
        letterSpacing: 2
      })
    }, "▸ CHAT DEL PROYECTO"), React.createElement("div", {
      style: {
        fontSize: 10,
        color: D.textMuted
      }
    }, S.team.length, " miembro", S.team.length !== 1 ? "s" : "", " · se actualiza cada 12s")), React.createElement("div", {
      style: {
        flex: 1,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        paddingRight: 4,
        marginBottom: 12
      }
    }, msgs.length === 0 && React.createElement("div", {
      style: {
        textAlign: "center",
        padding: 48,
        color: D.textMuted,
        fontSize: 12
      }
    }, "💬 No hay mensajes aún. ¡Sé el primero en escribir!"), msgs.map(msg => {
      const isMe = msg.authorId === session.id || msg.authorId === session.email || msg.authorName === session.name;
      const d = new Date(msg.ts);
      const timeStr = d.toLocaleDateString('es-AR', {
        day: '2-digit',
        month: '2-digit'
      }) + " " + d.getHours().toString().padStart(2, "0") + ":" + d.getMinutes().toString().padStart(2, "0");
      return React.createElement("div", {
        key: msg.id,
        style: {
          display: "flex",
          flexDirection: isMe ? "row-reverse" : "row",
          gap: 8,
          alignItems: "flex-end"
        }
      }, React.createElement("div", {
        style: {
          fontSize: 20,
          flexShrink: 0
        }
      }, msg.authorEmoji), React.createElement("div", {
        style: {
          maxWidth: "70%"
        }
      }, !isMe && React.createElement("div", {
        style: {
          fontSize: 9,
          color: D.textMuted,
          marginBottom: 2,
          textAlign: "left"
        }
      }, msg.authorName), React.createElement("div", {
        style: {
          background: isMe ? D.accent + "33" : D.panel,
          border: `1px solid ${isMe ? D.accent + "55" : D.cardBorder}`,
          padding: "8px 12px",
          fontSize: 13,
          color: D.text,
          lineHeight: 1.4,
          borderRadius: isMe ? "12px 12px 2px 12px" : "12px 12px 12px 2px"
        }
      }, msg.text), React.createElement("div", {
        style: {
          fontSize: 9,
          color: D.textMuted,
          marginTop: 2,
          textAlign: isMe ? "right" : "left"
        }
      }, timeStr)));
    }), React.createElement("div", {
      ref: chatEndRef
    })), React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        alignItems: "center",
        borderTop: `1px solid ${D.cardBorder}`,
        paddingTop: 12
      }
    }, React.createElement("span", {
      style: {
        fontSize: 20,
        flexShrink: 0
      }
    }, session.emoji || "💬"), React.createElement("input", {
      style: {
        ...C.inp,
        flex: 1,
        fontSize: 13,
        padding: "10px 14px"
      },
      placeholder: "Escribí un mensaje...",
      value: chatMsg,
      onChange: e => setChatMsg(e.target.value),
      onKeyDown: e => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          sendChat();
        }
      }
    }), React.createElement("button", {
      style: {
        ...C.btn("p"),
        padding: "10px 16px",
        fontSize: 7
      },
      onClick: sendChat
    }, "ENVIAR")));
  };
  const renderCiudadView = () => {
    const unread = (S.messages || []).filter(m => !m.read).length;
    const overdueMsg = (S.messages || []).filter(m => !m.read && m.type === "overdue");
    return React.createElement("div", {
      style: {
        padding: 14
      }
    }, overdueMsg.length > 0 && React.createElement("div", {
      style: {
        background: "#FF475722",
        border: "2px solid #FF4757",
        padding: "10px 16px",
        marginBottom: 12,
        display: "flex",
        alignItems: "center",
        gap: 10,
        animation: "pulse 1s infinite"
      }
    }, React.createElement("span", {
      style: {
        fontSize: 22
      }
    }, "🚨"), React.createElement("div", {
      style: {
        flex: 1
      }
    }, React.createElement("div", {
      style: {
        fontFamily: "'Press Start 2P',monospace",
        fontSize: 8,
        color: "#FF4757",
        marginBottom: 3
      }
    }, "¡ATENCIÓN! ", overdueMsg.length, " TAREA", overdueMsg.length > 1 ? "S" : "", " VENCIDA", overdueMsg.length > 1 ? "S" : ""), React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#FF9999"
      }
    }, overdueMsg.slice(0, 3).map(m => `${m.modName} › ${m.taskLabel}`).join(" · "), overdueMsg.length > 3 ? ` · y ${overdueMsg.length - 3} más` : "")), React.createElement("button", {
      onClick: () => {
        const ns = {
          ...S,
          messages: (S.messages || []).map(m => m.type === "overdue" ? {
            ...m,
            read: true
          } : m)
        };
        upd(ns);
        save(ns);
      },
      style: {
        background: "#FF4757",
        color: "white",
        border: "none",
        fontFamily: "'Press Start 2P',monospace",
        fontSize: 6,
        padding: "5px 10px",
        cursor: "pointer"
      }
    }, "MARCAR LEÍDAS")), unread > 0 && overdueMsg.length === 0 && React.createElement("div", {
      style: {
        background: "#C77DFF22",
        border: "1px solid #C77DFF44",
        padding: "8px 14px",
        marginBottom: 10,
        display: "flex",
        alignItems: "center",
        gap: 8
      }
    }, React.createElement("span", {
      style: {
        fontSize: 16
      }
    }, "💬"), React.createElement("span", {
      style: {
        fontSize: 12,
        color: "#C77DFF"
      }
    }, unread, " mensaje", unread > 1 ? "s" : "", " sin leer")), React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 12,
        flexWrap: "wrap"
      }
    }, isAdmin && editingName ? React.createElement("input", {
      autoFocus: true,
      style: {
        ...C.inp,
        ...px({}),
        width: 190,
        fontSize: 8
      },
      value: S.projectName,
      onChange: e => upd({
        ...S,
        projectName: e.target.value
      }),
      onBlur: () => {
        setEditingName(false);
        save(S);
      },
      onKeyDown: e => e.key === "Enter" && e.target.blur()
    }) : React.createElement("div", {
      onClick: () => isAdmin && setEditingName(true),
      style: px({
        fontSize: 10,
        color: "#FFD700",
        cursor: isAdmin ? "pointer" : "default"
      })
    }, "🏙️ ", S.projectName), savedAt && isAdmin && React.createElement("span", {
      style: {
        fontSize: 10,
        color: "#2A3F5880"
      }
    }, savedAt.getHours().toString().padStart(2, "0"), ":", savedAt.getMinutes().toString().padStart(2, "0")), allOverdue.length > 0 && React.createElement("div", {
      style: {
        ...C.oBadge,
        marginLeft: "auto"
      }
    }, "⚠ ", allOverdue.length, " VENCIDA", allOverdue.length > 1 ? "S" : ""), !isAdmin && React.createElement("div", {
      style: {
        marginLeft: "auto",
        fontSize: 11,
        color: "#7A8FA6",
        display: "flex",
        alignItems: "center",
        gap: 5
      }
    }, React.createElement("span", {
      style: {
        fontSize: 14
      }
    }, session.emoji), session.name)), React.createElement("div", {
      style: {
        ...C.panel,
        padding: 0,
        overflowX: "auto",
        marginBottom: 12
      }
    }, React.createElement(CityCanvas, {
      modules: S.modules,
      team: S.team,
      dayMode: dayMode,
      severaData: severaCache
    }), React.createElement("div", {
      style: {
        padding: "4px 12px",
        borderTop: "1px solid #1A2332",
        display: "flex",
        justifyContent: "space-between"
      }
    }, React.createElement("span", {
      style: px({
        fontSize: 5,
        color: "#2A3F58",
        letterSpacing: 2
      })
    }, aMods.length, " EDIFICIOS · ", S.team.length, " CIUDADANOS"), React.createElement("span", {
      style: px({
        fontSize: 6,
        color: "#4ECDC4"
      })
    }, "CIUDAD AL ", cityPct, "%"))), React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: 9,
        marginBottom: 12
      }
    }, [{
      l: "XP Total",
      v: totalXP.toLocaleString(),
      c: "#FFD700"
    }, {
      l: "Módulos",
      v: aMods.length,
      c: "#4ECDC4"
    }, {
      l: "Pendientes",
      v: pendingTasks,
      c: "#FF6B35"
    }, {
      l: "Completadas",
      v: doneTasks,
      c: "#A8E6CF"
    }].map(s => React.createElement("div", {
      key: s.l,
      style: {
        ...C.card,
        textAlign: "center"
      }
    }, React.createElement("div", {
      style: px({
        fontSize: 14,
        color: s.c,
        marginBottom: 4
      })
    }, s.v), React.createElement("div", {
      style: {
        fontSize: 10,
        color: D.textMuted
      }
    }, s.l.toUpperCase())))), React.createElement("div", {
      style: {
        ...C.panel,
        marginBottom: 12
      }
    }, React.createElement("div", {
      style: px({
        fontSize: 7,
        color: "#4ECDC4",
        letterSpacing: 2,
        marginBottom: 8
      })
    }, "▸ AVANCE POR MÓDULO"), aMods.length === 0 && React.createElement("div", {
      style: px({
        fontSize: 7,
        color: D.textMuted,
        textAlign: "center",
        padding: 12
      })
    }, "ACTIVÁ MÓDULOS"), aMods.map(mod => {
      const d = mod.tasks.filter(t => t.done).length,
        tot = mod.tasks.length,
        p = tot ? Math.round(d / tot * 100) : 0,
        od = mod.tasks.filter(t => isOverdue(t)).length,
        soon = mod.tasks.filter(t => isDueSoon(t)).length;
      return React.createElement("div", {
        key: mod.id,
        style: {
          marginBottom: 9
        }
      }, React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 3,
          alignItems: "center"
        }
      }, React.createElement("span", {
        style: {
          fontSize: 12,
          color: D.text,
          display: "flex",
          alignItems: "center",
          gap: 5
        }
      }, mod.icon, " ", mod.name, od > 0 && React.createElement("span", {
        style: C.oBadge
      }, "⚠", od), soon > 0 && !od && React.createElement("span", {
        style: C.sBadge
      }, "⏰", soon)), React.createElement("span", {
        style: px({
          fontSize: 6,
          color: mod.color
        })
      }, d, "/", tot, " · ", p, "%")), React.createElement("div", {
        style: C.xBar
      }, React.createElement("div", {
        style: C.xFill(p, mod.color)
      })));
    })), severaCache && (() => {
      const phases = severaCache.phases || [];
      const roots = phases.filter(p => !p.belongsTo);
      if (!roots.length) return null;
      return React.createElement("div", {
        style: {
          ...C.panel,
          marginBottom: 12
        }
      }, React.createElement("div", {
        style: {
          fontFamily: "'Press Start 2P',monospace",
          fontSize: 7,
          color: "#7dc9b2",
          letterSpacing: 2,
          marginBottom: 8,
          display: "flex",
          alignItems: "center",
          gap: 8
        }
      }, "🔗 MÓDULOS SEVERA", React.createElement("span", {
        style: {
          fontSize: 10,
          color: D.textMuted,
          fontFamily: "Inter",
          fontWeight: 400,
          letterSpacing: 0
        }
      }, severaCache.name)), roots.map(root => {
        const children = phases.filter(p => p.belongsTo === root.name);
        const done = children.filter(t => t.isCompleted).length;
        const pct = children.length ? Math.round(done / children.length * 100) : root.isCompleted ? 100 : 0;
        return React.createElement("div", {
          key: root.guid,
          style: {
            marginBottom: 9
          }
        }, React.createElement("div", {
          style: {
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 3,
            alignItems: "center"
          }
        }, React.createElement("span", {
          style: {
            fontSize: 12,
            color: "#7dc9b2",
            display: "flex",
            alignItems: "center",
            gap: 5
          }
        }, "🔗 ", root.name), React.createElement("span", {
          style: {
            fontFamily: "'Press Start 2P',monospace",
            fontSize: 6,
            color: pct === 100 ? "#52B788" : "#7dc9b2"
          }
        }, done, "/", children.length, " · ", pct, "%")), React.createElement("div", {
          style: {
            height: 6,
            background: "#7dc9b222",
            borderRadius: 2
          }
        }, React.createElement("div", {
          style: {
            height: "100%",
            background: pct === 100 ? "#52B788" : "#7dc9b2",
            width: pct + "%",
            borderRadius: 2,
            transition: "width .3s"
          }
        })));
      }));
    })(), isAdmin && React.createElement("button", {
      style: C.btn("p"),
      onClick: () => save(S)
    }, saving ? "GUARDANDO..." : "💾 GUARDAR"));
  };
  const renderMisTareasView = () => {
    const myMods = S.modules.filter(m => m.active);
    const unseenCount = myMods.flatMap(m => m.tasks).flatMap(t => (t.minutes || []).filter(mn => !(mn.seenBy || []).find(x => x.id === session.id))).length;
    const closedUnread = myMods.flatMap(m => m.tasks.filter(t => t.done && !(t.readBy || []).find(r => r.id === (session.id || session.email))));
    const markTaskRead = (mod, task) => {
      const readEntry = {
        id: session.id || session.email,
        name: session.name,
        ts: new Date().toISOString()
      };
      const ns = {
        ...S,
        modules: S.modules.map(m => m.id === mod.id ? {
          ...m,
          tasks: m.tasks.map(t => t.id === task.id ? {
            ...t,
            readBy: [...(t.readBy || []), readEntry]
          } : t)
        } : m)
      };
      upd(ns);
      save(ns);
    };
    const hardMods = severaCache ? (() => {
      const phases = severaCache.phases || [];
      const roots = phases.filter(p => !p.belongsTo);
      return roots.map(root => ({
        ...root,
        tasks: phases.filter(p => p.belongsTo === root.name)
      }));
    })() : [];
    return React.createElement("div", {
      style: {
        padding: 14
      }
    }, closedUnread.length > 0 && React.createElement("div", {
      style: {
        background: "#52B78822",
        border: "2px solid #52B78855",
        padding: "10px 14px",
        marginBottom: 12
      }
    }, React.createElement("div", {
      style: {
        fontFamily: "'Press Start 2P',monospace",
        fontSize: 7,
        color: "#52B788",
        marginBottom: 8
      }
    }, "✅ ", closedUnread.length, " TAREA", closedUnread.length > 1 ? "S" : "", " COMPLETADA", closedUnread.length > 1 ? "S" : "", " POR ADMIN"), closedUnread.map(t => {
      const mod = myMods.find(m => m.tasks.find(tt => tt.id === t.id));
      return React.createElement("div", {
        key: t.id,
        style: {
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 6,
          background: "#0D1117",
          padding: "6px 10px"
        }
      }, React.createElement("span", {
        style: {
          fontSize: 12
        }
      }, "✅"), React.createElement("div", {
        style: {
          flex: 1
        }
      }, React.createElement("div", {
        style: {
          fontSize: 12,
          color: D.text
        }
      }, t.label), mod && React.createElement("div", {
        style: {
          fontSize: 10,
          color: D.textMuted
        }
      }, mod.name)), React.createElement("button", {
        onClick: () => markTaskRead(mod, t),
        style: {
          background: "#52B788",
          color: "#fff",
          border: "none",
          fontFamily: "'Press Start 2P',monospace",
          fontSize: 6,
          padding: "4px 8px",
          cursor: "pointer"
        }
      }, "LEÍDO ✓"));
    })), React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 12
      }
    }, React.createElement("div", {
      style: px({
        fontSize: 8,
        color: "#4ECDC4"
      })
    }, "▸ MÓDULOS DEL PROYECTO"), unseenCount > 0 && React.createElement("div", {
      style: {
        background: "#FF475722",
        border: "1px solid #FF475766",
        color: "#FF4757",
        fontFamily: "'Press Start 2P',monospace",
        fontSize: 5,
        padding: "3px 8px",
        marginLeft: "auto"
      }
    }, "📋 ", unseenCount, " SIN VER")), myMods.length === 0 && React.createElement("div", {
      style: px({
        fontSize: 7,
        color: "#2A3F58",
        textAlign: "center",
        padding: 24
      })
    }, "NO HAY MÓDULOS ACTIVOS"), myMods.map(mod => {
      const done = mod.tasks.filter(t => t.done).length,
        tot = mod.tasks.length,
        p = tot ? Math.round(done / tot * 100) : 0;
      const od = mod.tasks.filter(t => isOverdue(t)).length;
      const unseenMins = mod.tasks.flatMap(t => (t.minutes || []).filter(mn => !(mn.seenBy || []).find(x => x.id === session.id))).length;
      return React.createElement("div", {
        key: mod.id,
        style: {
          ...C.panel,
          marginBottom: 12,
          borderColor: mod.color + "44"
        }
      }, React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 8
        }
      }, React.createElement("span", {
        style: {
          fontSize: 20
        }
      }, mod.icon), React.createElement("div", {
        style: {
          flex: 1
        }
      }, React.createElement("div", {
        style: {
          fontSize: 13,
          fontWeight: 600,
          color: D.text
        }
      }, mod.name), React.createElement("div", {
        style: px({
          fontSize: 5,
          color: mod.color
        })
      }, mod.phase)), React.createElement("div", {
        style: {
          display: "flex",
          gap: 5,
          alignItems: "center"
        }
      }, od > 0 && React.createElement("span", {
        style: C.oBadge
      }, "⚠", od), unseenMins > 0 && React.createElement("span", {
        style: {
          ...C.oBadge,
          background: "#4ECDC422",
          border: "1px solid #4ECDC466",
          color: "#4ECDC4"
        }
      }, "📋", unseenMins), React.createElement("span", {
        style: {
          fontFamily: "'Press Start 2P',monospace",
          fontSize: 7,
          color: p === 100 ? "#52B788" : D.accent
        }
      }, p, "%"))), React.createElement("div", {
        style: {
          ...C.xBar,
          marginBottom: 8
        }
      }, React.createElement("div", {
        style: C.xFill(p, mod.color)
      })), mod.tasks.map(t => {
        const ov = isOverdue(t),
          sn = isDueSoon(t),
          cC = (t.comments || []).length,
          unseenM = (t.minutes || []).filter(mn => !(mn.seenBy || []).find(x => x.id === session.id)).length;
        const isClosedUnread = t.done && !(t.readBy || []).find(r => r.id === (session.id || session.email));
        return React.createElement("div", {
          key: t.id,
          style: {
            background: D.app,
            borderLeft: `2px solid ${ov ? "#FF4757" : sn ? "#FFD700" : t.done ? mod.color : D.cardBorder}`,
            marginBottom: 2
          }
        }, React.createElement("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 7,
            padding: "7px 9px 3px"
          }
        }, isEclient ? React.createElement("span", {
          onClick: () => {
            const ns = {
              ...S,
              modules: S.modules.map(m2 => m2.id === mod.id ? {
                ...m2,
                tasks: m2.tasks.map(t2 => t2.id === t.id ? {
                  ...t2,
                  done: !t2.done
                } : t2)
              } : m2)
            };
            upd(ns);
            save(ns);
          },
          style: {
            fontSize: 13,
            flexShrink: 0,
            cursor: "pointer"
          }
        }, t.done ? "✅" : "⬜") : React.createElement("span", {
          style: {
            fontSize: 13,
            flexShrink: 0
          }
        }, t.done ? "✅" : "⬜"), React.createElement("span", {
          onClick: () => openTask(t, mod),
          style: {
            flex: 1,
            fontSize: 12,
            color: t.done ? D.textMuted : D.text,
            textDecoration: t.done ? "line-through" : "none",
            cursor: "pointer"
          }
        }, t.label), isClosedUnread && !isEclient && React.createElement("button", {
          onClick: () => markTaskRead(mod, t),
          style: {
            background: "#52B78833",
            border: "1px solid #52B78855",
            color: "#52B788",
            fontFamily: "'Press Start 2P',monospace",
            fontSize: 5,
            padding: "2px 6px",
            cursor: "pointer"
          }
        }, "✓ VER"), ov && React.createElement("span", {
          style: C.oBadge
        }, "⚠"), sn && !ov && React.createElement("span", {
          style: C.sBadge
        }, "⏰"), unseenM > 0 && React.createElement("span", {
          style: {
            background: "#4ECDC422",
            border: "1px solid #4ECDC466",
            color: "#4ECDC4",
            fontFamily: "'Press Start 2P',monospace",
            fontSize: 5,
            padding: "2px 5px"
          }
        }, "📋", unseenM), cC > 0 && React.createElement("span", {
          style: {
            background: "#C77DFF22",
            border: "1px solid #C77DFF44",
            color: "#C77DFF",
            fontFamily: "'Press Start 2P',monospace",
            fontSize: 5,
            padding: "2px 5px"
          }
        }, "💬", cC), React.createElement("span", {
          onClick: () => openTask(t, mod),
          style: {
            color: D.textMuted,
            fontSize: 13,
            flexShrink: 0,
            cursor: "pointer"
          }
        }, "›")), (t.startDate || t.dueDate) && React.createElement("div", {
          style: {
            display: "flex",
            gap: 6,
            padding: "0 9px 6px 36px",
            fontSize: 10,
            color: D.textSub
          }
        }, t.startDate && React.createElement("span", null, "📅 ", fmtD(t.startDate)), t.dueDate && React.createElement("span", {
          style: {
            color: ov ? "#FF4757" : sn ? "#FFD700" : "#7A8FA6"
          }
        }, "🏁 ", fmtD(t.dueDate))));
      }));
    }), hardMods.length > 0 && React.createElement("div", {
      style: {
        marginTop: 16
      }
    }, React.createElement("div", {
      style: {
        fontFamily: "'Press Start 2P',monospace",
        fontSize: 7,
        color: "#7dc9b2",
        marginBottom: 10,
        display: "flex",
        alignItems: "center",
        gap: 8
      }
    }, "🔗 MÓDULOS SEVERA", React.createElement("span", {
      style: {
        fontSize: 10,
        color: D.textMuted,
        fontFamily: "Inter",
        fontWeight: 400
      }
    }, severaCache?.name)), hardMods.map(mod => {
      const doneTasks = mod.tasks.filter(t => t.isCompleted).length;
      const pct = mod.tasks.length ? Math.round(doneTasks / mod.tasks.length * 100) : mod.isCompleted ? 100 : 0;
      return React.createElement("div", {
        key: mod.guid,
        style: {
          ...C.panel,
          marginBottom: 10,
          borderColor: "#7dc9b244"
        }
      }, React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 6
        }
      }, React.createElement("span", {
        style: {
          fontSize: 16
        }
      }, "🔗"), React.createElement("div", {
        style: {
          flex: 1
        }
      }, React.createElement("div", {
        style: {
          fontSize: 12,
          fontWeight: 600,
          color: "#7dc9b2"
        }
      }, mod.name), mod.status && React.createElement("div", {
        style: {
          fontSize: 10,
          color: D.textMuted
        }
      }, mod.status)), React.createElement("span", {
        style: {
          fontFamily: "'Press Start 2P',monospace",
          fontSize: 7,
          color: pct === 100 ? "#52B788" : "#7dc9b2"
        }
      }, pct, "%")), React.createElement("div", {
        style: {
          height: 4,
          background: "#7dc9b222",
          marginBottom: 8
        }
      }, React.createElement("div", {
        style: {
          height: "100%",
          background: pct === 100 ? "#52B788" : "#7dc9b2",
          width: pct + "%",
          transition: "width .3s"
        }
      })), mod.tasks.map(t => React.createElement("div", {
        key: t.guid,
        style: {
          display: "flex",
          alignItems: "center",
          gap: 7,
          padding: "5px 8px",
          background: D.app,
          borderLeft: `2px solid ${t.isCompleted ? "#7dc9b2" : "#2A3F58"}`,
          marginBottom: 2
        }
      }, React.createElement("span", {
        style: {
          fontSize: 12,
          flexShrink: 0
        }
      }, t.isCompleted ? "✅" : "⬜"), React.createElement("span", {
        style: {
          flex: 1,
          fontSize: 11,
          color: t.isCompleted ? D.textMuted : D.text,
          textDecoration: t.isCompleted ? "line-through" : "none"
        }
      }, t.name), t.status && React.createElement("span", {
        style: {
          fontSize: 9,
          color: D.textMuted,
          fontStyle: "italic"
        }
      }, t.status))), React.createElement(HardCommentBox, {
        mod: mod,
        proj: S,
        session: session,
        onSave: updatedProj => {
          upd(updatedProj);
          save(updatedProj);
        }
      }));
    })));
  };
  const renderModulosView = () => {
    const togMod = id => {
      const ns = {
        ...S,
        modules: S.modules.map(m => m.id === id ? {
          ...m,
          active: !m.active
        } : m)
      };
      upd(ns);
      save(ns);
    };
    const togTask = (mId, tId) => {
      const ns = {
        ...S,
        modules: S.modules.map(m => m.id === mId ? {
          ...m,
          tasks: m.tasks.map(t => {
            if (t.id !== tId) return t;
            const nowDone = !t.done;
            if (nowDone) _showToast("+" + t.xp + " XP ✅");
            return {
              ...t,
              done: nowDone,
              readBy: nowDone ? t.readBy || [] : []
            };
          })
        } : m)
      };
      upd(ns);
      save(ns);
    };
    const remTask = (mId, tId) => {
      const ns = {
        ...S,
        modules: S.modules.map(m => m.id === mId ? {
          ...m,
          tasks: m.tasks.filter(t => t.id !== tId)
        } : m)
      };
      upd(ns);
      save(ns);
    };
    const deleteMod = id => {
      if (!confirm("¿Eliminar módulo?")) return;
      const ns = {
        ...S,
        modules: S.modules.filter(m => m.id !== id)
      };
      upd(ns);
      save(ns);
    };
    const updateModField = (id, field, val) => {
      const ns = {
        ...S,
        modules: S.modules.map(m => {
          if (m.id !== id) return m;
          if (field === "buildingType") {
            const bt = BUILDING_TYPES.find(b => b.id === val) || BUILDING_TYPES[0];
            return {
              ...m,
              buildingType: val,
              icon: bt.label.split(" ")[0],
              phase: bt.phase
            };
          }
          return {
            ...m,
            [field]: val
          };
        })
      };
      upd(ns);
      save(ns);
    };
    const addNewMod = () => {
      if (!newMod.name.trim()) return;
      const bt = BUILDING_TYPES.find(b => b.id === newMod.buildingType) || BUILDING_TYPES[0];
      const mod = {
        id: "mod" + Date.now(),
        name: newMod.name.trim(),
        icon: bt.label.split(" ")[0],
        buildingType: newMod.buildingType,
        active: true,
        color: newMod.color,
        phase: bt.phase,
        ticket: newMod.ticket || "",
        tasks: []
      };
      const ns = {
        ...S,
        modules: [...S.modules, mod]
      };
      upd(ns);
      save(ns);
      setAddingMod(false);
      setNewMod({
        name: "",
        buildingType: "onboarding",
        color: "#4ECDC4",
        ticket: ""
      });
      _showToast(mod.icon + " " + mod.name + " creado");
    };
    const calcEndDate = (startDate, duration) => {
      if (!startDate || !duration || isNaN(parseInt(duration, 10))) return null;
      return addDays(startDate, parseInt(duration, 10));
    };
    const calcDuration = (startDate, dueDate) => {
      if (!startDate || !dueDate) return "";
      const d1 = parseD(startDate),
        d2 = parseD(dueDate);
      if (!d1 || !d2) return "";
      const diff = Math.round((d2 - d1) / (1000 * 60 * 60 * 24));
      return diff > 0 ? String(diff) : "";
    };
    const updateTaskDates = (mId, tId, field, val) => {
      const ns = {
        ...S,
        modules: S.modules.map(m => m.id === mId ? {
          ...m,
          tasks: m.tasks.map(t => {
            if (t.id !== tId) return t;
            if (field === "startDate") {
              const newEnd = calcEndDate(val, t.duration);
              return {
                ...t,
                startDate: val || null,
                dueDate: newEnd || t.dueDate
              };
            }
            if (field === "duration") {
              const dur = parseInt(val, 10);
              const newEnd = t.startDate && dur > 0 ? calcEndDate(t.startDate, dur) : t.dueDate;
              return {
                ...t,
                duration: dur > 0 ? dur : null,
                dueDate: newEnd || t.dueDate
              };
            }
            if (field === "dueDate") {
              const newDur = calcDuration(t.startDate, val);
              return {
                ...t,
                dueDate: val || null,
                duration: newDur ? parseInt(newDur, 10) : t.duration
              };
            }
            return t;
          })
        } : m)
      };
      upd(ns);
      save(ns);
    };
    const doAdd = mId => {
      if (!newTask.label.trim()) return;
      const endDate = calcEndDate(newTask.startDate, newTask.duration) || newTask.dueDate || null;
      const dur = newTask.duration ? parseInt(newTask.duration, 10) : null;
      const ns = {
        ...S,
        modules: S.modules.map(m => m.id === mId ? {
          ...m,
          tasks: [...m.tasks, {
            id: "t" + Date.now(),
            label: newTask.label.trim(),
            done: false,
            xp: 80,
            startDate: newTask.startDate || null,
            duration: dur,
            dueDate: endDate,
            minutes: [],
            comments: []
          }]
        } : m)
      };
      upd(ns);
      save(ns);
      setAddingTask(null);
      setNewTask({
        label: "",
        startDate: "",
        duration: "",
        dueDate: ""
      });
    };
    const previewEnd = calcEndDate(newTask.startDate, newTask.duration);
    return React.createElement("div", {
      style: {
        padding: 14
      }
    }, React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 4,
        flexWrap: "wrap",
        gap: 8
      }
    }, React.createElement("div", {
      style: px({
        fontSize: 7,
        color: "#4ECDC4",
        letterSpacing: 2
      })
    }, "▸ MÓDULOS / EDIFICIOS"), React.createElement("button", {
      style: C.btn("p"),
      onClick: () => setAddingMod(true)
    }, "+ NUEVO MÓDULO")), React.createElement("div", {
      style: {
        color: D.textSub,
        fontSize: 12,
        marginBottom: 12
      }
    }, "Activá módulos. Editá nombre, edificio y color con ✎."), addingMod && React.createElement("div", {
      style: {
        ...C.panel,
        borderColor: "#FFD70066",
        marginBottom: 12
      }
    }, React.createElement("div", {
      style: px({
        fontSize: 7,
        color: "#FFD700",
        marginBottom: 10
      })
    }, "▸ NUEVO MÓDULO"), React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 9,
        marginBottom: 9
      }
    }, React.createElement("div", null, React.createElement("div", {
      style: {
        fontSize: 11,
        color: D.textSub,
        marginBottom: 3
      }
    }, "NOMBRE *"), React.createElement("input", {
      style: C.inp,
      autoFocus: true,
      placeholder: "Ej: Feedback Continuo",
      value: newMod.name,
      onChange: e => setNewMod({
        ...newMod,
        name: e.target.value
      })
    })), React.createElement("div", null, React.createElement("div", {
      style: {
        fontSize: 11,
        color: D.textSub,
        marginBottom: 3
      }
    }, "EDIFICIO"), React.createElement("select", {
      style: {
        ...C.inp,
        cursor: "pointer"
      },
      value: newMod.buildingType,
      onChange: e => setNewMod({
        ...newMod,
        buildingType: e.target.value
      })
    }, BUILDING_TYPES.map(bt => React.createElement("option", {
      key: bt.id,
      value: bt.id
    }, bt.label, " — ", bt.phase)))), React.createElement("div", null, React.createElement("div", {
      style: {
        fontSize: 11,
        color: D.textSub,
        marginBottom: 3
      }
    }, "N° TICKET ", React.createElement("span", {
      style: {
        color: D.textMuted,
        fontSize: 9
      }
    }, "(opcional)")), React.createElement("input", {
      style: C.inp,
      type: "number",
      placeholder: "Ej: 12345",
      value: newMod.ticket || "",
      onChange: e => setNewMod({
        ...newMod,
        ticket: e.target.value
      })
    }))), React.createElement("div", {
      style: {
        marginBottom: 9
      }
    }, React.createElement("div", {
      style: {
        fontSize: 11,
        color: D.textSub,
        marginBottom: 5
      }
    }, "COLOR"), React.createElement("div", {
      style: {
        display: "flex",
        gap: 7,
        flexWrap: "wrap"
      }
    }, MOD_COLORS.map(c => React.createElement("div", {
      key: c,
      onClick: () => setNewMod({
        ...newMod,
        color: c
      }),
      style: {
        width: 22,
        height: 22,
        background: c,
        cursor: "pointer",
        border: newMod.color === c ? "3px solid white" : "3px solid transparent"
      }
    })))), React.createElement("div", {
      style: {
        display: "flex",
        gap: 7
      }
    }, React.createElement("button", {
      style: C.btn("p"),
      onClick: addNewMod
    }, "CREAR"), React.createElement("button", {
      style: C.btn("g"),
      onClick: () => setAddingMod(false)
    }, "CANCELAR"))), React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
        gap: 12
      }
    }, S.modules.map(mod => {
      const done = mod.tasks.filter(t => t.done).length,
        tot = mod.tasks.length,
        p = tot ? Math.round(done / tot * 100) : 0;
      const od = mod.tasks.filter(t => isOverdue(t)).length,
        soon = mod.tasks.filter(t => isDueSoon(t)).length;
      const isEditingThis = editingMod === mod.id;
      return React.createElement("div", {
        key: mod.id,
        style: {
          ...C.card,
          borderColor: mod.active ? mod.color + "55" : D.cardBorder,
          opacity: mod.active ? 1 : .6
        }
      }, React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 7,
          marginBottom: isEditingThis ? 9 : 8
        }
      }, React.createElement("div", {
        style: {
          width: 32,
          height: 32,
          background: D.app,
          border: `1px solid ${mod.color}33`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 17,
          flexShrink: 0
        }
      }, mod.icon), React.createElement("div", {
        style: {
          flex: 1,
          minWidth: 0
        }
      }, React.createElement("div", {
        style: {
          fontSize: 12,
          fontWeight: 600,
          color: D.text,
          marginBottom: 1,
          display: "flex",
          alignItems: "center",
          gap: 4,
          flexWrap: "wrap"
        }
      }, mod.name, mod.ticket && React.createElement("span", {
        style: {
          fontFamily: "'Press Start 2P',monospace",
          fontSize: 5,
          color: "#FFD700",
          background: "#FFD70022",
          border: "1px solid #FFD70044",
          padding: "2px 5px"
        }
      }, "TK#", mod.ticket), od > 0 && React.createElement("span", {
        style: C.oBadge
      }, "⚠", od), soon > 0 && !od && React.createElement("span", {
        style: C.sBadge
      }, "⏰", soon)), React.createElement("div", {
        style: px({
          fontSize: 5,
          color: mod.color
        })
      }, mod.phase)), React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 4,
          flexShrink: 0
        }
      }, React.createElement("button", {
        onClick: () => setEditingMod(isEditingThis ? null : mod.id),
        style: {
          background: "none",
          border: `1px solid ${D.cardBorder}`,
          color: isEditingThis ? D.accent : D.textMuted,
          cursor: "pointer",
          fontSize: 11,
          padding: "2px 6px",
          lineHeight: 1.5
        }
      }, "✎"), React.createElement("div", {
        style: {
          width: 26,
          height: 14,
          position: "relative",
          cursor: "pointer"
        },
        onClick: () => togMod(mod.id)
      }, React.createElement("div", {
        style: {
          width: 26,
          height: 14,
          background: mod.active ? mod.color : D.textMuted,
          transition: "background .2s"
        }
      }), React.createElement("div", {
        style: {
          position: "absolute",
          top: 2,
          left: mod.active ? 14 : 2,
          width: 10,
          height: 10,
          background: mod.active ? D.app : D.textMuted,
          transition: "left .2s"
        }
      })))), isEditingThis && React.createElement("div", {
        style: {
          background: D.app,
          border: "1px solid #2A3F58",
          padding: 9,
          marginBottom: 9
        }
      }, React.createElement("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 7,
          marginBottom: 7
        }
      }, React.createElement("div", null, React.createElement("div", {
        style: {
          fontSize: 10,
          color: D.textSub,
          marginBottom: 2
        }
      }, "NOMBRE"), React.createElement("input", {
        style: {
          ...C.inp,
          fontSize: 11
        },
        value: mod.name,
        onChange: e => updateModField(mod.id, "name", e.target.value)
      })), React.createElement("div", null, React.createElement("div", {
        style: {
          fontSize: 10,
          color: D.textSub,
          marginBottom: 2
        }
      }, "EDIFICIO"), React.createElement("select", {
        style: {
          ...C.inp,
          fontSize: 11,
          cursor: "pointer"
        },
        value: mod.buildingType || mod.id,
        onChange: e => updateModField(mod.id, "buildingType", e.target.value)
      }, BUILDING_TYPES.map(bt => React.createElement("option", {
        key: bt.id,
        value: bt.id
      }, bt.label)))), React.createElement("div", null, React.createElement("div", {
        style: {
          fontSize: 10,
          color: D.textSub,
          marginBottom: 2
        }
      }, "N° TICKET"), React.createElement("input", {
        style: {
          ...C.inp,
          fontSize: 11
        },
        type: "number",
        placeholder: "Ej: 12345",
        value: mod.ticket || "",
        onChange: e => updateModField(mod.id, "ticket", e.target.value)
      }))), React.createElement("div", {
        style: {
          marginBottom: 7
        }
      }, React.createElement("div", {
        style: {
          fontSize: 10,
          color: D.textSub,
          marginBottom: 4
        }
      }, "COLOR"), React.createElement("div", {
        style: {
          display: "flex",
          gap: 5,
          flexWrap: "wrap"
        }
      }, MOD_COLORS.map(c => React.createElement("div", {
        key: c,
        onClick: () => updateModField(mod.id, "color", c),
        style: {
          width: 18,
          height: 18,
          background: c,
          cursor: "pointer",
          border: mod.color === c ? "3px solid white" : "3px solid transparent"
        }
      })))), React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "flex-end"
        }
      }, React.createElement("button", {
        onClick: () => deleteMod(mod.id),
        style: {
          ...C.btn("d"),
          fontSize: 6,
          padding: "3px 9px"
        }
      }, "ELIMINAR"))), mod.active && React.createElement(React.Fragment, null, React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          fontSize: 10,
          color: D.textMuted,
          marginBottom: 3
        }
      }, React.createElement("span", null, done, "/", tot, " tareas"), React.createElement("span", {
        style: px({
          color: mod.color,
          fontSize: 6
        })
      }, p, "%")), React.createElement("div", {
        style: C.xBar
      }, React.createElement("div", {
        style: C.xFill(p, mod.color)
      })), React.createElement("div", {
        style: {
          marginTop: 8
        }
      }, mod.tasks.map(t => {
        const ov = isOverdue(t),
          sn = isDueSoon(t),
          cC = (t.comments || []).length,
          mC = (t.minutes || []).length;
        const hasDates = t.startDate || t.dueDate;
        return React.createElement("div", {
          key: t.id,
          style: {
            marginBottom: 3,
            background: t.done ? D.app : "transparent",
            borderLeft: `2px solid ${ov ? "#FF4757" : sn ? "#FFD700" : t.done ? mod.color : D.textMuted}`
          }
        }, React.createElement("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 3,
            padding: "4px 4px 2px 4px"
          }
        }, React.createElement("input", {
          type: "checkbox",
          checked: t.done,
          onChange: () => togTask(mod.id, t.id),
          style: {
            accentColor: mod.color,
            width: 11,
            height: 11,
            cursor: "pointer",
            flexShrink: 0
          }
        }), React.createElement("span", {
          onClick: () => openTask(t, mod),
          style: {
            flex: 1,
            fontSize: 10,
            color: t.done ? D.textMuted : D.text,
            textDecoration: t.done ? "line-through" : "none",
            cursor: "pointer"
          },
          title: "Ver detalle / cargar horas"
        }, t.label), ov && React.createElement("span", {
          style: C.oBadge
        }, "⚠"), sn && !ov && React.createElement("span", {
          style: C.sBadge
        }, "⏰"), mC > 0 && React.createElement("button", {
          onClick: () => openTask(t, mod),
          style: {
            background: "#4ECDC422",
            border: "1px solid #4ECDC444",
            color: "#4ECDC4",
            fontFamily: "'Press Start 2P',monospace",
            fontSize: 5,
            padding: "2px 4px",
            cursor: "pointer"
          }
        }, "📋", mC), cC > 0 && React.createElement("button", {
          onClick: () => openTask(t, mod),
          style: {
            background: "#C77DFF22",
            border: "1px solid #C77DFF44",
            color: "#C77DFF",
            fontFamily: "'Press Start 2P',monospace",
            fontSize: 5,
            padding: "2px 4px",
            cursor: "pointer"
          }
        }, "💬", cC), t.done && (t.readBy || []).length > 0 && React.createElement("span", {
          title: (t.readBy || []).map(r => r.name + " (" + new Date(r.ts).toLocaleDateString('es-AR') + ")").join(", "),
          style: {
            background: "#52B78822",
            border: "1px solid #52B78844",
            color: "#52B788",
            fontFamily: "'Press Start 2P',monospace",
            fontSize: 5,
            padding: "2px 4px",
            cursor: "default"
          }
        }, "👁", (t.readBy || []).length), t.done && (t.readBy || []).length === 0 && React.createElement("span", {
          title: "Sin confirmar lectura",
          style: {
            fontFamily: "'Press Start 2P',monospace",
            fontSize: 5,
            color: "#FFD70066",
            padding: "2px 2px"
          }
        }, "👁?"), React.createElement("button", {
          onClick: () => openEmailModal(t, mod),
          style: {
            background: "none",
            border: `1px solid ${D.accent}44`,
            color: D.accent,
            cursor: "pointer",
            fontSize: 10,
            padding: "1px 4px",
            lineHeight: 1
          }
        }, "✉"), React.createElement("button", {
          onClick: () => remTask(mod.id, t.id),
          style: {
            background: "none",
            border: "none",
            color: D.textMuted,
            cursor: "pointer",
            fontSize: 11,
            padding: "0 1px",
            lineHeight: 1
          }
        }, "×")), React.createElement("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 4,
            padding: "2px 4px 4px 18px",
            flexWrap: "wrap"
          }
        }, React.createElement("span", {
          style: {
            fontSize: 9,
            color: D.textSub,
            flexShrink: 0
          }
        }, "Inicio:"), React.createElement("input", {
          type: "date",
          value: t.startDate || "",
          style: {
            ...C.dateInp,
            width: 100,
            fontSize: 10
          },
          onChange: e => updateTaskDates(mod.id, t.id, "startDate", e.target.value)
        }), React.createElement("span", {
          style: {
            fontSize: 9,
            color: D.textSub,
            flexShrink: 0
          }
        }, "Días:"), React.createElement("input", {
          type: "number",
          min: "1",
          max: "999",
          value: t.duration || "",
          placeholder: "—",
          style: {
            ...C.dateInp,
            width: 44,
            fontSize: 10,
            textAlign: "center"
          },
          onChange: e => updateTaskDates(mod.id, t.id, "duration", e.target.value)
        }), React.createElement("span", {
          style: {
            fontSize: 9,
            color: D.textSub,
            flexShrink: 0
          }
        }, "Fin:"), React.createElement("input", {
          type: "date",
          value: t.dueDate || "",
          style: {
            ...C.dateInp,
            width: 100,
            fontSize: 10,
            color: ov ? "#FF4757" : sn ? "#FFD700" : t.dueDate ? D.text : D.textMuted
          },
          onChange: e => updateTaskDates(mod.id, t.id, "dueDate", e.target.value)
        }), t.duration && React.createElement("span", {
          style: {
            fontSize: 9,
            color: D.accent + "99"
          }
        }, t.duration, "d")));
      }), addingTask === mod.id ? React.createElement("div", {
        style: {
          marginTop: 4,
          background: D.app,
          border: `1px solid ${D.accent}44`,
          padding: 8
        }
      }, React.createElement("div", {
        style: {
          marginBottom: 6
        }
      }, React.createElement("input", {
        style: {
          ...C.inp,
          fontSize: 11
        },
        placeholder: "Nombre de la tarea…",
        value: newTask.label,
        onChange: e => setNewTask({
          ...newTask,
          label: e.target.value
        }),
        onKeyDown: e => e.key === "Enter" && doAdd(mod.id),
        autoFocus: true
      })), React.createElement("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          gap: 6,
          alignItems: "center",
          marginBottom: 6
        }
      }, React.createElement("div", null, React.createElement("div", {
        style: {
          fontSize: 9,
          color: "#7A8FA6",
          marginBottom: 2
        }
      }, "FECHA INICIO"), React.createElement("input", {
        type: "date",
        style: {
          ...C.dateInp,
          width: "100%"
        },
        value: newTask.startDate,
        onChange: e => {
          const sd = e.target.value;
          const dd = calcEndDate(sd, newTask.duration);
          setNewTask({
            ...newTask,
            startDate: sd,
            dueDate: dd || newTask.dueDate
          });
        }
      })), React.createElement("div", {
        style: {
          textAlign: "center"
        }
      }, React.createElement("div", {
        style: {
          fontSize: 9,
          color: "#7A8FA6",
          marginBottom: 2
        }
      }, "DÍAS"), React.createElement("input", {
        type: "number",
        min: "1",
        max: "999",
        placeholder: "0",
        style: {
          ...C.dateInp,
          width: 52,
          textAlign: "center"
        },
        value: newTask.duration,
        onChange: e => {
          const dur = e.target.value;
          const dd = calcEndDate(newTask.startDate, dur);
          setNewTask({
            ...newTask,
            duration: dur,
            dueDate: dd || newTask.dueDate
          });
        }
      })), React.createElement("div", null, React.createElement("div", {
        style: {
          fontSize: 9,
          color: "#7A8FA6",
          marginBottom: 2
        }
      }, "FECHA FIN ", previewEnd && React.createElement("span", {
        style: {
          color: "#4ECDC4"
        }
      }, "← auto")), React.createElement("input", {
        type: "date",
        style: {
          ...C.dateInp,
          width: "100%",
          color: previewEnd ? "#4ECDC4" : "#E8EDF2"
        },
        value: newTask.dueDate || "",
        onChange: e => {
          const dd = e.target.value;
          const dur = calcDuration(newTask.startDate, dd);
          setNewTask({
            ...newTask,
            dueDate: dd,
            duration: dur
          });
        }
      }))), (newTask.startDate || newTask.dueDate) && React.createElement("div", {
        style: {
          fontSize: 10,
          color: "#7A8FA6",
          marginBottom: 6,
          display: "flex",
          alignItems: "center",
          gap: 6
        }
      }, newTask.startDate && React.createElement("span", null, "📅 ", fmtD(newTask.startDate)), newTask.startDate && newTask.dueDate && React.createElement("span", {
        style: {
          color: "#2A3F58"
        }
      }, "→"), newTask.dueDate && React.createElement("span", {
        style: {
          color: "#4ECDC4"
        }
      }, "🏁 ", fmtD(newTask.dueDate)), newTask.duration && React.createElement("span", {
        style: {
          color: "#FFD70088",
          fontFamily: "'Press Start 2P',monospace",
          fontSize: 8
        }
      }, newTask.duration, " días")), React.createElement("div", {
        style: {
          display: "flex",
          gap: 5
        }
      }, React.createElement("button", {
        style: {
          ...C.btn("t"),
          flex: 1,
          padding: "5px"
        },
        onClick: () => doAdd(mod.id)
      }, "✓ AGREGAR"), React.createElement("button", {
        style: {
          ...C.btn("g"),
          padding: "5px 10px"
        },
        onClick: () => {
          setAddingTask(null);
          setNewTask({
            label: "",
            startDate: "",
            duration: "",
            dueDate: ""
          });
        }
      }, "CANCELAR"))) : React.createElement("button", {
        style: {
          width: "100%",
          background: "none",
          border: `1px dashed ${D.cardBorder}`,
          color: D.textMuted,
          fontSize: 11,
          padding: 4,
          cursor: "pointer",
          textAlign: "left",
          marginTop: 3
        },
        onMouseEnter: e => {
          e.target.style.color = mod.color;
          e.target.style.borderColor = mod.color;
        },
        onMouseLeave: e => {
          e.target.style.color = D.textMuted;
          e.target.style.borderColor = D.cardBorder;
        },
        onClick: () => setAddingTask(mod.id)
      }, "+ Agregar tarea"))), !mod.active && React.createElement("div", {
        style: {
          fontSize: 11,
          color: D.textMuted,
          marginTop: 3
        }
      }, "Inactivo — activalo para incluirlo en la ciudad"));
    })), S.severaProjectId && React.createElement("div", {
      style: {
        marginTop: 20
      }
    }, React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 12
      }
    }, React.createElement("div", {
      style: {
        fontFamily: "'Press Start 2P',monospace",
        fontSize: 7,
        color: "#7dc9b2"
      }
    }, "🔗 FASES HARD (SEVERA)"), !severaCache && React.createElement("span", {
      style: {
        fontSize: 10,
        color: D.textMuted
      }
    }, "cargando..."), severaCache && React.createElement("span", {
      style: {
        fontSize: 10,
        color: D.textMuted
      }
    }, severaCache.name, " · ", severaCache.customer)), severaCache && (() => {
      const phases = severaCache.phases || [];
      const root = phases.find(p => !p.belongsTo);
      const rootName = root?.name || "";
      const modules = phases.filter(p => p.belongsTo === rootName && rootName !== "");
      const tasksByModule = {};
      phases.filter(p => p.belongsTo && p.belongsTo !== rootName).forEach(p => {
        if (!tasksByModule[p.belongsTo]) tasksByModule[p.belongsTo] = [];
        tasksByModule[p.belongsTo].push(p);
      });
      if (!modules.length) return React.createElement("div", {
        style: {
          ...C.card,
          color: D.textMuted,
          fontSize: 11
        }
      }, "No se encontraron fases en Severa.");
      return React.createElement("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
          gap: 12
        }
      }, modules.map(mod => {
        const tasks = tasksByModule[mod.name] || [];
        const done = tasks.filter(t => t.isCompleted).length;
        const tot = tasks.length;
        const pct = tot ? Math.round(done / tot * 100) : mod.isCompleted ? 100 : 0;
        const isLate = !mod.isCompleted && mod.deadline && parseD(mod.deadline) < TODAY;
        const modHD = (S.hardData || {})[mod.guid] || {
          notes: "",
          hoursLog: []
        };
        const totalModHrs = modHD.hoursLog.reduce((a, h) => a + (parseFloat(h.hours) || 0), 0);
        return React.createElement("div", {
          key: mod.guid,
          style: {
            ...C.card,
            borderColor: mod.isCompleted ? "#7dc9b244" : isLate ? "#FF475744" : "#7dc9b222"
          }
        }, React.createElement("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 7,
            marginBottom: 8
          }
        }, React.createElement("div", {
          style: {
            width: 32,
            height: 32,
            background: D.app,
            border: "1px solid #7dc9b244",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 17,
            flexShrink: 0
          }
        }, "🔗"), React.createElement("div", {
          style: {
            flex: 1,
            minWidth: 0
          }
        }, React.createElement("div", {
          style: {
            fontSize: 12,
            fontWeight: 600,
            color: "#7dc9b2",
            marginBottom: 1
          }
        }, mod.name), React.createElement("div", {
          style: {
            fontFamily: "'Press Start 2P',monospace",
            fontSize: 5,
            color: D.textMuted
          }
        }, "SEVERA · ", mod.status || "En curso")), React.createElement("span", {
          style: {
            fontFamily: "'Press Start 2P',monospace",
            fontSize: 5,
            color: mod.isCompleted ? "#A8E6CF" : isLate ? "#FF4757" : "#7dc9b2",
            border: `1px solid ${mod.isCompleted ? "#A8E6CF44" : isLate ? "#FF475744" : "#7dc9b244"}`,
            padding: "2px 5px",
            flexShrink: 0
          }
        }, mod.isCompleted ? "HECHA" : isLate ? "VENCIDA" : "EN CURSO")), React.createElement("div", {
          style: {
            display: "flex",
            justifyContent: "space-between",
            fontSize: 10,
            color: D.textMuted,
            marginBottom: 3
          }
        }, React.createElement("span", null, done, "/", tot, " tareas", totalModHrs > 0 ? ` · ${totalModHrs}h` : ""), React.createElement("span", {
          style: {
            fontFamily: "'Press Start 2P',monospace",
            fontSize: 6,
            color: "#7dc9b2"
          }
        }, pct, "%")), React.createElement("div", {
          style: C.xBar
        }, React.createElement("div", {
          style: {
            ...C.xFill(pct, "#7dc9b2")
          }
        })), React.createElement("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 4,
            padding: "6px 2px 4px",
            flexWrap: "wrap"
          }
        }, React.createElement("span", {
          style: {
            fontSize: 9,
            color: D.textSub
          }
        }, "Inicio:"), React.createElement("span", {
          style: {
            fontSize: 10,
            color: mod.startDate ? D.text : D.textMuted
          }
        }, mod.startDate ? fmtD(mod.startDate) : "—"), React.createElement("span", {
          style: {
            fontSize: 9,
            color: D.textSub,
            marginLeft: 4
          }
        }, "Fin:"), React.createElement("span", {
          style: {
            fontSize: 10,
            color: mod.isCompleted ? D.textMuted : isLate ? "#FF4757" : mod.deadline ? D.text : D.textMuted
          }
        }, mod.deadline ? fmtD(mod.deadline) : "—")), tasks.length > 0 && React.createElement("div", {
          style: {
            marginTop: 6
          }
        }, tasks.map(t => {
          const tHD = (S.hardData || {})[t.guid] || {
            notes: "",
            hoursLog: []
          };
          const tHrs = tHD.hoursLog.reduce((a, h) => a + (parseFloat(h.hours) || 0), 0);
          const tLate = !t.isCompleted && t.deadline && parseD(t.deadline) < TODAY;
          const expanded = expandedHard[t.guid] || false;
          return React.createElement("div", {
            key: t.guid,
            style: {
              marginBottom: 2,
              borderLeft: `2px solid ${t.isCompleted ? "#7dc9b2" : tLate ? "#FF4757" : "#2A3F58"}`,
              background: t.isCompleted ? D.app : "transparent"
            }
          }, React.createElement("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "5px 4px 3px 6px"
            }
          }, React.createElement("span", {
            style: {
              fontSize: 11,
              flexShrink: 0
            }
          }, t.isCompleted ? "✅" : "⬜"), React.createElement("span", {
            style: {
              flex: 1,
              fontSize: 11,
              color: t.isCompleted ? D.textMuted : D.text,
              textDecoration: t.isCompleted ? "line-through" : "none"
            }
          }, t.name), tLate && React.createElement("span", {
            style: C.oBadge
          }, "⚠"), tHrs > 0 && React.createElement("span", {
            style: {
              fontFamily: "'Press Start 2P',monospace",
              fontSize: 5,
              color: "#7dc9b2",
              background: "#7dc9b222",
              border: "1px solid #7dc9b244",
              padding: "2px 4px"
            }
          }, "⏱", tHrs, "h"), (isEclient || isAdmin) && React.createElement("button", {
            onClick: () => setExpandedHard(h => ({
              ...h,
              [t.guid]: !h[t.guid]
            })),
            style: {
              background: "none",
              border: `1px solid ${D.cardBorder}`,
              color: D.textMuted,
              cursor: "pointer",
              fontSize: 9,
              padding: "1px 5px",
              lineHeight: 1.5
            }
          }, expanded ? "▲" : "▼")), React.createElement("div", {
            style: {
              display: "flex",
              gap: 4,
              padding: "0 4px 4px 26px",
              fontSize: 9,
              color: D.textMuted,
              flexWrap: "wrap"
            }
          }, t.startDate && React.createElement("span", null, fmtD(t.startDate)), t.startDate && t.deadline && React.createElement("span", null, "→"), t.deadline && React.createElement("span", {
            style: {
              color: t.isCompleted ? D.textMuted : tLate ? "#FF4757" : D.textSub
            }
          }, fmtD(t.deadline))), expanded && React.createElement("div", {
            style: {
              padding: "6px 8px 8px",
              background: D.app,
              borderTop: `1px solid ${D.cardBorder}`
            }
          }, tHD.hoursLog.length > 0 && React.createElement("div", {
            style: {
              marginBottom: 6
            }
          }, tHD.hoursLog.slice(-4).map(h => React.createElement("div", {
            key: h.id,
            style: {
              display: "flex",
              gap: 6,
              fontSize: 10,
              color: D.textMuted,
              padding: "1px 0"
            }
          }, React.createElement("span", null, h.authorEmoji || "🛍️"), React.createElement("span", {
            style: {
              flex: 1
            }
          }, h.authorName), React.createElement("span", {
            style: {
              color: "#7dc9b2",
              fontWeight: 600
            }
          }, h.hours, "h"), React.createElement("span", null, fmtD(h.date))))), React.createElement("div", {
            style: {
              display: "flex",
              gap: 5,
              alignItems: "center",
              marginBottom: 6
            }
          }, React.createElement("input", {
            type: "date",
            style: {
              ...C.dateInp,
              flex: 1,
              fontSize: 10
            },
            defaultValue: TODAY.toISOString().split('T')[0],
            id: `hd-date-${t.guid}`
          }), React.createElement("input", {
            type: "number",
            min: "0.5",
            max: "24",
            step: "0.5",
            placeholder: "Hs",
            style: {
              ...C.dateInp,
              width: 52,
              fontSize: 10,
              textAlign: "center"
            },
            id: `hd-hrs-${t.guid}`
          }), React.createElement("button", {
            style: {
              ...C.btn("t"),
              padding: "4px 8px",
              fontSize: 6
            },
            onClick: () => {
              const de = document.getElementById(`hd-date-${t.guid}`);
              const he = document.getElementById(`hd-hrs-${t.guid}`);
              const hrs = parseFloat(he?.value);
              if (!hrs || hrs <= 0) return;
              const entry = {
                id: "h" + Date.now(),
                date: de?.value || TODAY.toISOString().split('T')[0],
                hours: hrs,
                authorId: session.id,
                authorName: session.name,
                authorEmoji: session.emoji || "🛍️"
              };
              const existing = (S.hardData || {})[t.guid] || {
                notes: "",
                hoursLog: []
              };
              const ns = {
                ...S,
                hardData: {
                  ...(S.hardData || {}),
                  [t.guid]: {
                    ...existing,
                    hoursLog: [...existing.hoursLog, entry]
                  }
                }
              };
              upd(ns);
              save(ns);
              if (he) he.value = "";
              _showToast("⏱ " + hrs + "h en " + t.name);
            }
          }, "+HS")), React.createElement("textarea", {
            style: {
              ...C.inp,
              resize: "vertical",
              minHeight: 40,
              fontSize: 10
            },
            placeholder: "Nota sobre esta tarea...",
            value: tHD.notes || "",
            onChange: e => {
              const ns = {
                ...S,
                hardData: {
                  ...(S.hardData || {}),
                  [t.guid]: {
                    ...tHD,
                    notes: e.target.value
                  }
                }
              };
              upd(ns);
            },
            onBlur: () => save(S)
          })));
        })), React.createElement("div", {
          style: {
            borderTop: `1px solid ${D.cardBorder}`,
            paddingTop: 6,
            marginTop: 8
          }
        }, React.createElement("div", {
          style: {
            fontSize: 9,
            color: D.textSub,
            marginBottom: 3
          }
        }, "📝 Notas del módulo"), React.createElement("textarea", {
          style: {
            ...C.inp,
            resize: "vertical",
            minHeight: 40,
            fontSize: 10
          },
          placeholder: "Notas generales de este módulo...",
          value: modHD.notes || "",
          onChange: e => {
            const ns = {
              ...S,
              hardData: {
                ...(S.hardData || {}),
                [mod.guid]: {
                  ...modHD,
                  notes: e.target.value
                }
              }
            };
            upd(ns);
          },
          onBlur: () => save(S)
        })));
      }));
    })(), severaCache && !(severaCache.phases || []).length && React.createElement("div", {
      style: {
        ...C.card,
        color: D.textMuted,
        fontSize: 11
      }
    }, "No se encontraron fases en Severa para este proyecto.")));
  };
  const renderEquipoView = () => {
    const handleAdd = () => {
      if (!newMember.name.trim()) return;
      const m = {
        id: "u" + Date.now(),
        name: newMember.name.trim(),
        role: newMember.role.trim(),
        emoji: EMOJIS[selEmoji],
        level: 1,
        xp: 0,
        skills: newMember.skills.split(",").map(s => s.trim()).filter(Boolean),
        status: newMember.status,
        email: newMember.email.trim(),
        pin: newMember.pin || "1234",
        esRole: isEclient ? "eclient" : ""
      };
      const ns = {
        ...S,
        team: [...S.team, m]
      };
      upd(ns);
      save(ns);
      setAddingMember(false);
      setNewMember({
        name: "",
        role: "",
        emoji: "👩‍💻",
        skills: "",
        status: "active",
        email: "",
        pin: "1234"
      });
      _showToast(m.emoji + " " + m.name + " agregado");
    };
    return React.createElement("div", {
      style: {
        padding: 14
      }
    }, React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
        flexWrap: "wrap",
        gap: 8
      }
    }, React.createElement("div", null, React.createElement("div", {
      style: px({
        fontSize: 7,
        color: D.accent,
        letterSpacing: 2,
        marginBottom: 4
      })
    }, "▸ CIUDADANOS"), React.createElement("div", {
      style: {
        color: D.textMuted,
        fontSize: 12
      }
    }, S.team.length, " miembros · El email los vincula a este proyecto")), React.createElement("button", {
      style: C.btn("p"),
      onClick: () => setAddingMember(true)
    }, "+ AGREGAR")), addingMember && React.createElement("div", {
      style: {
        ...C.panel,
        borderColor: D.accent,
        marginBottom: 12
      }
    }, React.createElement("div", {
      style: px({
        fontSize: 7,
        color: D.accent,
        marginBottom: 9
      })
    }, "▸ NUEVO CIUDADANO"), React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 8,
        marginBottom: 8
      }
    }, React.createElement("div", null, React.createElement("div", {
      style: {
        fontSize: 11,
        color: D.textSub,
        marginBottom: 3
      }
    }, "NOMBRE *"), React.createElement("input", {
      style: C.inp,
      placeholder: "Nombre",
      value: newMember.name,
      onChange: e => setNewMember({
        ...newMember,
        name: e.target.value
      })
    })), React.createElement("div", null, React.createElement("div", {
      style: {
        fontSize: 11,
        color: D.textSub,
        marginBottom: 3
      }
    }, "ROL"), React.createElement("input", {
      style: C.inp,
      placeholder: "Product Manager",
      value: newMember.role,
      onChange: e => setNewMember({
        ...newMember,
        role: e.target.value
      })
    })), React.createElement("div", null, React.createElement("div", {
      style: {
        fontSize: 11,
        color: D.textSub,
        marginBottom: 3
      }
    }, "EMAIL ", React.createElement("span", {
      style: {
        color: "#FF4757"
      }
    }, "*")), React.createElement("input", {
      style: C.inp,
      type: "email",
      placeholder: "user@empresa.com",
      value: newMember.email,
      onChange: e => setNewMember({
        ...newMember,
        email: e.target.value
      })
    })), React.createElement("div", null, React.createElement("div", {
      style: {
        fontSize: 11,
        color: D.textSub,
        marginBottom: 3
      }
    }, "PIN"), React.createElement("input", {
      style: C.inp,
      maxLength: 8,
      placeholder: "1234",
      value: newMember.pin,
      onChange: e => setNewMember({
        ...newMember,
        pin: e.target.value
      })
    }))), React.createElement("div", {
      style: {
        marginBottom: 8
      }
    }, React.createElement("div", {
      style: {
        fontSize: 11,
        color: D.textSub,
        marginBottom: 4
      }
    }, "AVATAR"), React.createElement("div", {
      style: {
        display: "flex",
        flexWrap: "wrap",
        gap: 4
      }
    }, EMOJIS.map((em, i) => React.createElement("div", {
      key: i,
      onClick: () => setSelEmoji(i),
      style: {
        width: 26,
        height: 26,
        background: D.app,
        border: `1px solid ${selEmoji === i ? D.accent : D.cardBorder}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 14,
        cursor: "pointer"
      }
    }, em)))), React.createElement("div", {
      style: {
        marginBottom: 8
      }
    }, React.createElement("div", {
      style: {
        fontSize: 11,
        color: D.textSub,
        marginBottom: 3
      }
    }, "HABILIDADES (coma)"), React.createElement("input", {
      style: C.inp,
      placeholder: "React, Liderazgo",
      value: newMember.skills,
      onChange: e => setNewMember({
        ...newMember,
        skills: e.target.value
      })
    })), React.createElement("div", {
      style: {
        display: "flex",
        gap: 7
      }
    }, React.createElement("button", {
      style: C.btn("p"),
      onClick: handleAdd
    }, "AGREGAR"), React.createElement("button", {
      style: C.btn("g"),
      onClick: () => setAddingMember(false)
    }, "CANCELAR"))), React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))",
        gap: 11
      }
    }, S.team.map(m => {
      const p = Math.min(100, Math.round((m.xp - (m.level - 1) * 500) / 500 * 100));
      return React.createElement("div", {
        key: m.id,
        style: {
          ...C.card,
          position: "relative"
        }
      }, React.createElement("div", {
        style: {
          position: "absolute",
          top: 8,
          right: 8,
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: {
            active: "#A8E6CF",
            away: "#FFD700",
            busy: "#FF4757"
          }[m.status] || "#A8E6CF"
        }
      }), React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 8
        }
      }, React.createElement("div", {
        style: {
          width: 36,
          height: 36,
          background: D.app,
          border: `1px solid ${D.cardBorder}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
          position: "relative",
          flexShrink: 0
        }
      }, m.emoji, React.createElement("div", {
        style: px({
          position: "absolute",
          bottom: -3,
          right: -3,
          background: "#FFD700",
          color: "#0D1117",
          fontSize: 5,
          padding: "1px 3px"
        })
      }, "L", m.level)), React.createElement("div", null, React.createElement("div", {
        style: {
          fontWeight: 600,
          fontSize: 12,
          color: D.text
        }
      }, m.name), React.createElement("div", {
        style: {
          fontSize: 10,
          color: D.textMuted
        }
      }, m.role || "Sin rol"))), React.createElement("div", {
        style: {
          marginBottom: 7
        }
      }, React.createElement("div", {
        style: {
          fontSize: 10,
          color: D.textSub,
          marginBottom: 2
        }
      }, "EMAIL (vinculación)"), React.createElement("input", {
        style: {
          ...C.inp,
          fontSize: 10
        },
        type: "email",
        placeholder: "user@empresa.com",
        value: m.email || "",
        onChange: e => {
          const ns = {
            ...S,
            team: S.team.map(x => x.id === m.id ? {
              ...x,
              email: e.target.value
            } : x)
          };
          upd(ns);
        }
      })), React.createElement("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 6,
          marginBottom: 7
        }
      }, React.createElement("div", null, React.createElement("div", {
        style: {
          fontSize: 10,
          color: D.textSub,
          marginBottom: 2
        }
      }, "PIN"), React.createElement("input", {
        style: {
          ...C.inp,
          fontSize: 10
        },
        maxLength: 8,
        value: m.pin || "1234",
        onChange: e => {
          const ns = {
            ...S,
            team: S.team.map(x => x.id === m.id ? {
              ...x,
              pin: e.target.value
            } : x)
          };
          upd(ns);
        }
      })), React.createElement("div", null, React.createElement("div", {
        style: {
          fontSize: 10,
          color: D.textSub,
          marginBottom: 2
        }
      }, "XP"), React.createElement("div", {
        style: px({
          fontSize: 10,
          color: "#FFD700",
          padding: "7px 0"
        })
      }, m.xp.toLocaleString()))), React.createElement("div", {
        style: C.xBar
      }, React.createElement("div", {
        style: C.xFill(p, D.accent)
      })), React.createElement("div", {
        style: {
          display: "flex",
          gap: 5,
          marginTop: 7
        }
      }, React.createElement("button", {
        style: {
          ...C.btn("g"),
          padding: "4px 7px"
        },
        onClick: () => {
          const ns = {
            ...S,
            team: S.team.map(x => x.id === m.id ? {
              ...x,
              xp: x.xp + 50,
              level: Math.max(1, Math.floor((x.xp + 50) / 500) + 1)
            } : x)
          };
          upd(ns);
          save(ns);
        }
      }, "+50 XP"), React.createElement("button", {
        style: {
          ...C.btn("d"),
          padding: "4px 7px",
          marginLeft: "auto"
        },
        onClick: () => setConfirmDel(m.id)
      }, "✕")), confirmDel === m.id && React.createElement("div", {
        style: {
          marginTop: 6,
          background: "#FF475711",
          border: "1px solid #FF475744",
          padding: 7
        }
      }, React.createElement("div", {
        style: {
          fontSize: 11,
          color: "#FF4757",
          marginBottom: 4
        }
      }, "¿Eliminar?"), React.createElement("div", {
        style: {
          display: "flex",
          gap: 5
        }
      }, React.createElement("button", {
        style: C.btn("d"),
        onClick: () => {
          const ns = {
            ...S,
            team: S.team.filter(x => x.id !== m.id)
          };
          upd(ns);
          save(ns);
          setConfirmDel(null);
        }
      }, "ELIMINAR"), React.createElement("button", {
        style: C.btn("g"),
        onClick: () => setConfirmDel(null)
      }, "CANCELAR"))));
    }), S.team.length === 0 && React.createElement("div", {
      style: {
        ...C.card,
        textAlign: "center",
        padding: 32,
        ...px({
          fontSize: 7,
          color: D.textMuted
        })
      }
    }, "SIN CIUDADANOS AÚN")));
  };
  const renderGanttView = () => {
    const od = allOverdue;
    const hardPhases = S.severaProjectId && severaCache ? severaCache.phases || [] : [];
    return React.createElement("div", {
      style: {
        padding: 14
      }
    }, React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 4,
        flexWrap: "wrap",
        gap: 8
      }
    }, React.createElement("div", {
      style: px({
        fontSize: 7,
        color: D.accent,
        letterSpacing: 2
      })
    }, "▸ DIAGRAMA GANTT"), S.severaProjectId && React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8
      }
    }, React.createElement("span", {
      style: {
        fontSize: 11,
        color: D.textMuted
      }
    }, "🔗 Hard"), React.createElement("div", {
      style: {
        width: 36,
        height: 18,
        position: "relative",
        cursor: "pointer"
      },
      onClick: () => setShowHard(h => !h)
    }, React.createElement("div", {
      style: {
        width: 36,
        height: 18,
        background: showHard ? "#7dc9b2" : "#2A3F58",
        transition: "background .2s"
      }
    }), React.createElement("div", {
      style: {
        position: "absolute",
        top: 3,
        left: showHard ? 19 : 3,
        width: 12,
        height: 12,
        background: "white",
        transition: "left .2s"
      }
    })), !severaCache && S.severaProjectId && React.createElement("span", {
      style: {
        fontSize: 10,
        color: D.textMuted
      }
    }, "cargando Severa..."))), React.createElement("div", {
      style: {
        color: D.textMuted,
        fontSize: 12,
        marginBottom: 10
      }
    }, "Avance real vs proyectado."), isAdmin && React.createElement("div", {
      style: {
        display: "flex",
        gap: 12,
        marginBottom: 10,
        flexWrap: "wrap",
        alignItems: "center"
      }
    }, React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 5,
        fontSize: 12,
        color: D.textSub
      }
    }, React.createElement("span", null, "Inicio:"), React.createElement("input", {
      type: "date",
      style: C.dateInp,
      value: S.projStart,
      onChange: e => {
        const ns = {
          ...S,
          projStart: e.target.value
        };
        upd(ns);
        save(ns);
      }
    })), React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 5,
        fontSize: 12,
        color: D.textSub
      }
    }, React.createElement("span", null, "Fin:"), React.createElement("input", {
      type: "date",
      style: C.dateInp,
      value: S.projEnd,
      onChange: e => {
        const ns = {
          ...S,
          projEnd: e.target.value
        };
        upd(ns);
        save(ns);
      }
    })), React.createElement("button", {
      style: {
        ...C.btn("g"),
        fontSize: 6,
        padding: "4px 8px"
      },
      onClick: () => {
        const allDates = S.modules.flatMap(m => m.tasks.flatMap(t => [t.startDate, t.dueDate])).filter(Boolean).map(d => parseD(d)).filter(Boolean).sort((a, b) => a - b);
        const hardDates = hardPhases.flatMap(p => [p.startDate, p.deadline]).filter(Boolean).map(d => parseD(d)).filter(Boolean).sort((a, b) => a - b);
        const allCombined = [...allDates, ...hardDates].sort((a, b) => a - b);
        if (!allCombined.length) {
          _showToast("Sin fechas en tareas");
          return;
        }
        const minD = allCombined[0],
          maxD = allCombined[allCombined.length - 1];
        const ns = {
          ...S,
          projStart: addDays(minD.toISOString().split('T')[0], -3),
          projEnd: addDays(maxD.toISOString().split('T')[0], 3)
        };
        upd(ns);
        save(ns);
        _showToast("📊 Rango actualizado automáticamente");
      }
    }, "⟳ AUTO")), React.createElement("div", {
      style: {
        ...C.panel,
        padding: 0,
        overflowX: "auto",
        marginBottom: 12
      }
    }, React.createElement(GanttCanvas, {
      modules: S.modules,
      projStart: S.projStart,
      projEnd: S.projEnd,
      hardPhases: hardPhases,
      showHard: showHard
    })), od.length > 0 && React.createElement("div", {
      style: {
        ...C.panel,
        borderColor: "#FF475744"
      }
    }, React.createElement("div", {
      style: px({
        fontSize: 7,
        color: "#FF4757",
        letterSpacing: 2,
        marginBottom: 8
      })
    }, "⚠ VENCIDAS (", od.length, ")"), od.map(t => React.createElement("div", {
      key: t.id,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 7,
        padding: "5px 7px",
        borderLeft: "2px solid #FF4757",
        background: "#FF475708",
        marginBottom: 3
      }
    }, React.createElement("span", {
      style: {
        fontSize: 11,
        color: D.textMuted
      }
    }, t.modName), React.createElement("span", {
      style: {
        flex: 1,
        fontSize: 12
      }
    }, t.label), React.createElement("span", {
      style: C.oBadge
    }, fmtD(t.dueDate))))));
  };
  const renderConfigView = () => {
    const saveSuperadmins = () => {
      const ns = {
        ...appState,
        superadminEmails: saEmails.filter(e => e.trim())
      };
      updApp(ns);
      persist2(ns);
      _showToast("👑 Superadmins guardados");
    };
    const saveSaPin = () => {
      if (!saPin.trim()) return;
      const ns = {
        ...appState,
        superadminPin: saPin.trim()
      };
      updApp(ns);
      persist2(ns);
      setSaPin("");
      _showToast("👑 PIN actualizado");
    };
    return React.createElement("div", {
      style: {
        padding: 14,
        maxWidth: 560
      }
    }, React.createElement("div", {
      style: px({
        fontSize: 7,
        color: D.accent,
        letterSpacing: 2,
        marginBottom: 12
      })
    }, "▸ CONFIGURACIÓN"), React.createElement("div", {
      style: {
        ...C.panel,
        marginBottom: 10
      }
    }, React.createElement("div", {
      style: px({
        fontSize: 7,
        color: D.textSub,
        marginBottom: 8
      })
    }, "PROYECTO"), React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 8,
        marginBottom: 8
      }
    }, React.createElement("div", null, React.createElement("div", {
      style: {
        fontSize: 11,
        color: D.textSub,
        marginBottom: 3
      }
    }, "Nombre del proyecto"), React.createElement("input", {
      style: C.inp,
      value: S.projectName,
      onChange: e => upd({
        ...S,
        projectName: e.target.value
      })
    })), React.createElement("div", null, React.createElement("div", {
      style: {
        fontSize: 11,
        color: D.textSub,
        marginBottom: 3
      }
    }, "Nombre del admin"), React.createElement("input", {
      style: C.inp,
      value: S.adminName || "",
      onChange: e => upd({
        ...S,
        adminName: e.target.value
      })
    })), React.createElement("div", null, React.createElement("div", {
      style: {
        fontSize: 11,
        color: D.textSub,
        marginBottom: 3
      }
    }, "Email admin"), React.createElement("input", {
      style: C.inp,
      type: "email",
      placeholder: "admin@empresa.com",
      value: S.adminEmail || "",
      onChange: e => upd({
        ...S,
        adminEmail: e.target.value
      })
    })), React.createElement("div", null, React.createElement("div", {
      style: {
        fontSize: 11,
        color: D.textSub,
        marginBottom: 3
      }
    }, "PIN Admin 🏗️"), React.createElement("input", {
      style: C.inp,
      maxLength: 8,
      type: "password",
      placeholder: "1111",
      value: S.projAdminPin || "1111",
      onChange: e => upd({
        ...S,
        projAdminPin: e.target.value
      })
    })), React.createElement("div", null, React.createElement("div", {
      style: {
        fontSize: 11,
        color: D.textSub,
        marginBottom: 3
      }
    }, "ID Cliente 🪪"), React.createElement("input", {
      style: C.inp,
      placeholder: "Ej: CLI-001",
      value: S.clientId || "",
      onChange: e => upd({
        ...S,
        clientId: e.target.value
      })
    }), React.createElement("div", {
      style: {
        fontSize: 9,
        color: D.textMuted,
        marginTop: 2
      }
    }, "Identificador único del cliente")), React.createElement("div", null, React.createElement("div", {
      style: {
        fontSize: 11,
        color: D.textSub,
        marginBottom: 3
      }
    }, "Tipo de proyecto"), React.createElement("input", {
      style: C.inp,
      placeholder: "HUB / TR / …",
      value: S.tipo || "",
      onChange: e => upd({
        ...S,
        tipo: e.target.value
      })
    })), React.createElement("div", {
      style: {
        gridColumn: "1/-1"
      }
    }, React.createElement("div", {
      style: {
        fontSize: 11,
        color: D.textSub,
        marginBottom: 3
      }
    }, "Project ID Severa 🔗 ", React.createElement("span", {
      style: {
        color: D.textMuted,
        fontSize: 9
      }
    }, "(número de proyecto en Severa)")), React.createElement("input", {
      style: C.inp,
      placeholder: "Ej: 8097",
      value: S.severaProjectId || "",
      onChange: e => upd({
        ...S,
        severaProjectId: e.target.value
      })
    }), React.createElement("div", {
      style: {
        fontSize: 9,
        color: D.textMuted,
        marginTop: 2
      }
    }, "Vincula este proyecto con Severa para la vista Hard"))), React.createElement("button", {
      style: C.btn("p"),
      onClick: () => save(S)
    }, "GUARDAR")), session.role === "admin" && React.createElement("div", {
      style: {
        ...C.panel,
        marginBottom: 10
      }
    }, React.createElement("div", {
      style: px({
        fontSize: 7,
        color: D.textSub,
        marginBottom: 6
      })
    }, "SUPERADMINS 👑"), React.createElement("div", {
      style: {
        fontSize: 11,
        color: D.textMuted,
        marginBottom: 10
      }
    }, "Emails con acceso total a todos los proyectos"), React.createElement("div", {
      style: {
        marginBottom: 12,
        padding: "10px 12px",
        background: D.app,
        border: `1px solid ${D.cardBorder}`
      }
    }, React.createElement("div", {
      style: {
        fontSize: 11,
        color: D.textSub,
        marginBottom: 4
      }
    }, "PIN Superadmin 👑"), React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        alignItems: "center"
      }
    }, React.createElement("input", {
      style: {
        ...C.inp,
        maxWidth: 160
      },
      type: "password",
      maxLength: 8,
      placeholder: `PIN actual: ${appState.superadminPin || "0000"}`,
      value: saPin,
      onChange: e => setSaPin(e.target.value)
    }), React.createElement("button", {
      style: C.btn("p"),
      onClick: saveSaPin
    }, "GUARDAR PIN")), React.createElement("div", {
      style: {
        fontSize: 9,
        color: D.textMuted,
        marginTop: 4
      }
    }, "Todos los superadmins usan el mismo PIN.")), React.createElement("div", {
      style: {
        fontSize: 11,
        color: D.textSub,
        marginBottom: 6
      }
    }, "EMAILS CON ACCESO"), saEmails.map((email, i) => React.createElement("div", {
      key: i,
      style: {
        display: "flex",
        gap: 6,
        marginBottom: 6,
        alignItems: "center"
      }
    }, React.createElement("input", {
      style: {
        ...C.inp,
        flex: 1
      },
      type: "email",
      placeholder: "email@empresa.com",
      value: email,
      onChange: e => {
        const arr = [...saEmails];
        arr[i] = e.target.value;
        setSaEmails(arr);
      }
    }), saEmails.length > 1 && React.createElement("button", {
      onClick: () => setSaEmails(saEmails.filter((_, j) => j !== i)),
      style: {
        ...C.btn("d"),
        padding: "5px 8px"
      }
    }, "✕"))), React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        marginTop: 6
      }
    }, React.createElement("button", {
      style: {
        ...C.btn("t"),
        fontSize: 6
      },
      onClick: () => setSaEmails([...saEmails, ""])
    }, "+ Agregar"), React.createElement("button", {
      style: {
        ...C.btn("p"),
        fontSize: 6
      },
      onClick: saveSuperadmins
    }, "GUARDAR"))), React.createElement("div", {
      style: {
        border: "1px solid #FF475744",
        padding: 11
      }
    }, React.createElement("div", {
      style: px({
        fontSize: 7,
        color: "#FF4757",
        marginBottom: 7
      })
    }, "ZONA DE PELIGRO"), React.createElement("button", {
      style: C.btn("d"),
      onClick: () => {
        if (!confirm("¿Reiniciar?")) return;
        const ns = {
          ...S,
          modules: S.modules.map(m => ({
            ...m,
            tasks: m.tasks.map(t => ({
              ...t,
              done: false,
              minutes: [],
              comments: []
            }))
          })),
          team: S.team.map(m => ({
            ...m,
            xp: 0,
            level: 1
          }))
        };
        upd(ns);
        save(ns);
        _showToast("Reiniciado");
      }
    }, "REINICIAR PROGRESO")));
  };
  const renderPrintView = () => React.createElement(PrintReport, {
    proj: S,
    onClose: () => setView("ciudad"),
    severaData: severaCache
  });
  return React.createElement("div", {
    style: C.app
  }, React.createElement("style", null, `@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Inter:wght@400;500;600&display=swap');input[type="date"]::-webkit-calendar-picker-indicator{filter:invert(.5);}textarea{font-family:Inter,sans-serif;background:#0D1117;border:1px solid #2A3F58;color:#E8EDF2;box-sizing:border-box;}`), view !== "imprimir" && React.createElement("nav", {
    style: C.nav
  }, React.createElement("button", {
    onClick: onBack,
    style: {
      background: "none",
      border: `1px solid ${D.navBorder}`,
      color: "rgba(255,255,255,0.55)",
      fontFamily: "'Press Start 2P',monospace",
      fontSize: 5,
      padding: "4px 8px",
      cursor: "pointer",
      marginRight: 10,
      flexShrink: 0
    }
  }, "←"), React.createElement("img", {
    src: LOGO_B64,
    alt: "Mandú",
    style: {
      height: 28,
      marginRight: 12,
      flexShrink: 0,
      opacity: .92
    }
  }), React.createElement("div", {
    style: {
      fontFamily: "'Press Start 2P',monospace",
      fontSize: 6,
      color: "#7dc9b2",
      marginRight: 6,
      whiteSpace: "nowrap",
      flexShrink: 0,
      overflow: "hidden",
      maxWidth: 160,
      textOverflow: "ellipsis"
    }
  }, S.projectName), tabs.map(t => React.createElement("button", {
    key: t.id,
    style: C.nb(view === t.id),
    onClick: () => setView(t.id)
  }, t.label)), React.createElement("div", {
    style: {
      marginLeft: "auto",
      display: "flex",
      alignItems: "center",
      gap: 6,
      flexShrink: 0
    }
  }, React.createElement("button", {
    onClick: () => setDayMode(d => !d),
    title: dayMode ? "Cambiar a modo noche" : "Cambiar a modo día",
    style: {
      background: "rgba(0,0,0,0.2)",
      border: `1px solid ${D.navBorder}`,
      color: dayMode ? "#FFE066" : "#7dc9b2",
      fontSize: 14,
      padding: "2px 7px",
      cursor: "pointer",
      lineHeight: 1.4
    }
  }, dayMode ? "🌙" : "☀️"), session.emoji && React.createElement("span", {
    style: {
      fontSize: 14
    }
  }, session.emoji), React.createElement("span", {
    style: {
      fontFamily: "'Press Start 2P',monospace",
      fontSize: 5,
      color: session.role === "admin" ? "#FFE066" : session.role === "projadmin" ? "#c8e6a0" : "#7dc9b2"
    }
  }, session.role === "admin" ? "👑 SUPER" : session.role === "projadmin" ? "🏗️ ADMIN" : "CIUDADANO"), !isAdmin && myProjects.length > 1 && React.createElement("select", {
    style: {
      background: "#003030",
      border: `1px solid ${D.navBorder}`,
      color: "#7dc9b2",
      fontFamily: "Inter",
      fontSize: 10,
      padding: "3px 6px",
      cursor: "pointer",
      outline: "none"
    },
    value: activeProjectId || "",
    onChange: e => {
      onSwitchProject(e.target.value);
    }
  }, myProjects.map(p => React.createElement("option", {
    key: p.id,
    value: p.id
  }, p.projectName || p.name))), isAdmin && React.createElement("button", {
    style: {
      background: "none",
      border: `1px solid ${D.navBorder}`,
      color: "rgba(255,255,255,0.5)",
      fontFamily: "'Press Start 2P',monospace",
      fontSize: 5,
      padding: "3px 8px",
      cursor: "pointer"
    },
    onClick: onBack
  }, "PROYECTOS"), isAdmin && React.createElement("button", {
    style: {
      background: "none",
      border: `1px solid ${D.navBorder}`,
      color: saving ? "#7dc9b2" : "rgba(255,255,255,0.4)",
      fontFamily: "'Press Start 2P',monospace",
      fontSize: 5,
      padding: "3px 7px",
      cursor: "pointer"
    },
    onClick: () => save(S)
  }, saving ? "..." : "💾"))), React.createElement("div", {
    style: {
      maxWidth: 1060,
      margin: "0 auto"
    }
  }, view === "ciudad" && renderCiudadView(), view === "equipo" && (isAdmin || isEclient) && renderEquipoView(), view === "modulos" && isAdmin && renderModulosView(), view === "tareas" && !isAdmin && renderMisTareasView(), view === "gantt" && renderGanttView(), view === "chat" && renderChatView(), view === "config" && isAdmin && renderConfigView()), view === "imprimir" && renderPrintView(), React.createElement("div", {
    style: {
      position: "fixed",
      bottom: 16,
      right: 16,
      zIndex: 50,
      opacity: .55,
      pointerEvents: "none"
    }
  }, React.createElement("img", {
    src: LOGO_B64,
    alt: "Mandú by Visma",
    style: {
      height: 32,
      filter: dayMode ? "none" : "brightness(0.7) sepia(1) hue-rotate(130deg) saturate(2)"
    }
  })), renderEmailModal(), taskModal && React.createElement(TaskModal, {
    task: taskModal.task,
    mod: taskModal.mod,
    session: session,
    adminName: S.adminName || "Admin",
    onClose: () => setTaskModal(null),
    onUpdate: updTask => updateTask(taskModal.mod.id, updTask, taskModal.task)
  }), toast && React.createElement("div", {
    style: {
      position: "fixed",
      bottom: 18,
      right: 18,
      zIndex: 600,
      background: "#1E2D40",
      border: `1px solid ${toast.type === "error" ? "#FF4757" : "#4ECDC4"}`,
      padding: "10px 14px",
      maxWidth: 260,
      animation: "slideIn .3s ease"
    }
  }, React.createElement("div", {
    style: px({
      fontSize: 5,
      color: toast.type === "error" ? "#FF4757" : "#4ECDC4",
      marginBottom: 3
    })
  }, toast.type === "error" ? "ERROR" : "✓ OK"), React.createElement("div", {
    style: {
      fontSize: 12
    }
  }, toast.msg)), React.createElement("style", null, `@keyframes slideIn{from{transform:translateX(120%);opacity:0}to{transform:translateX(0);opacity:1}}`));
}
window.TalentCity=TalentCity;
})();