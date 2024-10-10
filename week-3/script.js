import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Selecting HTML <canvas> element for canvas of renderer
const canvas = document.querySelector("#week-3-canvas");

// Clock
const clock = new THREE.Clock();
let timeCounter = 0;
const interval = 1;

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  canvas.clientWidth / canvas.clientHeight,
  0.1,
  1000
);

// Orbit Controls
const orbitControls = new OrbitControls(camera, canvas);
camera.position.set(3.5, -5.5, 3);
camera.lookAt(2, -4, -1);
orbitControls.update();

// Ambient Light for a simple even lighting
const ambientLight = new THREE.AmbientLight("white", 1);
scene.add(ambientLight);
// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(-0.5, -0.3, 1);
scene.add(directionalLight);

//////////////
// Box Grid //
//////////////
// Box Count
const xCount = 30;
const yCount = 30;
const boxCount = xCount * yCount;

// XY center positions
const xPositions = [];
const yPositions = [];
for (let yIndex = 0; yIndex < yCount; yIndex++) {
  for (let xIndex = 0; xIndex < xCount; xIndex++) {
    xPositions.push(xIndex - (xCount - 1) / 2);
    yPositions.push(yIndex - (yCount - 1) / 2);
  }
}

// Box mesh Array
const boxArray = [];
// Array of indices of vertices that are on the top surface
const topVertexIndices = [0, 6, 15, 21, 30, 33, 36, 39, 48, 51, 54, 57];
// Array of target heights of the top vertices to lerp into
const targetHeights = [];
for (let index = 0; index < boxCount; index++) {
  targetHeights.push(0);
}

// Creating array of boxes
for (let index = 0; index < boxCount; index++) {
  // Create Mesh
  const tempBox = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshStandardMaterial()
  );

  // Randomize Color
  tempBox.material.color.r = Math.random();

  // Set positions
  tempBox.position.x = xPositions[index];
  tempBox.position.y = yPositions[index];

  // push to array
  boxArray.push(tempBox);
}

// Add the array of meshes to the scene
boxArray.forEach((child) => {
  scene.add(child);
});

// Renderer
// passing <canvas> to canvas attribute
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setClearColor(0xf5f5f7);
// setting renderer size to the size of <canvas> element
renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
// main animation loop function to renderer
renderer.setAnimationLoop(animate);

////////////////////
// Animation Loop //
////////////////////
function animate() {
  const delta = clock.getDelta();

  // Randomize box target heights every second
  timeCounter += delta;
  if (timeCounter >= interval) {
    randomizeTargetHeights();
    timeCounter = 0;
  }
  // lerp and update box heights
  updateBoxHeights();

  orbitControls.update();
  renderer.render(scene, camera);
}

function randomizeTargetHeights() {
  for (let index = 0; index < boxArray.length; index++) {
    // Generate random Height
    const randomHeight = Math.random();
    if (Math.random() < 0.1) {
      // 10% of heights get 10 times the height value
      targetHeights[index] = randomHeight * 3;
    } else {
      // 90% of heights are normal
      targetHeights[index] = randomHeight;
    }
  }
}

function updateBoxHeights() {
  // 2 nested loops
  // Box Loop
  for (let boxIndex = 0; boxIndex < boxArray.length; boxIndex++) {
    // Vertex Loop
    for (
      let vertexIndex = 0;
      vertexIndex < topVertexIndices.length;
      vertexIndex++
    ) {
      // Create temporary vector
      const tempVector3 = new THREE.Vector3();
      // store current vertex position to vector
      tempVector3.fromArray(
        boxArray[boxIndex].geometry.attributes.position.array,
        topVertexIndices[vertexIndex]
      );
      // lerp current position to target position
      const lerpedZPosition = THREE.MathUtils.lerp(
        tempVector3.z,
        targetHeights[boxIndex],
        0.025
      );
      tempVector3.z = lerpedZPosition;
      // update vertex with vector
      tempVector3.toArray(
        boxArray[boxIndex].geometry.attributes.position.array,
        topVertexIndices[vertexIndex]
      );
    }
    // flag update
    boxArray[boxIndex].geometry.attributes.position.needsUpdate = true;
  }
}

// Resizing
window.addEventListener("resize", () => {
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
