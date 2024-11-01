# 스크롤 애니메이션 상세페이지

## 레퍼런스 이미지
![image](https://github.com/user-attachments/assets/5ba74cef-e3bd-43b0-b8d2-a4744e03f311)![image](https://github.com/user-attachments/assets/bea72155-2811-458b-b405-00d7eb7c937e)


## 주요기능
### [CatmullRomCurve3](https://threejs.org/docs/index.html?q=cat#api/en/extras/curves/CatmullRomCurve3)로 만든 Transform Spline
프레임마다 모델의 `position`과 `rotation`이 lerp할 수 있는 글로벌 target 값들을 만들어준다
```js
let targetRotation = new THREE.Euler();
let targetQuaternion = new THREE.Quaternion();
let targetPosition = new THREE.Vector3();
```

스크롤하면서 변하는 `position`과 `rotation`값의 곡선을 만든다.
[CatmullRomCurve](https://en.wikipedia.org/wiki/Centripetal_Catmull%E2%80%93Rom_spline)는 점을 제공해 선을 생성하는 알고리즘이다.
제공되는 점은 키프레임 역할을 한다고 볼 수 있다.
```js
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
```

0-1 사이의 현재 스크롤 위치값(x)을 구한뒤 `THREE.Curve.getPointAt()` 함수를 통해 곡선 위의 점을 구하고 target 값들에 대입한다.
rotation은 `THREE.Euler()` 객체로 정의되는데, 이는 lerp 기능이 없어 `THREE.Quaternion()`에 `THREE.Euler()` 값을 변환해서 대입한다.
```js
targetPosition.copy(transformSpline.position.getPointAt(scrollProgress));
targetRotation.setFromVector3(transformSpline.rotation.getPointAt(scrollProgress));
targetQuaternion.setFromEuler(targetRotation);
```

그리고 모델의 `position`과 `rotation`을 target으로 lerp하는 함수를 만들고 `animation()`함수에 넣어 프레임마다 적용하도록 한다. `Quaternion`은 `lerp()`가 아닌 `slerp()` spherical linear interpolation 함수이다.
```js
function transformModel() {
  if (model) {
    model.position.lerp(targetPosition, MODEL_LERP_VALUE);
    model.quaternion.slerp(targetQuaternion, MODEL_LERP_VALUE);
  }
}
```
```js
function animate() {
  transformModel();
  ...
}
```

### 단점
- 정확한 스크롤 위치에 원하는 transformation이 되도록 할 수 있는 방법 아직 생각 못함
- CatmullRomCurve3가 생성하는 곡선이 원하는대로 생성이 안될 수 있다

### 장점
- 코딩으로 애니메이션이 가능하다!
- 간단한 코드로 복잡하면서도 부드러운 애니메이션 구현이 가능하다

### 응용 가능성
- 정확한 애니메이션이 필요없는 배경 물체의 움직임?
