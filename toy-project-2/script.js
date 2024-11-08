// Imports
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
// import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
// import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { BokehPass } from "three/addons/postprocessing/BokehPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { FilmPass } from "three/addons/postprocessing/FilmPass.js";
import { FXAAShader } from "three/addons/shaders/FXAAShader.js";

import {
  BloomEffect,
  EffectComposer,
  EffectPass,
  RenderPass,
  DepthOfFieldEffect,
  FXAAEffect,
} from "postprocessing";

import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import { TransformSpline } from "./TransformSpline.js";
import { GeometryMorpher } from "./GeometryMorpher.js";
import { Keyframes } from "./Keyframes.js";
import * as Utils from "./Utils.js";

// Constants
const BACKGROUND_DISC_ROTATION = 0.001;
const BACKGROUND_DISC_SPEED_DECREASE = 0.001;
const BACKGROUND_DISC_STANDARD_SPEED = -0.01;
const BACKGROUND_DISC_MAX_SPEED = 0.05;
const NUM_OF_DISCS = 10;
const minYPos = -100;
const maxYPos = -minYPos;

// Global Variables
let discSpeed = BACKGROUND_DISC_STANDARD_SPEED;
let model, morphingModel, modelTransformSpline, geometryMorpher;
const backgroundDiscs = [];
const postprocessing = {};
const clock = new THREE.Clock();

// DOM Elements
const canvas = document.querySelector("#canvas");
const scrollContainer = document.querySelector(".snap-container");

// Scene Initialization
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  30,
  canvas.clientWidth / canvas.clientHeight,
  0.1,
  1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  // antialias: true,
  // alpha: true,
  powerPreference: "high-performance",
  stencil: false,
  depth: false,
});
renderer.setClearColor(0xcac6c5, 1);
renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
renderer.setAnimationLoop(animate);

// Lighting Setup
setupLights();
function setupLights() {
  const ambientLight = new THREE.AmbientLight("white", 0.5);
  scene.add(ambientLight);

  const lights = [
    { color: "white", intensity: 2, position: [0.3, 1, 0.2] },
    { color: "pink", intensity: 0.5, position: [0, -1, 0] },
    { color: "salmon", intensity: 0.7, position: [1, 0, -1] },
    { color: "slateblue", intensity: 0.3, position: [-1, -0.5, 0.5] },
    { color: "white", intensity: 2, position: [-1, 0, 0.5] },
  ];

  lights.forEach(({ color, intensity, position }) => {
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(...position);
    scene.add(light);
  });
}

// Postprocessing Setup
// initPostprocessing();
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

const depthOfFieldEffect = new DepthOfFieldEffect(camera, {
  worldFocusDistance: 5,
  worldFocusRange: 10,
  bokehScale: 10,
});
console.log(depthOfFieldEffect);
initPmndrs();
function initPmndrs() {
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  composer.addPass(new EffectPass(camera, depthOfFieldEffect));
  composer.addPass(new EffectPass(camera, new FXAAEffect()));
  postprocessing.composer = composer;
}

// Model & JSON Loader
loadModelTransformSpline();
async function loadModelTransformSpline() {
  const [gltf, points] = await Promise.all([
    loadModel(),
    loadTransformPoints(),
  ]);

  model = gltf.scene;
  console.log(model);

  // model.children[0].material.roughness = 0;
  // model.children[0].material.reflectivity = 1;

  const material = new THREE.MeshPhysicalMaterial({
    roughness: 1,
    reflectivity: 1,
  });

  model.traverse((mesh) => {
    if (mesh.isMesh) {
      mesh.material = material;
    }
  });

  model.scale.multiplyScalar(15);
  morphingModel = model.children.find((child) => child.name == "top");
  geometryMorpher = new GeometryMorpher(morphingModel.geometry);

  scene.add(model);
  modelTransformSpline = new TransformSpline(
    model,
    points.positionPoints,
    points.quaternionPoints,
    camera,
    canvas,
    scene
  );
  modelTransformSpline.addKeyframes(keyframes);
  console.log(modelTransformSpline);
}

