/* ============================================================
 *  CAJA SORPRESA — caja de regalo 3D + video + carta
 * ============================================================
 *
 *  👇 EDITA AQUÍ:  los videos que salen al abrir la caja
 *     (van en la carpeta img/album/). La carta se edita en caja.html.
 */
const GIFT_VIDEOS = [
    'img/sorpresa/caja/1Vdeo.mp4',
    'img/sorpresa/caja/2Video.mp4',
    'img/sorpresa/caja/3Video.mp4',
];
const GIFT_MESSAGE = 'Para ti, mi peque 💗';
/* ============================================================ */

// ===== Pétalos de fondo =====
(function createPetals() {
    const layer = document.getElementById('petals');
    if (!layer) return;
    const symbols = ['🌸', '🌷', '💮', '🌺'];
    const count = window.innerWidth < 600 ? 16 : 26;
    for (let i = 0; i < count; i++) {
        const p = document.createElement('span');
        p.className = 'petal';
        p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        p.style.fontSize = (12 + Math.random() * 18) + 'px';
        p.style.left = Math.random() * 100 + 'vw';
        p.style.animationDuration = (8 + Math.random() * 10) + 's';
        p.style.animationDelay = (-Math.random() * 12) + 's';
        p.style.opacity = (0.5 + Math.random() * 0.4).toString();
        layer.appendChild(p);
    }
})();

// ===== Caja de regalo =====
const giftBox   = document.getElementById('giftBox');
const reveal    = document.getElementById('reveal');
const revealMsg = document.getElementById('revealMsg');
const giftVideo = document.getElementById('giftVideo');
const switchBtn = document.getElementById('switchVideo');

let opened = false;
let videoIndex = 0;

function burstConfetti() {
    const hearts = ['💗', '💖', '💕', '✨', '💝', '🌸'];
    for (let i = 0; i < 26; i++) {
        const c = document.createElement('span');
        c.className = 'confetti';
        c.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        const angle = (Math.random() * Math.PI) - Math.PI / 2; // hacia arriba
        const dist = 80 + Math.random() * 140;
        c.style.setProperty('--dx', (Math.cos(angle) * dist).toFixed(0) + 'px');
        c.style.setProperty('--dy', (-Math.abs(Math.sin(angle) * dist) - 40).toFixed(0) + 'px');
        c.style.setProperty('--rot', (Math.random() * 720 - 360).toFixed(0) + 'deg');
        c.style.fontSize = (14 + Math.random() * 16) + 'px';
        c.style.animationDelay = (Math.random() * 0.15) + 's';
        giftBox.appendChild(c);
        setTimeout(() => c.remove(), 1400);
    }
}

function loadVideo(i) {
    videoIndex = (i + GIFT_VIDEOS.length) % GIFT_VIDEOS.length;
    giftVideo.src = GIFT_VIDEOS[videoIndex];
    giftVideo.load();
}

function openGift() {
    if (opened) return;
    opened = true;
    giftBox.classList.add('open');
    burstConfetti();
    revealMsg.textContent = GIFT_MESSAGE;
    switchBtn.hidden = GIFT_VIDEOS.length < 2;

    setTimeout(() => {
        giftBox.classList.add('gone');
        reveal.hidden = false;
        // la caja deja de ocupar espacio y el contenido sube al inicio
        document.getElementById('giftStage').classList.add('revealed');
        loadVideo(0);
        // estamos dentro del gesto de tocar la caja -> el video puede reproducirse
        giftVideo.play().catch(() => {});
    }, 650);
}

giftBox.addEventListener('click', openGift);
giftBox.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openGift(); }
});

switchBtn.addEventListener('click', () => {
    loadVideo(videoIndex + 1);
    giftVideo.play().catch(() => {});
});

// La música de fondo se APAGA mientras suena el video y vuelve al terminar.
giftVideo.addEventListener('play',  () => { if (window.duckMusic) window.duckMusic(true); });
giftVideo.addEventListener('pause', () => { if (window.duckMusic) window.duckMusic(false); });
giftVideo.addEventListener('ended', () => { if (window.duckMusic) window.duckMusic(false); });
