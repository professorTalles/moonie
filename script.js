let currentSection = null;
let currentItem = null;
let step = 0;
let audio = new Audio();

const grid = document.getElementById("grid");

/* CONFIG */
const sectionConfig = {
  1: { items: 4, cols: 2, path: "livro1", capa: "Capa1.png", prefix: "L1b" },
  2: { items: 5, cols: 3, path: "livro2", capa: "Capa2.png", prefix: "L2b" }
};

/* SEQUÊNCIAS */
const sequences = {
  livro1: {
    1: ["A","B"],
    2: ["A","B"],
    3: ["A","B"],
    4: ["A","B","C","D","E"]
  },
  livro2: {
    1: ["A","B","C","D"],
    2: ["A","B","C","D"],
    3: ["A","B","C","D"],
    4: ["A","B"],
    5: ["A","B","C","D","E","F"]
  }
};

/* FUNDO */
function setMenuBackground(section) {
  const bg = document.getElementById("menuBackground");
  const config = sectionConfig[section];

  bg.style.backgroundImage = `url('assets/${config.path}/${config.capa}')`;
}

/* NAV */
function switchScreen(from, to) {
  document.getElementById(from).classList.remove("active");
  document.getElementById(to).classList.add("active");
}

/* ABRIR LIVRO */
function openSection(section) {
  currentSection = section;

  buildGrid(section);
  setMenuBackground(section);

  switchScreen("home", "menu");
}

/* VOLTAR */
function goHome() {
  switchScreen("menu", "home");
}

function changeBook() {
  playAudio("assets/tks.mp3");
  goHome();
}

function backToMenu() {
  stopAudio();
  switchScreen("itemScreen", "menu");
}

/* 🔥 GRID ATUALIZADO */
function buildGrid(section) {
  grid.innerHTML = "";

  const config = sectionConfig[section];

  grid.style.gridTemplateColumns = `repeat(${config.cols}, 1fr)`;

  for (let i = 1; i <= config.items; i++) {
    const btn = document.createElement("button");

    /* 🔥 NOVO PADRÃO DE IMAGEM */
    btn.style.backgroundImage =
      `url(assets/${config.path}/${config.prefix}${i}.png)`;

    btn.onclick = () => openItem(i);

    grid.appendChild(btn);
  }
}

/* ABRIR ITEM */
function openItem(id) {
  currentItem = id;
  step = 0;

  runSequence();

  switchScreen("menu", "itemScreen");
}

/* SEQUÊNCIA */
function runSequence() {
  const path = sectionConfig[currentSection].path;
  const seq = sequences[path][currentItem];
  const letter = seq[step];

  setBackground(`assets/${path}/bg${currentItem}${letter}.png`);
  playAudio(`assets/${path}/bg_${currentItem}${letter}.mp3`);

  if (step === seq.length - 1) {
    setButton("Ver outros");
  } else {
    setButton("Próximo");
  }
}

/* AÇÃO */
function handleAction() {
  const path = sectionConfig[currentSection].path;
  const seq = sequences[path][currentItem];

  if (step === seq.length - 1) {
    backToMenu();
    return;
  }

  step++;
  runSequence();
}

/* UTIL */
function setBackground(src) {
  document.getElementById("itemContent").style.backgroundImage = `url(${src})`;
}

function setButton(text) {
  document.getElementById("action-btn").innerText = text;
}

function playAudio(src) {
  audio.pause();
  audio.currentTime = 0;
  audio.src = src;
  audio.play().catch(err => console.warn("Erro áudio:", err));
}

function stopAudio() {
  audio.pause();
  audio.currentTime = 0;
}