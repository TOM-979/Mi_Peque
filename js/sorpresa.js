// ===== Pétalos de fondo (hub de la sorpresa) =====
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
