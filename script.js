const welcomeText = `Bienvenidos al Curso de Posgrado en Gestión Avanzada de Proyectos. 
Mi nombre es Luis Alberto Benavides, seré su asistente virtual durante este apasionante viaje académico. 
Este curso está diseñado para profesionales que desean profundizar en las mejores prácticas, herramientas y metodologías de gestión de proyectos en entornos complejos y cambiantes. 
Exploraremos técnicas avanzadas para la planificación, ejecución, control y cierre de proyectos, con un enfoque especial en liderazgo, innovación y gestión de equipos multidisciplinarios. 
Espero acompañarlos y guiarlos para que puedan potenciar sus habilidades y llevar sus proyectos al siguiente nivel. ¡Bienvenidos y mucho éxito!`;

let utterance;
let isPaused = false;
let currentCharIndex = 0;
let textInterval;
let voicesLoaded = false;

function showTextGradually(text) {
  clearInterval(textInterval);
  const display = document.getElementById("textDisplay");
  display.textContent = "";
  currentCharIndex = 0;
  textInterval = setInterval(() => {
    if (currentCharIndex < text.length) {
      display.textContent += text.charAt(currentCharIndex);
      currentCharIndex++;
    } else {
      clearInterval(textInterval);
    }
  }, 40);
}

function setupAndSpeak() {
  if (!voicesLoaded) return;

  if (speechSynthesis.speaking) {
    speechSynthesis.cancel();
  }

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

  showTextGradually(welcomeText);
  speechSynthesis.speak(utterance);
}

function playSpeech() {
  if (isPaused) {
    speechSynthesis.resume();
    isPaused = false;
    document.getElementById("avatar").style.animation = "pulse 1.5s ease-in-out infinite";
  } else {
    setupAndSpeak();
  }
}

function pauseSpeech() {
  if (speechSynthesis.speaking) {
    speechSynthesis.pause();
    isPaused = true;
    document.getElementById("avatar").style.animation = "none";
  }
}

function restartSpeech() {
  if (speechSynthesis.speaking || isPaused) {
    speechSynthesis.cancel();
  }
  isPaused = false;
  setupAndSpeak();
}

function loadVoices() {
  return new Promise((resolve) => {
    let voices = speechSynthesis.getVoices();
    if (voices.length !== 0) {
      resolve(voices);
    } else {
      speechSynthesis.addEventListener("voiceschanged", () => {
        voices = speechSynthesis.getVoices();
        resolve(voices);
      });
    }
  });
}

// Botones
document.getElementById("playBtn").addEventListener("click", playSpeech);
document.getElementById("pauseBtn").addEventListener("click", pauseSpeech);
document.getElementById("restartBtn").addEventListener("click", restartSpeech);

// Cargar voces y hablar automáticamente
loadVoices().then(() => {
  voicesLoaded = true;
  setupAndSpeak();
});

