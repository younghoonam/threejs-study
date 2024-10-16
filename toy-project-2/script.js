import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { BokehPass } from "three/addons/postprocessing/BokehPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { FXAAShader } from "three/addons/shaders/FXAAShader.js";

// Constants
const BACKGROUND_DISC_ROTATION = 0.001;
const BACKGROUND_DISC_SPEED_DECREASE = 0.003;
const BACKGROUND_DISC_STANDARD_SPEED = -0.01;
const BACKGROUND_DISC_MAX_SPEED = 0.03;
const NUM_OF_DISCS = 10;
const MODEL_LERP_VALUE = 0.1;

// DOM Elements
const canvas = document.querySelector("#canvas");

// Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  35,
  canvas.clientWidth / canvas.clientHeight,
  0.1,
  1000
);
camera.position.z = 5;

// Renderer Setup
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setClearColor(0xf6f6f6);
renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
renderer.setAnimationLoop(animate);

// Lighting
function setupLights() {
  const ambientLight = new THREE.AmbientLight("white", 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight("white", 3);
  directionalLight.position.set(0, 1, 0.5);
  scene.add(directionalLight);

  const directionalBackLight = new THREE.DirectionalLight("pink", 0.5);
  directionalBackLight.position.set(0, -1, 0);
  scene.add(directionalBackLight);

  const light01 = new THREE.DirectionalLight("salmon", 0.7);
  light01.position.set(1, 0, -1);
  scene.add(light01);

  const light02 = new THREE.DirectionalLight("slateblue", 0.3);
  light02.position.set(-1, -0.5, 0.5);
  scene.add(light02);
}
setupLights();

// Postprocessing
const postprocessing = {};
initPostprocessing();

function initPostprocessing() {
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  composer.addPass(
    new BokehPass(scene, camera, { focus: 5, aperture: 0.0001, maxblur: 0.01 })
  );
  composer.addPass(new OutputPass());
  composer.addPass(new ShaderPass(FXAAShader));
  postprocessing.composer = composer;
}

// Model Loader
let model;
const loader = new GLTFLoader();
loader.load("disc.glb", (gltf) => {
  model = gltf.scene;
  model.scale.multiplyScalar(25);
  scene.add(model);
});

// Background Discs
const backgroundDiscs = [];
const discMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xc17368,
  transparent: true,
  opacity: 0.5,
  clearcoat: 1,
  roughness: 0,
  reflectivity: 1,
  ior: 2.333,
  iridescence: 1,
});

const minYPos = -100;
const maxYPos = -minYPos;
let discSpeed = BACKGROUND_DISC_STANDARD_SPEED;

for (let i = 0; i < NUM_OF_DISCS; i++) {
  const discGeometry = new THREE.CylinderGeometry(15, 15, 3, 32);
  const discMesh = new THREE.Mesh(discGeometry, discMaterial);

  discMesh.position.set(
    getRandomNumber(-50, 50),
    getRandomNumber(minYPos, maxYPos),
    getRandomNumber(-50, -150)
  );

  discMesh.rotation.set(
    getRandomNumber(0, Math.PI * 2),
    getRandomNumber(0, Math.PI * 2),
    getRandomNumber(0, Math.PI * 2)
  );

  scene.add(discMesh);
  backgroundDiscs.push(discMesh);
}

// Animation Functions
function animate() {
  transformModel();
  transformBackgroundDiscs();
  postprocessing.composer.render();
}

function transformBackgroundDiscs() {
  // background discs animation
  // fall to bottom & rotate

  backgroundDiscs.forEach((disc) => {
    // add speed to position
    disc.position.y += discSpeed;

    // Reset position if out of bounds
    if (disc.position.y < minYPos) {
      disc.position.y = maxYPos;
    } else if (disc.position.y > maxYPos) {
      disc.position.y = minYPos;
    }

    // Apply rotation
    disc.rotation.x += BACKGROUND_DISC_ROTATION;
    disc.rotation.y += BACKGROUND_DISC_ROTATION;
  });

  // Adjust disc speed
  // bring disc speed back to standard if over or under standard speed
  if (discSpeed > BACKGROUND_DISC_STANDARD_SPEED) {
    discSpeed -= BACKGROUND_DISC_SPEED_DECREASE;
  } else if (discSpeed < BACKGROUND_DISC_STANDARD_SPEED) {
    discSpeed += BACKGROUND_DISC_SPEED_DECREASE;
  }
}

function transformModel() {
  if (model) {
    model.position.lerp(targetPosition, MODEL_LERP_VALUE);
    model.quaternion.slerp(targetQuaternion, MODEL_LERP_VALUE);
  }
}

// Resizing
window.addEventListener("resize", () => {
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Scroll Events
let lastScroll, newScroll;
window.addEventListener("scroll", () => {
  updateTargetTransform();
  accelerateDiscs();
});

function getScrollProgress(format) {
  const scrollTop = window.scrollY;
  const documentHeight = document.documentElement.scrollHeight;
  const windowHeight = window.innerHeight;
  const scrollableHeight = documentHeight - windowHeight;
  const scrollPercentage = scrollTop / scrollableHeight;

  return format === "percentage" ? scrollPercentage * 100 : scrollPercentage;
}

function accelerateDiscs() {
  // change acceleration of discs when scrolled
  newScroll = getScrollProgress();
  // using scroll delta to accelerate or deccelerate
  if (newScroll > lastScroll && discSpeed > -BACKGROUND_DISC_MAX_SPEED) {
    discSpeed -= BACKGROUND_DISC_STANDARD_SPEED;
  } else if (newScroll < lastScroll && discSpeed < BACKGROUND_DISC_MAX_SPEED) {
    discSpeed += BACKGROUND_DISC_STANDARD_SPEED;
  }
  lastScroll = newScroll;
}

// Transform Splines
const transformSpline = {
  position: new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0, 2),
    new THREE.Vector3(-1, 0, 0.8),
    new THREE.Vector3(0, 0, 0),
  ]),
  rotation: new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(Math.PI * 2 - 2, Math.PI * 2 - 1, Math.PI * 2 - 3),
    new THREE.Vector3(Math.PI * 2, Math.PI * 2, Math.PI * 2),
  ]),
};

// global variables for target transforms
let targetRotation = new THREE.Euler();
let targetQuaternion = new THREE.Quaternion();
let targetPosition = new THREE.Vector3();

function updateTargetTransform() {
  // Get Scroll Progress in range of 0-1 to get point at transform spline
  const scrollProgress = getScrollProgress();

  // get points of transform splines using scroll progress
  targetPosition.copy(transformSpline.position.getPointAt(scrollProgress));
  targetRotation.setFromVector3(
    transformSpline.rotation.getPointAt(scrollProgress)
  );

  // convert euler rotation to quaternion
  targetQuaternion.setFromEuler(targetRotation);
}

// Helper Functions
function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
