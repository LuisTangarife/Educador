const welcomeText = `Bienvenidos al Curso de Posgrado en Gestión Avanzada de Proyectos. 
Mi nombre es Luis Alberto Benavides, seré su asistente virtual durante este apasionante viaje académico. 
Este curso está diseñado para profesionales que desean profundizar en las mejores prácticas, herramientas y metodologías de gestión de proyectos en entornos complejos y cambiantes. 
Exploraremos técnicas avanzadas para la planificación, ejecución, control y cierre de proyectos, con un enfoque especial en liderazgo, innovación y gestión de equipos multidisciplinarios. 
Espero acompañarlos y guiarlos para que puedan potenciar sus habilidades y llevar sus proyectos al siguiente nivel. ¡Bienvenidos y mucho éxito!`;

function speakAndDisplay(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'es-ES';
  utterance.pitch = 1.1;
  utterance.rate = 1;

  // Selección de voz amigable en español
  const voices = speechSynthesis.getVoices();
  utterance.voice =
    voices.find(v => v.lang === 'es-ES' && v.name.toLowerCase().includes("google")) ||
    voices.find(v => v.lang === 'es-ES') ||
    null;

  const display = document.getElementById("textDisplay");
  display.textContent = "";
  let index = 0;

  // Mostrar texto progresivamente letra por letra
  const interval = setInterval(() => {
    if (index < text.length) {
      display.textContent += text.charAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  }, 40); // velocidad de aparición del texto

  // Animación al hablar
  utterance.onstart = () => {
    document.getElementById("avatar").style.animation = "pulse 1.5s ease-in-out infinite";
  };

  utterance.onend = () => {
    document.getElementById("avatar").style.animation = "none";
  };

  // Iniciar habla
  speechSynthesis.speak(utterance);
}

// Asegura que las voces estén disponibles antes de iniciar
if (speechSynthesis.getVoices().length === 0) {
  speechSynthesis.addEventListener("voiceschanged", () => {
    speakAndDisplay(welcomeText);
  });
} else {
  speakAndDisplay(welcomeText);
}


