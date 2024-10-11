import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { BokehPass } from "three/addons/postprocessing/BokehPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { FXAAShader } from "three/addons/shaders/FXAAShader.js";

let model;
let lastScroll, newScroll;

// movement properties of background discs
const BACKGROUND_DISC_ROTATION = 0.001;
const BACKGROUND_DISC_SPEED_DECREASE = 0.003;
const BACKGROUND_DISC_STANDARD_SPEED = -0.01;
const BACKGROUND_DISC_MAX_SPEED = 0.03;

// lerp value of main model
const transformLerpValue = 0.1;

// Selecting HTML <canvas> element for canvas of renderer
const canvas = document.querySelector("#canvas");

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  35,
  canvas.clientWidth / canvas.clientHeight,
  0.1,
  1000
);
camera.position.z = 5;

// Lights
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

// Renderer
// passing <canvas> to canvas attribute
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setClearColor(0xf6f6f6);
// setting renderer size to the size of <canvas> element
renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
// main animation loop function to renderer
renderer.setAnimationLoop(animate);

// Post Processing
const postprocessing = {};
initPostprocessing();

function initPostprocessing() {
  const renderPass = new RenderPass(scene, camera);

  const bokehPass = new BokehPass(scene, camera, {
    focus: 5,
    aperture: 0.0001,
    maxblur: 0.01,
  });

  const outputPass = new OutputPass();
  const fxaaPass = new ShaderPass(FXAAShader);

  const composer = new EffectComposer(renderer);

  composer.addPass(renderPass);
  composer.addPass(bokehPass);
  composer.addPass(outputPass);
  composer.addPass(fxaaPass);

  postprocessing.composer = composer;
  postprocessing.bokeh = bokehPass;
}

// GLTF loader
const loader = new GLTFLoader();
loader.load(
  // resource URL
  "disc.glb",
  // called when the resource is loaded
  function (gltf) {
    model = gltf.scene;
    model.scale.multiplyScalar(25);
    scene.add(model);
  }
);

// Background discs
const minYPos = -100;
const maxYPos = minYPos * -1;
const numOfDiscs = 10;
let discSpeed = BACKGROUND_DISC_STANDARD_SPEED;
const discMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xc17368,
  transparent: true,
  opacity: 0.5,
  clearcoat: 1,
  roughness: 0,
  reflectivity: 1,
  ior: 2.333,
  iridescence: 1,
  specularIntensity: 0,
  specularColor: 0xffffff,
});
const backgroundDiscs = [];
for (let index = 0; index < numOfDiscs; index++) {
  const discGeometry = new THREE.CylinderGeometry(15, 15, 3, 32);

  const xPos = getRandomNumber(-50, 50);
  const yPos = getRandomNumber(minYPos, maxYPos);
  const zPos = getRandomNumber(-50, -150);

  const xRot = getRandomNumber(0, Math.PI * 2);
  const yRot = getRandomNumber(0, Math.PI * 2);
  const zRot = getRandomNumber(0, Math.PI * 2);

  const discMesh = new THREE.Mesh(discGeometry, discMaterial);

  discMesh.position.set(xPos, yPos, zPos);
  discMesh.rotation.set(xRot, yRot, zRot);

  backgroundDiscs.push(discMesh);

  scene.add(backgroundDiscs[index]);
}

function transformBackgroundDiscs() {
  // background discs animation
  // fall to bottom & rotate
  backgroundDiscs.forEach((element) => {
    // add speed to position
    element.position.y += discSpeed;

    // bring to top if disc reaches bottom
    // bring to bottom if disc reaches top
    if (element.position.y < minYPos) {
      element.position.y = maxYPos;
    } else {
      element.position.y = minYPos;
    }

    // add rotation
    element.rotation.x += BACKGROUND_DISC_ROTATION;
    element.rotation.y += BACKGROUND_DISC_ROTATION;
  });

  // bring disc speed back to standard if over or under standard speed
  if (discSpeed > BACKGROUND_DISC_STANDARD_SPEED) {
    discSpeed -= BACKGROUND_DISC_SPEED_DECREASE;
  } else if (discSpeed < BACKGROUND_DISC_STANDARD_SPEED) {
    discSpeed += BACKGROUND_DISC_SPEED_DECREASE;
  }
}

function transformModel() {
  // Lerp main model transformation
  if (model) {
    model.position.lerp(targetPosition, transformLerpValue);
    model.quaternion.slerp(targetQuaternion, transformLerpValue);
  }
}

function animate() {
  transformModel();
  transformBackgroundDiscs();
  postprocessing.composer.render();
}

// Resizing
window.addEventListener("resize", () => {
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener("scroll", () => {
  updateTargetTransform();
  accelerateDiscs();
});

function getScrollProgress(format) {
  // Get the current scroll position (how far the user has scrolled)
  const scrollTop = window.scrollY;

  // Get the height of the content (total scrollable area) minus the visible part of the window
  const documentHeight = document.documentElement.scrollHeight;
  const windowHeight = window.innerHeight;

  // Calculate the scrollable height
  const scrollableHeight = documentHeight - windowHeight;

  // Calculate the scroll percentage
  const scrollPercentage = scrollTop / scrollableHeight;

  if (format == "percentage") {
    return scrollPercentage * 100;
  } else {
    return scrollPercentage;
  }
}

// change acceleration of discs when scrolled
function accelerateDiscs() {
  newScroll = getScrollProgress();
  // using scroll delta to accelerate or deccelerate
  if (newScroll > lastScroll && discSpeed > -1 * BACKGROUND_DISC_MAX_SPEED) {
    discSpeed -= BACKGROUND_DISC_STANDARD_SPEED;
  } else if (newScroll < lastScroll && discSpeed < BACKGROUND_DISC_MAX_SPEED) {
    discSpeed += BACKGROUND_DISC_STANDARD_SPEED;
  }
  lastScroll = newScroll;
}

// Position Splines
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

//
// Helper functions
//

function getRandomNumber(min, max) {
  return Math.random() * (max - min + 1) + min;
}
