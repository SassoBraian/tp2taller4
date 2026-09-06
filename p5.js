// Variables globales compartidas
let anchoCelda, altoCelda;

// --- VARIABLES ESPECÍFICAS DEL EVENTO 1 (HERENCIA: HUELLA Y TRANSMISIÓN GENERACIONAL) ---
let matricesE1 = [];
let herederosE1 = [];

// --- VARIABLES ESPECÍFICAS DEL EVENTO 2 (CADUCIDAD) ---
let figurasE2 = [];
let coloresE2 = [
  [50, 200, 100], // Verde
  [50, 100, 255], // Azul
  [255, 200, 50]  // Amarillo
];

// --- VARIABLES ESPECÍFICAS DEL EVENTO 3 (MEMORIA) ---
let memoriaE3 = {
  figuras: [
    { id: 'cuadrado', x: 0, y: 0, tam: 28, color: [100, 150, 255], arrastrando: false, ecos: [] },
    { id: 'circulo',  x: 0, y: 0, tam: 28, color: [255, 100, 100], arrastrando: false, ecos: [] },
    { id: 'triangulo',x: 0, y: 0, tam: 28, color: [100, 255, 150], arrastrando: false, ecos: [] },
    { id: 'linea',    x: 0, y: 0, tam: 28, color: [255, 220, 80],  arrastrando: false, ecos: [] }
  ]
};

// --- VARIABLES ESPECÍFICAS DEL EVENTO 4 (IDENTIDAD: IMÁN Y ECOSISTEMA) ---
let identidadE4 = {
  x: 0, y: 0, tam: 45,
  colorOriginal: [255, 200, 50],
  imanActivo: false,
  formas: []
};

// --- VARIABLES ESPECÍFICAS DEL EVENTO 5 (EMPATÍA) ---
let empatiaE5 = {
  formas: [],
  nivelEmpatia: 0, 
  sincronizando: false,
  frameRelativo: 0
};

// --- VARIABLES ESPECÍFICAS DEL EVENTO 6 (COLABORACIÓN: LA RED DE TENSIONES) ---
let coexistenciaE6 = {
  figuras: [],
  conexiones: [],
  nivelTension: 0,
  conectadoTotal: false
};

// --- VARIABLES ESPECÍFICAS DEL EVENTO 7 (INCERTIDUMBRE) ---
let figurasE7 = [];
let ultimoTriggerE7 = 0;

// --- VARIABLES ESPECÍFICAS DEL EVENTO 8 (EXPECTATIVA) ---
let expectativaE8 = {
  x: 0, y: 0,
  tension: 0, 
  cargando: false,
  estallado: false,
  opacidadEstallido: 0,
  particulas: []
};

