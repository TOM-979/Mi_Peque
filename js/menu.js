(function createPetals() {
    const layer = document.getElementById('petals');
    if (!layer) return;
    const symbols = ['🌸', '🌷', '💮', '🌺'];
    const count = window.innerWidth < 600 ? 16 : 28;

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

// ===== Locked / surprise card =====
// La sorpresa se abre a partir del 01/06/2026. Antes de esa fecha muestra
// el modal "aún no"; desde esa fecha en adelante, lleva a sorpresa.html.
(function surpriseCard() {
    const lockedCard = document.getElementById('lockedCard');
    const backdrop   = document.getElementById('modalBackdrop');
    const closeBtn   = document.getElementById('modalClose');
    if (!lockedCard) return;

    const UNLOCK_DATE = new Date(2026, 5, 1); // 01 de junio de 2026 (mes 5 = junio)
    const unlocked = new Date() >= UNLOCK_DATE;

    if (unlocked) {
        // Ya está disponible: cambia el aspecto y abre la sorpresa.
        lockedCard.classList.add('unlocked-card');
        const sub = lockedCard.querySelector('.card-text p');
        if (sub) sub.innerHTML = '¡Ya está disponible, mi amor! Ábrela 🎁✨';
        lockedCard.addEventListener('click', () => {
            window.location.href = 'sorpresa.html';
        });
        return;
    }

    // Todavía bloqueada: modal romántico.
    if (!backdrop) return;
    const open  = () => { backdrop.hidden = false; };
    const close = () => { backdrop.hidden = true; };
    lockedCard.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);
    backdrop.addEventListener('click', (e) => { if (e.target === backdrop) close(); });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !backdrop.hidden) close();
    });
})();
