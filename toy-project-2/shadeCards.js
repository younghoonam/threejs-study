import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import gsap from "gsap";

// Example usage
const shadesData = [
  {
    title: "17C 아이보리 포슬린",
    rgb: { r: 245, g: 235, b: 225 },
    description:
      "밝고 쿨한 느낌의 아이보리 색상으로 맑고 깨끗한 톤을 표현합니다.",
    materialConfig: {
      color: new THREE.Color(245 / 255, 235 / 255, 225 / 255),
      metalness: 0.1,
      roughness: 0.8,
      reflectivity: 0.4,
    },
  },
  {
    title: "19N 페어 베이지",
    rgb: { r: 240, g: 224, b: 207 },
    description: "뉴트럴 톤의 밝은 베이지로, 투명하고 자연스러운 색상입니다.",
    materialConfig: {
      color: new THREE.Color(240 / 255, 224 / 255, 207 / 255),
      metalness: 0.1,
      roughness: 0.75,
      reflectivity: 0.5,
    },
  },
  {
    title: "21C 라이트 누드",
    rgb: { r: 235, g: 215, b: 200 },
    description:
      "쿨톤의 밝은 누드 컬러로 차분하면서도 자연스러운 피부 톤입니다.",
    materialConfig: {
      color: new THREE.Color(235 / 255, 215 / 255, 200 / 255),
      metalness: 0.2,
      roughness: 0.7,
      reflectivity: 0.5,
    },
  },
  {
    title: "21W 소프트 샌드",
    rgb: { r: 230, g: 210, b: 190 },
    description: "웜톤의 밝은 베이지로 따뜻한 느낌을 주는 색상입니다.",
    materialConfig: {
      color: new THREE.Color(230 / 255, 210 / 255, 190 / 255),
      metalness: 0.15,
      roughness: 0.65,
      reflectivity: 0.6,
    },
  },
  {
    title: "23N 내추럴 베이지",
    rgb: { r: 220, g: 200, b: 180 },
    description:
      "뉴트럴 톤의 중간 베이지로, 대부분의 피부 톤에 잘 맞는 클래식한 색상입니다.",
    materialConfig: {
      color: new THREE.Color(220 / 255, 200 / 255, 180 / 255),
      metalness: 0.2,
      roughness: 0.6,
      reflectivity: 0.65,
    },
  },
  {
    title: "23W 웜 허니",
    rgb: { r: 210, g: 185, b: 160 },
    description: "웜톤의 건강한 베이지 톤으로 따뜻함을 강조하는 색상입니다.",
    materialConfig: {
      color: new THREE.Color(210 / 255, 185 / 255, 160 / 255),
      metalness: 0.25,
      roughness: 0.5,
      reflectivity: 0.7,
    },
  },
  {
    title: "25N 골든 베이지",
    rgb: { r: 200, g: 170, b: 145 },
    description:
      "뉴트럴 톤의 골드빛 베이지로, 자연스러운 태닝된 피부를 표현합니다.",
    materialConfig: {
      color: new THREE.Color(200 / 255, 170 / 255, 145 / 255),
      metalness: 0.3,
      roughness: 0.45,
      reflectivity: 0.75,
    },
  },
  {
    title: "27W 탠 카라멜",
    rgb: { r: 180, g: 140, b: 110 },
    description:
      "웜톤의 깊은 카라멜 브라운으로 중간 톤의 피부에 잘 맞는 색상입니다.",
    materialConfig: {
      color: new THREE.Color(180 / 255, 140 / 255, 110 / 255),
      metalness: 0.35,
      roughness: 0.4,
      reflectivity: 0.8,
    },
  },
  {
    title: "31N 딥 아몬드",
    rgb: { r: 150, g: 110, b: 90 },
    description:
      "뉴트럴 톤의 깊고 부드러운 아몬드 브라운으로 어두운 피부 톤에 적합합니다.",
    materialConfig: {
      color: new THREE.Color(150 / 255, 110 / 255, 90 / 255),
      metalness: 0.4,
      roughness: 0.35,
      reflectivity: 0.85,
    },
  },
  {
    title: "33C 리치 에스프레소",
    rgb: { r: 90, g: 60, b: 50 },
    description:
      "쿨톤의 다크 브라운으로, 깊고 풍부한 어두운 피부 톤을 위한 색상입니다.",
    materialConfig: {
      color: new THREE.Color(90 / 255, 60 / 255, 50 / 255),
      metalness: 0.5,
      roughness: 0.3,
      reflectivity: 0.9,
    },
  },
];

