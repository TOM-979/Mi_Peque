// ===== Floating hearts background =====
(function createHearts() {
    const bg = document.getElementById('heartsBg');
    const symbols = ['💗', '💖', '💕', '♡', '❤'];
    const count = window.innerWidth < 600 ? 16 : 26;
    for (let i = 0; i < count; i++) {
        const h = document.createElement('span');
        h.className = 'bg-heart';
        h.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        const size = 14 + Math.random() * 28;
        h.style.fontSize = size + 'px';
        h.style.left = Math.random() * 100 + 'vw';
        h.style.animationDuration = (8 + Math.random() * 12) + 's';
        h.style.animationDelay = (-Math.random() * 15) + 's';
        h.style.opacity = (0.25 + Math.random() * 0.5).toString();
        bg.appendChild(h);
    }
})();

// ===== Sparkles =====
(function createSparkles() {
    const layer = document.getElementById('sparkles');
    const n = window.innerWidth < 600 ? 22 : 40;
    for (let i = 0; i < n; i++) {
        const s = document.createElement('span');
        s.className = 'sparkle';
        s.style.left = Math.random() * 100 + 'vw';
        s.style.top  = Math.random() * 100 + 'vh';
        s.style.animationDuration = (1.4 + Math.random() * 2.6) + 's';
        s.style.animationDelay = (-Math.random() * 4) + 's';
        layer.appendChild(s);
    }
})();

// ===== Lock dials =====
const CORRECT = ['01', '01', '26']; // DD MM AA -> 01/01/2026
const values = [0, 0, 0];
const statusEl = document.getElementById('status');
const GREETING = 'Hola mi Peque ❤️';

function pad(n) { return n.toString().padStart(2, '0'); }

function render(i) {
    const track = document.getElementById('track-' + i);
    track.querySelector('.dial-num').textContent = pad(values[i]);
    track.classList.remove('bump');
    void track.offsetWidth;
    track.classList.add('bump');
}

function check() {
    const current = values.map(pad);
    if (current.join('') === CORRECT.join('')) {
        statusEl.textContent = '¡Nuestro amor! 💖';
        statusEl.classList.remove('error');
        statusEl.classList.add('success');
        document.getElementById('lock').classList.add('unlocked');
        setTimeout(() => { window.location.href = 'menu.html'; }, 1100);
    } else {
        const moved = values.some(v => v !== 0);
        if (moved) {
            statusEl.textContent = 'Intenta de nuevo, mi amor';
            statusEl.classList.remove('success');
            statusEl.classList.add('error');
            setTimeout(() => statusEl.classList.remove('error'), 400);
        } else {
            statusEl.textContent = GREETING;
            statusEl.classList.remove('error', 'success');
        }
    }
}

document.querySelectorAll('.arrow').forEach(btn => {
    btn.addEventListener('click', () => {
        const i = parseInt(btn.dataset.index);
        const dir = parseInt(btn.dataset.dir);
        values[i] = (values[i] + dir + 100) % 100;
        render(i);
        check();
    });
});

[0, 1, 2].forEach(render);
statusEl.textContent = GREETING;

// Long-press to scroll faster through numbers
document.querySelectorAll('.arrow').forEach(btn => {
    let timer = null, interval = null;
    const start = (e) => {
        if (e.cancelable) e.preventDefault();
        timer = setTimeout(() => { interval = setInterval(() => btn.click(), 110); }, 400);
    };
    const stop = () => { clearTimeout(timer); clearInterval(interval); };
    btn.addEventListener('mousedown', start);
    btn.addEventListener('touchstart', start, { passive: false });
    btn.addEventListener('mouseup', stop);
    btn.addEventListener('mouseleave', stop);
    btn.addEventListener('touchend', stop);
    btn.addEventListener('touchcancel', stop);
});

// ===== Naru the cat — hint toggle =====
const naruCat = document.getElementById('naruCat');
const naruBubble = document.getElementById('naruBubble');
const bubbleText = document.getElementById('bubbleText');

const MSG_INTRO = '¿Quieres una pista Mami? Si es así presióname, soy Naru bb 🐱💗';
const MSG_HINT  = '🏖️ Cuando se fueron a la playa en los juegos mecánicos, Mami 💕';

let showingHint = false;

naruCat.addEventListener('click', () => {
    showingHint = !showingHint;
    // restart bubble animation
    naruBubble.style.animation = 'none';
    void naruBubble.offsetWidth;
    naruBubble.style.animation = '';

    if (showingHint) {
        bubbleText.textContent = MSG_HINT;
        naruBubble.classList.add('hint');
    } else {
        bubbleText.textContent = MSG_INTRO;
        naruBubble.classList.remove('hint');
    }
});
