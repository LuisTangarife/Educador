const welcomeText = `Bienvenidos al Curso de Posgrado en Gestión Avanzada de Proyectos. 
Mi nombre es Luis Alberto Benavides, seré su asistente virtual durante este apasionante viaje académico. 
Este curso está diseñado para profesionales que desean profundizar en las mejores prácticas, herramientas y metodologías de gestión de proyectos en entornos complejos y cambiantes. 
Exploraremos técnicas avanzadas para la planificación, ejecución, control y cierre de proyectos, con un enfoque especial en liderazgo, innovación y gestión de equipos multidisciplinarios. 
Espero acompañarlos y guiarlos para que puedan potenciar sus habilidades y llevar sus proyectos al siguiente nivel. ¡Bienvenidos y mucho éxito!`;

let utterance;
let interval;
let isPaused = false;
let currentCharIndex = 0;
let voicesLoaded = false;

// Mostrar texto letra a letra
function showTextGradually(text) {
  clearInterval(interval);
  const display = document.getElementById("textDisplay");
  display.textContent = "";
  currentCharIndex = 0;
  interval = setInterval(() => {
    if (currentCharIndex < text.length) {
      display.textContent += text.charAt(currentCharIndex);
      currentCharIndex++;
    } else {
      clearInterval(interval);
    }
  }, 40);
}

// Cargar voces y reproducir
function setupAndSpeak() {
  if (!utterance) {
    utterance = new SpeechSynthesisUtterance(welcomeText);
    utterance.lang = 'es-ES';
    utterance.pitch = 1.1;
    utterance.rate = 1;

    const voices = speechSynthesis.getVoices();
    utterance.voice =
      voices.find(v => v.lang === 'es-ES' && v.name.toLowerCase().includes("google")) ||
      voices.find(v => v.lang === 'es-ES') ||
      null;

    utterance.onstart = () => {
      document.getElementById("avatar").style.animation = "pulse 1.5s ease-in-out infinite";
    };

    utterance.onend = () => {
      document.getElementById("avatar").style.animation = "none";
    };
  }

  // Mostrar texto y hablar
  showTextGradually(welcomeText);
  speechSynthesis.speak(utterance);
}

// Reproducir
function playSpeech() {
  if (isPaused) {
    speechSynthesis.resume();
    isPaused = false;
    document.getElementById("avatar").style.animation = "pulse 1.5s ease-in-out infinite";
  } else {
    setupAndSpeak();
  }
}

// Pausar
function pauseSpeech() {
  speechSynthesis.pause();
  isPaused = true;
  document.getElementById("avatar").style.animation = "none";
}

// Reiniciar
function restartSpeech() {
  speechSynthesis.cancel();
  utterance = null;
  isPaused = false;
  setupAndSpeak();
}

// Esperar carga de voces antes de iniciar automáticamente
if (speechSynthesis.getVoices().length === 0) {
  speechSynthesis.addEventListener("voiceschanged", () => {
    voicesLoaded = true;
    setupAndSpeak();
  });
} else {
  voicesLoaded = true;
  setupAndSpeak();
}

