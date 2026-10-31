/* ═══════════════════════════════════════════
   VISUAL QUEST — game.js
═══════════════════════════════════════════ */

/* ── CONFETTI ── */
const cc = document.getElementById('conf-canvas');
const cx = cc.getContext('2d');
let cp = [], cr = false;
const CC = ['#ffbe0b','#ff3f9a','#3a86ff','#06d6a0','#fb5607','#7b2d8b'];

function confetti(n = 70) {
  cc.width  = cc.offsetWidth  || 600;
  cc.height = cc.offsetHeight || 400;
  for (let i = 0; i < n; i++) {
    cp.push({
      x: Math.random() * cc.width,
      y: -10,
      w: Math.random() * 10 + 5,
      h: Math.random() * 7  + 4,
      c: CC[Math.floor(Math.random() * CC.length)],
      vx: (Math.random() - .5) * 5,
      vy:  Math.random() * 4 + 2,
      rot: Math.random() * 360,
      vr: (Math.random() - .5) * 9,
      life: 1,
    });
  }
  if (!cr) { cr = true; aC(); }
}

function aC() {
  cx.clearRect(0, 0, cc.width, cc.height);
  cp = cp.filter(p => p.life > 0);
  cp.forEach(p => {
    p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life -= .013;
    cx.save();
    cx.globalAlpha = p.life;
    cx.translate(p.x, p.y);
    cx.rotate(p.rot * Math.PI / 180);
    cx.fillStyle = p.c;
    cx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    cx.restore();
  });
  if (cp.length > 0) requestAnimationFrame(aC);
  else { cr = false; cx.clearRect(0, 0, cc.width, cc.height); }
}

/* ── DRAW HELPER ── */
function drawCanvas(canvasId, fn) {
  const c = document.getElementById(canvasId);
  if (!c) return;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, c.width, c.height);
  fn(ctx, c.width, c.height);
}