// --- VARIABLES ESPECÍFICAS DEL EVENTO 9 (ANSIEDAD) ---
let ansiedadE9 = {
  estado: 'ANSIEDAD',
  tam: 42, // Tamaño aumentado
  circulos: [],
  frameRelativo: 0
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  ellipseMode(CENTER);
  
  anchoCelda = width / 3;
  altoCelda = height / 3;

// Inicializar EVENTO 1 (4 matrices con geometrías puras y colores distintos)
  matricesE1 = [];
  herederosE1 = [];
  
  let formasPadres = ['cuadrado', 'triangulo', 'circulo', 'cuadrado']; // o 'circulo'
  let coloresPadres = [
    [255, 60, 60],   // Rojo
    [50, 150, 255],  // Azul
    [255, 200, 50],  // Amarillo
    [50, 220, 130]   // Verde esmeralda (o [200, 80, 255] si preferís magenta)
  ];

  for (let i = 0; i < 4; i++) {
    matricesE1.push({
      id: i,
      x: (anchoCelda * 0.18) + (i * anchoCelda * 0.22),
      y: altoCelda / 2 + random(-20, 20),
      tam: 48,
      tamMax: 48,
      velRot: random(0.005, 0.012),
      forma: formasPadres[i],
      colorRGB: coloresPadres[i],
      opacidad: 255,
      grosor: 3.5,
      arrastrando: false,
      tiempoVida: random(10),
      hijosGenerados: 0,
      maxHijos: 3
    });
  }

  // Inicializar EVENTO 2
  figurasE2 = [];
  for (let i = 0; i < 10; i++) {
    agregarFiguraE2();
  }

  // Inicializar EVENTO 3
  let centroE3X = (anchoCelda * 2) + anchoCelda / 2;
  let centroE3Y = altoCelda / 2;
  memoriaE3.figuras[0].x = centroE3X - 35; memoriaE3.figuras[0].y = centroE3Y - 35;
  memoriaE3.figuras[1].x = centroE3X + 35; memoriaE3.figuras[1].y = centroE3Y - 35;
  memoriaE3.figuras[2].x = centroE3X - 35; memoriaE3.figuras[2].y = centroE3Y + 35;
  memoriaE3.figuras[3].x = centroE3X + 35; memoriaE3.figuras[3].y = centroE3Y + 35;

  // Inicializar EVENTO 4
  identidadE4.x = anchoCelda / 2;
  identidadE4.y = altoCelda + altoCelda / 2;
  identidadE4.formas = [];
  
  let paletaE4 = [
    [255, 50, 50],
    [50, 100, 255],
    [50, 200, 100]
  ];

  for (let i = 0; i < 12; i++) {
    let colAsignado = random(paletaE4);
    identidadE4.formas.push({
      x: random(20, anchoCelda - 20), y: random(altoCelda + 20, altoCelda * 2 - 20),
      velX: random(-1.5, 1.5), velY: random(-1.5, 1.5),
      angulo: random(TWO_PI), rotVel: random(-0.05, 0.05),
      tipo: random(['cuadrado', 'circulo']), tam: random(12, 20),
      color: [colAsignado[0], colAsignado[1], colAsignado[2]],
      colorBase: [colAsignado[0], colAsignado[1], colAsignado[2]]
    });
  }

  // Inicializar EVENTO 5
  empatiaE5.formas = [];
  let colsE5 = [[255, 50, 50], [50, 100, 255], [255, 200, 50], [50, 200, 100]];
  for (let i = 0; i < 4; i++) {
    empatiaE5.formas.push({
      x: (anchoCelda) + random(40, anchoCelda - 40),
      y: altoCelda + random(40, altoCelda - 40),
      color: colsE5[i], tamBase: 35, 
      tipo: (i % 2 === 0) ? 'circulo' : 'cuadrado'
    });
  }

  // Inicializar EVENTO 6
  coexistenciaE6.figuras = [];
  let formasDiversasE6 = ['circulo', 'triangulo', 'cuadrado'];
  let coloresE6 = [[0, 230, 200], [255, 90, 180], [255, 210, 50]];
  let centroX6 = (anchoCelda * 2) + anchoCelda / 2;
  let centroY6 = altoCelda + altoCelda / 2;

  for (let i = 0; i < 6; i++) {
    coexistenciaE6.figuras.push({
      x: centroX6 + random(-90, 90),
      y: centroY6 + random(-90, 90),
      forma: formasDiversasE6[i % 3],
      color: coloresE6[i % 3],
      tam: 26, arrastrando: false
    });
  }

  // Inicializar EVENTO 7
  figurasE7 = [];
  figurasE7.push({
    x: anchoCelda / 2, y: (altoCelda * 2) + altoCelda / 2,
    tam: 50, color: [250, 50, 55], estado: 'NORMAL',
    particulasNube: [], tiempoDisolucion: 0,
    centroOrbitaX: 0, centroOrbitaY: 0, radioOrbita: 0, anguloOrbita: 0,
    tiempoParpadeo: 0
  });

  // Inicializar EVENTO 8
  expectativaE8.x = anchoCelda + anchoCelda / 2;
  expectativaE8.y = (altoCelda * 2) + altoCelda / 2;

  // Inicializar EVENTO 9 (Ansiedad: 4 círculos que parten del centro)
  ansiedadE9.circulos = [];
  let centroX9 = (anchoCelda * 2) + anchoCelda / 2;
  let centroY9 = (altoCelda * 2) + altoCelda / 2;

  let velocidadesE9 = [
    { vx: 10, vy: -9 },
    { vx: -11, vy: 8 },
    { vx: 9, vy: 11 },
    { vx: -10, vy: -10 }
  ];

  for (let i = 0; i < 4; i++) {
    ansiedadE9.circulos.push({
      x: centroX9,
      y: centroY9,
      velX: velocidadesE9[i].vx,
      velY: velocidadesE9[i].vy
    });
  }
}

function mouseEnCuadrante(col, fil) {
  return mouseX >= col * anchoCelda && mouseX < (col + 1) * anchoCelda &&
         mouseY >= fil * altoCelda && mouseY < (fil + 1) * altoCelda;
}

function draw() {
  background(15);
  
  if (mouseEnCuadrante(2, 0)) {
    manejarArrastreE3();
  }

  stroke(200);
  strokeWeight(1);
  for (let i = 1; i < 3; i++) {
    line(i * anchoCelda, 0, i * anchoCelda, height); 
    line(0, i * altoCelda, width, i * altoCelda); 
  }

  ejecutarEvento1();
  ejecutarEvento2();
  ejecutarEvento3();
  ejecutarEvento4();
  ejecutarEvento5();
  ejecutarEvento6();
  ejecutarEvento7();
  ejecutarEvento8();
  ejecutarEvento9();
}

