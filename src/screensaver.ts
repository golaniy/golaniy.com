import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

export function initScreensaver(container: HTMLElement) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  let textMesh: THREE.Mesh<TextGeometry, THREE.MeshNormalMaterial>;
  let font: THREE.Font;

  const loader = new FontLoader();
  loader.load(
    "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
    function (loadedFont) {
      font = loadedFont;
      const size = Math.min(10, window.innerWidth / 50);
      const geometry = createGeometry(font, size);
      const material = new THREE.MeshNormalMaterial();
      textMesh = new THREE.Mesh(geometry, material);
      scene.add(textMesh);
      camera.position.z = size * 6;
      animate();
    },
  );

  function createGeometry(font: THREE.Font, size: number) {
    const geometry = new TextGeometry("golaniy.com", {
      font: font,
      depth: 3,
      size,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.1,
      bevelOffset: 0,
      bevelSegments: 5,
    });
    geometry.center();
    return geometry;
  }

  let time = 0;
  function animate() {
    if (textMesh) {
      time += 0.01;
      requestAnimationFrame(animate);
      textMesh.rotation.x = Math.sin(time) * 0.1;
      textMesh.rotation.y += 0.005;
      renderer.render(scene, camera);
    }
  }

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (textMesh) {
      const size = Math.min(10, window.innerWidth / 50);
      textMesh.geometry.dispose();
      textMesh.geometry = createGeometry(font, size);
      camera.position.z = size * 6;
    }
  });

  window.addEventListener("click", () => {
    if (textMesh) {
      textMesh.material = new THREE.MeshNormalMaterial();
    }
  });
}
