(function () {
    const envelope = document.getElementById('envelope');
    const openBtn  = document.getElementById('openEnvelope');
    const letter   = document.getElementById('letter');
    const closeBtn = document.getElementById('closeLetter');

    const page = document.querySelector('.carta-page');

    function openLetter() {
        envelope.classList.add('opening');
        setTimeout(() => {
            envelope.style.display = 'none';
            letter.hidden = false;
            page.classList.add('letter-open');
            // Always start reading from the top
            window.scrollTo({ top: 0, behavior: 'auto' });
        }, 500);
    }

    function closeLetter() {
        letter.hidden = true;
        envelope.style.display = '';
        envelope.classList.remove('opening');
        page.classList.remove('letter-open');
        window.scrollTo({ top: 0, behavior: 'auto' });
    }

    envelope.addEventListener('click', openLetter);
    openBtn.addEventListener('click', (e) => { e.stopPropagation(); openLetter(); });
    closeBtn.addEventListener('click', closeLetter);
})();