/* ══════════════════════════════════════════════════════════════
   LEVEL DATA
══════════════════════════════════════════════════════════════ */
const LEVELS = [

  /* ─── NIVEL 1: ESTUDIO DE ARTE ─── */
  {
    id: 1, title: 'NIVEL 1', sub: 'ESTUDIO DE ARTE',
    desc: 'Eres diseñador gráfico y acabas de recibir tus primeros trabajos.\n Tomá decisiones de color y composición.',
    steps: [
      {
        type: 'decision',
        who:  'CLIENTE 1 — Panadería "El Trigal"',
        msg:  'Necesito un cartel para mi panadería. Tiene que transmitir calor y apetito.',
        text: '¿Qué paleta de colores usarías para un cartel de panadería que transmita CALOR y APETITO?',
        choices: [
          { image: 'images/panaderia-colores-correcto.jpg', label: 'Paleta cálida', correct: true,
            tip: '¡Perfecto! Los colores cálidos (bordos, naranjas, marrones) estimulan el apetito y transmiten calor. Es la opción adecuada para una panadería.' },
          { image: 'images/panaderia-colores-no1.jpg', label: 'Paleta fría', correct: false,
            tip: 'Los colores fríos transmiten calma y distancia — no son ideales para alimentos. El azul incluso puede suprimir el apetito.' },
          { image: 'images/panaderia-colores-no2.jpg', label: 'Paleta neutra', correct: false,
            tip: 'El negro y el gris pueden ser elegantes, pero para una panadería no transmiten calidez ni apetito. Necesitas calor visual.' },
        ],
      },
      {
        type: 'canvas_show',
        who:  'CLIENTE 1 — Panadería "El Trigal"',
        msg:  '¡Mirá cómo quedaría el cartel con colores cálidos!',
        text: 'Observá el cartel: los colores cálidos atraen la mirada y dan ganas de entrar.',
        imageSrc: 'images/panaderia-correcto.jpg',
      },
      {
        type: 'decision',
        who:  'CLIENTE 2 — Estudio "Forma Libre"',
        msg:  'Quiero un logo para mi estudio de arte moderno. Estilo Bauhaus.',
        text: '¿Qué característica define al estilo BAUHAUS que deberías usar?',
        choices: [
          { label: 'Formas geométricas simples, colores primarios y función', correct: true,
            tip: '¡Exacto! La Bauhaus (1919) combinó arte + artesanía + industria. Su lema: "La forma sigue a la función". Triángulos, cuadrados y círculos en rojo, azul y amarillo.' },
          { label: 'Líneas curvas orgánicas inspiradas en flores', correct: false,
            tip: 'Eso describe el Art Nouveau (1890-1910), no la Bauhaus. El Art Nouveau ama las formas orgánicas de la naturaleza.' },
          { label: 'Imágenes de sueños y el inconsciente', correct: false,
            tip: 'Eso es el Surrealismo (Dalí, Magritte). La Bauhaus era racionalista y funcional, lo opuesto a lo onírico.' },
        ],
      },
      {
        type: 'canvas_show',
        who:  'CLIENTE 2 — Estudio "Forma Libre"',
        msg:  '¡Así se ve un diseño con identidad Bauhaus!',
        text: 'Formas geométricas puras + colores primarios = identidad Bauhaus.',
        imageSrc: 'images/bauhaus.jpg',
      },
      {
        type: 'decision',
        who:  'CLIENTE 3 — Revista Escolar "Pixel"',
        msg:  'Necesito una portada. Quiero que lo más importante se vea primero.',
        text: '¿Qué recurso usás para guiar la mirada hacia el elemento más importante?',
        choices: [
          { label: 'Hacerlo más grande y con mayor contraste de color', correct: true,
            tip: '¡Correcto! La JERARQUÍA VISUAL se logra con tamaño y contraste. El elemento dominante debe ser el más grande y el más contrastado. Así el ojo del lector va directo ahí.' },
          { label: 'Ponerlo perfectamente centrado y pequeño', correct: false,
            tip: 'Centrado no necesariamente significa importante. Un elemento pequeño en el centro puede perderse. La jerarquía necesita tamaño y contraste.' },
          { label: 'Pintarlo del mismo color que el fondo', correct: false,
            tip: 'Si usa el mismo color que el fondo, se confunde con él. El contraste es clave para destacar un elemento.' },
        ],
      },
      {
        type: 'canvas_show',
        who:  'RESULTADO DEL DÍA',
        msg:  '¡Completaste todos los encargos del estudio! Aplicaste teoría real.',
        text: 'Usaste: colores cálidos, estilo Bauhaus y jerarquía visual. ¡Eso es Comunicación Visual en acción!',
        drawFn: (ctx, W, H) => {
          const img = new Image();
          img.onload = () => {
            ctx.clearRect(0, 0, W, H);
            const ratio  = Math.max(W / img.width, H / img.height);
            const imageW = img.width  * ratio;
            const imageH = img.height * ratio;
            ctx.drawImage(img, (W - imageW) / 2, (H - imageH) / 2, imageW, imageH);
            ctx.fillStyle = 'rgba(20,18,16,.76)';
            ctx.fillRect(24, 28, W - 48, H - 56);
            ctx.textAlign   = 'center';
            ctx.shadowColor = 'rgba(0,0,0,.7)';
            ctx.shadowBlur  = 4;
            ctx.fillStyle   = '#d8b56b';
            ctx.font = 'bold 18px "Press Start 2P", monospace';
            ctx.fillText('ENCARGOS COMPLETADOS', W / 2, 76);
            ctx.fillStyle = '#fff';
            ctx.font = '13px "Press Start 2P", monospace';
            ctx.fillText('Paleta cálida para panadería', W / 2, 120);
            ctx.fillText('Estilo Bauhaus para estudio',  W / 2, 154);
            ctx.fillText('Jerarquía visual en portada',  W / 2, 188);
            ctx.font = 'bold 13px "Press Start 2P", monospace';
            ctx.fillText('¡Eres un diseñador!', W / 2, 240);
            ctx.shadowBlur = 0;
          };
          img.src = 'images/fin_nivel.png';
        },
      },
    ],
  },

  /* ─── NIVEL 2: MUSEO ─── */
  {
    id: 2, title: 'NIVEL 2', sub: 'CURADOR/A DE MUSEO',
    desc: 'Trabajas en un museo de arte moderno.\nDebés organizar las obras en las salas correctas\ny explicar cada movimiento artístico.',
    steps: [
      {
        type: 'narrative',
        who:  'MUSEO DE ARTE MODERNO',
        msg:  'Bienvenido/a. Tenés que organizar las obras antes de que abra el museo.',
        text: 'Vienen 4 obras. Tenés que ubicar cada una en la sala que le corresponde según su movimiento artístico.',
      },
      {
        type: 'museum',
        who:  'SALA DE CLASIFICACIÓN',
        msg:  'Primero: ubica estas obras en la sala que corresponde.',
        roomLabel: 'SALA DE CLASIFICACIÓN',
        artworks: [
          { image: 'images/pop_art.jpg',           name: 'Lata de sopa\n(Warhol, 1962)',                    style: 'Pop Art',       tip: 'La lata de sopa Campbell es un ícono del Pop Art y aparece como símbolo del consumo masivo.' },
          { image: 'images/surrealismo_dali.jpg',  name: 'La persistencia de la memoria\n(Dalí, 1931)',      style: 'Surrealismo',   tip: 'Dalí convierte objetos cotidianos en una imagen onírica con relojes blandos que se derriten.' },
          { image: 'images/impresionismo.jpg',     name: 'Cielo sobre el río Sena\n(Monet, 1903)',           style: 'Impresionismo', tip: 'Monet captura la luz del instante con pinceladas sueltas y colorido atmosférico.' },
          { image: 'images/cubismo.jpg',           name: 'Autorretrato\n(Picasso, 1907)',                    style: 'Cubismo',       tip: 'Picasso fragmenta la figura y presenta múltiples perspectivas en una sola composición.' },
        ],
        slots: [
          { label: 'SALA POP ART',      expects: 'Pop Art' },
          { label: 'SALA SURREALISMO',  expects: 'Surrealismo' },
          { label: 'SALA IMPRESIONISMO',expects: 'Impresionismo' },
          { label: 'SALA CUBISMO',      expects: 'Cubismo' },
        ],
      },
      {
        type: 'decision',
        who:  'VISITANTE CURIOSA',
        msg:  'Disculpá, ¿me podés explicar qué distingue al Impresionismo?',
        text: 'Como curador/a, ¿cómo explicás el Impresionismo?',
        choices: [
          { label: 'Captura la luz y el momento — pinceladas sueltas, al aire libre', correct: true,
            tip: '¡Bien explicado! Los impresionistas (Monet, Renoir, Degas) rechazaron la pintura académica. Salieron a pintar la naturaleza con pinceladas rápidas para capturar la "impresión" del momento.' },
          { label: 'Usa formas geométricas para descomponer la realidad', correct: false,
            tip: 'Eso describe al Cubismo (Picasso, Braque). El Impresionismo conserva las formas pero las "disuelve" con la luz.' },
          { label: 'Representa el mundo de los sueños y el inconsciente', correct: false,
            tip: 'Eso es el Surrealismo. El Impresionismo se basaba en la observación directa de la naturaleza y la luz real.' },
        ],
      },
      {
        type: 'museum',
        who:  'SEGUNDA TANDA DE OBRAS',
        msg:  'Llegaron dos obras más. Clasificalas correctamente.',
        roomLabel: 'SALA C: CUBISMO | SALA D: ART NOUVEAU',
        artworks: [
          { image: 'images/cubismo2.jpg',   name: 'Las señoritas de Avignon\n(Picasso, 1907)', style: 'Cubismo',     tip: 'Picasso fragmentó las figuras en formas geométricas vistas desde múltiples ángulos simultáneos. Nace el Cubismo.' },
          { image: 'images/artnoveau.jpg',  name: 'El beso\n(Klimt, 1908)',                    style: 'Art Nouveau', tip: 'Klimt fusionó líneas orgánicas, ornamentación y un intenso simbolismo decorativo propio del Art Nouveau.' },
        ],
        slots: [
          { label: 'SALA C\nCUBISMO',      expects: 'Cubismo' },
          { label: 'SALA D\nART NOUVEAU',  expects: 'Art Nouveau' },
        ],
      },
      {
        type: 'decision',
        who:  'GUÍA DEL MUSEO',
        msg:  'Una visitante mezcla dos conceptos. Ayudala a diferenciarlos.',
        text: '¿Qué relación es correcta?',
        choices: [
          { label: 'Cubismo → múltiples perspectivas en un mismo plano', correct: true,
            tip: 'El Cubismo rompe con la perspectiva tradicional y representa simultáneamente distintos puntos de vista.' },
          { label: 'Impresionismo → figuras geométricas rígidas como principio central', correct: false,
            tip: 'La geometría rígida se asocia más directamente con otros movimientos. El Impresionismo se interesa especialmente por la luz y el instante.' },
          { label: 'Pop Art → rechazo de imágenes de la cultura de masas', correct: false,
            tip: 'El Pop Art tomó imágenes y objetos de la cultura de masas y los convirtió en material artístico.' },
          { label: 'Art Nouveau → eliminación de formas vegetales y ornamentación', correct: false,
            tip: 'El Art Nouveau se caracteriza justamente por líneas curvas y motivos vegetales y ornamentales.' },
        ],
      },
      {
        type: 'decision',
        who:  'ESTUDIANTE EN VISITA',
        msg:  '¿Qué tienen en común todas estas vanguardias artísticas?',
        text: 'Como curador/a experto/a, ¿cuál es la respuesta más completa?',
        choices: [
          { label: 'Todas rompieron con las reglas del arte académico tradicional de su época', correct: true,
            tip: '¡Exacto! Las vanguardias (del francés "avant-garde" = guardia avanzada) fueron movimientos que se rebelaron contra el arte tradicional. Cada uno propuso una visión nueva del mundo.' },
          { label: 'Todas usaron los mismos colores y técnicas', correct: false,
            tip: 'No — cada vanguardia tiene su propia paleta y técnica. El Impresionismo usa colores naturales con pinceladas sueltas; el Cubismo usa formas geométricas; el Pop Art usa colores planos y brillantes.' },
          { label: 'Todas surgieron exactamente en el mismo año', correct: false,
            tip: 'Las vanguardias abarcaron casi un siglo: Impresionismo (1860s), Art Nouveau (1890), Cubismo (1907), Bauhaus (1919), Surrealismo (1924), Pop Art (1960s).' },
        ],
      },
      {
        type: 'narrative',
        who:  'DIRECCIÓN DEL MUSEO',
        msg:  '¡El museo está listo! Organizaste todas las obras correctamente.',
        text: 'Clasificaste obras de Impresionismo, Pop Art, Cubismo y Art Nouveau. ¡Sos un/a curador/a excelente!',
      },
    ],
  },

  /* ─── NIVEL 3: AVENTURA VISUAL ─── */
  {
    id: 3, title: 'NIVEL 3', sub: 'AVENTURA VISUAL',
    desc: 'Sos un/a artista viajando por el tiempo.\nVisitás distintos momentos históricos del arte\ny debés tomar decisiones que afectan tu obra.',
    steps: [
      {
        type: 'narrative',
        who:  'MÁQUINA DEL TIEMPO ARTÍSTICA',
        msg:  '¡Activada! Primera parada: Paris, 1907. El taller de Pablo Picasso.',
        text: 'Estás en el momento en que nace el Cubismo. Picasso te muestra dos versiones de su obra.',
      },
      {
        type: 'canvas_choice',
        who:  'PABLO PICASSO — Paris, 1907',
        msg:  '¿Cuál de estas obras refleja mejor la idea cubista de "ver todo a la vez"?',
        text: 'Elegí la obra que muestra múltiples perspectivas simultáneas:',
        drawOptions: [
          {
            label: 'Opción A', correct: true, image: 'images/cubismo3.jpg',
            drawFn: (ctx, W, H) => {
              const img = new Image();
              img.src = 'images/cubismo3.jpg';
              img.onload = () => {
                const ratio = Math.min((W - 30) / img.width, (H - 50) / img.height);
                const iw = img.width * ratio, ih = img.height * ratio;
                ctx.clearRect(0, 0, W, H);
                ctx.fillStyle = '#f0ead6'; ctx.fillRect(0, 0, W, H);
                ctx.drawImage(img, (W - iw) / 2, (H - ih) / 2, iw, ih);
              };
            },
          },
          {
            label: 'Opción B', correct: false, image: 'images/NoCubismo.jpg',
            drawFn: (ctx, W, H) => {
              const img = new Image();
              img.src = 'images/NoCubismo.jpg';
              img.onload = () => {
                const ratio = Math.min((W - 30) / img.width, (H - 50) / img.height);
                const iw = img.width * ratio, ih = img.height * ratio;
                ctx.clearRect(0, 0, W, H);
                ctx.fillStyle = '#f0ead6'; ctx.fillRect(0, 0, W, H);
                ctx.drawImage(img, (W - iw) / 2, (H - ih) / 2, iw, ih);
              };
            },
          },
        ],
        tip: 'El Cubismo muestra un objeto desde múltiples ángulos a la vez en el mismo plano. Rompe con la perspectiva tradicional de un solo punto de vista.',
      },
      {
        type: 'decision',
        who:  'SALVADOR DALÍ — España, 1931',
        msg:  'Estoy pintando mis relojes blandos. Quiero que el espectador sienta que el tiempo es flexible.',
        text: '¿Qué recurso visual usaría Dalí para transmitir esa sensación onírica?',
        choices: [
          { label: 'Objetos cotidianos en situaciones imposibles y paisajes de sueño', correct: true,
            tip: '¡Correcto! El Surrealismo toma objetos reales y los pone en contextos imposibles. Los relojes blandos de Dalí existen en el mundo real pero se comportan como en un sueño. Freud fue su gran inspiración.' },
          { label: 'Geometría perfecta y proporciones matemáticas exactas', correct: false,
            tip: 'Eso sería más afín a la Bauhaus o el Cubismo analítico. El Surrealismo huye de la razón y la perfección.' },
          { label: 'Colores puros primarios en formas simples', correct: false,
            tip: 'Eso describe más al estilo Bauhaus o al Neoplasticismo de Mondrian. El Surrealismo usa colores realistas en contextos irreales.' },
        ],
      },
      {
        type: 'canvas_show',
        who:  'RESUMEN DEL VIAJE EN EL TIEMPO',
        msg:  'Visitaste el Cubismo y el Surrealismo. Mirá cómo se diferencian visualmente.',
        text: 'Cada movimiento tiene una "firma visual" reconocible.',
        drawFn: (ctx, W, H) => {
          const cubo    = new Image();
          const surreal = new Image();
          ctx.clearRect(0, 0, W, H);
          ctx.fillStyle = '#f8f4e8'; ctx.fillRect(0, 0, W, H);
          ctx.fillStyle = '#111'; ctx.font = 'bold 10px monospace'; ctx.textAlign = 'center';
          ctx.fillText('CUBISMO',     W / 4,     20);
          ctx.fillText('SURREALISMO', W * 3 / 4, 20);
          cubo.onload = () => {
            const ratio = Math.min((W / 2 - 50) / cubo.width, (H - 60) / cubo.height);
            const iw = cubo.width * ratio, ih = cubo.height * ratio;
            ctx.drawImage(cubo, W / 4 - iw / 2, 30 + (H - 30 - ih) / 2, iw, ih);
            ctx.strokeStyle = '#111'; ctx.lineWidth = 2;
            ctx.strokeRect(15, 28, W / 2 - 25, H - 42);
          };
          surreal.onload = () => {
            const ratio = Math.min((W / 2 - 50) / surreal.width, (H - 60) / surreal.height);
            const iw = surreal.width * ratio, ih = surreal.height * ratio;
            ctx.drawImage(surreal, W * 3 / 4 - iw / 2, 30 + (H - 30 - ih) / 2, iw, ih);
            ctx.strokeStyle = '#111'; ctx.lineWidth = 2;
            ctx.strokeRect(W / 2 + 15, 28, W / 2 - 25, H - 42);
          };
          cubo.src    = 'images/cubismo4.jpg';
          surreal.src = 'images/surrealismo2.jpg';
        },
      },
      {
        type: 'decision',
        who:  'TU PROPIA OBRA — El regreso',
        msg:  'Volviste al presente. Ahora vas a crear tu propia obra. Usás el círculo cromático.',
        text: 'Para crear ARMONÍA en tu composición, ¿qué colores elegiría el círculo cromático?',
        choices: [
          { label: 'Colores análogos — vecinos en el círculo', correct: true,
            tip: '¡Muy bien! Los colores análogos (vecinos en el círculo cromático) crean armonía natural. Por ejemplo: rojo, naranja y amarillo. Son agradables a la vista porque tienen temperatura y tono similares.' },
          { label: 'Rojo y verde — para máximo contraste', correct: false,
            tip: 'Rojo y verde son complementarios — opuestos en el círculo. Generan CONTRASTE, no armonía. Son válidos para destacar pero pueden ser agresivos visualmente si se usan en exceso.' },
          { label: 'Solo negro y blanco — por seguridad', correct: false,
            tip: 'El negro y el blanco son neutros — no crean armonía cromática sino contraste tonal. Son muy útiles, pero la armonía del color viene de la relación entre colores.' },
        ],
      },
      {
        type: 'canvas_show',
        who:  '¡AVENTURA COMPLETA!',
        msg:  'Viajaste por el tiempo y el arte. Ahora conocés los grandes movimientos.',
        text: 'Cubismo · Surrealismo · Círculo cromático · Armonía visual',
        drawFn: (ctx, W, H) => {
          const g = ctx.createLinearGradient(0, 0, W, H);
          g.addColorStop(0,   '#f6c98b');
          g.addColorStop(.5,  '#e5e1db');
          g.addColorStop(1,   '#d7e3f5');
          ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
          ctx.fillStyle = 'rgba(14,13,12,.82)'; ctx.fillRect(0, 0, W, H);
          ctx.textAlign = 'center';
          ctx.fillStyle = '#d8b56b';
          ctx.font = 'bold 16px "Press Start 2P", monospace';
          ctx.fillText('VIAJE EN EL TIEMPO COMPLETADO', W / 2, 58);
          ctx.fillStyle = '#fff';
          ctx.font = '13px "Press Start 2P", monospace';
          ctx.fillText('Cubismo — perspectivas múltiples',          W / 2, 112);
          ctx.fillText('Surrealismo — lo imposible posible',        W / 2, 148);
          ctx.fillText('Armonía cromática — colores análogos',      W / 2, 184);
          ctx.font = 'bold 13px "Press Start 2P", monospace';
          ctx.fillText('¡Eres un artista viajero en el tiempo!',    W / 2, 244);
        },
      },
    ],
  },
];

