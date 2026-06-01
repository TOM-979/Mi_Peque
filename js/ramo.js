// ===== Pétalos de fondo =====
(function createPetals() {
    const layer = document.getElementById('petals');
    if (!layer) return;
    const symbols = ['🌸', '🌷', '💮', '🌺'];
    const count = window.innerWidth < 600 ? 14 : 22;
    for (let i = 0; i < count; i++) {
        const p = document.createElement('span');
        p.className = 'petal';
        p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        p.style.fontSize = (12 + Math.random() * 18) + 'px';
        p.style.left = Math.random() * 100 + 'vw';
        p.style.animationDuration = (8 + Math.random() * 10) + 's';
        p.style.animationDelay = (-Math.random() * 12) + 's';
        p.style.opacity = (0.4 + Math.random() * 0.4).toString();
        layer.appendChild(p);
    }
})();

// ===== Destellos sobre la escena =====
(function createSparkles() {
    const layer = document.getElementById('growSparkles');
    if (!layer) return;
    const n = window.innerWidth < 600 ? 28 : 46;
    for (let i = 0; i < n; i++) {
        const s = document.createElement('span');
        s.className = 'gs';
        const size = 2 + Math.random() * 3;
        s.style.width = s.style.height = size + 'px';
        s.style.left = Math.random() * 100 + '%';
        s.style.top  = Math.random() * 100 + '%';
        s.style.animationDuration = (1.4 + Math.random() * 2.6) + 's';
        s.style.animationDelay = (-Math.random() * 4) + 's';
        layer.appendChild(s);
    }
})();

// ===== Reproducir la animación (y poder repetirla) =====
(function growControl() {
    const scene = document.getElementById('growScene');
    const btn   = document.getElementById('replayBtn');
    if (!scene) return;

    // arrancar al entrar
    scene.classList.add('playing');

    if (btn) {
        btn.addEventListener('click', () => {
            scene.classList.remove('playing');
            void scene.offsetWidth; // reinicia las animaciones
            scene.classList.add('playing');
        });
    }
})();
