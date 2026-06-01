/* ============================================================
 *  NUESTRA HISTORIA — línea de tiempo
 * ============================================================
 *
 *  👇👇  AQUÍ EDITAS LOS MOMENTOS  👇👇
 *
 *  Cada momento:
 *    fecha:  texto de la etiqueta (ej. '14 feb 2026' o 'El comienzo')
 *    titulo: título del recuerdo
 *    texto:  la descripción
 *    img:    foto de img/sorpresa/historia/  (déjalo en '' para no poner foto)
 *    final:  pon true SOLO en el último (le da el brillo especial)
 *
 *  ✨ Cuando me pases tus fotos, solo cambiamos el "img" de cada momento.
 */
const MOMENTOS = [
  {
    fecha: "El comienzo",
    titulo: "Cuando todo empezó",
    texto:
      "El día en que hablamos por primera vez. Aunque fuera de vez en cuando por Insta, me ignoraste como 3 semanas jajaja. A día de hoy lo recuerdo como un momento bien chistoso 💗",
    img: "img/sorpresa/historia/1Imagen.jpg",
  },
  {
    fecha: "Nuestras escapadas",
    titulo: "One kiss?",
    texto:
      "Mi parte favorita de la semana eran los sábados o domingos, cuando nos escapábamos para vernos. Planeábamos lo que queríamos hacer y al final terminábamos haciendo algo totalmente diferente jaja. ¿Cómo olvidar la primera salida? Fue sencilla y tranquila, pero ya con roces de algo más… Y la segunda, que por mucho fue la mejor: pasó de todo. Llegamos tarde, con chupetones y nuestro primer beso, con todo incluido: playa, paseo y los dos juntos. Un día que hasta ahora no supero 😄",
    img: "img/sorpresa/historia/2Imagen.jpg",
  },
  {
    fecha: "Las dinámicas",
    titulo: "Tocó armar legos",
    texto:
      "Cuando fuimos a armar legos y a pasar un día tranquilo… aunque un poco inquietante porque no sabíamos ni cómo armarlos jaja. Pero al final lo logramos y terminamos abrazados 💗",
    img: "img/sorpresa/historia/3Imagen.jpg",
  },
  {
    fecha: "Nosotros",
    titulo: "Momentos juntos",
    texto:
      "Cada ratito a tu lado: viendo algo en Rave, jugando Minecraft, Roblox, Free Fire o Stumble Guys, o en llamada por horas. Me encantan más que nada, porque al final del día la única persona con la que escucho, hablo y comparto eres tú, Luciana. Pequeñas cosas que lo son todo para mí. Eres importante 💞",
    img: "img/sorpresa/historia/4Imagen.jpg",
  },
  {
    fecha: "Más recuerdos",
    titulo: "Tú y yo",
    texto:
      "Mil momentos más que guardo en el corazón, y los que todavía nos faltan por vivir. Porque sé que la distancia no me impedirá quererte, serte leal y, sobre todo, esperar tu regreso. Lo bonito de todo esto es que tengo claro lo que quiero contigo, y me gustaría que tú también: que me pongas en tus planes de vida, que quieras pasar tiempo conmigo y mostrarme cosas nuevas. Somos diferentes, sí… pero eso no quita que podamos encontrar un punto medio y disfrutarlo juntos jajaja. Suena cursi, lo sé. Ojalá vuelvas pronto, que se quedaron en pausa varias salidas, sorpresas y momentos que tenía planeados ✨",
    img: "img/sorpresa/historia/5Imagen.jpg",
  },
  {
    fecha: "01 / 06 / 26",
    titulo: "Hoy 💗",
    texto:
      "Hoy te dejo esta sorpresa para recordarte que, aunque estés lejos, eres muy importante para mí. Te amo, mi peque. Cuídate, que aquí estaré esperándote para seguir escribiendo más páginas de nuestro libro ☀️🌙",
    img: "img/sorpresa/historia/Peque.jpg",
    final: true,
  },
];

/* ============================================================
 *  👆 FIN DE LO EDITABLE — abajo es la lógica
 * ============================================================ */

// ===== Pétalos de fondo =====
(function createPetals() {
  const layer = document.getElementById("petals");
  if (!layer) return;
  const symbols = ["🌸", "🌷", "💮", "🌺"];
  const count = window.innerWidth < 600 ? 16 : 26;
  for (let i = 0; i < count; i++) {
    const p = document.createElement("span");
    p.className = "petal";
    p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    p.style.fontSize = 12 + Math.random() * 18 + "px";
    p.style.left = Math.random() * 100 + "vw";
    p.style.animationDuration = 8 + Math.random() * 10 + "s";
    p.style.animationDelay = -Math.random() * 12 + "s";
    p.style.opacity = (0.5 + Math.random() * 0.4).toString();
    layer.appendChild(p);
  }
})();

// ===== Construir la línea de tiempo (solo fotos) =====
const timelineEl = document.getElementById("timeline");

MOMENTOS.forEach((m, i) => {
  const item = document.createElement("div");
  item.className =
    "tl-item" + (m.final ? " final" : "") + (i % 2 ? " right" : " left");

  let media = "";
  if (m.img) {
    media = `<div class="tl-media"><img src="${m.img}" alt="${m.titulo}"
                    onerror="this.parentNode.innerHTML='<span class=&quot;ph&quot;>💗</span>'"></div>`;
  }

  item.innerHTML = `
        <span class="tl-dot"></span>
        <div class="tl-card">
            ${media}
            <span class="tl-date">${m.fecha}</span>
            <h3>${m.titulo}</h3>
            <p>${m.texto}</p>
            <span class="tl-open">Toca para ver 👀</span>
        </div>`;
  item.querySelector(".tl-card").addEventListener("click", () => openDetail(m));
  timelineEl.appendChild(item);
});

// ===== Detalle: foto al 100% + texto debajo (la música sigue sonando) =====
const detail = document.getElementById("tlDetail");
const detailMedia = document.getElementById("detailMedia");
const detailImg = document.getElementById("detailImg");
const detailDate = document.getElementById("detailDate");
const detailTitle = document.getElementById("detailTitle");
const detailText = document.getElementById("detailText");
const detailBack = document.getElementById("detailBack");

function openDetail(m) {
  if (m.img) {
    detailMedia.hidden = false;
    detailImg.src = m.img;
    detailImg.alt = m.titulo;
    detailImg.onerror = () => {
      detailMedia.hidden = true;
    };
  } else {
    detailMedia.hidden = true;
  }
  detailDate.textContent = m.fecha;
  detailTitle.textContent = m.titulo;
  detailText.textContent = m.texto;
  detail.hidden = false;
  detail.scrollTop = 0;
  window.scrollTo(0, 0);
}

function closeDetail() {
  detail.hidden = true;
}

detailBack.addEventListener("click", closeDetail);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !detail.hidden) closeDetail();
});

// ===== Aparecer al hacer scroll =====
const items = timelineEl.querySelectorAll(".tl-item");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("show");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 },
  );
  items.forEach((it) => io.observe(it));
} else {
  items.forEach((it) => it.classList.add("show"));
}