/* ══════════════════════════════════════════════════════════════
   STATE
══════════════════════════════════════════════════════════════ */
let lvlIdx = 0, stepIdx = 0, score = 0, lives = 3,
    combo = 1, answered = false, stepCount = 0;

const scoreEl = document.getElementById('s-score');
const comboEl = document.getElementById('s-combo');
const livesEl = document.getElementById('lives-row');
const pfill   = document.getElementById('prog-fill');
const plbl    = document.getElementById('prog-lbl');
const musicToggle = document.getElementById('music-toggle');

let musicAudio = null,
    musicOn = false, musicChoiceMade = false;
let soundContext = null;

/* ── AUDIO ── */
function playSoundEffect(effect) {
  const Ctor = window.AudioContext || window.webkitAudioContext;
  if (!Ctor) {
    console.warn('Audio no disponible para los efectos de sonido.');
    return;
  }
  if (!soundContext) soundContext = new Ctor();

  const patterns = {
    correct:   [523.25, 659.25, 783.99],
    incorrect: [293.66, 220],
    level:     [392, 523.25, 659.25, 783.99],
    lose:      [392, 349.23, 311.13, 261.63],
  };
  const notes = patterns[effect];
  const interval = effect === 'level' ? .14 : .1;

  const play = () => {
    notes.forEach((frequency, index) => {
      const start = soundContext.currentTime + index * interval;
      const oscillator = soundContext.createOscillator();
      const gain = soundContext.createGain();
      oscillator.type = effect === 'incorrect' || effect === 'lose' ? 'triangle' : 'sine';
      oscillator.frequency.setValueAtTime(frequency, start);
      gain.gain.setValueAtTime(.0001, start);
      gain.gain.exponentialRampToValueAtTime(.12, start + .015);
      gain.gain.exponentialRampToValueAtTime(.0001, start + .12);
      oscillator.connect(gain);
      gain.connect(soundContext.destination);
      oscillator.start(start);
      oscillator.stop(start + .13);
    });
  };

  if (soundContext.state === 'suspended') {
    soundContext.resume().then(play).catch(error => {
      console.error('No se pudo reproducir el efecto de sonido.', error);
    });
  } else {
    play();
  }
}

