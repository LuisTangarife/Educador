const fullText = [
  "Bienvenidos al Curso de Posgrado en Gestión Avanzada de Proyectos.",
  "Mi nombre es Luz Angela, seré su asistente virtual durante este apasionante viaje académico.",
  "Este curso está diseñado para profesionales que desean profundizar en las mejores prácticas, herramientas y metodologías de gestión de proyectos en entornos complejos y cambiantes.",
  "Exploraremos técnicas avanzadas para la planificación, ejecución, control y cierre de proyectos, con un enfoque especial en liderazgo, innovación y gestión de equipos multidisciplinarios.",
  "Espero acompañarlos y guiarlos para que puedan potenciar sus habilidades y llevar sus proyectos al siguiente nivel. ¡Bienvenidos y mucho éxito!"
];

let currentFragment = 0;
let utterance;
let isPaused = false;
let currentCharIndex = 0;
let textInterval;
let voicesLoaded = false;
let display = document.getElementById("textDisplay");
const avatar = document.getElementById("avatar");

function showTextGradually(text, callback) {
  clearInterval(textInterval);
  display.textContent = "";
  currentCharIndex = 0;
  textInterval = setInterval(() => {
    if (isPaused) return;
    if (currentCharIndex < text.length) {
      display.textContent += text.charAt(currentCharIndex);
      currentCharIndex++;
    } else {
      clearInterval(textInterval);
      if (callback) callback();
    }
  }, 50);
}

function speakFragment(index) {
  if (index >= fullText.length) {
    avatar.pause();
    return;
  }

  utterance = new SpeechSynthesisUtterance(fullText[index]);
  utterance.lang = 'es-ES';
  utterance.pitch = 1.1;
  utterance.rate = 1;

  const voices = speechSynthesis.getVoices();
  utterance.voice =
    voices.find(v => v.lang === 'es-ES' && v.name.toLowerCase().includes("google")) ||
    voices.find(v => v.lang === 'es-ES');

  utterance.onstart = () => {
    avatar.play();
    isPaused = false;
    showTextGradually(fullText[index]);
  };

  utterance.onend = () => {
    currentFragment++;
    speakFragment(currentFragment);
  };

  speechSynthesis.speak(utterance);
}

function playSpeech() {
  if (isPaused) {
    speechSynthesis.resume();
    isPaused = false;
    avatar.play();
  } else {
    currentFragment = 0;
    speakFragment(currentFragment);
  }
}

function pauseSpeech() {
  if (speechSynthesis.speaking) {
    speechSynthesis.pause();
    isPaused = true;
    avatar.pause();
  }
}

function restartSpeech() {
  speechSynthesis.cancel();
  isPaused = false;
  currentFragment = 0;
  display.textContent = "";
  playSpeech();
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

document.getElementById("playBtn").addEventListener("click", playSpeech);
document.getElementById("pauseBtn").addEventListener("click", pauseSpeech);
document.getElementById("restartBtn").addEventListener("click", restartSpeech);

loadVoices().then(() => {
  voicesLoaded = true;
  playSpeech();
});