// ==========================================
// CUADRANTE 1: HERENCIA 
// ==========================================
function ejecutarEvento1() {
  dibujarTitulo(1, "HERENCIA (HUELLA Y TRANSMISIÓN)", 0, 0);
  let activo = mouseEnCuadrante(0, 0);

  let xMin = 0; let xMax = anchoCelda;
  let yMin = 0; let yMax = altoCelda;

  // 1. Actualizar y dibujar a los Padres / Matrices
  for (let i = matricesE1.length - 1; i >= 0; i--) {
    let m = matricesE1[i];

    if (m.arrastrando && activo) {
      let r = m.tam / 2;
      m.x = constrain(mouseX, xMin + r, xMax - r);
      m.y = constrain(mouseY, yMin + r, yMax - r);
    }

    if (activo) {
      m.tiempoVida += 0.02;
      m.angulo += m.velRot;

      // Desvanecimiento gradual si ya generó hijos
      if (m.hijosGenerados > 0) {
        let opacidadObjetivo = map(m.hijosGenerados, 0, m.maxHijos, 200, 0);
        m.opacidad = lerp(m.opacidad, opacidadObjetivo, 0.03);
        m.grosor = lerp(m.grosor, 0.8, 0.02);

        // Desaparición completa cuando salieron todos sus hijos y se agotó la opacidad
        if (m.hijosGenerados >= m.maxHijos && m.opacidad <= 5) {
          matricesE1.splice(i, 1);
          continue;
        }
      }
    }

    let pulsoMatriz = sin(m.tiempoVida) * 3;
    push();
    translate(m.x, m.y);
    rotate(m.angulo);
    noFill();
    stroke(m.colorRGB[0], m.colorRGB[1], m.colorRGB[2], m.opacidad);
    strokeWeight(m.grosor);
    dibujarFormaBaseE1(m.forma, m.tam + pulsoMatriz);
    pop();
  }

  function dibujarFormaBaseE1(forma, tam) {
  if (forma === 'cuadrado') {
    rect(0, 0, tam, tam);
  } else if (forma === 'circulo') {
    ellipse(0, 0, tam, tam);
  } else if (forma === 'triangulo') {
    let h = tam * 0.866;
    triangle(0, -h / 2, -tam / 2, h / 2, tam / 2, h / 2);
  }
}

  // 2. Actualizar y dibujar a los Hijos / Herederos
  for (let h of herederosE1) {
    // Comprobar si su padre ya desapareció del cuadrante
    let padreExiste = matricesE1.some(m => m.id === h.padreId);

    if (activo) {
      h.tiempo += 0.03;
      h.angulo += h.velRot;

      h.x += h.vx;
      h.y += h.vy;
      h.vx *= 0.95;
      h.vy *= 0.95;

      let r = h.tam / 2;
      if (h.x < xMin + r) { h.x = xMin + r; h.vx *= -1; }
      if (h.x > xMax - r) { h.x = xMax - r; h.vx *= -1; }
      if (h.y < yMin + r) { h.y = yMin + r; h.vy *= -1; }
      if (h.y > yMax - r) { h.y = yMax - r; h.vy *= -1; }

      h.opacidad = lerp(h.opacidad, 255, 0.05);

      // Si el padre desapareció por completo, el hijo crece a la escala del padre
      if (!padreExiste) {
        h.tam = lerp(h.tam, h.tamObjetivo, 0.02);
        h.grosor = lerp(h.grosor, 3.5, 0.02);
      }
    }

    let pulsoHeredero = sin(h.tiempo) * 2;
    push();
    translate(h.x, h.y);
    rotate(h.angulo);
    noFill();
    stroke(h.colorRGB[0], h.colorRGB[1], h.colorRGB[2], h.opacidad);
    strokeWeight(h.grosor);
    dibujarFormaBaseE1(h.forma, h.tam + pulsoHeredero);
    pop();
  }
}

// ==========================================
// CUADRANTE 2: CADUCIDAD
// ==========================================
function ejecutarEvento2() {
  dibujarTitulo(2, "CADUCIDAD (COMO LO PERDIDO EN EL TRÁNSITO)", anchoCelda, 0);
  let activo = mouseEnCuadrante(1, 0);

  if (activo && frameCount % 60 === 0 && figurasE2.length < 16) {
    agregarFiguraE2();
  }

  for (let i = figurasE2.length - 1; i >= 0; i--) {
    let f = figurasE2[i];
    
    if (activo) {
      f.tam -= f.velTam;
      f.opacidad -= f.velOpac;

      if (f.opacidad <= 0 || f.tam <= 0) {
        figurasE2.splice(i, 1);
        continue;
      }
    }

    noFill();
    stroke(f.colorRGB[0], f.colorRGB[1], f.colorRGB[2], f.opacidad);
    strokeWeight(2.5);

    if (f.forma === 'cuadrado') rect(f.x, f.y, f.tam, f.tam);
    else if (f.forma === 'circulo') ellipse(f.x, f.y, f.tam, f.tam);
    else if (f.forma === 'triangulo') {
      let h = f.tam * 0.866; 
      triangle(f.x, f.y - h/2, f.x - f.tam/2, f.y + h/2, f.x + f.tam/2, f.y + h/2);
    }
  }
}

function agregarFiguraE2() {
  let x = random(anchoCelda + 40, (anchoCelda * 2) - 40);
  let y = random(40, altoCelda - 40);
  let forma = random(['cuadrado', 'triangulo', 'circulo']);
  let col = random(coloresE2);
  
  let tamInicial = random(30, 75); 
  let velTam = random(0.05, 0.2); 
  let velOpac = random(0.5, 1.5); 
  
  figurasE2.push({ 
    x: x, y: y, forma: forma, colorRGB: col, 
    tam: tamInicial, opacidad: 255, 
    velTam: velTam, velOpac: velOpac 
  });
}