function updateMusicControl() {
  const label = musicOn ? 'Silenciar música' : 'Activar música';
  musicToggle.setAttribute('aria-label',  label);
  musicToggle.setAttribute('aria-pressed', String(musicOn));
  musicToggle.title = label;
}

function startMusic() {
  if (!musicAudio) {
    musicAudio = new Audio('Musica/Musica_Comunicación_Visual.mp3');
    musicAudio.loop = true;
    musicAudio.volume = 0.3;
  }

  if (musicOn) return;
  musicOn = true;
  musicAudio.currentTime = 5;
  musicAudio.play().catch(() => {
    musicOn = false;
    updateMusicControl();
  });
  updateMusicControl();
}

function stopMusic() {
  musicOn = false;
  if (musicAudio) {
    musicAudio.pause();
    musicAudio.currentTime = 0;
  }
  updateMusicControl();
}

function toggleMusic() {
  musicChoiceMade = true;
  if (musicOn) stopMusic(); else startMusic();
}

/* ── HUD ── */
function updHUD() {
  scoreEl.textContent = score;
  comboEl.textContent = 'x' + combo;
  livesEl.textContent = 'VIDAS ' + lives;
  const lv = LEVELS[lvlIdx];
  if (!lv) return;
  const total = lv.steps.length;
  const pct   = Math.round((stepIdx / total) * 100);
  pfill.style.width = pct + '%';
  plbl.textContent  = lv.sub + ' · Paso ' + (stepIdx + 1) + '/' + total;
}

