import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

function GreenhousePrototype() {
  const containerRef = useRef(null); // Reference to the container div
  const avatarLoadingRef = useRef(null); // Reference to the loading div
  const modelLoadedRef = useRef(false); // Ref to track if the model is already loaded
  const spinTimeoutRef = useRef(null); // Ref to store the idle timeout
  const avatarRef = useRef(null); // Ref to store the avatar object

  useEffect(() => {
    const loader = new GLTFLoader();

    const loadModel = () => {
      if (modelLoadedRef.current) return; // If the model is already loaded, do nothing

      modelLoadedRef.current = true; // Set the model as loaded

      loader.load(
        'https://raw.githubusercontent.com/NiqueWrld/FarmLogik/refs/heads/main/greenhouse.glb',
        (gltf) => {
          setupScene(gltf);
          if (avatarLoadingRef.current) avatarLoadingRef.current.style.display = 'none';
        },
        (xhr) => {
          const percentCompletion = Math.round((xhr.loaded / xhr.total) * 100);
          if (avatarLoadingRef.current) avatarLoadingRef.current.innerText = `LOADING... ${percentCompletion}%`;
          console.log(`Loading model... ${percentCompletion}%`);
        },
        (error) => {
          console.log(error);
        }
      );
    };

    const setupScene = (gltf) => {
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
      });
      renderer.outputColorSpace = THREE.SRGBColorSpace;

      const container = containerRef.current;
      if (!container) return;

      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);

      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      container.appendChild(renderer.domElement);

      // Camera setup
      const camera = new THREE.PerspectiveCamera(6.5, container.clientWidth / container.clientHeight);
      camera.position.set(0.2, 0.5, 1);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.enablePan = false;
      controls.enableZoom = false;
      controls.minDistance = 3;
      controls.minPolarAngle = 1.2;
      controls.maxPolarAngle = 1.2;
      controls.target = new THREE.Vector3(0, 0.05, 0);
      controls.update();

      // Scene setup
      const scene = new THREE.Scene();

      // Lighting setup
      scene.add(new THREE.AmbientLight());

      const spotlight = new THREE.SpotLight(0xffffff, 20, 8, 1);
      spotlight.penumbra = 0.5;
      spotlight.position.set(0, 4, 2);
      spotlight.castShadow = true;
      scene.add(spotlight);

      const keyLight = new THREE.DirectionalLight(0xffffff, 2);
      keyLight.position.set(1, 1, 2);
      keyLight.lookAt(new THREE.Vector3());
      scene.add(keyLight);

      // Load avatar
      const avatar = gltf.scene;
      avatar.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      scene.add(avatar);

      // Store the avatar reference for later spinning
      avatarRef.current = avatar;

      // Create pedestal
      const groundGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.01, 64); // Reduced the radius to 0.3
      const groundMaterial = new THREE.MeshStandardMaterial();
      const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
      groundMesh.castShadow = false;
      groundMesh.receiveShadow = true;
      groundMesh.position.y -= 0.05;
      scene.add(groundMesh);

      window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      });

      // Function to make the model spin
      const spinModel = () => {
        if (avatarRef.current) {
          avatarRef.current.rotation.y += 0.001; // Adjust this value to change the spin speed
        }
      };

      // Animate the scene and check for inactivity
      function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        
        // If idle, spin the model
        spinModel();
      }

      // Start animation
      animate();

      // Reset idle timeout on interaction
      const resetIdleTimeout = () => {
        if (spinTimeoutRef.current) {
          clearTimeout(spinTimeoutRef.current); // Clear the previous timeout
        }

        // Set a new timeout to start spinning after 2 seconds
        spinTimeoutRef.current = setTimeout(() => {
          console.log('Spinning model due to inactivity...');
          spinModel(); // Call spinModel if idle
        }, 2000); // 2 seconds of inactivity
      };

      // Add event listeners to reset idle timeout
      container.addEventListener('mousemove', resetIdleTimeout);
      container.addEventListener('mousedown', resetIdleTimeout);
      container.addEventListener('touchstart', resetIdleTimeout);

      // Start the idle timeout as soon as the component is loaded
      resetIdleTimeout();
    };

    loadModel();

    return () => {
      // Cleanup when component is unmounted
      const container = containerRef.current;
      if (container) {
        container.removeChild(container.lastChild); // Remove the canvas when unmounted
      }
      if (spinTimeoutRef.current) {
        clearTimeout(spinTimeoutRef.current); // Clear timeout on cleanup
      }
    };
  }, []); // Only run once when the component mounts

  return (
    <div className="pt-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="py-8">
        <h1 className="text-3xl font-bold text-gray-900">3D Greenhouse Model</h1>
        <p className="mt-2 text-gray-600">Interactive 3D visualization of our greenhouse</p>
      </div>
      <div className="card">
        <div ref={containerRef} id='avatar-container'>
          <div ref={avatarLoadingRef} id='avatar-loading'>LOADING...</div>
        </div>
      </div>
    </div>
  );
}

export default GreenhousePrototype;
