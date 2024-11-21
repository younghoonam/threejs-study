import * as THREE from "three";

const products = [
  {
    name: "똑딱이 우산 3초 고장",
    description:
      "펼치자마자 고장 나는 혁신적인 우산. 비 오는 날 실내 감성 충만한 시간을 선사합니다.",
    price: "₩9,900",
  },
  {
    name: "못난이 화분",
    description:
      "흙만 채우면 속상한 표정을 지으며 성장하는 화분. 식물도 키우고, 감정도 키워보세요!",
    price: "₩14,500",
  },
  {
    name: "푸드둥둥 밥알 베개",
    description:
      "밥알 모양이 1,204개 박힌 푹신한 베개. 잠들기 전에 배고픔을 자극하는 마성의 아이템!",
    price: "₩29,000",
  },
  {
    name: "정체불명의 후드티",
    description:
      "입어도 안 따뜻하고 벗어도 안 시원한 완벽한 중간 온도 의류. 정체성 없는 패션의 정점!",
    price: "₩35,000",
  },
  {
    name: "잔소리 전구",
    description:
      "불이 켜질 때마다 “전기 아껴!”라고 외치는 효도템. 부모님 선물로도 추천드립니다.",
    price: "₩19,800",
  },
  {
    name: "꿀잠 방해 쿠션",
    description:
      "쿠션을 베면 삐걱 소리가 나서 깊은 잠 방지. 꿀잠보다 꿀잼을 원한다면 제격!",
    price: "₩15,900",
  },
  {
    name: "이상한 젓가락 3000",
    description:
      "끝이 서로 만나지 않아 절대 집을 수 없는 젓가락. 고난과 인내의 식사 시간이 보장됩니다.",
    price: "₩4,500",
  },
  {
    name: "쓸데없이 큰 물통",
    description:
      "무려 10리터를 담을 수 있는 무거운 물통. 한 번 들면 헬스장 갈 필요가 없습니다.",
    price: "₩39,000",
  },
  {
    name: "웃음 유발 티슈",
    description:
      "코를 풀면 재채기 대신 웃음 소리가 나는 티슈. 감기도 즐겁게 이겨낼 준비 되셨나요?",
    price: "₩7,000",
  },
  {
    name: "지연 알람 시계",
    description:
      "알람이 5분 늦게 울리는 혁신적인 시계. 늦잠의 달콤함을 한층 업그레이드!",
    price: "₩12,800",
  },
  {
    name: "튀김 방지 앞치마",
    description:
      "튀김 요리를 하면 이상하게 앞치마 뒤쪽만 더러워지는 마법의 앞치마. 기묘한 요리 경험을 선사합니다.",
    price: "₩22,000",
  },
];
const geometries = [
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.SphereGeometry(0.5, 12, 8),
  new THREE.DodecahedronGeometry(0.5),
  new THREE.CylinderGeometry(0.5, 0.5, 1, 12),
  new THREE.ConeGeometry(0.5, 1, 8),
  new THREE.OctahedronGeometry(0.5),
  new THREE.IcosahedronGeometry(0.5),
  new THREE.TorusGeometry(0.4, 0.2, 8, 24),
];

let renderer;
const viewports = [];
const canvas = document.querySelector("#canvas");

generateProductCards(products);
init();

function generateProductCards(products) {
  const container = document.querySelector(".container"); // Select the container element

  products.forEach((product) => {
    // Create the card element
    const card = document.createElement("div");
    card.classList.add("card");

    // Create the three-viewport element
    const viewport = document.createElement("div");
    viewport.classList.add("three-viewport");

    // Create the info wrapper
    const info = document.createElement("div");
    info.classList.add("info");

    // Name element
    const name = document.createElement("div");
    name.classList.add("name");
    name.textContent = product.name;

    // Description element
    const description = document.createElement("div");
    description.classList.add("description");
    description.textContent = product.description;

    // Button wrapper
    const buttonWrapper = document.createElement("div");
    buttonWrapper.classList.add("button-wrapper");

    // Price tag wrapper
    const priceTag = document.createElement("div");
    priceTag.classList.add("price-tag");

    // Price text
    const priceText = document.createElement("div");
    priceText.classList.add("price-text");
    priceText.textContent = "PRICE";

    // Price
    const price = document.createElement("div");
    price.classList.add("price");
    price.textContent = product.price;

    // Add to cart button
    const addToCartButton = document.createElement("div");
    addToCartButton.classList.add("add-to-cart-button");
    addToCartButton.textContent = "장바구니에 담기";

    // Assemble the card
    priceTag.appendChild(priceText);
    priceTag.appendChild(price);

    buttonWrapper.appendChild(priceTag);
    buttonWrapper.appendChild(addToCartButton);

    info.appendChild(name);
    info.appendChild(description);
    info.appendChild(buttonWrapper);

    card.appendChild(viewport);
    card.appendChild(info);

    // Append the card to the container
    container.appendChild(card);

    viewports.push(setupViewport(viewport));
  });
}

function init() {
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: canvas,
  });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  renderer.setClearAlpha(0);
  renderer.setAnimationLoop(animate);

  updateSize();
  window.addEventListener("resize", updateSize);
}

function setupViewport(element) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(20, 1, 1, 10);
  camera.position.set(0, 0, 5);

  const mesh = randomMesh();
  const hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x444444, 3);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
  directionalLight.position.set(1, 1, 1);

  scene.add(mesh);
  scene.add(hemisphereLight);
  scene.add(directionalLight);

  const viewport = {
    scene: scene,
    camera: camera,
    element: element,
  };

  return viewport;
}

function randomMesh() {
  const geometry = geometries[(geometries.length * Math.random()) | 0];
  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color().setRGB(
      Math.random(),
      Math.random(),
      Math.random()
    ),
    flatShading: true,
  });
  return new THREE.Mesh(geometry, material);
}

function animate() {
  renderer.domElement.style.transform = `translateY(${window.scrollY}px)`;

  renderer.setScissorTest(false);
  renderer.clear();
  renderer.setScissorTest(true);

  viewports.forEach(function (viewport) {
    viewport.scene.children[0].rotation.y = Date.now() * 0.001;
    const element = viewport.element;
    const rect = element.getBoundingClientRect();
    // check if it's offscreen. If so skip it
    if (
      rect.bottom < 0 ||
      rect.top > renderer.domElement.clientHeight ||
      rect.right < 0 ||
      rect.left > renderer.domElement.clientWidth
    ) {
      return; // it's off screen
    }
    // set the viewport
    const width = rect.right - rect.left;
    const height = rect.bottom - rect.top;
    const left = rect.left;
    const bottom = renderer.domElement.clientHeight - rect.bottom;

    renderer.setViewport(left, bottom, width, height);
    renderer.setScissor(left, bottom, width, height);
    renderer.render(viewport.scene, viewport.camera);
  });
}

function updateSize() {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  if (canvas.width !== width || canvas.height !== height) {
    renderer.setSize(width, height, false);
  }

  viewports.forEach((viewport) => {
    viewport.camera.aspect =
      viewport.element.clientWidth / viewport.element.clientHeight;
    viewport.camera.updateProjectionMatrix();
  });
}
