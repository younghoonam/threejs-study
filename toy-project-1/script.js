import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { lerp } from "three/src/math/MathUtils.js";

import Lenis from "lenis";

let model;
let mixer;
let currentAnimationTime = 0;
let targetAnimationTime = 0;
const animationLength = 10;
const clock = new THREE.Clock();

// const lenis = new Lenis();

// lenis.on("scroll", (e) => {
//   console.log(e);
// });

// function raf(time) {
//   lenis.raf(time);
//   requestAnimationFrame(raf);
// }

// requestAnimationFrame(raf);

window.addEventListener("scroll", () => {
  // Get the current scroll position (how far the user has scrolled)
  const scrollTop = window.scrollY;

  // Get the height of the content (total scrollable area) minus the visible part of the window
  const documentHeight = document.documentElement.scrollHeight;
  const windowHeight = window.innerHeight;

  // Calculate the scrollable height
  const scrollableHeight = documentHeight - windowHeight;

  // Calculate the scroll percentage
  const scrollPercentage = scrollTop / scrollableHeight;
  targetAnimationTime = scrollPercentage * animationLength;
});

// Selecting HTML <canvas> element for canvas of renderer
const canvas = document.querySelector("#canvas");

// Renderer
// passing <canvas> to canvas attribute
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
// setting renderer size to the size of <canvas> element
renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
// main animation loop function to renderer
renderer.setAnimationLoop(animate);

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  15,
  canvas.clientWidth / canvas.clientHeight,
  0.1,
  1000
);

// Orbit Control
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableZoom = false;
orbitControls.enablePan = false;

camera.position.z = 1;
orbitControls.update();

// Ambient Light for a simple even lighting
const ambientLight = new THREE.AmbientLight("white", 0.3);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight("white", 2);
scene.add(directionalLight);

// GLTF loader
const loader = new GLTFLoader();
loader.load(
  // resource URL
  "/toy-shape.glb",
  // called when the resource is loaded
  function (gltf) {
    model = gltf.scene;
    scene.add(model);
    console.log(gltf);

    // Initialize the animation mixer
    mixer = new THREE.AnimationMixer(model);

    // Get the animation clips from the model
    const clips = gltf.animations;

    // Play the first animation (or choose the desired one)
    const action = mixer.clipAction(clips[0], model);
    action.play();

    // Hide parts
    model.children[0].material = new THREE.MeshStandardMaterial();
    model.children[0].material.transparent = true;
    model.children[0].material.opacity = 0;

    model.children[2].material = new THREE.MeshStandardMaterial();
    model.children[2].material.transparent = true;
    model.children[2].material.opacity = 0;
  }
);

function animate() {
  orbitControls.update();

  currentAnimationTime = lerp(currentAnimationTime, targetAnimationTime, 0.1);

  if (model) {
    model.rotation.y += 0.002;
    // Update the animation mixer on each scroll
    model.children[0].material.opacity =
      currentAnimationTime / (animationLength - animationLength / 2);

    model.children[2].material.opacity =
      (currentAnimationTime - animationLength / 2) /
      (animationLength - animationLength / 2);
    if (mixer) mixer.setTime(animationLength - currentAnimationTime);
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
