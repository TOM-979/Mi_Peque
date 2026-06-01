/*
 * CONECTOR DE MÚSICA POR PÁGINA (lo incluye cada sección dentro del iframe)
 * ------------------------------------------------------------------------
 * Cada sección llama a:  pageMusic('clave')
 *
 * - Si está dentro del shell (index.html con el iframe): le pide la pista al
 *   shell de arriba, que es quien reproduce la música sin cortes.
 * - Si abres la página suelta (doble clic directo): reproduce su propia
 *   música como respaldo, también sin botón de mute (música obligatoria).
 *
 * Además expone:  window.duckMusic(true/false)  para bajar la música
 * mientras suena un video y reanudarla al terminar.
 */
(function () {
    const TRACKS = {
        menu:     'music/menu.mp3',
        album:    'music/album.mp3',
        universo: 'music/universo.mp3',
        razones:  'music/razones.mp3',
    };

    function insideShell() {
        try {
            return window.parent !== window &&
                   typeof window.parent.shellSetTrack === 'function';
        } catch (e) { return false; }
    }

    window.pageMusic = function (key) {
        // --- Caso normal: dentro del shell ---
        if (insideShell()) {
            const shell = window.parent;
            shell.shellSetTrack(key);

            // El primer toque desbloquea el autoplay del shell.
            const unlock = () => {
                try { shell.shellUnlock(); } catch (e) {}
                document.removeEventListener('click',      unlock, true);
                document.removeEventListener('touchstart', unlock, true);
                document.removeEventListener('keydown',    unlock, true);
            };
            document.addEventListener('click',      unlock, true);
            document.addEventListener('touchstart', unlock, true);
            document.addEventListener('keydown',    unlock, true);

            window.duckMusic = (on) => { try { shell.shellDuck(on); } catch (e) {} };
            return;
        }

        // --- Respaldo: página abierta suelta (sin shell) ---
        const src = TRACKS[key];
        if (!src) { window.duckMusic = function () {}; return; }

        const audio = new Audio(src);
        audio.loop = true;
        audio.volume = 0.4;
        audio.preload = 'auto';
        const play = () => audio.play().catch(() => {});
        play();

        const unlock = () => {
            play();
            document.removeEventListener('click',      unlock, true);
            document.removeEventListener('touchstart', unlock, true);
            document.removeEventListener('keydown',    unlock, true);
        };
        document.addEventListener('click',      unlock, true);
        document.addEventListener('touchstart', unlock, true);
        document.addEventListener('keydown',    unlock, true);

        let resume = false;
        window.duckMusic = (on) => {
            if (on) { resume = !audio.paused; audio.pause(); }
            else if (resume) { play(); resume = false; }
        };
    };
})();