// ==========================================
// CUADRANTE 3: MEMORIA
// ==========================================
function ejecutarEvento3() {
  dibujarTitulo(3, "MEMORIA (COMO REGISTRO)", anchoCelda * 2, 0);
  let activo = mouseEnCuadrante(2, 0);

  for (let f of memoriaE3.figuras) {
    for (let i = f.ecos.length - 1; i >= 0; i--) {
      let eco = f.ecos[i];
      if (activo) {
        eco.opacidad -= 0.8;
        if (eco.opacidad <= 0) {
          f.ecos.splice(i, 1);
          continue;
        }
      }

      noFill();
      stroke(f.color[0], f.color[1], f.color[2], eco.opacidad);
      strokeWeight(1.5);
      dibujarFormaE3(f.id, eco.x, eco.y, f.tam);
    }

    noFill();
    stroke(f.color[0], f.color[1], f.color[2]);
    strokeWeight(f.arrastrando ? 3.5 : 2.5);
    dibujarFormaE3(f.id, f.x, f.y, f.tam);
  }
}

function dibujarFormaE3(tipo, x, y, tam) {
  if (tipo === 'cuadrado') rect(x, y, tam, tam);
  else if (tipo === 'circulo') ellipse(x, y, tam, tam);
  else if (tipo === 'triangulo') { let h = tam * 0.866; triangle(x, y - h / 2, x - tam / 2, y + h / 2, x + tam / 2, y + h / 2); }
  else if (tipo === 'linea') line(x - tam / 2, y + tam / 2, x + tam / 2, y - tam / 2);
}

function manejarArrastreE3() {
  let r = 20;
  let xMin = (anchoCelda * 2) + r;
  let xMax = width - r;
  let yMin = r;
  let yMax = altoCelda - r;

  for (let f of memoriaE3.figuras) {
    if (f.arrastrando) {
      f.x = constrain(mouseX, xMin, xMax);
      f.y = constrain(mouseY, yMin, yMax);

      if (frameCount % 4 === 0) {
        f.ecos.push({ x: f.x, y: f.y, opacidad: 150 });
      }
    }
  }
}

// ==========================================
// CUADRANTE 4: IDENTIDAD (IMÁN)
// ==========================================
function ejecutarEvento4() { 
  dibujarTitulo(4, "IDENTIDAD (COMO AFIRMACIÓN DE SI)", 0, altoCelda); 
  let xMin = 0; let xMax = anchoCelda; let yMin = altoCelda; let yMax = altoCelda * 2;
  let activo = mouseEnCuadrante(0, 1);

  for (let f of identidadE4.formas) {
    let angulo = atan2(identidadE4.y - f.y, identidadE4.x - f.x);

    if (activo) {
      if (identidadE4.imanActivo) {
        f.velX += cos(angulo) * 0.4; 
        f.velY += sin(angulo) * 0.4;
        
        f.color[0] = lerp(f.color[0], identidadE4.colorOriginal[0], 0.1);
        f.color[1] = lerp(f.color[1], identidadE4.colorOriginal[1], 0.1);
        f.color[2] = lerp(f.color[2], identidadE4.colorOriginal[2], 0.1);
      } else {
        f.velX -= cos(angulo) * 0.2; 
        f.velY -= sin(angulo) * 0.2;
        
        f.color[0] = lerp(f.color[0], f.colorBase[0], 0.05);
        f.color[1] = lerp(f.color[1], f.colorBase[1], 0.05);
        f.color[2] = lerp(f.color[2], f.colorBase[2], 0.05);
      }

      f.x += f.velX; f.y += f.velY; f.angulo += f.rotVel;
      f.velX *= 0.92; f.velY *= 0.92;

      let r = f.tam / 2;
      if (f.x < xMin + r) { f.x = xMin + r; f.velX *= -0.5; }
      if (f.x > xMax - r) { f.x = xMax - r; f.velX *= -0.5; }
      if (f.y < yMin + r) { f.y = yMin + r; f.velY *= -0.5; }
      if (f.y > yMax - r) { f.y = yMax - r; f.velY *= -0.5; }
    }

    if (identidadE4.imanActivo && activo) {
      stroke(identidadE4.colorOriginal[0], identidadE4.colorOriginal[1], identidadE4.colorOriginal[2], 80);
      line(f.x, f.y, identidadE4.x, identidadE4.y);
    }

    push(); translate(f.x, f.y); rotate(f.angulo);
    stroke(f.color[0], f.color[1], f.color[2]); strokeWeight(1.5); noFill();
    if (f.tipo === 'cuadrado') rect(0, 0, f.tam, f.tam); else ellipse(0, 0, f.tam, f.tam);
    pop();
  }

  stroke(identidadE4.colorOriginal[0], identidadE4.colorOriginal[1], identidadE4.colorOriginal[2]);
  strokeWeight(2.5); noFill();
  ellipse(identidadE4.x, identidadE4.y, identidadE4.tam, identidadE4.tam);
}

