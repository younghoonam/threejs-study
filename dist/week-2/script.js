import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import GUI from "https://cdn.jsdelivr.net/npm/lil-gui@0.19/+esm";

// Canvas
const canvas = document.querySelector("canvas");
const canvasRect = canvas.getBoundingClientRect();

// lil-gui GUI
const gui = new GUI();
gui.open(false);

// gui parameteres
const params = {
  camera: "Perspective Camera",
  fov: 20,

  pointLights: true,
  ambientLights: true,
  directionalLights: true,
  rectLights: true,
};

// Imported Model varible
let model;

// clock object for animation timing
const clock = new THREE.Clock();

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setClearColor(0xf5f5f7);
// set false to third parameter(updateStyle) to disable threejs from editing style changes to output canvas
renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
renderer.setAnimationLoop(animate);

// Scene
const scene = new THREE.Scene();

// Perspective camera
const perspectiveCamera = new THREE.PerspectiveCamera(
  20,
  canvas.clientWidth / canvas.clientHeight,
  0.1,
  1000
);
perspectiveCamera.position.x = 5;
perspectiveCamera.position.z = 6;
perspectiveCamera.position.y = 5;
perspectiveCamera.lookAt(new THREE.Vector3(0, 0, 0));

// Orthographic Camera
const orthographicCamera = new THREE.OrthographicCamera(
  canvas.clientWidth / -100,
  canvas.clientWidth / 100,
  canvas.clientHeight / 100,
  canvas.clientHeight / -100,
  1,
  1000
);
orthographicCamera.position.x = 5;
orthographicCamera.position.z = 6;
orthographicCamera.position.y = 5;
orthographicCamera.lookAt(new THREE.Vector3(0, 0, 0));

// RectAreaLight
const rectLight = new THREE.RectAreaLight(0xfcba03, 1, 10, 10);
rectLight.position.set(0, 0, -5);
rectLight.lookAt(0, 0, 0);
scene.add(rectLight);

// Point Lights
const pointLight1 = new THREE.PointLight("white", 10);
pointLight1.position.z = 3;
pointLight1.position.x = 2;
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight("red", 20);
pointLight2.position.set(1, 2, 3);
scene.add(pointLight2);

// Ambient Light
const ambientLight = new THREE.AmbientLight("white", 0.1);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight(0xf8806d, 5);
directionalLight.position.set(3, 3, 15);
directionalLight.castShadow = true;
scene.add(directionalLight);

// GLTF loader
const loader = new GLTFLoader();
loader.load(
  // resource URL
  "facade.glb",
  // called when the resource is loaded
  function (gltf) {
    model = gltf.scene;
    model.scale.set(1000, 1000, 1000);
    model.traverse((mesh) => {
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.recieveShadow = true;
      }
    });
    console.log(model);
    scene.add(model);
  }
);

function animate() {
  const elapsedTime = clock.getElapsedTime();

  // Orbiting animations of point lights
  pointLight1.position.x = Math.sin(elapsedTime) * 3;
  pointLight1.position.y = Math.cos(elapsedTime) * 3;

  pointLight2.position.x = Math.sin(elapsedTime * 0.5) * 5 + 3;
  pointLight2.position.y = Math.cos(elapsedTime * 0.5) * 5;

  // Render with perspective camera or orthographic camera
  if (params.camera == "Perspective Camera") {
    renderer.render(scene, perspectiveCamera);
  }
  if (params.camera == "Orthographic Camera") {
    renderer.render(scene, orthographicCamera);
  }
}

// gui settings of camera and light parameters
gui.add(params, "camera", ["Perspective Camera", "Orthographic Camera"]);
gui.add(params, "fov", 10, 100, 1).onChange((value) => {
  perspectiveCamera.fov = params.fov;
  perspectiveCamera.updateProjectionMatrix();
});
gui.add(params, "pointLights").onChange((value) => {
  pointLight1.visible = params.pointLights;
  pointLight2.visible = params.pointLights;
});
gui.add(params, "ambientLights").onChange((value) => {
  ambientLight.visible = params.ambientLights;
});
gui.add(params, "directionalLights").onChange((value) => {
  directionalLight.visible = params.directionalLights;
});
gui.add(params, "rectLights").onChange((value) => {
  rectLight.visible = params.rectLights;
});

// Resizing
window.addEventListener("resize", () => {
  perspectiveCamera.aspect = canvas.clientWidth / canvas.clientHeight;
  perspectiveCamera.updateProjectionMatrix();
  orthographicCamera.aspect = canvas.clientWidth / canvas.clientHeight;
  orthographicCamera.updateProjectionMatrix();

  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Mouse - perspectiveCamera position interaction
canvas.addEventListener("mousemove", moveCamera);
function moveCamera(event) {
  perspectiveCamera.position.x = (event.pageX - canvasRect.left) * 0.01;
  perspectiveCamera.position.y = (event.pageY - canvasRect.top) * 0.01 + 3;

  orthographicCamera.position.x = (event.pageX - canvasRect.left) * 0.01;
  orthographicCamera.position.y = (event.pageY - canvasRect.top) * 0.01 + 3;
}
