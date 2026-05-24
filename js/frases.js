// === Phrases pool (with emojis) ===
const PHRASES = [
    { t: 'Mi Peque',                              e: '🌸' },
    { t: 'Esos Ojos Cafes',                       e: '👁️' },
    { t: 'Esas nenas son perfectas solo para mí', e: '✨' },
    { t: 'Te quiero mi Peque',                    e: '💗' },
    { t: 'Mi paz mental',        e: '🦋' },
    { t: 'Mi luz',                e: '⭐' },
    { t: 'Te pienso',             e: '💟' },
    { t: 'Nuestro destino',       e: '🪐' },
    { t: 'Eres todo',             e: '😍' },
    { t: 'Eres inigualable',      e: '🍒' },
    { t: 'Mi amor eterno',        e: '🐻' },
    { t: 'Mi universo',           e: '💫' },
    { t: 'Siempre a tu lado',     e: '🧎' },
    { t: 'Mi mayor alegría',      e: '🎉' },
    { t: 'Me encantas',           e: '💋' },
    { t: 'Mi razón de ser',       e: '🥺' },
    { t: 'Mi reina',              e: '👑' },
    { t: 'Mi vida entera',        e: '✨' },
    { t: 'Mi felicidad',          e: '💗' },
    { t: 'Mi alma gemela',        e: '🌹' },
    { t: 'Mi persona favorita',   e: '💝' },
    { t: 'Mi chispa',             e: '⚡' },
    { t: 'Mi refugio',            e: '🔐' },
    { t: 'Para siempre',          e: '♾️' },
    { t: 'Mi sueño hecho realidad', e: '⭐' },
    { t: 'Cada segundo',          e: '⏳' },
    { t: 'Eres mi todo',          e: '🌟' },
    { t: 'Mi corazón es tuyo',    e: '💖' },
    { t: 'Mi cielo',              e: '☁️' },
    { t: 'Mi todo',               e: '🌷' },
];

// === Twinkling stars ===
(function makeStars() {
    const layer = document.getElementById('stars');
    const n = window.innerWidth < 600 ? 90 : 160;
    for (let i = 0; i < n; i++) {
        const s = document.createElement('div');
        s.className = 'star';
        const size = Math.random() < 0.85 ? 2 : 3;
        s.style.width = size + 'px';
        s.style.height = size + 'px';
        s.style.left = Math.random() * 100 + 'vw';
        s.style.top = Math.random() * 100 + 'vh';
        s.style.animationDuration = (1.5 + Math.random() * 3) + 's';
        s.style.animationDelay = (-Math.random() * 4) + 's';
        layer.appendChild(s);
    }
})();

// === Heart sizing ===
const isMobile = window.innerWidth < 600;
const heartSize = Math.min(window.innerWidth * 0.55, isMobile ? 230 : 300);
document.documentElement.style.setProperty('--heart-size', heartSize + 'px');
// Effective silhouette radius for hiding phrases passing behind the heart.
// Heart is narrower than its bounding box, so use a smaller value.
const heartRadius = heartSize * 0.38;

// === Build the 3D extruded heart ===
// Many heart-shaped slices stacked at different z depths create a real 3D
// extruded look — when you rotate the camera you actually see depth, not a
// flat shape.
(function buildHeart() {
    const root = document.getElementById('heart3d');
    const SLICES = isMobile ? 28 : 40;
    const DEPTH  = heartSize * 0.32; // total thickness

    for (let i = 0; i < SLICES; i++) {
        const t = i / (SLICES - 1);           // 0..1
        const z = (t - 0.5) * DEPTH;          // -DEPTH/2 .. +DEPTH/2
        // brighter slices toward the middle (the face you usually look at)
        const dist = Math.abs(t - 0.5) * 2;   // 0 center, 1 edge
        const brightness = 0.55 + (1 - dist) * 0.45;

        const slice = document.createElement('div');
        slice.className = 'heart-slice';
        slice.style.transform = `translateZ(${z.toFixed(2)}px)`;
        slice.style.filter = `brightness(${brightness.toFixed(2)})`;
        root.appendChild(slice);
    }
})();

// === Orbiting phrase system ===
const stage = document.getElementById('orbitStage');

const COUNT = isMobile ? 38 : 56;
// Spread the orbits much wider — phrases should fill the whole screen, not
// just cluster near the heart.
const screenSpan = Math.min(window.innerWidth, window.innerHeight);
const R_MIN = heartRadius + 60;
const R_MAX = screenSpan * 0.65;          // out to near the edges

const phrases = [];

