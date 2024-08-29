import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

let model;

// Selecting HTML <canvas> element for canvas of renderer
const canvas = document.querySelector("#canvas");

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  canvas.clientWidth / canvas.clientHeight,
  0.1,
  1000
);
camera.position.z = 1;

// Ambient Light for a simple even lighting
const ambientLight = new THREE.AmbientLight("white", 10);
scene.add(ambientLight);

// Renderer
// passing <canvas> to canvas attribute
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
// setting renderer size to the size of <canvas> element
renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
// main animation loop function to renderer
renderer.setAnimationLoop(animate);

// GLTF loader
const loader = new GLTFLoader();
loader.load(
  // resource URL
  "hello-world.glb",
  // called when the resource is loaded
  function (gltf) {
    model = gltf.scene;
    scene.add(model);
  }
);

function animate() {
  if (model) {
    model.rotation.y += 0.01;
  }
  renderer.render(scene, camera);
}

// Resizing
window.addEventListener("resize", () => {
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
