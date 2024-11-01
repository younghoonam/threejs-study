import * as THREE from "three";

class GeometryMorpher {
  constructor(geometry) {
    this.geometry = geometry;
    this.initialGeometry = new THREE.BufferGeometry().copy(this.geometry);

    // Precomputed bounding distance for normalization factor
    this.maxDistance = this.initialGeometry.boundingBox.max.x;

    this.waveLength = 0.0012; //파장
    this.waveAmplitude = 0.00125; //진폭
    this.waveSpeed = 5;
  }

  morph(clock) {
    const posAttribute = this.geometry.getAttribute("position");
    const initialPosAttribute = this.initialGeometry.getAttribute("position");
    const elapsedTime = clock.getElapsedTime();

    for (let index = 0; index < posAttribute.count; index++) {
      const xPos = posAttribute.getX(index);
      const zPos = posAttribute.getZ(index);

      const distanceFromCenter = Math.hypot(xPos, zPos);
      const factor = (this.maxDistance - distanceFromCenter) / this.maxDistance;

      const waveOffset =
        Math.sin(xPos * (1 / this.waveLength) + elapsedTime * this.waveSpeed) *
        this.waveAmplitude *
        factor;
      posAttribute.setY(index, initialPosAttribute.getY(index) + waveOffset);
    }

    this.geometry.computeVertexNormals();
    posAttribute.needsUpdate = true;
  }
}

export { GeometryMorpher };
