function speak(text) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'es-ES';
  utter.pitch = 1.1;
  utter.rate = 1;

  const voices = speechSynthesis.getVoices();
  utter.voice = voices.find(
    (v) => v.lang === 'es-ES' || v.name.toLowerCase().includes('google')
  ) || voices[0];

  // Mostrar texto
  document.getElementById("dialogueBox").textContent = text;

  // Cuando empieza a hablar: activar animación
  utter.onstart = () => {
    document.getElementById("avatar").style.animation = "pulse 1.5s ease-in-out infinite";
  };

  // Cuando termina: desactivar animación
  utter.onend = () => {
    document.getElementById("avatar").style.animation = "none";
  };

  speechSynthesis.speak(utter);
}

// Texto de presentación del curso
const welcomeText = `Bienvenidos al Curso de Posgrado en Gestión Avanzada de Proyectos. 
Mi nombre es Luis Alberto Benavides, seré su asistente virtual durante este apasionante viaje académico. 
Este curso está diseñado para profesionales que desean profundizar en las mejores prácticas, herramientas y metodologías de gestión de proyectos en entornos complejos y cambiantes. 
Exploraremos técnicas avanzadas para la planificación, ejecución, control y cierre de proyectos, con un enfoque especial en liderazgo, innovación y gestión de equipos multidisciplinarios. 
Espero acompañarlos y guiarlos para que puedan potenciar sus habilidades y llevar sus proyectos al siguiente nivel. ¡Bienvenidos y mucho éxito!`;

// Esperar a que las voces se carguen para iniciar el habla
if (speechSynthesis.getVoices().length === 0) {
  speechSynthesis.addEventListener("voiceschanged", () => {
    speak(welcomeText);
  });
} else {
  speak(welcomeText);
}