/* ══════════════════════════════════════════════════════════════
   SCREENS
══════════════════════════════════════════════════════════════ */
const SCRIDS = ['sc-start','sc-intro','sc-clear','sc-win','sc-over'];

function showScr(id) {
  SCRIDS.forEach(s => document.getElementById(s).classList.remove('on'));
  document.getElementById('sim').classList.remove('on');
  setSceneClass(id);
  if (id === 'sim') document.getElementById('sim').classList.add('on');
  else document.getElementById(id)?.classList.add('on');
}

function setSceneClass(screenId) {
  const panel = document.getElementById('panel');
  panel.classList.remove('screen-start','screen-finish','level-1','level-2','level-3');
  if (screenId === 'sc-start') panel.classList.add('screen-start');
  else if (screenId === 'sc-win' || (screenId === 'sc-clear' && lvlIdx === LEVELS.length - 1))
    panel.classList.add('screen-finish');
  else panel.classList.add('level-' + (lvlIdx + 1));
}

/* ══════════════════════════════════════════════════════════════
   GAME FLOW
══════════════════════════════════════════════════════════════ */
function startGame() {
  if (!musicChoiceMade) startMusic();
  score = 0; lives = 3; combo = 1; answered = false; lvlIdx = 0; stepIdx = 0;
  updHUD();
  showLevelIntro();
}

