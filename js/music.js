/*
 * Shared background music player.
 *
 * Each page calls startMusic('key') with the key for its track.
 * - Music continues from where it was (per-key) across navigations.
 * - A floating toggle button (bottom-right) lets the user pause/play.
 * - Autoplay is attempted on load and on the first user interaction
 *   (browsers block autoplay before the user touches anything).
 *
 * Drop your MP3s in the music/ folder with these exact names:
 *   music/menu.mp3      → para inicio y menu (la carta NO tiene música)
 *   music/album.mp3     → para nuestro album
 *   music/universo.mp3  → para mi universo
 *   music/razones.mp3   → para 100 + 1 razones
 */
(function () {
    const TRACKS = {
        menu:     'music/menu.mp3',
        album:    'music/album.mp3',
        universo: 'music/universo.mp3',
        razones:  'music/razones.mp3',
    };

    const DEFAULT_VOLUME = 0.4;

    // Inject the floating button styles once
    const style = document.createElement('style');
    style.textContent = `
        .music-toggle {
            position: fixed;
            bottom: 18px;
            right: 18px;
            width: 46px;
            height: 46px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            border: 1px solid rgba(255, 255, 255, 0.22);
            color: #fff;
            font-size: 20px;
            z-index: 9999;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.18s ease, background 0.2s ease;
            box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3);
        }
        .music-toggle:active { transform: scale(0.9); }
        .music-toggle.playing {
            background: rgba(255, 93, 150, 0.45);
            border-color: rgba(255, 200, 220, 0.5);
            animation: musicPulse 2.2s ease-in-out infinite;
        }
        @keyframes musicPulse {
            0%, 100% { box-shadow: 0 0 0 0 rgba(255, 93, 150, 0.55), 0 6px 18px rgba(0,0,0,0.3); }
            50%      { box-shadow: 0 0 0 10px rgba(255, 93, 150, 0), 0 6px 18px rgba(0,0,0,0.3); }
        }
    `;
    document.head.appendChild(style);

    window.startMusic = function startMusic(key) {
        const src = TRACKS[key];
        if (!src) {
            console.warn('startMusic: unknown key', key);
            return null;
        }

        const audio = new Audio(src);
        audio.loop = true;
        audio.volume = DEFAULT_VOLUME;
        audio.preload = 'auto';

        // === Persistence (per-key) ===
        const timeKey   = `music-${key}-time`;
        const pauseKey  = `music-${key}-paused`;
        const savedTime = parseFloat(sessionStorage.getItem(timeKey)) || 0;
        const wasPaused = sessionStorage.getItem(pauseKey) === 'true';

        audio.addEventListener('loadedmetadata', () => {
            if (savedTime > 0 && savedTime < audio.duration) {
                audio.currentTime = savedTime;
            }
        });

        // Save current time every second
        setInterval(() => {
            if (!isNaN(audio.currentTime)) {
                sessionStorage.setItem(timeKey, audio.currentTime.toFixed(2));
            }
        }, 1000);

        // Save state when leaving the page
        window.addEventListener('pagehide', () => {
            sessionStorage.setItem(timeKey, audio.currentTime.toFixed(2));
            sessionStorage.setItem(pauseKey, audio.paused ? 'true' : 'false');
        });

        // === Autoplay attempts ===
        function tryPlay() {
            if (!audio.paused) return;
            audio.play().catch(() => { /* blocked — wait for user interaction */ });
        }

        // Only auto-start if the user hadn't explicitly paused it on a prior page
        if (!wasPaused) {
            tryPlay();

            // Most browsers need user interaction first — retry on first touch/click
            const onFirstInteract = () => {
                tryPlay();
                document.removeEventListener('click',      onFirstInteract, true);
                document.removeEventListener('touchstart', onFirstInteract, true);
                document.removeEventListener('keydown',    onFirstInteract, true);
            };
            document.addEventListener('click',      onFirstInteract, true);
            document.addEventListener('touchstart', onFirstInteract, true);
            document.addEventListener('keydown',    onFirstInteract, true);
        }

        // === Toggle button ===
        const btn = document.createElement('button');
        btn.className = 'music-toggle';
        btn.setAttribute('aria-label', 'pausar/reproducir música');
        btn.type = 'button';
        document.body.appendChild(btn);

        function refresh() {
            btn.innerHTML = audio.paused ? '🔇' : '🎵';
            btn.classList.toggle('playing', !audio.paused);
        }

        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (audio.paused) {
                audio.play().catch(() => {});
            } else {
                audio.pause();
            }
            refresh();
        });

        audio.addEventListener('play',  refresh);
        audio.addEventListener('pause', refresh);
        audio.addEventListener('error', () => {
            console.warn('Music file missing:', src);
            btn.style.opacity = '0.4';
            btn.title = 'Música no disponible (falta el archivo)';
        });
        refresh();

        return audio;
    };
})();
