// === Media list (fotos + videos mezclados) ===
// Mete tus archivos en img/album/ y pon sus nombres aquí, en el orden
// que quieras que aparezcan en el carrusel.
// Funciona con: .jpg .png .webp (fotos) y .mp4 .webm .mov (videos).
// Los videos se reproducen solos, sin sonido y en loop.
const MEDIA = [
    'foto1.jpg',
    'foto2.jpg',
    'foto3.jpg',
    'foto4.jpg',
    'foto5.jpg',
    'foto6.jpg',
    'foto7.jpg',
    'foto9.jpeg',
    'Video6.mp4',
    'foto10.jpeg',
    'foto11.jpg',
    'foto12.jpg',
    'foto13.jpg',
    'foto14.jpeg',
    'foto15.jpg',
    'foto16.jpg',
    'foto18.jpg',
    'Video5.mp4',
    'foto19.jpg',
    'foto20.jpg',
    'foto21.jpg',
    'foto22.jpg',
    'foto23.jpg',
    'foto24.jpg',
    'foto25.jpg',
];

// Placeholder shown if un archivo no existe
const PLACEHOLDER_EMOJIS = ['💖', '💕', '💗', '🌹', '✨', '💞', '🌸', '🥰', '😍', '💘'];

const VIDEO_EXT = /\.(mp4|webm|mov|ogv|m4v)$/i;
function isVideo(name) { return VIDEO_EXT.test(name); }

// === Build the carousel ===
const carousel = document.getElementById('carousel');
const count = MEDIA.length;
const isMobile = window.innerWidth < 600;

const photoW = isMobile ? 130 : 170;
const photoH = isMobile ? 190 : 240;
const radius = Math.round((photoW / 2) / Math.tan(Math.PI / count)) + 30;

carousel.style.setProperty('--photo-w', photoW + 'px');
carousel.style.setProperty('--photo-h', photoH + 'px');

MEDIA.forEach((name, i) => {
    const angle = (360 / count) * i;
    const cell = document.createElement('div');
    cell.className = 'photo';
    cell.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;

    if (isVideo(name)) {
        // ===== Video =====
        const video = document.createElement('video');
        video.src = 'img/album/' + name;
        video.muted = true;            // required for mobile autoplay
        video.loop = true;
        video.autoplay = true;
        video.playsInline = true;
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
        video.setAttribute('muted', '');
        video.preload = 'auto';
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'cover';
        video.style.display = 'block';
        video.onerror = () => {
            cell.innerHTML = `<div class="placeholder">🎬</div>`;
        };
        cell.appendChild(video);
        // Ignore autoplay rejection silently (some browsers block it without interaction)
        video.play().catch(() => {});
    } else {
        // ===== Photo =====
        const img = new Image();
        img.alt = '';
        img.onerror = () => {
            cell.innerHTML = `<div class="placeholder">${PLACEHOLDER_EMOJIS[i % PLACEHOLDER_EMOJIS.length]}</div>`;
        };
        img.onload = () => cell.appendChild(img);
        img.src = 'img/album/' + name;
    }

    carousel.appendChild(cell);
});

// === Auto-rotate + drag control ===
let angle = 0;
let velocity = 0.15;       // auto rotation speed
let userVel = 0;           // velocity from drag (decays)
let dragging = false;
let lastX = 0;
let lastT = 0;

function step() {
    // apply user velocity with decay
    if (Math.abs(userVel) > 0.001) {
        angle += userVel;
        userVel *= 0.94;
    } else if (!dragging) {
        angle += velocity;
    }
    carousel.style.transform = `rotateY(${angle}deg)`;
    requestAnimationFrame(step);
}
step();

// Pointer / touch drag
function getX(e) { return e.touches ? e.touches[0].clientX : e.clientX; }

function onStart(e) {
    dragging = true;
    lastX = getX(e);
    lastT = performance.now();
    userVel = 0;
}
function onMove(e) {
    if (!dragging) return;
    const x = getX(e);
    const dx = x - lastX;
    const now = performance.now();
    const dt = Math.max(1, now - lastT);
    angle += dx * 0.4;
    userVel = (dx * 0.4) * (16 / dt);
    lastX = x;
    lastT = now;
    if (e.cancelable) e.preventDefault();
}
function onEnd() {
    dragging = false;
}

window.addEventListener('mousedown', onStart);
window.addEventListener('mousemove', onMove);
window.addEventListener('mouseup', onEnd);
window.addEventListener('touchstart', onStart, { passive: true });
window.addEventListener('touchmove', onMove, { passive: false });
window.addEventListener('touchend', onEnd);

// === Falling petals background ===
(function petals() {
    const layer = document.getElementById('petalsBg');
    const symbols = ['🌸', '🌷', '💮', '🌺', '🌹'];
    const n = isMobile ? 18 : 30;
    for (let i = 0; i < n; i++) {
        const s = document.createElement('span');
        s.className = 'petal-bg';
        s.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        s.style.left = Math.random() * 100 + 'vw';
        s.style.fontSize = (12 + Math.random() * 16) + 'px';
        s.style.animationDuration = (8 + Math.random() * 10) + 's';
        s.style.animationDelay = (-Math.random() * 12) + 's';
        s.style.opacity = (0.4 + Math.random() * 0.5).toString();
        layer.appendChild(s);
    }
})();