function showLevelIntro() {
  setSceneClass();
  const lv = LEVELS[lvlIdx];
  document.getElementById('li-e').textContent    = lv.title || ('NIVEL ' + lv.id);
  document.getElementById('li-sub').textContent  = lv.sub   || '';
  document.getElementById('li-desc').textContent = lv.desc  ? lv.desc.replace(/\n/g,' ') : 'Prepará la siguiente prueba visual.';
  showScr('sc-intro');
}

function beginLevel() { setSceneClass(); stepIdx = 0; updHUD(); showScr('sim'); renderStep(); }

function nextStep() {
  stepIdx++;
  if (stepIdx >= LEVELS[lvlIdx].steps.length) levelClear();
  else renderStep();
}

/* ══════════════════════════════════════════════════════════════
   RENDER STEP
══════════════════════════════════════════════════════════════ */
function resetSim() {
  answered = false;
  document.getElementById('fb').className = '';
  document.getElementById('fb').style.display       = 'none';
  document.getElementById('nxt-btn').style.display  = 'none';
  document.getElementById('decisions').style.display = 'none';
  document.getElementById('decisions').innerHTML    = '';
  document.getElementById('museum-zone').style.display = 'none';
  document.getElementById('museum-zone').innerHTML  = '';
  document.getElementById('art-preview').style.display = 'none';
  updHUD();
}

function renderStep() {
  resetSim();
  const step = LEVELS[lvlIdx].steps[stepIdx];

  document.getElementById('scene-who').textContent = step.who  || '';
  document.getElementById('scene-msg').textContent = step.msg  || '';
  document.getElementById('narr-text').textContent = step.text || '';

  if (step.type === 'narrative') {
    setTimeout(() => { document.getElementById('nxt-btn').style.display = 'block'; }, 400);

  } else if (step.type === 'decision') {
    renderDecision(step);

  } else if (step.type === 'canvas_show') {
    const cv = document.getElementById('art-preview');
    cv.style.display = 'block';
    if (step.imageSrc) {
      const img = new Image();
      img.onload = () => {
        const targetW = 620, targetH = 360;
        cv.width = targetW; cv.height = targetH;
        const ctx   = cv.getContext('2d');
        const ratio = Math.min(targetW / img.width, targetH / img.height);
        const w = img.width * ratio, h = img.height * ratio;
        ctx.fillStyle = '#f8f4e8'; ctx.fillRect(0, 0, targetW, targetH);
        ctx.drawImage(img, (targetW - w) / 2, (targetH - h) / 2, w, h);
      };
      img.src = step.imageSrc;
    } else {
      cv.width = 620; cv.height = 300;
      drawCanvas('art-preview', step.drawFn);
    }
    setTimeout(() => { document.getElementById('nxt-btn').style.display = 'block'; }, 400);

  } else if (step.type === 'canvas_choice') {
    renderCanvasChoice(step);

  } else if (step.type === 'museum') {
    renderMuseum(step);
  }
}

/* ── DECISION ── */
function renderDecision(step) {
  const box   = document.getElementById('decisions');
  box.style.display = 'grid';
  const mixed = shuffle(step.choices.map(c => ({ ...c })));
  box.innerHTML = '';
  const hasImages = mixed.some(c => c.image);
  mixed.forEach(c => {
    const btn = document.createElement('button');
    btn.type  = 'button';
    if (hasImages) {
      btn.className = 'dec dec-image';
      btn.innerHTML = `<img src="${c.image}" alt="${c.label}"><div class="dec-caption">${c.label}</div>`;
    } else {
      btn.className   = 'dec';
      btn.textContent = c.label;
    }
    btn.addEventListener('click', () => resolveDecision(btn, c.correct, c.tip));
    box.appendChild(btn);
  });
}

