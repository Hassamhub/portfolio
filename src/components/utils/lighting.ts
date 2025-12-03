import * as THREE from "three";

export default function setLighting(scene: THREE.Scene) {
  // Main directional light (key light)
  const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
  keyLight.position.set(10, 10, 10);
  keyLight.castShadow = true;
  scene.add(keyLight);

  // Fill light (softens shadows)
  const fillLight = new THREE.DirectionalLight(0xffffff, 0.6);
  fillLight.position.set(-10, 5, 5);
  scene.add(fillLight);

  // Rim / back light (adds colorful edges)
  const rimLight = new THREE.PointLight(0xffaaff, 0.8, 100);
  rimLight.position.set(0, 10, -10);
  scene.add(rimLight);

  // Ambient light (overall brightness)
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambientLight);

  return {
    turnOnLights: () => {
      keyLight.intensity = 1.2;
      fillLight.intensity = 0.6;
      rimLight.intensity = 0.8;
      ambientLight.intensity = 0.3;
    },
    setPointLight: (light: THREE.Object3D | null) => {
      // Optional: move rimLight to a target (like screen glow)
      if (light && light instanceof THREE.PointLight) {
        rimLight.position.copy(light.position);
      }
    },
  };
}
