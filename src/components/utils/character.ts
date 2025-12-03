import * as THREE from "three";
import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function setCharacter() {
  const loader = new GLTFLoader();

  const loadCharacter = (): Promise<THREE.Group | null> => {
    return new Promise((resolve, reject) => {
      loader.load(
        "/models/character.glb", // Make sure your GLB has color textures
        (gltf: GLTF) => {
          const character = gltf.scene;

          character.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh;

              // Only adjust properties if material exists
              if (mesh.material) {
                if (Array.isArray(mesh.material)) {
                  mesh.material.forEach((mat) => {
                    const m = mat as THREE.MeshStandardMaterial;
                    m.metalness = 0.5;
                    m.roughness = 0.5;
                    // Keep color/texture intact
                    m.needsUpdate = true;
                  });
                } else {
                  const mat = mesh.material as THREE.MeshStandardMaterial;
                  mat.metalness = 0.5;
                  mat.roughness = 0.5;
                  mat.needsUpdate = true;
                }
              }
            }
          });

          resolve(character);
        },
        undefined,
        (err: any) => reject(err)
      );
    });
  };

  return { loadCharacter };
}