function resolveDecision(btn, ok, tip) {
  if (answered) return;
  answered = true;
  document.querySelectorAll('.dec').forEach(b => b.disabled = true);
  btn.classList.add(ok ? 'ok' : 'no');
  resolve(ok, tip);
}

/* ── CANVAS CHOICE ── */
function renderCanvasChoice(step) {
  const box  = document.getElementById('decisions');
  box.style.display = 'grid';
  box.innerHTML = '';
  shuffle(step.drawOptions.map(o => ({ ...o }))).forEach(o => {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:10px';
    const cv   = document.createElement('canvas');
    cv.width   = 360; cv.height = 260;
    cv.style.cssText = 'border-radius:12px;border:3px solid #e0c840;cursor:pointer;max-width:100%;width:100%;height:auto;display:block';
    cv.style.transition = 'transform .15s,border-color .15s';
    o.drawFn(cv.getContext('2d'), 360, 260);
    const lbl = document.createElement('div');
    lbl.style.cssText  = 'font-family:Press Start 2P,monospace;font-size:9px;color:var(--dark)';
    lbl.textContent    = o.label;
    cv.onclick         = () => resolveCanvasChoice(cv, o.correct, step.tip);
    cv.onmouseenter    = () => { if (!answered) cv.style.transform = 'scale(1.04)'; };
    cv.onmouseleave    = () => { cv.style.transform = 'scale(1)'; };
    wrap.appendChild(cv); wrap.appendChild(lbl);
    box.appendChild(wrap);
  });
}

function resolveCanvasChoice(el, ok, tip) {
  if (answered) return;
  answered = true;
  document.querySelectorAll('#decisions canvas').forEach(c => c.onclick = null);
  el.style.borderColor = ok ? 'var(--green)' : 'var(--red)';
  resolve(ok, tip);
}

/* ── MUSEUM ── */
let museumState = {};

function renderMuseum(step) {
  const box = document.getElementById('museum-zone');
  box.style.display = 'flex';
  box.innerHTML = `
    <div class="room-title">${step.roomLabel}</div>
    <div style="font-size:10px;color:#484743;text-align:center;margin-top:2px">
      Arrastrá cada obra hasta la sala correcta. En celular, tocá una obra y luego una sala.</div>
    <div id="art-cards"></div>
    <div id="room-slots"></div>`;

  const shuffledArtworks = shuffle([...step.artworks]);
  const shuffledSlots    = shuffle([...step.slots]);
  museumState = { selected: null, placed: 0, total: shuffledArtworks.length, allOk: true, used: new Set(), mistakes: 0 };

  const cardsBox = document.getElementById('art-cards');
  const slotsBox = document.getElementById('room-slots');

  shuffledArtworks.forEach(art => {
    const originalIndex = step.artworks.indexOf(art);
    const card = document.createElement('div');
    card.className  = 'art-card';
    card.draggable  = true;
    card.dataset.idx   = String(originalIndex);
    card.dataset.style = art.style;
    card.innerHTML = `${art.image ? `<img class="art-thumb" src="${art.image}" alt="${art.name.replace(/\n/g,' ')}">` : '<span class="art-name">OBRA</span>'}
      <div class="art-name">${art.name.replace(/\n/g,'<br>')}</div>
      <div class="art-move">Arrastrar → sala</div>`;

    card.addEventListener('dragstart', e => {
      if (answered || card.classList.contains('placed-ok')) { e.preventDefault(); return; }
      museumState.selected = card;
      card.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', String(originalIndex));
    });
    card.addEventListener('dragend', () => {
      card.classList.remove('dragging');
      document.querySelectorAll('.room-slot').forEach(s => s.classList.remove('drag-over'));
    });
    card.addEventListener('click', () => {
      if (answered || card.classList.contains('placed-ok')) return;
      selectArtCard(card);
    });
    cardsBox.appendChild(card);
  });

  shuffledSlots.forEach(slot => {
    const s = document.createElement('div');
    s.className    = 'room-slot';
    s.dataset.expects = slot.expects;
    s.innerHTML    = `<div class="slot-lbl">${slot.label.replace(/\n/g,'<br>')}</div>`;
    s.addEventListener('dragover', e => {
      if (answered || !museumState.selected) return;
      e.preventDefault(); e.dataTransfer.dropEffect = 'move';
      s.classList.add('drag-over');
    });
    s.addEventListener('dragleave', () => s.classList.remove('drag-over'));
    s.addEventListener('drop', e => {
      e.preventDefault(); s.classList.remove('drag-over');
      if (answered) return;
      const idx  = Number(e.dataTransfer.getData('text/plain'));
      const card = document.querySelector(`.art-card[data-idx="${idx}"]`);
      if (card) placeInSlot(s, step, card);
    });
    s.addEventListener('click', () => { if (!answered) placeInSlot(s, step, museumState.selected); });
    slotsBox.appendChild(s);
  });
}

function selectArtCard(card) {
  if (!card || answered || card.classList.contains('placed-ok')) return;
  document.querySelectorAll('.art-card').forEach(c => c.classList.remove('selected'));
  museumState.selected = card;
  card.classList.add('selected');
}

