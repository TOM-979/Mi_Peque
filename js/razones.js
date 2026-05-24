// ===== 100 razones para quedarme contigo =====
const RAZONES = [
    "Porque te conocí sin imaginar lo importante que te volverías para mí 💖",
    "Porque eres una gran chica 🌷",
    "Porque eres mi complemento desastroso y juntos somos un desastre total 🤍",
    "Porque, a pesar de todo, siempre te escogeré a ti 💍",
    "Porque eres la mamá de Naru bb 🐱",
    "Porque estuviste ahí cuando Spartakus se fue 🕊️",
    "Porque me apoyas cuando estoy bajoneado 🫂",
    "Porque eres mi peque 🥺",
    "Porque tienes las pestañas perfectas para mí ✨",
    "Porque cuando soy caos, tú eres calma 🌙",
    "Porque quiero ser el mejor chico para ti 🌹",
    "Porque somos el mejor dúo 🎮",
    "Porque me enseñaste a quererte bonito, como Luke quiere a Ashley 📖",
    "Porque eres la única persona que me regaló un peluchito 🧸",
    "Porque me regalaste la luna 🌙",
    "Porque fuiste y sigues siendo mi beso favorito 💋",
    "Porque eres mi niña 💕",
    "Porque me gustas incluso cuando estás \"bruja\" 😾",
    "Porque tus ojos cafés me encantan demasiado 🤎",
    "Porque eres bien bonita 🌷",
    "Porque cuando haces llamadas conmigo por horas nunca me aburro 📞",
    "Porque podría quedarme escuchándote toda la noche 🎧",
    "Porque me encanta jugar Minecraft contigo ⛏️",
    "Porque incluso construir cualquier cosita contigo se siente especial 🏡",
    "Porque jugar Roblox contigo siempre me termina alegrando el día 🎮",
    "Porque contigo hasta perder da risa 😂",
    "Porque ver cosas contigo en Rave se volvió uno de mis momentos favoritos 🎬",
    "Porque ver películas contigo se siente como estar abrazado aunque estemos lejos 🤍",
    "Porque ver <em>Boulevard</em> contigo fue especial para mí 🎞️",
    "Porque me encanta cuando me platicas tus sueños ✨",
    "Porque quiero estar ahí cuando cumplas cada uno de ellos 🌠",
    "Porque me imagino una niña con tus ojos cafés y tu sonrisa 👶🤎",
    "Porque me haces imaginar un futuro bonito 🏠",
    "Porque contigo aprendí que amar también es quedarse 🫶",
    "Porque me haces sentir querido 💌",
    "Porque me gusta cómo dices mi nombre 🎀",
    "Porque contigo puedo ser yo mismo 🌻",
    "Porque me haces sentir importante 💖",
    "Porque incluso tus enojos me parecen tiernos 😤💕",
    "Porque me encanta cuando te emocionas por cosas pequeñas 🌸",
    "Porque me gusta cuidarte aunque sea de lejitos 🫂",
    "Porque me preocupas de una manera bonita 🤍",
    "Porque quiero ser la luz en tu oscuridad ✨",
    "Porque me haces querer mejorar como persona 🌱",
    "Porque contigo aprendí a tener paciencia 🌷",
    "Porque me gusta pasar tiempo contigo aunque no hagamos nada 🕰️",
    "Porque tus mensajes alegran mis días 📱💕",
    "Porque extraño hasta tus berrinches 😭",
    "Porque tus \"te quiero\" se sienten reales 💞",
    "Porque contigo todo se siente más tranquilo 🌙",
    "Porque me haces sentir acompañado 🫂",
    "Porque incluso lejos sigues siendo mi lugar seguro 🏡",
    "Porque me gusta cuando hacemos llamada mientras jugamos 🎧🎮",
    "Porque me encanta escuchar tu risa cuando algo te da mucha gracia 😂💖",
    "Porque haces que mis días malos pesen menos ☁️",
    "Porque contigo quiero crear más recuerdos bonitos 📸",
    "Porque me gusta imaginar vacaciones contigo 🌴",
    "Porque quería jugar contigo cuando compre la play 🎮",
    "Porque quería llevarte a lugares bonitos que tenía pensados 🌆",
    "Porque quería tenerte cerquita en vacaciones 🥺",
    "Porque incluso peleando nunca dejo de quererte ❤️",
    "Porque siempre quiero arreglar las cosas contigo 🫶",
    "Porque me importa cómo te sientes 🌷",
    "Porque siempre pienso en si ya comiste o dormiste bien 🍜💤",
    "Porque me gusta saber de tu día ☀️",
    "Porque contigo hasta el silencio se siente bonito 🤍",
    "Porque me haces sentir paz 🌙",
    "Porque eres diferente a todas las personas que conocí ✨",
    "Porque me haces sonreír sin darte cuenta 😊",
    "Porque me gusta consentirte 🎀",
    "Porque me gusta cómo me cuentas tus cosas 🥺",
    "Porque contigo aprendí que el amor también son detalles pequeños 💌",
    "Porque me gusta cómo encajamos incluso siendo un desastre 🧩",
    "Porque me haces sentir afortunado 🍀",
    "Porque me haces querer intentarlo siempre 🌹",
    "Porque contigo incluso el tiempo pasa diferente ⏳",
    "Porque eres parte importante de mi vida 💖",
    "Porque me gusta cuando hacemos planes juntos 🗺️",
    "Porque quiero seguir creando recuerdos contigo 📸",
    "Porque quiero seguir viendo películas contigo hasta tarde 🌃",
    "Porque quiero seguir jugando contigo aunque seamos malos 😂🎮",
    "Porque me gusta escucharte feliz 🎶",
    "Porque quiero estar contigo en tus mejores y peores días 🤍",
    "Porque me gusta cuando me cuentas cosas personales 🫂",
    "Porque confiaste en mí 🔐",
    "Porque me haces sentir especial sin intentarlo 🌷",
    "Porque contigo aprendí a abrir mi corazón ❤️",
    "Porque incluso cuando dudas de ti, yo sigo viendo algo hermoso en ti ✨",
    "Porque me gusta hacerte sentir querida 💕",
    "Porque me gusta cuando te preocupas por mí 🥺",
    "Porque eres mi pensamiento favorito antes de dormir 🌙",
    "Porque me haces sentir vivo 🌻",
    "Porque contigo quiero crecer 🌱",
    "Porque quiero seguir aprendiendo a amarte en cada una de tus versiones 💞",
    "Porque incluso tus defectos me parecen especiales 🌸",
    "Porque me haces creer en algo bonito ✨",
    "Porque eres mi casualidad favorita 🍃",
    "Porque desde que llegaste mis días ya no se sienten iguales ☀️",
    "Porque simplemente eres tú 💖",
    "Porque desde que apareciste en mi vida, una parte de mí ya no sabe cómo existir sin ti 💌",
];

// ===== Build the list =====
const listEl = document.getElementById('razonesList');
RAZONES.forEach((text, i) => {
    const n = i + 1;
    const li = document.createElement('li');
    li.dataset.n = n;
    li.innerHTML = `
        <span class="num">${n}</span>
        <span class="text">${text}</span>
    `;
    listEl.appendChild(li);
});

// ===== Scroll-in fade animation + progress counter =====
const currentEl = document.getElementById('counterCurrent');
const counterEl = document.getElementById('razonesCounter');
let highestSeen = 0;

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Update progress counter if it's a reason
            const n = parseInt(entry.target.dataset.n);
            if (!isNaN(n) && n > highestSeen) {
                highestSeen = n;
                currentEl.textContent = n;
                counterEl.classList.remove('pulse');
                void counterEl.offsetWidth;
                counterEl.classList.add('pulse');
            }
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.razones-list li').forEach(li => observer.observe(li));

// Also observe the bonus card for its entrance animation
const bonus = document.querySelector('.bonus-reason');
if (bonus) observer.observe(bonus);