const loader = new GLTFLoader();
let shadeDiscGeometry;
loader.load("../toy-project-2/shadeDisc.glb", (glb) => {
  shadeDiscGeometry = glb.scene.children[0].geometry;
  createShadeCards(shadesData);
  // console.log(shadeDiscGeometry);
});

function createShadeCards(shadeCardsData) {
  const sideScrollContainer = document.querySelector("#shadeCardContainer");

  shadeCardsData.forEach(({ title, description, materialConfig }) => {
    // Create shade-card container
    const shadeCard = document.createElement("div");
    shadeCard.classList.add("shade-card");

    // Create shade-canvas for Three.js scene
    const shadeCanvas = document.createElement("div");
    shadeCanvas.classList.add("shade-canvas", "border");
    shadeCard.appendChild(shadeCanvas);

    // Create shade-card-title element
    const shadeCardTitle = document.createElement("div");
    shadeCardTitle.classList.add("shade-card-title");
    shadeCardTitle.textContent = title;
    shadeCard.appendChild(shadeCardTitle);

    // Create shade-card-description element
    const shadeCardDescription = document.createElement("div");
    shadeCardDescription.classList.add("shade-card-description");
    shadeCardDescription.textContent = description;
    shadeCard.appendChild(shadeCardDescription);

    // Append shade-card to the side-scroll container
    sideScrollContainer.appendChild(shadeCard);

    // Initialize Three.js scene for each shadeCanvas
    initializeThreeScene(
      shadeCard,
      sideScrollContainer,
      shadeCanvas,
      materialConfig
    );
  });
}

function initializeThreeScene(container, scroller, canvas, materialConfig) {
  // Create scene, camera, and renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    20,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 10;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setClearColor(0x000000, 0); // Transparent background
  canvas.appendChild(renderer.domElement);

  // Create cylinder with provided material configuration
  // const geometry = new THREE.CylinderGeometry(3, 3, 1, 32);
  const material = new THREE.MeshPhysicalMaterial(materialConfig);
  const cylinder = new THREE.Mesh(shadeDiscGeometry, material);
  cylinder.rotateX(Math.PI / 4);
  cylinder.rotateZ(Math.PI / 2.5);
  scene.add(cylinder);

  // Lighting setup
  const ambientLight = new THREE.AmbientLight(0xffffff, 2);
  scene.add(ambientLight);

  const lights = [
    { color: "white", intensity: 1, position: [0.3, 1, 0.2] },
    { color: "pink", intensity: 0.5, position: [0, -1, 0] },
    { color: "salmon", intensity: 0.7, position: [1, 0, -1] },
    { color: "slateblue", intensity: 0.3, position: [-1, -0.5, 0.5] },
    { color: "white", intensity: 1, position: [-1, 0, 0.5] },
  ];

  lights.forEach(({ color, intensity, position }) => {
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(...position);
    scene.add(light);
  });

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    // cylinder.rotation.x += 0.01;
    // cylinder.rotation.y += 0.01;
    renderer.render(scene, camera);
  }

  animate();

  gsap.to(cylinder.rotation, {
    z: 3.14,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: container,
      horizontal: true,
      start: "left center",
      end: "right center",
      scroller: scroller,
      toggleActions: "play reverse play reverse",
      // markers: true,
    },
  });

  // Handle resizing
  window.addEventListener("resize", () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });
}