// ==========================================
// CUADRANTE 5: EMPATÍA
// ==========================================
function ejecutarEvento5() { 
  dibujarTitulo(5, "EMPATÍA (COMO COMPRENSIÓN DEL OTRO)", anchoCelda, altoCelda); 
  let activo = mouseEnCuadrante(1, 1);

  if (activo) {
    if (empatiaE5.sincronizando && empatiaE5.nivelEmpatia < 1) empatiaE5.nivelEmpatia += 0.015; 
    else if (!empatiaE5.sincronizando && empatiaE5.nivelEmpatia > 0) empatiaE5.nivelEmpatia -= 0.02;  
    empatiaE5.nivelEmpatia = constrain(empatiaE5.nivelEmpatia, 0, 1);
    empatiaE5.frameRelativo++;
  }

  let cX = anchoCelda + anchoCelda / 2;
  let cY = altoCelda + altoCelda / 2;
  let velLatido = 0.03 + (empatiaE5.nivelEmpatia * 0.06); 

  let posicionesActuales = [];

  for (let i = 0; i < empatiaE5.formas.length; i++) {
    let f = empatiaE5.formas[i];
    // Convergencia hacia [255, 200, 50]
    let cActual = lerpColor(color(f.color[0], f.color[1], f.color[2]), color(255, 200, 50), empatiaE5.nivelEmpatia);
    
    let fase = lerp(map(i, 0, 4, 0, TWO_PI), 0, empatiaE5.nivelEmpatia); 
    let tam = f.tamBase + (sin((empatiaE5.frameRelativo * velLatido) + fase) * 15);

    let offsets = [[-45, -45], [45, -45], [-45, 45], [45, 45]];
    let posX = lerp(f.x, cX + offsets[i][0], empatiaE5.nivelEmpatia);
    let posY = lerp(f.y, cY + offsets[i][1], empatiaE5.nivelEmpatia);

    posicionesActuales.push({x: posX, y: posY});

    noFill(); stroke(cActual); strokeWeight(2.5);
    if (f.tipo === 'circulo') ellipse(posX, posY, tam, tam); else rect(posX, posY, tam, tam);
  }

  // Red de líneas conectoras en [255, 200, 50]
  if (empatiaE5.nivelEmpatia > 0.8) {
    let opacidadLineas = map(empatiaE5.nivelEmpatia, 0.8, 1, 0, 150);
    stroke(255, 200, 50, opacidadLineas);
    strokeWeight(3);
    
    line(posicionesActuales[0].x, posicionesActuales[0].y, posicionesActuales[1].x, posicionesActuales[1].y);
    line(posicionesActuales[1].x, posicionesActuales[1].y, posicionesActuales[3].x, posicionesActuales[3].y);
    line(posicionesActuales[3].x, posicionesActuales[3].y, posicionesActuales[2].x, posicionesActuales[2].y);
    line(posicionesActuales[2].x, posicionesActuales[2].y, posicionesActuales[0].x, posicionesActuales[0].y);
    line(posicionesActuales[0].x, posicionesActuales[0].y, posicionesActuales[3].x, posicionesActuales[3].y);
    line(posicionesActuales[1].x, posicionesActuales[1].y, posicionesActuales[2].x, posicionesActuales[2].y);
  }
}

// ==========================================
// CUADRANTE 6: COLABORACIÓN
// ==========================================
function ejecutarEvento6() { 
  dibujarTitulo(6, "COLABORACIÓN (COMO COEXISTENCIA)", anchoCelda * 2, altoCelda); 
  let xMin = anchoCelda * 2; let xMax = width; let yMin = altoCelda; let yMax = altoCelda * 2;
  let activo = mouseEnCuadrante(2, 1);

  if (activo) {
    for (let f of coexistenciaE6.figuras) {
      if (f.arrastrando) {
        f.x = constrain(mouseX, xMin + f.tam/2, xMax - f.tam/2);
        f.y = constrain(mouseY, yMin + f.tam/2, yMax - f.tam/2);
      }
    }

    coexistenciaE6.conexiones = [];
    let tiposConectados = new Set();
    let umbralDistancia = 130; 

    for (let i = 0; i < coexistenciaE6.figuras.length; i++) {
      for (let j = i + 1; j < coexistenciaE6.figuras.length; j++) {
        let f1 = coexistenciaE6.figuras[i]; let f2 = coexistenciaE6.figuras[j];
        let d = dist(f1.x, f1.y, f2.x, f2.y);
        if (d < umbralDistancia && f1.forma !== f2.forma) { 
          coexistenciaE6.conexiones.push({ f1: f1, f2: f2, dist: d });
          tiposConectados.add(f1.forma); tiposConectados.add(f2.forma);
        }
      }
    }

    coexistenciaE6.nivelTension = lerp(coexistenciaE6.nivelTension, map(tiposConectados.size, 0, 3, 0, 1), 0.08);
  }

  let umbralDist = 130;
  for (let c of coexistenciaE6.conexiones) {
    let t = coexistenciaE6.nivelTension;
    
    // Líneas con color [255, 200, 50], opacidad reactiva y mayor grosor
    stroke(255, 200, 50, map(c.dist, 0, umbralDist, 220 * t, 0));
    strokeWeight(map(t, 0, 1, 1.5, 4)); 
    line(c.f1.x, c.f1.y, c.f2.x, c.f2.y);
  }

  for (let f of coexistenciaE6.figuras) {
    noFill(); 
    stroke(f.color[0], f.color[1], f.color[2], map(coexistenciaE6.nivelTension, 0, 1, 160, 255));
    strokeWeight(f.arrastrando ? 4 : 2);
    if (f.forma === 'circulo') ellipse(f.x, f.y, f.tam, f.tam);
    else if (f.forma === 'cuadrado') rect(f.x, f.y, f.tam, f.tam);
    else triangle(f.x, f.y - 11, f.x - 13, f.y + 11, f.x + 13, f.y + 11);
  }
}

