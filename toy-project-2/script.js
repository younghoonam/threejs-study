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

// Postprocessing
// const effectController = {
//   focus: 5,
//   aperture: 10,
//   maxblur: 0.01,
// };
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
// const matChanger = function () {
//   postprocessing.bokeh.uniforms["focus"].value = effectController.focus;
//   postprocessing.bokeh.uniforms["aperture"].value =
//     effectController.aperture * 0.00001;
//   postprocessing.bokeh.uniforms["maxblur"].value = effectController.maxblur;
// };
// const gui = new GUI();
// gui.add(effectController, "focus", -100, 300.0, 0.01).onChange(matChanger);
// gui.add(effectController, "aperture", 0, 10, 0.01).onChange(matChanger);
// gui.add(effectController, "maxblur", 0.0, 0.1, 0.001).onChange(matChanger);
// matChanger();

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
const constAcceleration = -0.01;
let discAcceleration = constAcceleration;
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

function animate() {
  // Lerp main model transformation
  if (model) {
    model.position.lerp(targetPosition, transformLerpValue);
    model.quaternion.slerp(targetQuaternion, transformLerpValue);
  }

  // background discs animation
  // fall to bottom & rotate
  backgroundDiscs.forEach((element) => {
    element.position.y += discAcceleration;
    if (element.position.y < minYPos) {
      element.position.y = maxYPos;
    }
    element.rotation.x += 0.001;
    element.rotation.y += 0.001;
  });
  if (discAcceleration > constAcceleration) {
    discAcceleration -= 0.002;
  } else if (discAcceleration < constAcceleration) {
    discAcceleration += 0.002;
  }

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

function accelerateDiscs() {
  newScroll = getScrollProgress();
  if (newScroll > lastScroll && discAcceleration > -0.05) {
    discAcceleration -= 0.01;
  } else if (newScroll < lastScroll && discAcceleration < 0.05) {
    discAcceleration += 0.01;
  }
  lastScroll = newScroll;
}

// Position Splines
const transformSpline = {
  position: new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0, 0.5),
    new THREE.Vector3(0, 0, 0.2),
    new THREE.Vector3(0, 0, 0),
  ]),
  rotation: new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(Math.PI * 2 - 2, Math.PI * 2 - 1, Math.PI * 2 - 3),
    // new THREE.Vector3(-0.5, 1.2, 0.5),
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
