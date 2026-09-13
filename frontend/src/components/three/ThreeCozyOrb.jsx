import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { isReducedMotion } from '../../animations/gsapConfig';

/**
 * ThreeCozyOrb
 * A subtle 3D glowing sphere with orbiting rings for CozyRoomView.
 * Provides a gentle ambient focal point behind the motivational quote.
 */
export default function ThreeCozyOrb({ className = '' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    if (isReducedMotion()) return;

    const width = mount.clientWidth || 200;
    const height = mount.clientHeight || 200;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 4.5;

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
      console.warn('Three.js WebGL not available for cozy orb:', err);
      return;
    }

    const group = new THREE.Group();
    scene.add(group);

    // 1. Central Gentle Glowing Sphere
    const sphereGeometry = new THREE.SphereGeometry(0.7, 32, 32);
    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: 0xf97316,
      emissive: 0xd97706,
      emissiveIntensity: 0.25,
      roughness: 0.4,
      metalness: 0.3,
      transparent: true,
      opacity: 0.7
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    group.add(sphere);

    // 2. Orbital Ring 1
    const ring1Geometry = new THREE.TorusGeometry(1.2, 0.015, 16, 64);
    const ring1Material = new THREE.MeshBasicMaterial({
      color: 0xfbbf24,
      transparent: true,
      opacity: 0.35
    });
    const ring1 = new THREE.Mesh(ring1Geometry, ring1Material);
    ring1.rotation.x = Math.PI / 4;
    group.add(ring1);

    // 3. Orbital Ring 2 (Counter-angled)
    const ring2Geometry = new THREE.TorusGeometry(1.4, 0.012, 16, 64);
    const ring2Material = new THREE.MeshBasicMaterial({
      color: 0xf97316,
      transparent: true,
      opacity: 0.25
    });
    const ring2 = new THREE.Mesh(ring2Geometry, ring2Material);
    ring2.rotation.x = -Math.PI / 3;
    ring2.rotation.y = Math.PI / 6;
    group.add(ring2);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xf59e0b, 1.5, 10);
    pointLight.position.set(2, 2, 2);
    scene.add(pointLight);

    // Visibility
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

      sphere.scale.setScalar(1.0 + Math.sin(time * 1.5) * 0.04);
      group.position.y = Math.sin(time * 1.2) * 0.08;

      ring1.rotation.z = time * 0.25;
      ring2.rotation.y = time * 0.3;
      ring2.rotation.z = -time * 0.2;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      if (mount && renderer?.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }

      sphereGeometry?.dispose();
      sphereMaterial?.dispose();
      ring1Geometry?.dispose();
      ring1Material?.dispose();
      ring2Geometry?.dispose();
      ring2Material?.dispose();
      renderer?.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`relative pointer-events-none select-none ${className}`}
      style={{ width: '100%', height: '100%', minHeight: '160px', minWidth: '160px' }}
      aria-hidden="true"
    />
  );
}