// ==========================================
// CUADRANTE 7: INCERTIDUMBRE
// ==========================================
function ejecutarEvento7() { 
  dibujarTitulo(7, "INCERTIDUMBRE (COMO DESCONOCIMIENTO)", 0, altoCelda * 2); 
  let activo = mouseEnCuadrante(0, 2);

  if (activo && millis() - ultimoTriggerE7 > 1000) {
    for (let f of figurasE7) {
      if (f.estado !== 'DISUELTO') {
        if (dist(mouseX, mouseY, f.x, f.y) < f.tam / 2) {
          detonarIncertidumbre7(f); break; 
        }
      }
    }
  }

  for (let i = figurasE7.length - 1; i >= 0; i--) {
    let f = figurasE7[i];
    if (activo) {
      if (f.estado === 'DISUELTO') {
        f.tiempoDisolucion--;
        for (let p of f.particulasNube) {
          p.x += p.vx; p.y += p.vy; p.opacidad -= 4;
        }
        if (f.tiempoDisolucion <= 0) {
          if (figurasE7.length > 1) { figurasE7.splice(i, 1); continue; } 
          else f.estado = 'NORMAL';
        }
      }
      if (f.estado === 'ORBITA') {
        f.anguloOrbita += 0.15; f.radioOrbita *= 0.96;
        f.x = f.centroOrbitaX + cos(f.anguloOrbita) * f.radioOrbita;
        f.y = f.centroOrbitaY + sin(f.anguloOrbita) * f.radioOrbita;
        if (f.radioOrbita < 2) f.estado = 'NORMAL';
      }

      f.tam = lerp(f.tam, 50, 0.05);
    }

    if (f.estado === 'DISUELTO') {
      for (let p of f.particulasNube) {
        noFill(); stroke(f.color[0], f.color[1], f.color[2], max(p.opacidad, 0)); strokeWeight(1.5);
        ellipse(p.x, p.y, p.tam, p.tam);
      }
    }

    if (f.estado !== 'DISUELTO' || f.tiempoDisolucion < 15) {
      let opacidadPrincipal = (f.estado === 'DISUELTO') ? map(f.tiempoDisolucion, 0, 15, 255, 0) : 255;
      if (f.estado === 'PARPADEO') {
        opacidadPrincipal = random(50, 255); 
        if (activo) {
          f.tiempoParpadeo--;
          if (f.tiempoParpadeo <= 0) f.estado = 'NORMAL';
        }
      }
      noFill(); stroke(f.color[0], f.color[1], f.color[2], opacidadPrincipal); strokeWeight(2.5);
      let jitt = activo ? random(-1.5, 1.5) : 0;
      ellipse(f.x + jitt, f.y + jitt, f.tam, f.tam);
    }
  }
}

function detonarIncertidumbre7(f) {
  ultimoTriggerE7 = millis(); 
  let opciones = ['HUIR', 'DUPLICAR', 'DISOLVER', 'TAMAÑO_EXTREMO', 'ORBITA_CAOTICA', 'PARPADEO', 'MUTAR_COLOR'];
  if (figurasE7.length >= 6) opciones = opciones.filter(o => o !== 'DUPLICAR');

  let respuesta = random(opciones);
  let xMin = 40; let xMax = anchoCelda - 40; let yMin = (altoCelda * 2) + 40; let yMax = height - 40;

  if (respuesta === 'HUIR') { f.x = random(xMin, xMax); f.y = random(yMin, yMax); f.estado = 'NORMAL'; } 
  else if (respuesta === 'DUPLICAR') {
    figurasE7.push({
      x: random(xMin, xMax), y: random(yMin, yMax), tam: 50, color: [f.color[0], f.color[1], f.color[2]], estado: 'NORMAL',
      particulasNube: [], tiempoDisolucion: 0, centroOrbitaX: 0, centroOrbitaY: 0, radioOrbita: 0, anguloOrbita: 0, tiempoParpadeo: 0
    });
  } 
  else if (respuesta === 'DISOLVER') {
    f.estado = 'DISUELTO'; f.tiempoDisolucion = 60; f.particulasNube = [];
    for (let i = 0; i < 18; i++) {
      let angulo = random(TWO_PI); let vel = random(1.5, 4);
      f.particulasNube.push({ x: f.x, y: f.y, vx: cos(angulo) * vel, vy: sin(angulo) * vel, tam: random(4, 10), opacidad: 255 });
    }
  }
  else if (respuesta === 'TAMAÑO_EXTREMO') { f.tam = random([12, 110]); f.estado = 'NORMAL'; }
  else if (respuesta === 'ORBITA_CAOTICA') {
    f.estado = 'ORBITA'; f.centroOrbitaX = random(xMin + 30, xMax - 30); f.centroOrbitaY = random(yMin + 30, yMax - 30);
    f.radioOrbita = random(40, 80); f.anguloOrbita = random(TWO_PI);
  }
  else if (respuesta === 'PARPADEO') { f.estado = 'PARPADEO'; f.tiempoParpadeo = 30; }
  else if (respuesta === 'MUTAR_COLOR') { f.color = random([[255, 60, 60], [255, 120, 40], [255, 175, 50], [255, 215, 0], [255, 90, 120], [230, 50, 90]]); f.estado = 'NORMAL'; }
}