async function loadModel() {
  const loader = new GLTFLoader();
  const gltf = await loader.loadAsync("../toy-project-2/disc.glb");
  return gltf;
}

async function loadTransformPoints() {
  const response = await fetch("../toy-project-2/config.json");
  const data = await response.json();
  return data;
}

// Background Discs Setup
// setupBackgroundDiscs();
function setupBackgroundDiscs() {
  const discMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xfdb29d,
    transparent: true,
    opacity: 0.3,
    clearcoat: 1,
    roughness: 0,
    reflectivity: 1,
    ior: 2.333,
    iridescence: 1,
  });

  for (let i = 0; i < NUM_OF_DISCS; i++) {
    const discGeometry = new THREE.CylinderGeometry(15, 15, 3, 32);
    const discMesh = new THREE.Mesh(discGeometry, discMaterial);

    discMesh.position.set(
      Utils.getRandomNumber(-50, 50),
      Utils.getRandomNumber(minYPos, maxYPos),
      Utils.getRandomNumber(-100, -150)
    );

    discMesh.rotation.set(
      Utils.getRandomNumber(0, Math.PI * 2),
      Utils.getRandomNumber(0, Math.PI * 2),
      Utils.getRandomNumber(0, Math.PI * 2)
    );

    scene.add(discMesh);
    backgroundDiscs.push(discMesh);
  }
}

// Animation Functions
function animate() {
  if (modelTransformSpline && geometryMorpher) {
    modelTransformSpline.update();
    geometryMorpher.morph(clock);
  }
  transformBackgroundDiscs();
  postprocessing.composer.render();
}

function transformBackgroundDiscs() {
  backgroundDiscs.forEach((disc) => {
    disc.position.y += discSpeed;
    if (disc.position.y < minYPos) disc.position.y = maxYPos;
    if (disc.position.y > maxYPos) disc.position.y = minYPos;
    disc.rotation.x += BACKGROUND_DISC_ROTATION;
    disc.rotation.y += BACKGROUND_DISC_ROTATION;
  });

  discSpeed = THREE.MathUtils.clamp(
    discSpeed +
      Math.sign(BACKGROUND_DISC_STANDARD_SPEED - discSpeed) *
        BACKGROUND_DISC_SPEED_DECREASE,
    BACKGROUND_DISC_STANDARD_SPEED,
    BACKGROUND_DISC_MAX_SPEED
  );
}

// Resizing
window.addEventListener("resize", () => {
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Scroll Events
let lastScroll = 0;
scrollContainer.addEventListener("scroll", () => {
  accelerateDiscs();
});
function accelerateDiscs() {
  const newScroll = Utils.getScrollProgress();
  const scrollDirection = Math.sign(newScroll - lastScroll);

  discSpeed += scrollDirection * BACKGROUND_DISC_STANDARD_SPEED;
  discSpeed = THREE.MathUtils.clamp(
    discSpeed,
    -BACKGROUND_DISC_MAX_SPEED,
    BACKGROUND_DISC_MAX_SPEED
  );
  lastScroll = newScroll;
}

const keyframeElements = document.querySelectorAll(".keyframe");
const keyframes = new Keyframes(keyframeElements);

// GUI Setup
const gui = new GUI();
gui.show(false);
const guiParams = {
  logPositionPoints: function () {
    console.log(modelTransformSpline.positionSpline.points);
  },
  showTransformControls: false,
};
gui.add(guiParams, "logPositionPoints");
gui.add(guiParams, "showTransformControls").onChange((show) => {
  if (show) modelTransformSpline.addHandlesToScene();
  else modelTransformSpline.removeHandlesFromScene();
});
console.log;
const DOFFolder = gui.addFolder("DepthOfField");
DOFFolder.add(
  depthOfFieldEffect.cocMaterial,
  "worldFocusDistance",
  0,
  100,
  0.1
);
DOFFolder.add(depthOfFieldEffect.cocMaterial, "worldFocusRange", 0, 10, 0.1);
DOFFolder.add(depthOfFieldEffect, "bokehScale", 0, 10, 0.1);
DOFFolder.add(depthOfFieldEffect.blendMode, "blendFunction", 0, 50, 1);