function placeInSlot(slot, step, card) {
  if (!slot || !card || answered || card.classList.contains('placed-ok')) return;
  const cardStyle = card.dataset.style;
  const expects   = slot.dataset.expects;
  const ok        = cardStyle === expects;
  const art       = step.artworks[parseInt(card.dataset.idx)];

  card.classList.remove('selected');
  museumState.selected = null;

  if (!ok) {
    playSoundEffect('incorrect');
    museumState.mistakes++;
    museumState.allOk = false;
    combo = 1; lives--;
    updHUD();
    card.classList.add('placed-no');
    slot.classList.add('wrong-slot');
    showTemporarySlotMessage(slot, step, expects, 'NO CORRESPONDE');
    setTimeout(() => {
      card.classList.remove('placed-no');
      slot.classList.remove('wrong-slot');
      if (!answered)
        slot.innerHTML = `<div class="slot-lbl">${step.slots.find(s => s.expects === expects).label.replace(/\n/g,'<br>')}</div>`;
    }, 800);
    if (lives <= 0) { setTimeout(gameOver, 900); }
    return;
  }

  slot.classList.remove('wrong-slot');
  card.classList.add('placed-ok');
  card.draggable = false;
  slot.classList.add('has-card');
  const slotLabel  = step.slots.find(s => s.expects === expects).label.replace(/\n/g,'<br>');
  const artMarkup  = art.image
    ? `<img class="slot-art" src="${art.image}" alt="${art.name.replace(/\n/g,' ')}"><div class="slot-caption">${art.name.replace(/\n/g,'<br>')}</div>`
    : `<div style="font-size:24px">${art.e}</div><div style="font-size:9px;color:#315f4f">✓ Obra colocada</div>`;
  slot.innerHTML   = `<div class="slot-lbl">${slotLabel}</div>${artMarkup}`;
  museumState.placed++;
  if (museumState.placed >= museumState.total) {
    answered = true;
    resolve(true, step.artworks.map(a => a.tip).join(' | '));
  }
}

function showTemporarySlotMessage(slot, step, expects, msg) {
  const original = `<div class="slot-lbl">${step.slots.find(s => s.expects === expects).label.replace(/\n/g,'<br>')}</div>`;
  slot.innerHTML  = original + `<div style="font-size:20px">${msg}</div>`;
  setTimeout(() => {
    if (!answered) { slot.classList.remove('wrong-slot'); slot.innerHTML = original; }
  }, 800);
}

/* ── RESOLVE ── */
function resolve(ok, tip) {
  if (ok) {
    playSoundEffect('correct');
    const pts = 10 * combo; score += pts; combo = Math.min(combo + 1, 5);
    showFB('ok', '¡CORRECTO! +' + pts + ' PTS', tip);
    confetti();
  } else {
    playSoundEffect('incorrect');
    lives--; combo = 1;
    showFB('no', '¡INCORRECTO!', tip);
    if (lives <= 0) { updHUD(); setTimeout(gameOver, 1400); return; }
  }
  updHUD();
}

function showFB(cls, msg, tip) {
  const fb = document.getElementById('fb');
  fb.className    = cls;
  fb.style.display = 'block';
  fb.innerHTML    = msg + (tip ? `<span class="tip"> ${tip}</span>` : '');
  document.getElementById('nxt-btn').style.display = 'block';
  const lv = LEVELS[lvlIdx];
  document.getElementById('nxt-btn').textContent =
    stepIdx + 1 < lv.steps.length ? 'SIGUIENTE' :
    lvlIdx < LEVELS.length - 1    ? 'SIGUIENTE NIVEL' : 'TERMINAR';
}

function levelClear() {
  playSoundEffect('level');
  confetti();
  const isLast = lvlIdx >= LEVELS.length - 1;
  document.getElementById('cl-title').textContent = isLast ? '¡JUEGO COMPLETADO!' : '¡NIVEL COMPLETADO!';
  document.getElementById('cl-body').innerHTML    = 'Puntaje: ' + score + '<br>Vidas: ' + lives;
  const btn = document.getElementById('cl-btn');
  if (isLast) { btn.textContent = 'VER RESULTADO'; btn.onclick = showWin; }
  else { btn.textContent = 'SIGUIENTE NIVEL'; btn.onclick = () => { lvlIdx++; stepIdx = 0; showLevelIntro(); }; }
  showScr('sc-clear');
}

function showWin() {
  document.getElementById('w-score').textContent = score + ' PTS';
  document.getElementById('w-body').innerHTML    = 'Completaste los 3 niveles:<br>Estudio · Museo · Aventura<br>Vidas: ' + lives;
  confetti(); confetti();
  showScr('sc-win');
}

function nextLevel() { document.getElementById('cl-btn').onclick(); }

function gameOver() {
  playSoundEffect('lose');
  document.getElementById('ov-body').innerHTML = 'Puntaje: ' + score + '<br>Nivel: ' + LEVELS[lvlIdx].sub;
  showScr('sc-over');
}

/* ── KEYBOARD ── */
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && answered) { e.preventDefault(); nextStep(); }
});

/* ── UTILS ── */
function shuffle(a) { return [...a].sort(() => Math.random() - 0.5); }

/* ── INIT ── */
setSceneClass('sc-start');
updHUD();