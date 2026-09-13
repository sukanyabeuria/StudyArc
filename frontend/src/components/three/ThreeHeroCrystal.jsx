import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { isReducedMotion } from '../../animations/gsapConfig';

/**
 * ThreeHeroCrystal
 * An interactive 3D focus crystal designed for the Landing page hero section.
 * Renders a glowing faceted icosahedron with warm orbital particles that reacts to mouse coordinates.
 */
export default function ThreeHeroCrystal({ className = '' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    if (isReducedMotion()) return;

    const width = mount.clientWidth || 320;
    const height = mount.clientHeight || 320;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 6;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);
    } catch (err) {
      console.warn('Three.js WebGL not available for hero crystal:', err);
      return;
    }

    // Group to hold all 3D elements
    const crystalGroup = new THREE.Group();
    scene.add(crystalGroup);

    // 1. Faceted Inner Crystal (Icosahedron)
    const innerGeometry = new THREE.IcosahedronGeometry(1.3, 0);
    const innerMaterial = new THREE.MeshStandardMaterial({
      color: 0xf97316,
      emissive: 0xea580c,
      emissiveIntensity: 0.35,
      roughness: 0.25,
      metalness: 0.8,
      flatShading: true,
      transparent: true,
      opacity: 0.88
    });
    const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
    crystalGroup.add(innerMesh);

    // 2. Outer Wireframe Cage
    const outerGeometry = new THREE.IcosahedronGeometry(1.65, 0);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xfbbf24,
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });
    const outerWireframe = new THREE.Mesh(outerGeometry, wireframeMaterial);
    crystalGroup.add(outerWireframe);

    // 3. Orbital Ring
    const ringGeometry = new THREE.TorusGeometry(2.1, 0.02, 16, 64);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.4
    });
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh.rotation.x = Math.PI / 3;
    crystalGroup.add(ringMesh);

    // 4. Subtle Orbiting Sparkles
    const sparkleCount = 28;
    const sparklePositions = new Float32Array(sparkleCount * 3);
    for (let i = 0; i < sparkleCount; i++) {
      const radius = 2.0 + Math.random() * 0.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;
      sparklePositions[i * 3] = radius * Math.cos(theta) * Math.cos(phi);
      sparklePositions[i * 3 + 1] = radius * Math.sin(phi);
      sparklePositions[i * 3 + 2] = radius * Math.sin(theta) * Math.cos(phi);
    }
    const sparkleGeometry = new THREE.BufferGeometry();
    sparkleGeometry.setAttribute('position', new THREE.BufferAttribute(sparklePositions, 3));
    const sparkleMaterial = new THREE.PointsMaterial({
      color: 0xfbbf24,
      size: 0.06,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    const sparkles = new THREE.Points(sparkleGeometry, sparkleMaterial);
    crystalGroup.add(sparkles);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const orangePointLight = new THREE.PointLight(0xf97316, 2.5, 12);
    orangePointLight.position.set(3, 3, 3);
    scene.add(orangePointLight);

    const amberPointLight = new THREE.PointLight(0xf59e0b, 1.8, 12);
    amberPointLight.position.set(-3, -2, 2);
    scene.add(amberPointLight);

    // Mouse Tracking for Interactive Tilt
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (e) => {
      const rect = mount.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      mouseX = (clientX / width - 0.5) * 2;
      mouseY = (clientY / height - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newWidth = entry.contentRect.width;
        const newHeight = entry.contentRect.height;
        if (newWidth > 0 && newHeight > 0) {
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
        }
      }
    });
    resizeObserver.observe(mount);

    // Visibility Listener
    let isVisible = true;
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Animation Loop
    let animationFrameId;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const time = (performance.now() - startTime) * 0.001;

      // Smooth floating motion (levitation)
      crystalGroup.position.y = Math.sin(time * 1.4) * 0.12;

      // Base continuous rotation
      innerMesh.rotation.y = time * 0.45;
      innerMesh.rotation.x = time * 0.25;

      outerWireframe.rotation.y = -time * 0.3;
      outerWireframe.rotation.z = time * 0.2;

      ringMesh.rotation.z = time * 0.35;
      sparkles.rotation.y = time * 0.2;

      // Interpolate mouse tilt
      targetRotationY = mouseX * 0.5;
      targetRotationX = -mouseY * 0.5;

      crystalGroup.rotation.y += (targetRotationY - crystalGroup.rotation.y) * 0.05;
      crystalGroup.rotation.x += (targetRotationX - crystalGroup.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      resizeObserver.disconnect();

      if (mount && renderer?.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }

      innerGeometry?.dispose();
      innerMaterial?.dispose();
      outerGeometry?.dispose();
      wireframeMaterial?.dispose();
      ringGeometry?.dispose();
      ringMaterial?.dispose();
      sparkleGeometry?.dispose();
      sparkleMaterial?.dispose();
      renderer?.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`relative pointer-events-none select-none ${className}`}
      style={{ width: '100%', height: '100%', minHeight: '260px', minWidth: '260px' }}
      aria-hidden="true"
    />
  );
}