function makePhrase() {
    const data = PHRASES[Math.floor(Math.random() * PHRASES.length)];
    const sizeRoll = Math.random();
    const sizeCls = sizeRoll < 0.25 ? 'tiny' : (sizeRoll > 0.8 ? 'big' : '');

    const el = document.createElement('span');
    el.className = 'phrase ' + sizeCls;
    el.innerHTML = `${data.e} ${data.t}`;
    stage.appendChild(el);

    return {
        el,
        radius: R_MIN + Math.random() * (R_MAX - R_MIN),
        theta: Math.random() * Math.PI * 2,
        // SLOWER speed — closer to the first version's gentle drift
        speed: (0.0005 + Math.random() * 0.0012) * (Math.random() < 0.5 ? 1 : -1),
        // Wider tilt ranges so orbits cover the full 3D sphere around the heart
        tiltX: (Math.random() - 0.5) * Math.PI,      // ±90°
        tiltZ: (Math.random() - 0.5) * Math.PI,      // ±90°
        // Bigger vertical scatter so phrases fill the top & bottom of the screen
        yOffset: (Math.random() - 0.5) * screenSpan * 0.7,
    };
}

for (let i = 0; i < COUNT; i++) phrases.push(makePhrase());

// === Camera controls (drag to rotate the view around the heart) ===
let camYaw = 0;
let camPitch = 0;
let camYawVel = 0;
let camPitchVel = 0;
let dragging = false;
let lastX = 0, lastY = 0;
const hint = document.getElementById('hint');
const heartSystem = document.getElementById('heartSystem');
let userInteracted = false;

function rotateY(p, a) {
    const c = Math.cos(a), s = Math.sin(a);
    return { x: p.x * c + p.z * s, y: p.y, z: -p.x * s + p.z * c };
}
function rotateX(p, a) {
    const c = Math.cos(a), s = Math.sin(a);
    return { x: p.x, y: p.y * c - p.z * s, z: p.y * s + p.z * c };
}

function getPt(e) {
    return e.touches && e.touches[0] ? e.touches[0] : e;
}

function onStart(e) {
    dragging = true;
    const pt = getPt(e);
    lastX = pt.clientX;
    lastY = pt.clientY;
    camYawVel = 0;
    camPitchVel = 0;
    if (!userInteracted && hint) {
        hint.style.opacity = '0';
        userInteracted = true;
    }
}
function onMove(e) {
    if (!dragging) return;
    const pt = getPt(e);
    const dx = pt.clientX - lastX;
    const dy = pt.clientY - lastY;
    lastX = pt.clientX;
    lastY = pt.clientY;
    camYaw   += dx * 0.008;
    camPitch += dy * 0.008;
    camPitch = Math.max(-1.2, Math.min(1.2, camPitch));
    camYawVel   = dx * 0.008;
    camPitchVel = dy * 0.008;
    if (e.cancelable) e.preventDefault();
}
function onEnd() { dragging = false; }

window.addEventListener('mousedown', onStart);
window.addEventListener('mousemove', onMove);
window.addEventListener('mouseup', onEnd);
window.addEventListener('mouseleave', onEnd);
window.addEventListener('touchstart', onStart, { passive: true });
window.addEventListener('touchmove', onMove, { passive: false });
window.addEventListener('touchend', onEnd);
window.addEventListener('touchcancel', onEnd);

function project(p) {
    let pos = {
        x: p.radius * Math.cos(p.theta),
        y: p.yOffset,
        z: p.radius * Math.sin(p.theta),
    };
    pos = rotateX(pos, p.tiltX);
    pos = rotateY(pos, p.tiltZ);
    pos = rotateY(pos, camYaw);
    pos = rotateX(pos, camPitch);
    return pos;
}

// === Animate ===
function frame() {
    // Camera: inertia after release, no auto-spin (stays where the user left it)
    if (!dragging) {
        if (Math.abs(camYawVel) > 0.0003 || Math.abs(camPitchVel) > 0.0003) {
            camYaw   += camYawVel;
            camPitch += camPitchVel;
            camYawVel   *= 0.94;
            camPitchVel *= 0.94;
            camPitch = Math.max(-1.2, Math.min(1.2, camPitch));
        }
    }

    // Apply camera rotation to the heart so you really see different sides
    const yawDeg   = camYaw   * 180 / Math.PI;
    const pitchDeg = camPitch * 180 / Math.PI;
    heartSystem.style.transform =
        `translate(-50%, -50%) rotateX(${pitchDeg}deg) rotateY(${yawDeg}deg)`;

    for (const p of phrases) {
        p.theta += p.speed;
        const pos = project(p);

        const depth = (pos.z + R_MAX) / (R_MAX * 2);
        const scale = 0.45 + depth * 0.95;
        let opacity = 0.25 + depth * 0.75;

        // Hide phrases that fall behind the heart silhouette
        if (pos.z < 0) {
            const dist2D = Math.hypot(pos.x, pos.y);
            if (dist2D < heartRadius) opacity = 0;
        }

        const zi = Math.round(500 + (pos.z / R_MAX) * 480);

        p.el.style.transform =
            `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
        p.el.style.opacity = opacity.toFixed(2);
        p.el.style.zIndex = zi;
    }
    requestAnimationFrame(frame);
}
frame();

let resizeTO;
window.addEventListener('resize', () => {
    clearTimeout(resizeTO);
    resizeTO = setTimeout(() => location.reload(), 250);
});