// ==========================================
// CUADRANTE 8: EXPECTATIVA
// ==========================================
function ejecutarEvento8() {
  dibujarTitulo(8, "EXPECTATIVA (COMO ANTICIPACIÓN)", anchoCelda, altoCelda * 2);
  let xMin = anchoCelda; let xMax = anchoCelda * 2; let yMin = altoCelda * 2; let yMax = height;
  let activo = mouseEnCuadrante(1, 2);

  if (activo) {
    if (expectativaE8.cargando && !expectativaE8.estallado) {
      expectativaE8.tension += 0.007;
      if (expectativaE8.tension >= 1.0) {
        expectativaE8.estallado = true; expectativaE8.tension = 0; expectativaE8.cargando = false; expectativaE8.opacidadEstallido = 255;
        for (let i = 0; i < 40; i++) {
          expectativaE8.particulas.push({ x: expectativaE8.x, y: expectativaE8.y, velX: random(-6, 6), velY: random(-6, 6), tam: random(4, 15), forma: random(['circulo', 'triangulo', 'cuadrado']), color: [random(255), random(100, 255), random(200, 255), 255] });
        }
      }
    } else if (!expectativaE8.estallado && expectativaE8.tension > 0) {
      expectativaE8.tension -= 0.02; expectativaE8.tension = max(expectativaE8.tension, 0);
    }
  }

  if (expectativaE8.estallado) {
    if (expectativaE8.opacidadEstallido > 0) {
      fill(255, 100, 150, expectativaE8.opacidadEstallido * 0.15); noStroke();
      rect(expectativaE8.x, expectativaE8.y, anchoCelda, altoCelda);
      if (activo) expectativaE8.opacidadEstallido -= 4;
    }

    for (let i = expectativaE8.particulas.length - 1; i >= 0; i--) {
      let p = expectativaE8.particulas[i];
      if (activo) {
        p.x += p.velX; p.y += p.velY; p.color[3] -= 3;
        if (p.color[3] <= 0 || p.x < xMin || p.x > xMax || p.y < yMin || p.y > yMax) {
          expectativaE8.particulas.splice(i, 1);
          continue;
        }
      }

      noFill(); stroke(p.color[0], p.color[1], p.color[2], p.color[3]); strokeWeight(2);
      if (p.forma === 'circulo') ellipse(p.x, p.y, p.tam, p.tam);
      else if (p.forma === 'cuadrado') rect(p.x, p.y, p.tam, p.tam);
      else triangle(p.x, p.y - p.tam/2, p.x - p.tam/2, p.y + p.tam/2, p.x + p.tam/2, p.y + p.tam/2);
    }
    if (expectativaE8.particulas.length === 0 && expectativaE8.opacidadEstallido <= 0) expectativaE8.estallado = false;
  }

  if (!expectativaE8.estallado) {
    let t = expectativaE8.tension;
    let diametroCirculo = map(t, 0, 1, 50, 8);
    stroke(255, 50 + (t * 155), 50); strokeWeight(3); noFill();
    let jittX = activo ? random(-t * 8, t * 8) : 0;
    let jittY = activo ? random(-t * 8, t * 8) : 0;
    ellipse(expectativaE8.x + jittX, expectativaE8.y + jittY, diametroCirculo, diametroCirculo);
  }
}

// ==========================================
// CUADRANTE 9: ANSIEDAD
// ==========================================
function ejecutarEvento9() {
  dibujarTitulo(9, "ANSIEDAD (COMO PRE-OCUPACIÓN)", anchoCelda * 2, altoCelda * 2);
  let xMin = anchoCelda * 2; let xMax = width; let yMin = altoCelda * 2; let yMax = height;
  let activo = mouseEnCuadrante(2, 2);

  let centroX = xMin + anchoCelda / 2;
  let centroY = yMin + altoCelda / 2;

  if (activo) {
    ansiedadE9.frameRelativo++;
    
    for (let c of ansiedadE9.circulos) {
      if (ansiedadE9.estado === 'ANSIEDAD') {
        c.x += c.velX; 
        c.y += c.velY;

        // Rebotes rápidos contra las paredes del cuadrante
        let r = ansiedadE9.tam / 2;
        if (c.x - r < xMin || c.x + r > xMax) c.velX *= -1;
        if (c.y - r < yMin || c.y + r > yMax) c.velY *= -1;

      } else if (ansiedadE9.estado === 'CALMA') {
        // Todos convergen suavemente hacia el centro
        c.x = lerp(c.x, centroX, 0.08);
        c.y = lerp(c.y, centroY, 0.08);
      }
    }
  }

  // Dibujado de los 4 círculos según el estado
  if (ansiedadE9.estado === 'ANSIEDAD') {
    stroke(255, 50, 50); 
    strokeWeight(2.5); 
    noFill();
    for (let c of ansiedadE9.circulos) {
      ellipse(c.x, c.y, ansiedadE9.tam, ansiedadE9.tam);
    }
  } else if (ansiedadE9.estado === 'CALMA') {
    let diametroLatido = (ansiedadE9.tam + 15) + (sin(ansiedadE9.frameRelativo / 15) * 12);
    stroke(255, 135, 50); 
    strokeWeight(3); 
    noFill();
    for (let c of ansiedadE9.circulos) {
      ellipse(c.x, c.y, diametroLatido, diametroLatido);
    }
  }
}

