function speak(text) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'es-ES';
  utter.pitch = 1.1;
  utter.rate = 1;

  // Selección de voz amigable
  const voices = speechSynthesis.getVoices();
  utter.voice = voices.find(v => v.name.includes("Google") || v.lang === 'es-ES');

  // Mostrar texto
  document.getElementById("dialogueBox").textContent = text;
  speechSynthesis.speak(utter);
}

// Asegura que las voces estén cargadas antes de hablar
if (speechSynthesis.getVoices().length === 0) {
  speechSynthesis.addEventListener("voiceschanged", () => {
    speak("Hola, soy tu asistente del curso. Estoy aquí para ayudarte.");
  });
} else {
  speak("Hola, soy tu asistente del curso. Estoy aquí para ayudarte.");
}
