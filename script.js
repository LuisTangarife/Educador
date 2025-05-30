import * as THREE from 'https://cdn.skypack.dev/three';
import { GLTFLoader } from 'https://cdn.skypack.dev/three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 2;

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("avatarCanvas"), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const loader = new GLTFLoader();
let avatar;

loader.load('./avatar/rostro.glb', (gltf) => {
  avatar = gltf.scene;
  scene.add(avatar);
}, undefined, console.error);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 2, 2);
scene.add(light);

function animate() {
  requestAnimationFrame(animate);
  if (avatar) avatar.rotation.y += 0.005; // leve rotación para realismo
  renderer.render(scene, camera);
}
animate();

// VOZ: texto a voz
function speak(text) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'es-ES';
  utter.pitch = 1.1;
  utter.rate = 1;
  utter.voice = speechSynthesis.getVoices().find(v => v.name.includes('Google') || v.lang === 'es-ES');
  speechSynthesis.speak(utter);

  // Mostrar texto en pantalla
  document.getElementById('dialogueBox').textContent = text;
}

// Ejemplo inicial
setTimeout(() => {
  speak("Hola, soy tu asistente del curso. Estoy aquí para ayudarte.");
}, 2000);