// --- INTERACCIONES GESTUALES ---
function mousePressed() {
  if (mouseEnCuadrante(0, 0)) { manejarClicEvento1(); }
  else if (mouseEnCuadrante(1, 0)) { manejarClicEvento2(); }
  else if (mouseEnCuadrante(2, 0)) { manejarClicEvento3(); }
  else if (mouseEnCuadrante(0, 1)) { identidadE4.imanActivo = true; }
  else if (mouseEnCuadrante(1, 1)) { empatiaE5.sincronizando = true; }
  else if (mouseEnCuadrante(2, 1)) { manejarClicEvento6(); }
  else if (mouseEnCuadrante(0, 2)) {
    if (figurasE7.length > 0 && dist(mouseX, mouseY, figurasE7[0].x, figurasE7[0].y) < 25) detonarIncertidumbre7(figurasE7[0]);
  }
  else if (mouseEnCuadrante(1, 2)) {
    if (dist(mouseX, mouseY, expectativaE8.x, expectativaE8.y) < 40 && !expectativaE8.estallado) expectativaE8.cargando = true;
  }
  else if (mouseEnCuadrante(2, 2)) { ansiedadE9.estado = 'CALMA'; }
}

function mouseReleased() {
  for (let f of memoriaE3.figuras) f.arrastrando = false;
  
  expectativaE8.cargando = false;
  identidadE4.imanActivo = false;
  empatiaE5.sincronizando = false;

  if (ansiedadE9.estado === 'CALMA') {
    ansiedadE9.estado = 'ANSIEDAD';
    for (let c of ansiedadE9.circulos) {
      c.velX = random([-12, -9, 9, 12]);
      c.velY = random([-12, -9, 9, 12]);
    }
  }
  for (let f of coexistenciaE6.figuras) f.arrastrando = false;
  for (let m of matricesE1) m.arrastrando = false;
}

function manejarClicEvento1() {
  for (let m of matricesE1) {
    let d = dist(mouseX, mouseY, m.x, m.y);

    if (d < m.tam / 2 + 10) {
      m.arrastrando = true;

      // Engendra un hijo si aún no llegó a su cupo
      if (m.hijosGenerados < m.maxHijos) {
        m.hijosGenerados++;
        let direccion = random(TWO_PI);
        let impulso = random(3, 5);

        herederosE1.push({
          padreId: m.id,
          x: m.x,
          y: m.y,
          vx: cos(direccion) * impulso,
          vy: sin(direccion) * impulso,
          tam: m.tam * 0.4,           // Escala inicial reducida
          tamObjetivo: m.tamMax,       // Tamaño al que crecerá cuando el padre muera
          grosor: 1.5,
          angulo: m.angulo,
          velRot: m.velRot,            // Misma rotación suave que el padre
          tiempo: m.tiempoVida,
          forma: m.forma,              // MISMA FORMA EXACTA DEL PADRE
          colorRGB: [m.colorRGB[0], m.colorRGB[1], m.colorRGB[2]],
          opacidad: 90
        });
      }
      break;
    }
  }
}

function manejarClicEvento2() {
  for (let f of figurasE2) {
    let d = dist(mouseX, mouseY, f.x, f.y);
    if (d < f.tam / 2 + 10) { 
      f.tam = random(50, 80);
      f.opacidad = 255; 
      break; 
    }
  }
}

function manejarClicEvento3() {
  for (let f of memoriaE3.figuras) {
    for (let eco of f.ecos) {
      if (dist(mouseX, mouseY, eco.x, eco.y) < 25) { f.x = eco.x; f.y = eco.y; return; }
    }
  }
  for (let f of memoriaE3.figuras) {
    if (dist(mouseX, mouseY, f.x, f.y) < 30) { f.arrastrando = true; break; }
  }
}

function manejarClicEvento6() {
  for (let f of coexistenciaE6.figuras) {
    if (dist(mouseX, mouseY, f.x, f.y) < f.tam) { f.arrastrando = true; break; }
  }
}

function dibujarTitulo(num, texto, offsetX, offsetY) {
  fill(180); noStroke(); textSize(11); textAlign(LEFT, TOP); text(num + ". " + texto, offsetX + 15, offsetY + 15);
}