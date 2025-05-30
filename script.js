import * as THREE from 'https://cdn.skypack.dev/three';
import { GLTFLoader } from 'https://cdn.skypack.dev/three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

// Cámara
const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 2;

// Renderizador
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("avatarCanvas"),
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Luces
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 2, 2);
scene.add(directionalLight);

// Carga del modelo
const loader = new GLTFLoader();
let avatar;

loader.load('ps1low_poly_pilot.glb', (gltf) => {
  avatar = gltf.scene;
  avatar.scale.set(1.5, 1.5, 1.5);
  avatar.position.set(0, -0.5, 0);
  scene.add(avatar);
}, undefined, (error) => {
  console.error("Error al cargar el modelo:", error);
});

// Animación
function animate() {
  requestAnimationFrame(animate);
  if (avatar) avatar.rotation.y += 0.005;
  renderer.render(scene, camera);
}
animate();

// Voz
function speak(text) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'es-ES';
  utter.pitch = 1.1;
  utter.rate = 1;

  // Selección de voz
  const voices = speechSynthesis.getVoices();
  utter.voice = voices.find(v => v.name.includes("Google") || v.lang === 'es-ES');

  speechSynthesis.speak(utter);
  document.getElementById('dialogueBox').textContent = text;
}

// Iniciar con mensaje
setTimeout(() => {
  speak("Hola, soy tu asistente del curso. Estoy aquí para ayudarte.");
}, 1500);
