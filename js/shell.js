/*
 * SHELL MUSIC PLAYER  (corre solo en index.html)
 * ------------------------------------------------
 * La música vive aquí, en la página de arriba, que NUNCA se recarga.
 * Las secciones se cargan dentro del <iframe> y le piden una pista con
 * window.parent.shellSetTrack('clave'). Si la pista es la misma que ya
 * suena, no se hace nada → la música sigue sin cortarse. Solo cambia
 * cuando una sección pide una pista DISTINTA.
 *
 * También recordamos en qué sección estabas y el segundo de la canción,
 * para que un "refrescar" (F5) no te mande al inicio ni reinicie la música.
 *
 * Archivos esperados en music/:  menu.mp3  album.mp3  universo.mp3  razones.mp3
 */
(function () {
    const TRACKS = {
        menu:     'music/menu.mp3',
        album:    'music/album.mp3',
        universo: 'music/universo.mp3',
        razones:  'music/razones.mp3',
    };
    const VOLUME = 0.4;

    const audio = new Audio();
    audio.loop = true;
    audio.volume = VOLUME;
    audio.preload = 'auto';

    let currentKey = null;   // pista que suena ahora
    let unlocked   = false;  // ¿el usuario ya interactuó? (los navegadores bloquean autoplay)
    let duckResume = false;  // ¿hay que reanudar la música tras un video?

    const timeKey = (k) => 'mus-time-' + k;

    function play() { audio.play().catch(() => { /* bloqueado, espera gesto */ }); }

    // Guarda el segundo actual de la pista cada segundo (para sobrevivir a un refresh)
    setInterval(() => {
        if (currentKey && !isNaN(audio.currentTime)) {
            sessionStorage.setItem(timeKey(currentKey), audio.currentTime.toFixed(2));
        }
    }, 1000);

    // === API que usan las secciones (desde dentro del iframe) ===

    // Cambia de pista SOLO si es distinta. Misma pista => no corta nada.
    window.shellSetTrack = function (key) {
        const src = TRACKS[key];
        if (!src) return;                       // clave desconocida => deja lo que suena
        if (key === currentKey) {               // misma pista => seguir sin cortar
            if (unlocked) play();
            return;
        }
        currentKey = key;
        audio.src = src;
        const saved = parseFloat(sessionStorage.getItem(timeKey(key))) || 0;
        audio.onloadedmetadata = () => {
            if (saved > 0 && saved < audio.duration) audio.currentTime = saved;
        };
        audio.load();
        if (unlocked) play();
    };

    // El primer toque del usuario desbloquea el autoplay.
    window.shellUnlock = function () {
        unlocked = true;
        if (currentKey) play();
    };

    // Baja/pausa la música mientras suena un video, y la reanuda al terminar.
    window.shellDuck = function (on) {
        if (on) {
            duckResume = !audio.paused;
            audio.pause();
        } else if (duckResume) {
            play();
            duckResume = false;
        }
    };

    // === Navegación: recuerda la última sección para sobrevivir a un refresh ===
    const frame = document.getElementById('appFrame');

    // Al cargar el shell, si ya habías entrado, vuelve a donde estabas.
    const startPage = sessionStorage.getItem('shell-page') || 'lock.html';
    if (frame.getAttribute('src') !== startPage) {
        frame.setAttribute('src', startPage);
    }

    frame.addEventListener('load', () => {
        try {
            const path = frame.contentWindow.location.pathname;
            let file = path.substring(path.lastIndexOf('/') + 1);
            if (!file) file = 'lock.html';
            sessionStorage.setItem('shell-page', file);
        } catch (e) { /* cross-origin no debería pasar aquí */ }
        // pequeño fade-in de la nueva sección
        frame.classList.remove('fading');
    });

    if (audio.duration !== audio.duration) { /* noop, evita warnings */ }
})();
