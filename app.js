(function(){
const useState=React.useState,useEffect=React.useEffect,useRef=React.useRef,useCallback=React.useCallback;
const SCRIPT_URL="https://script.google.com/macros/s/AKfycbzs1NZtl1mpTczBNKjC1oPniGU7Z8b-MGkQvnHtqIr00LexI6_t8AzyI_SUIS6hTongow/exec";
window.storage={
  get:async function(k){try{const r=await fetch(SCRIPT_URL+"?key="+encodeURIComponent(k)+"&t="+Date.now());const d=await r.json();return(!d||d.error)?null:d;}catch(e){return null;}},
  set:async function(k,v){try{const r=await fetch(SCRIPT_URL,{method:"POST",headers:{"Content-Type":"text/plain"},body:JSON.stringify({action:"set",key:k,value:v})});const d=await r.json();return(d&&d.error)?null:d;}catch(e){return null;}},
  delete:async function(k){try{const r=await fetch(SCRIPT_URL,{method:"POST",headers:{"Content-Type":"text/plain"},body:JSON.stringify({action:"delete",key:k})});return await r.json();}catch(e){return null;}},
  list:async function(p){try{const r=await fetch(SCRIPT_URL,{method:"POST",headers:{"Content-Type":"text/plain"},body:JSON.stringify({action:"list",prefix:p})});return await r.json();}catch(e){return{keys:[]};}}
};
const TODAY = new Date();
TODAY.setHours(0, 0, 0, 0);
const LOGO_B64 = "./logo.png";
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
  dayMode
}) {
  const ref = useRef(null),
    tickRef = useRef(0),
    rafRef = useRef(null);
  const activeMods = modules.filter(m => m.active);
  const doneKey = activeMods.map(m => m.tasks.filter(t => t.done).length).join(",");
  const overdueKey = activeMods.map(m => m.tasks.filter(t => isOverdue(t)).length).join(",");
  const weather = getDailyWeather();
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
      rafRef.current = requestAnimationFrame(render);
    }
    render();
    return () => cancelAnimationFrame(rafRef.current);
  }, [activeMods.length, doneKey, overdueKey, team.length, dayMode, weather]);
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
  projEnd
}) {
  const ref = useRef(null);
  const am = modules.filter(m => m.active);
  const doneKey = am.map(m => m.tasks.filter(t => t.done).length).join(",");
  const dateKey = am.map(m => m.tasks.map(t => t.dueDate || "").join("|")).join(";");
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    const startD = parseD(projStart) || new Date();
    const endD = parseD(projEnd) || new Date(TODAY.getTime() + 60 * 864e5);
    const totalDays = Math.max(1, Math.round((endD - startD) / 864e5));
    const W = 920,
      rowH = 44,
      headerH = 48,
      leftW = 140,
      padR = 16;
    const H = headerH + Math.max(am.length, 1) * rowH + 12;
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
    ctx.fillText("MÓDULO", 10, headerH / 2 + 4);
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
    if (am.length === 0) {
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
  }, [am.length, doneKey, dateKey, projStart, projEnd]);
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
  return React.createElement("div", {
    style: {
      background: "#1A2332",
      border: "1px solid #2A3F58",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      transition: "border-color .15s"
    },
    onMouseEnter: e => e.currentTarget.style.borderColor = roleCol,
    onMouseLeave: e => e.currentTarget.style.borderColor = "#2A3F58"
  }, React.createElement(MiniCityPreview, {
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
  onClose
}) {
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
      background: "#080C12",
      padding: "10px 20px",
      display: "flex",
      alignItems: "center",
      gap: 12,
      position: "sticky",
      top: 0,
      zIndex: 10,
      borderBottom: "1px solid #1E2D40"
    }
  }, React.createElement("button", {
    onClick: onClose,
    style: {
      background: "none",
      border: "1px solid #2A3F58",
      color: "#7A8FA6",
      fontFamily: "'Press Start 2P',monospace",
      fontSize: 6,
      padding: "5px 10px",
      cursor: "pointer"
    }
  }, "← VOLVER"), React.createElement("span", {
    style: {
      fontSize: 12,
      color: "#E8EDF2",
      fontWeight: 600,
      flex: 1
    }
  }, proj.projectName, " — Resumen"), React.createElement("button", {
    onClick: doDownload,
    style: {
      background: "#FFD700",
      color: "#0D1117",
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
  }, "📋 TAREAS POR MÓDULO"), am.map(mod => {
    const done = mod.tasks.filter(t => t.done).length,
      tot = mod.tasks.length,
      pMod = tot ? Math.round(done / tot * 100) : 0;
    const mCount = mod.tasks.reduce((a, t) => a + (t.minutes || []).length, 0);
    return React.createElement("div", {
      key: mod.id,
      style: {
        marginBottom: 14
      }
    }, React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "7px 12px",
        background: mod.color + "18",
        borderLeft: `4px solid ${mod.color}`
      }
    }, React.createElement("span", {
      style: {
        fontSize: 16
      }
    }, mod.icon), React.createElement("span", {
      style: {
        fontWeight: 700,
        fontSize: 13
      }
    }, mod.name), React.createElement("span", {
      style: {
        fontSize: 11,
        color: "#64748b"
      }
    }, "— ", mod.phase), mCount > 0 && React.createElement("span", {
      style: {
        fontSize: 11,
        color: "#475569",
        marginLeft: "auto"
      }
    }, "📋", mCount), React.createElement("span", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        color: mod.color,
        marginLeft: mCount > 0 ? 0 : "auto"
      }
    }, done, "/", tot, " · ", pMod, "%")), React.createElement("table", {
      style: {
        width: "100%",
        borderCollapse: "collapse",
        fontSize: 12
      }
    }, React.createElement("thead", null, React.createElement("tr", {
      style: {
        background: "#f8fafc"
      }
    }, ["TAREA", "INICIO", "FIN / DÍAS", "ESTADO", "HS ADMIN", "HS CLIENTE", "MINUTAS", "XP"].map(h => React.createElement("th", {
      key: h,
      style: {
        padding: "5px 8px",
        textAlign: "left",
        fontSize: 10,
        color: "#94a3b8",
        fontWeight: 600,
        borderBottom: "1px solid #e2e8f0"
      }
    }, h)))), React.createElement("tbody", null, mod.tasks.map((t, ti) => {
      const ov = isOverdue(t),
        sn = isDueSoon(t);
      const stCol = t.done ? "#16a34a" : ov ? "#dc2626" : sn ? "#d97706" : "#64748b";
      const hLog = t.hoursLog || [];
      const hAdmin = hLog.filter(h => h.authorRole === "admin").reduce((a, h) => a + h.hours, 0);
      const hTeam = hLog.filter(h => h.authorRole === "team").reduce((a, h) => a + h.hours, 0);
      return React.createElement("tr", {
        key: t.id,
        style: {
          background: ti % 2 === 0 ? "white" : "#fafafa",
          borderBottom: "1px solid #f1f5f9"
        }
      }, React.createElement("td", {
        style: {
          padding: "5px 8px",
          color: t.done ? "#94a3b8" : "#1e293b",
          textDecoration: t.done ? "line-through" : "none"
        }
      }, t.label), React.createElement("td", {
        style: {
          padding: "5px 8px",
          color: "#64748b",
          textAlign: "center",
          whiteSpace: "nowrap"
        }
      }, t.startDate ? fmtD(t.startDate) : "—"), React.createElement("td", {
        style: {
          padding: "5px 8px",
          color: ov ? "#dc2626" : sn ? "#d97706" : "#64748b",
          textAlign: "center",
          whiteSpace: "nowrap"
        }
      }, t.dueDate ? fmtD(t.dueDate) : "—", t.duration ? React.createElement("span", {
        style: {
          color: "#94a3b8",
          fontSize: 10
        }
      }, " ", t.duration, "d") : ""), React.createElement("td", {
        style: {
          padding: "5px 8px",
          fontWeight: 600,
          color: stCol,
          textAlign: "center",
          whiteSpace: "nowrap"
        }
      }, t.done ? "✓ Hecha" : ov ? "⚠ Vencida" : sn ? "⏰ Próxima" : "En curso"), React.createElement("td", {
        style: {
          padding: "5px 8px",
          textAlign: "center",
          color: hAdmin > 0 ? "#b45309" : "#94a3b8",
          fontWeight: hAdmin > 0 ? 600 : 400
        }
      }, hAdmin > 0 ? `${hAdmin}h` : "—"), React.createElement("td", {
        style: {
          padding: "5px 8px",
          textAlign: "center",
          color: hTeam > 0 ? "#0369a1" : "#94a3b8",
          fontWeight: hTeam > 0 ? 600 : 400
        }
      }, hTeam > 0 ? `${hTeam}h` : "—"), React.createElement("td", {
        style: {
          padding: "5px 8px",
          textAlign: "center"
        }
      }, (t.minutes || []).length > 0 ? `📋${(t.minutes || []).length}` : "—"), React.createElement("td", {
        style: {
          padding: "5px 8px",
          textAlign: "right",
          fontFamily: "monospace",
          color: "#94a3b8"
        }
      }, "+", t.xp));
    }))));
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
  }, React.createElement("span", null, "ManduHubCity · ", proj.projectName), React.createElement("span", null, now))));
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
    return React.createElement("div", {
      style: {
        background: "#004949",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Inter,sans-serif",
        padding: 16
      }
    }, React.createElement("div", {
      style: {
        maxWidth: 420,
        width: "100%"
      }
    }, React.createElement("div", {
      style: {
        textAlign: "center",
        marginBottom: 32
      }
    }, React.createElement("img", {
      src: LOGO_B64,
      alt: "Mandú by Visma",
      style: {
        width: 200,
        maxWidth: "75%",
        marginBottom: 14,
        filter: "drop-shadow(0 2px 16px rgba(0,0,0,0.5))"
      }
    }), React.createElement("div", {
      style: {
        fontSize: 13,
        color: "#7dc9b2",
        letterSpacing: .5
      }
    }, appState.projects.length, " proyecto", appState.projects.length !== 1 ? "s" : "", " activo", appState.projects.length !== 1 ? "s" : "")), loginStep === "email" && React.createElement("div", {
      style: {
        background: "#003030",
        border: "1px solid #006060",
        padding: 24
      }
    }, React.createElement("div", {
      style: px2({
        fontSize: 8,
        color: "#7dc9b2",
        marginBottom: 16
      })
    }, "INICIAR SESIÓN"), React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#7dc9b2",
        marginBottom: 6
      }
    }, "CORREO ELECTRÓNICO"), React.createElement("input", {
      autoFocus: true,
      type: "email",
      value: loginEmail,
      onChange: e => {
        setLoginEmail(e.target.value);
        setLoginError("");
      },
      onKeyDown: e => e.key === "Enter" && handleEmailNext(),
      placeholder: "tu@empresa.com",
      style: {
        background: "#0D1117",
        border: `1px solid ${loginError ? "#FF4757" : "#2A3F58"}`,
        color: "#E8EDF2",
        padding: "11px 14px",
        fontSize: 14,
        width: "100%",
        outline: "none",
        marginBottom: 8,
        boxSizing: "border-box",
        fontFamily: "Inter,sans-serif"
      }
    }), loginError && React.createElement("div", {
      style: {
        color: "#FF4757",
        fontSize: 11,
        marginBottom: 8,
        whiteSpace: "pre-wrap"
      }
    }, "⚠ ", loginError), React.createElement("button", {
      onClick: handleEmailNext,
      style: {
        background: "#4ECDC4",
        color: "#0D1117",
        border: "none",
        fontFamily: "'Press Start 2P',monospace",
        fontSize: 8,
        padding: "11px",
        cursor: "pointer",
        width: "100%",
        marginTop: 4
      }
    }, "CONTINUAR →"), React.createElement("div", {
      style: {
        marginTop: 14,
        fontSize: 11,
        color: "#2A3F58",
        textAlign: "center",
        lineHeight: 1.6
      }
    }, "Ingresá el email con el que fuiste dado de alta en el sistema")), loginStep === "pin" && React.createElement("div", {
      style: {
        background: "#1A2332",
        border: "1px solid #2A3F58",
        padding: 24
      }
    }, React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 18
      }
    }, React.createElement("button", {
      onClick: () => {
        setLoginStep("email");
        setLoginError("");
        setLoginPin("");
      },
      style: {
        background: "none",
        border: "none",
        color: "#7A8FA6",
        cursor: "pointer",
        fontSize: 16,
        lineHeight: 1
      }
    }, "←"), React.createElement("div", null, React.createElement("div", {
      style: px2({
        fontSize: 7,
        color: "#4ECDC4",
        marginBottom: 3
      })
    }, "BIENVENIDO/A"), React.createElement("div", {
      style: {
        fontSize: 13,
        color: "#E8EDF2",
        fontWeight: 600
      }
    }, loginEmail))), React.createElement("div", {
      style: {
        marginBottom: 16
      }
    }, React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#7A8FA6",
        marginBottom: 8
      }
    }, "TUS ROLES EN EL SISTEMA"), React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 5
      }
    }, loginRoles.map((r, i) => React.createElement("div", {
      key: i,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 10px",
        background: "#0D1117",
        border: "1px solid #2A3F58"
      }
    }, React.createElement("span", {
      style: {
        fontSize: 14
      }
    }, r.type === "superadmin" ? "👑" : r.type === "projadmin" ? "🏗️" : "🏙️"), React.createElement("div", {
      style: {
        flex: 1
      }
    }, React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 600,
        color: r.color
      }
    }, r.label), React.createElement("div", {
      style: {
        fontSize: 10,
        color: "#7A8FA6"
      }
    }, r.desc)))))), React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#7A8FA6",
        marginBottom: 6
      }
    }, "TU PIN DE ACCESO"), React.createElement("input", {
      autoFocus: true,
      type: "password",
      maxLength: 8,
      value: loginPin,
      onChange: e => {
        setLoginPin(e.target.value);
        setLoginError("");
      },
      onKeyDown: e => e.key === "Enter" && handlePinSubmit(),
      style: {
        background: "#0D1117",
        border: `1px solid ${loginError ? "#FF4757" : "#2A3F58"}`,
        color: "#E8EDF2",
        padding: "11px",
        fontSize: 22,
        width: "100%",
        outline: "none",
        letterSpacing: 8,
        textAlign: "center",
        marginBottom: 8,
        boxSizing: "border-box"
      },
      placeholder: "••••"
    }), loginError && React.createElement("div", {
      style: {
        color: "#FF4757",
        fontSize: 11,
        marginBottom: 8
      }
    }, "⚠ ", loginError), React.createElement("div", {
      style: {
        fontSize: 10,
        color: "#2A3F58",
        marginBottom: 12,
        textAlign: "center"
      }
    }, "PIN por defecto: 0000 (superadmin) · 1111 (admin proyecto) · 1234 (ciudadano)"), React.createElement("button", {
      onClick: handlePinSubmit,
      style: {
        background: "#FFD700",
        color: "#0D1117",
        border: "none",
        fontFamily: "'Press Start 2P',monospace",
        fontSize: 8,
        padding: "11px",
        cursor: "pointer",
        width: "100%"
      }
    }, "INGRESAR"))));
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
          const existing = ns.projects.find(p => p.clientId === String(c.cliente_id) || p.projectName === c.proyecto);
          if (existing) {
            const hasUser = existing.team.some(m => m.email.toLowerCase() === c.usuario_email.toLowerCase());
            if (!hasUser && c.usuario_email) {
              existing.team.push({
                id: "u" + Date.now() + Math.random().toString(36).slice(2, 4),
                name: c.usuario_nombre || c.usuario_email,
                role: "Cliente E-shop",
                emoji: "🛍️",
                level: 1,
                xp: 0,
                skills: [],
                status: "active",
                email: c.usuario_email.toLowerCase(),
                pin: String(c.usuario_pin || "1234"),
                esRole: "eclient"
              });
              changed = true;
            }
            return;
          }
          const proj = makeProject(c.proyecto, c.admin_email || "", c.tipo || "Eshop");
          proj.clientId = String(c.cliente_id || "");
          proj.projAdminPin = String(c.admin_pin || "1111");
          proj.projAdminEmail = c.admin_email || "";
          if (templates.length) {
            const contratoMods = (c.modulos || "").split(",").map(m => m.trim().toLowerCase()).filter(Boolean);
            const allTemplateMods = buildModulesFromTemplate(c.tipo || "Eshop");
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
              role: "Cliente E-shop",
              emoji: "🛍️",
              level: 1,
              xp: 0,
              skills: [],
              status: "active",
              email: c.usuario_email.toLowerCase(),
              pin: String(c.usuario_pin || "1234"),
              esRole: "eclient"
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
          showToast("✅ Clientes E-shop importados");
        }
      } catch (e) {
        console.error("Eshop import error:", e);
      }
    };
    useEffect(() => {
      if (isSuperadmin && templates.length) importEshopClients();
    }, [templates.length]);
    const tiposDisponibles = [...new Set(templates.map(t => t.tipo).filter(Boolean))];
    const BUILDING_CYCLE = ["onboarding", "carrera", "capacitacion", "evaluacion", "mentorias", "bienestar", "sucesion", "feedback"];
    const buildModulesFromTemplate = tipo => {
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
      return modOrder.map((name, i) => ({
        id: "mod" + Date.now() + i + Math.random().toString(36).slice(2, 4),
        name,
        buildingType: BUILDING_CYCLE[i % BUILDING_CYCLE.length],
        icon: BT_ICONS[BUILDING_CYCLE[i % BUILDING_CYCLE.length]],
        phase: BT_PHASES[BUILDING_CYCLE[i % BUILDING_CYCLE.length]],
        active: true,
        color: COLORS[i % COLORS.length],
        tasks: modMap[name].tasks
      }));
    };
    const handleCreate = () => {
      if (!newProjName.trim()) return;
      const adminEmail = isProjAdmin && !isSuperadmin ? session.email : "";
      const proj = makeProject(newProjName.trim(), adminEmail, newProjTipo);
      if (newProjTipo && templates.length) proj.modules = buildModulesFromTemplate(newProjTipo);
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
      const matchName = !searchQuery || (proj.projectName || proj.name).toLowerCase().includes(searchQuery.toLowerCase()) || (proj.clientId || "").toLowerCase().includes(searchQuery.toLowerCase());
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
    }, "+ NUEVO PROYECTO"), React.createElement("button", {
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
    }, "SALIR")), React.createElement("div", {
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
    }].map(t => React.createElement("button", {
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
        fontSize: 7
      }
    }, t.label)))), React.createElement("div", {
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
      placeholder: "Buscar ciudad o ID cliente…",
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
    })()));
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
    color: "#4ECDC4"
  });
  const [editingMod, setEditingMod] = useState(null);
  const [cityImg, setCityImg] = useState(null);
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
  const updateTask = (modId, updatedTask) => {
    const ns = {
      ...S,
      modules: S.modules.map(m => m.id === modId ? {
        ...m,
        tasks: m.tasks.map(t => t.id === updatedTask.id ? updatedTask : t)
      } : m)
    };
    upd(ns);
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
    const ns = {
      ...S,
      modules: S.modules.map(m => m.id === emailModal.mod.id ? {
        ...m,
        tasks: m.tasks.map(t => t.id === emailModal.task.id ? {
          ...t,
          minutes: [...(t.minutes || []), minute]
        } : t)
      } : m)
    };
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
  const renderCiudadView = () => React.createElement("div", {
    style: {
      padding: 14
    }
  }, React.createElement("div", {
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
    dayMode: dayMode
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
  })), isAdmin && React.createElement("button", {
    style: C.btn("p"),
    onClick: () => save(S)
  }, saving ? "GUARDANDO..." : "💾 GUARDAR"));
  const renderMisTareasView = () => {
    const myMods = S.modules.filter(m => m.active);
    const unseenCount = myMods.flatMap(m => m.tasks).flatMap(t => (t.minutes || []).filter(mn => !(mn.seenBy || []).find(x => x.id === session.id))).length;
    return React.createElement("div", {
      style: {
        padding: 14
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
        fontSize: 8,
        color: "#4ECDC4"
      })
    }, "▸ TAREAS DEL PROYECTO"), unseenCount > 0 && React.createElement("div", {
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
      const od = mod.tasks.filter(t => isOverdue(t)).length;
      const unseenMins = mod.tasks.flatMap(t => (t.minutes || []).filter(mn => !(mn.seenBy || []).find(x => x.id === session.id))).length;
      const totalComments = mod.tasks.reduce((a, t) => a + (t.comments || []).length, 0);
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
          marginBottom: 9
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
          gap: 5
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
      }, "📋", unseenMins), totalComments > 0 && React.createElement("span", {
        style: {
          ...C.oBadge,
          background: "#C77DFF22",
          border: "1px solid #C77DFF44",
          color: "#C77DFF"
        }
      }, "💬", totalComments))), mod.tasks.map(t => {
        const ov = isOverdue(t),
          sn = isDueSoon(t),
          cC = (t.comments || []).length,
          mC = (t.minutes || []).length,
          unseenM = (t.minutes || []).filter(mn => !(mn.seenBy || []).find(x => x.id === session.id)).length;
        return React.createElement("div", {
          key: t.id,
          style: {
            background: D.app,
            borderLeft: `2px solid ${ov ? "#FF4757" : sn ? "#FFD700" : t.done ? mod.color : D.cardBorder}`,
            marginBottom: 2
          },
          onMouseEnter: e => e.currentTarget.style.opacity = ".9",
          onMouseLeave: e => e.currentTarget.style.opacity = "1"
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
          },
          title: "Marcar como hecha"
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
        }, t.label), ov && React.createElement("span", {
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
        }, "›")), (t.startDate || t.dueDate || t.duration) && React.createElement("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "0 9px 6px 36px",
            fontSize: 10,
            color: D.textSub
          }
        }, t.startDate && React.createElement("span", null, "📅 ", fmtD(t.startDate)), t.startDate && t.dueDate && React.createElement("span", {
          style: {
            color: "#2A3F58"
          }
        }, "→"), t.dueDate && React.createElement("span", {
          style: {
            color: ov ? "#FF4757" : sn ? "#FFD700" : "#7A8FA6"
          }
        }, "🏁 ", fmtD(t.dueDate)), t.duration && React.createElement("span", {
          style: {
            color: "#FFD70066",
            fontFamily: "'Press Start 2P',monospace",
            fontSize: 8
          }
        }, "· ", t.duration, "d")));
      }));
    }));
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
      const mod = S.modules.find(m => m.id === mId),
        t = mod.tasks.find(x => x.id === tId);
      t.done = !t.done;
      if (t.done) _showToast("+" + t.xp + " XP");
      const ns = {
        ...S,
        modules: [...S.modules]
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
        color: "#4ECDC4"
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
    }, bt.label, " — ", bt.phase))))), React.createElement("div", {
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
      }, mod.name, od > 0 && React.createElement("span", {
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
          color: "#7A8FA6",
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
          color: "#7A8FA6",
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
      }, bt.label))))), React.createElement("div", {
        style: {
          marginBottom: 7
        }
      }, React.createElement("div", {
        style: {
          fontSize: 10,
          color: "#7A8FA6",
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
        }, "💬", cC), React.createElement("button", {
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
    })));
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
    return React.createElement("div", {
      style: {
        padding: 14
      }
    }, React.createElement("div", {
      style: px({
        fontSize: 7,
        color: "#4ECDC4",
        letterSpacing: 2,
        marginBottom: 4
      })
    }, "▸ DIAGRAMA GANTT"), React.createElement("div", {
      style: {
        color: "#7A8FA6",
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
        color: "#7A8FA6"
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
        color: "#7A8FA6"
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
    }))), React.createElement("div", {
      style: {
        ...C.panel,
        padding: 0,
        overflowX: "auto",
        marginBottom: 12
      }
    }, React.createElement(GanttCanvas, {
      modules: S.modules,
      projStart: S.projStart,
      projEnd: S.projEnd
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
        color: "#7A8FA6"
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
    const superAdmins = appState.superadminEmails || ["nicolas.garcia@visma.com"];
    const updSuperAdmins = arr => {
      const ns = {
        ...appState,
        superadminEmails: arr
      };
      updApp(ns);
      persist2(ns);
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
    }))), React.createElement("button", {
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
    }, "Emails con acceso total a todos los proyectos"), superAdmins.map((email, i) => React.createElement("div", {
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
        const arr = [...superAdmins];
        arr[i] = e.target.value;
        updSuperAdmins(arr);
      }
    }), superAdmins.length > 1 && React.createElement("button", {
      onClick: () => updSuperAdmins(superAdmins.filter((_, j) => j !== i)),
      style: {
        ...C.btn("d"),
        padding: "5px 8px"
      }
    }, "✕"))), React.createElement("button", {
      style: {
        ...C.btn("t"),
        marginTop: 4,
        fontSize: 6
      },
      onClick: () => updSuperAdmins([...superAdmins, ""])
    }, "+ Agregar superadmin")), React.createElement("div", {
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
    onClose: () => setView("ciudad")
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
  }, view === "ciudad" && renderCiudadView(), view === "equipo" && (isAdmin || isEclient) && renderEquipoView(), view === "modulos" && isAdmin && renderModulosView(), view === "tareas" && !isAdmin && renderMisTareasView(), view === "gantt" && renderGanttView(), view === "config" && isAdmin && renderConfigView()), view === "imprimir" && renderPrintView(), React.createElement("div", {
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
    onUpdate: updTask => updateTask(taskModal.mod.id, updTask)
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