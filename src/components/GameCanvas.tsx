import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { STATIONS } from '../data/portfolioData';
import { StationLocation } from '../types';
import { retroAudio } from '../audio/retroAudio';
import { buildOfficeRoom, StationMeshEntry, CollectibleBit } from './OfficeRoom';

interface GameCanvasProps {
  onStationProximity: (station: StationLocation | null) => void;
  onBitCollected: (count: number) => void;
  targetTeleportStation: string | null;
  onTeleportComplete: () => void;
  onOpenStation: (station: StationLocation) => void;
  joystickVector: { x: number; y: number } | null;
  isActionPressed: boolean;
  activeModal: string | null;
  mouseSteerMode?: boolean;
  onToggleMouseSteer?: () => void;
  theme?: 'dark' | 'light';
}

export const GameCanvas: React.FC<GameCanvasProps> = ({
  onStationProximity,
  onBitCollected,
  targetTeleportStation,
  onTeleportComplete,
  onOpenStation,
  joystickVector,
  isActionPressed,
  activeModal,
  mouseSteerMode = false,
  onToggleMouseSteer,
  theme = 'dark',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeModalRef = useRef(activeModal);
  activeModalRef.current = activeModal;
  const mouseSteerModeRef = useRef(mouseSteerMode);
  mouseSteerModeRef.current = mouseSteerMode;

  // Scene state references
  const stateRef = useRef({
    scene: null as THREE.Scene | null,
    camera: null as THREE.PerspectiveCamera | null,
    renderer: null as THREE.WebGLRenderer | null,
    ambientLight: null as THREE.AmbientLight | null,
    dirLight: null as THREE.DirectionalLight | null,
    fillLight: null as THREE.PointLight | null,
    playerGroup: null as THREE.Group | null,
    playerParts: {
      head: null as THREE.Mesh | null,
      body: null as THREE.Mesh | null,
      leftLeg: null as THREE.Mesh | null,
      rightLeg: null as THREE.Mesh | null,
      leftArm: null as THREE.Mesh | null,
      rightArm: null as THREE.Mesh | null,
      visor: null as THREE.Mesh | null,
      thrusterGlow: null as THREE.PointLight | null,
    },
    stationMeshes: [] as StationMeshEntry[],
    dataBits: [] as CollectibleBit[],
    keys: { w: false, a: false, s: false, d: false, shift: false, space: false, e: false },
    playerPos: new THREE.Vector3(0, 0, 1.8),
    playerVelocity: new THREE.Vector3(0, 0, 0),
    playerAngle: 0,
    isJumping: false,
    walkCycle: 0,
    collectedCount: 0,
    nearbyStation: null as StationLocation | null,
    cameraAngle: 0,           // Face straight at executive desk and panoramic window
    cameraPitch: 0.42,        // Natural elevated perspective of the office
    cameraDistance: 8.5,      // Snug inside office room
    isLookingAround: false,
    activeMouseButton: null as number | null,
    dragDistance: 0,
    prevMouseX: 0,
    prevMouseY: 0,
    raycaster: new THREE.Raycaster(),
    mouse: new THREE.Vector2(),
    mouseWorldPos: new THREE.Vector3(0, 0, 0),
    aimReticle: null as THREE.Group | null,
    plane: new THREE.Plane(new THREE.Vector3(0, 1, 0), 0),
    skyVehicles: [] as THREE.Group[],
  });

  // Handle Target Teleport to Folder
  useEffect(() => {
    if (!targetTeleportStation) return;
    const target = STATIONS.find((s) => s.id === targetTeleportStation);
    if (target && stateRef.current.playerGroup) {
      retroAudio.playTeleport();
      // Smoothly place player right in front of the folder table
      const targetPos = new THREE.Vector3(target.position[0], 0, target.position[2] + 1.8);
      stateRef.current.playerPos.copy(targetPos);
      stateRef.current.playerGroup.position.copy(targetPos);
      onTeleportComplete();
    }
  }, [targetTeleportStation, onTeleportComplete]);

  // Main 3D Scene Initialization
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060814);
    scene.fog = new THREE.FogExp2(0x060814, 0.015);
    stateRef.current.scene = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 12, 14);
    stateRef.current.camera = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    stateRef.current.renderer = renderer;

    // 4. Atmospheric Office Lighting (Day Sunlit Penthouse vs Night Cyber Atmosphere)
    const isLightInitial = theme === 'light';
    const ambientLight = new THREE.AmbientLight(isLightInitial ? 0xe2e8f0 : 0x283548, isLightInitial ? 3.0 : 2.2);
    scene.add(ambientLight);
    stateRef.current.ambientLight = ambientLight;

    // City & Sun / Moonlight streaming through panoramic windows
    const dirLight = new THREE.DirectionalLight(isLightInitial ? 0xfff7ed : 0x38bdf8, isLightInitial ? 3.5 : 2.2);
    dirLight.position.set(0, 15, -20);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);
    stateRef.current.dirLight = dirLight;

    // Warm Interior Office Light
    const fillLight = new THREE.PointLight(isLightInitial ? 0xffffff : 0xffedd5, isLightInitial ? 1.6 : 1.8, 20);
    fillLight.position.set(0, 4.8, 0);
    scene.add(fillLight);
    stateRef.current.fillLight = fillLight;

    scene.background = new THREE.Color(isLightInitial ? 0xb4d3f5 : 0x060a14);
    scene.fog = new THREE.FogExp2(isLightInitial ? 0xcbe2fb : 0x060a14, 0.014);

    // Build the 3D Office Room, Panoramic Windows, City Skyline, Desks, and 3D Folders
    const officeObjects = buildOfficeRoom(scene);
    stateRef.current.stationMeshes = officeObjects.stationMeshes;
    stateRef.current.dataBits = officeObjects.dataBits;
    stateRef.current.skyVehicles = officeObjects.skyVehicles;

    // 10. Build Player Character (Cyber Operative Avatar)
    const playerGroup = new THREE.Group();
    playerGroup.position.set(0, 0, 0);

    // Body Armor Torso
    const torsoGeo = new THREE.BoxGeometry(0.8, 1.0, 0.5);
    const torsoMat = new THREE.MeshStandardMaterial({
      color: 0x1a2436,
      metalness: 0.8,
      roughness: 0.3,
    });
    const torso = new THREE.Mesh(torsoGeo, torsoMat);
    torso.position.y = 1.3;
    torso.castShadow = true;
    playerGroup.add(torso);

    // Head
    const headGeo = new THREE.BoxGeometry(0.55, 0.55, 0.55);
    const headMat = new THREE.MeshStandardMaterial({
      color: 0x2c3e50,
      metalness: 0.7,
      roughness: 0.4,
    });
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.y = 2.05;
    head.castShadow = true;
    playerGroup.add(head);

    // Cyber Visor
    const visorGeo = new THREE.BoxGeometry(0.48, 0.18, 0.2);
    const visorMat = new THREE.MeshStandardMaterial({
      color: 0x00ffcc,
      emissive: 0x00ffcc,
      emissiveIntensity: 1.2,
    });
    const visor = new THREE.Mesh(visorGeo, visorMat);
    visor.position.set(0, 2.05, 0.26);
    playerGroup.add(visor);

    // Thruster Jetpack on Back
    const jetpackGeo = new THREE.BoxGeometry(0.5, 0.7, 0.25);
    const jetpackMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.9 });
    const jetpack = new THREE.Mesh(jetpackGeo, jetpackMat);
    jetpack.position.set(0, 1.3, -0.32);
    playerGroup.add(jetpack);

    // Thruster Light
    const thrusterGlow = new THREE.PointLight(0x00ffff, 1.2, 3);
    thrusterGlow.position.set(0, 0.9, -0.4);
    playerGroup.add(thrusterGlow);

    // Limbs: Legs
    const legGeo = new THREE.BoxGeometry(0.24, 0.8, 0.26);
    const legMat = new THREE.MeshStandardMaterial({ color: 0x111928, metalness: 0.8 });

    const leftLeg = new THREE.Mesh(legGeo, legMat);
    leftLeg.position.set(-0.24, 0.4, 0);
    leftLeg.castShadow = true;
    playerGroup.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeo, legMat);
    rightLeg.position.set(0.24, 0.4, 0);
    rightLeg.castShadow = true;
    playerGroup.add(rightLeg);

    // Limbs: Arms
    const armGeo = new THREE.BoxGeometry(0.2, 0.75, 0.2);
    const armMat = new THREE.MeshStandardMaterial({ color: 0x243247, metalness: 0.8 });

    const leftArm = new THREE.Mesh(armGeo, armMat);
    leftArm.position.set(-0.55, 1.25, 0);
    leftArm.castShadow = true;
    playerGroup.add(leftArm);

    const rightArm = new THREE.Mesh(armGeo, armMat);
    rightArm.position.set(0.55, 1.25, 0);
    rightArm.castShadow = true;
    playerGroup.add(rightArm);

    scene.add(playerGroup);
    stateRef.current.playerGroup = playerGroup;
    stateRef.current.playerParts = {
      head,
      body: torso,
      leftLeg,
      rightLeg,
      leftArm,
      rightArm,
      visor,
      thrusterGlow,
    };

    // 10.5 Holographic 3D Ground Targeting Reticle
    const reticleGroup = new THREE.Group();
    // Outer cyber ring
    const outerRingGeo = new THREE.RingGeometry(0.7, 0.82, 32);
    const outerRingMat = new THREE.MeshBasicMaterial({
      color: 0x00ffcc,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.75,
    });
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
    outerRing.rotation.x = -Math.PI / 2;
    reticleGroup.add(outerRing);

    // Inner ring
    const innerRingGeo = new THREE.RingGeometry(0.18, 0.25, 24);
    const innerRingMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9,
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRing.rotation.x = -Math.PI / 2;
    reticleGroup.add(innerRing);

    // 4 crosshair ticks
    const tickMat = new THREE.MeshBasicMaterial({ color: 0x00ffcc, transparent: true, opacity: 0.85 });
    const tick1 = new THREE.Mesh(new THREE.PlaneGeometry(0.06, 0.3), tickMat);
    tick1.rotation.x = -Math.PI / 2;
    tick1.position.z = -0.55;
    reticleGroup.add(tick1);

    const tick2 = new THREE.Mesh(new THREE.PlaneGeometry(0.06, 0.3), tickMat);
    tick2.rotation.x = -Math.PI / 2;
    tick2.position.z = 0.55;
    reticleGroup.add(tick2);

    const tick3 = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.06), tickMat);
    tick3.rotation.x = -Math.PI / 2;
    tick3.position.x = -0.55;
    reticleGroup.add(tick3);

    const tick4 = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.06), tickMat);
    tick4.rotation.x = -Math.PI / 2;
    tick4.position.x = 0.55;
    reticleGroup.add(tick4);

    // Subtle glow light under reticle
    const reticleLight = new THREE.PointLight(0x00ffcc, 0.8, 3.5);
    reticleLight.position.y = 0.2;
    reticleGroup.add(reticleLight);

    reticleGroup.position.set(0, 0.05, 0);
    scene.add(reticleGroup);
    stateRef.current.aimReticle = reticleGroup;

    // Helper: update ground intersection from client coordinates
    const updateMouseGroundPos = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      stateRef.current.mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      stateRef.current.mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      stateRef.current.raycaster.setFromCamera(stateRef.current.mouse, camera);
      const groundPoint = new THREE.Vector3();
      if (stateRef.current.raycaster.ray.intersectPlane(stateRef.current.plane, groundPoint)) {
        stateRef.current.mouseWorldPos.copy(groundPoint);
      }
    };

    // 11. Event Listeners: Keyboard & Mouse Controls
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't capture keys if an active modal is open and user might be typing
      if (activeModalRef.current) return;

      const k = e.key.toLowerCase();
      if (k === 'w' || k === 'arrowup') stateRef.current.keys.w = true;
      if (k === 'a' || k === 'arrowleft') stateRef.current.keys.a = true;
      if (k === 's' || k === 'arrowdown') stateRef.current.keys.s = true;
      if (k === 'd' || k === 'arrowright') stateRef.current.keys.d = true;
      if (e.shiftKey) stateRef.current.keys.shift = true;
      if (k === ' ' && !stateRef.current.isJumping) {
        stateRef.current.isJumping = true;
        stateRef.current.playerVelocity.y = 7.5;
        retroAudio.playJump();
      }
      if (k === 'e') {
        if (stateRef.current.nearbyStation) {
          retroAudio.playInteract();
          onOpenStation(stateRef.current.nearbyStation);
        }
      }
      if (k === 'm') {
        onToggleMouseSteer?.();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === 'w' || k === 'arrowup') stateRef.current.keys.w = false;
      if (k === 'a' || k === 'arrowleft') stateRef.current.keys.a = false;
      if (k === 's' || k === 'arrowdown') stateRef.current.keys.s = false;
      if (k === 'd' || k === 'arrowright') stateRef.current.keys.d = false;
      if (!e.shiftKey) stateRef.current.keys.shift = false;
    };

    // Mouse Input Handlers: Press & Move to Look Around freely (Yaw + Pitch)
    const handleMouseDown = (e: MouseEvent) => {
      if (activeModalRef.current) return;

      stateRef.current.isLookingAround = true;
      stateRef.current.activeMouseButton = e.button;
      stateRef.current.dragDistance = 0;
      stateRef.current.prevMouseX = e.clientX;
      stateRef.current.prevMouseY = e.clientY;

      updateMouseGroundPos(e.clientX, e.clientY);
      if (container) {
        container.style.cursor = 'grabbing';
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      updateMouseGroundPos(e.clientX, e.clientY);

      // LOOK AROUND: When mouse button is pressed and moved, or in Mouse Steer Mode
      if (stateRef.current.isLookingAround || mouseSteerModeRef.current) {
        let deltaX = 0;
        let deltaY = 0;

        if (e.movementX !== undefined && e.movementY !== undefined && Math.abs(e.movementX) < 120 && Math.abs(e.movementY) < 120) {
          deltaX = e.movementX;
          deltaY = e.movementY;
        } else {
          deltaX = e.clientX - stateRef.current.prevMouseX;
          deltaY = e.clientY - stateRef.current.prevMouseY;
        }

        stateRef.current.dragDistance += Math.hypot(deltaX, deltaY);

        // Smooth look-around sensitivity
        const rotSpeedX = 0.0055;
        const rotSpeedY = 0.0045;

        // Yaw: horizontal 360-degree orbit around operative
        stateRef.current.cameraAngle -= deltaX * rotSpeedX;

        // Pitch: vertical elevation angle (look up to the stars / look down at ground)
        // Dragging mouse down raises camera to look down at player
        // Dragging mouse up lowers camera to look up into the sky and celestial bodies
        stateRef.current.cameraPitch = THREE.MathUtils.clamp(
          stateRef.current.cameraPitch + deltaY * rotSpeedY,
          -0.10, // Low angle: look up at operative and nebula sky
          1.38   // High overhead top-down view
        );

        // In real games, right-click drag or mouse steer mode also rotates the character to face camera look direction
        if (stateRef.current.activeMouseButton === 2 || mouseSteerModeRef.current) {
          stateRef.current.playerAngle = stateRef.current.cameraAngle + Math.PI;
        }
      }

      stateRef.current.prevMouseX = e.clientX;
      stateRef.current.prevMouseY = e.clientY;
    };

    const handleMouseUp = () => {
      // Direct click on 3D Folder detection
      if (stateRef.current.dragDistance < 12 && !activeModalRef.current && camera) {
        stateRef.current.raycaster.setFromCamera(stateRef.current.mouse, camera);
        const folderRoots = stateRef.current.stationMeshes.map((s) => s.group);
        const hits = stateRef.current.raycaster.intersectObjects(folderRoots, true);
        if (hits.length > 0) {
          let current: THREE.Object3D | null = hits[0].object;
          while (current && current.parent && current.parent !== scene) {
            const found = stateRef.current.stationMeshes.find((s) => s.group === current);
            if (found) {
              retroAudio.playInteract();
              onOpenStation(found.station);
              break;
            }
            current = current.parent;
          }
        }
      }

      stateRef.current.isLookingAround = false;
      stateRef.current.activeMouseButton = null;
      if (container) {
        container.style.cursor = 'crosshair';
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      stateRef.current.cameraDistance = Math.max(
        4.5,
        Math.min(13.0, stateRef.current.cameraDistance + e.deltaY * 0.012)
      );
    };

    const handleContextMenu = (e: MouseEvent) => e.preventDefault();

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('contextmenu', handleContextMenu);

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // 12. Main Game Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let footstepTimer = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.1);
      const time = clock.getElapsedTime();

      // Move aerial cyber transit vehicles across the night skyline outside windows
      stateRef.current.skyVehicles.forEach((veh, idx) => {
        veh.position.x += delta * (2.8 + idx * 0.8);
        if (veh.position.x > 32) {
          veh.position.x = -32;
        }
      });

      // Animate 3D Ground Reticle
      if (stateRef.current.aimReticle) {
        stateRef.current.aimReticle.position.x = stateRef.current.mouseWorldPos.x;
        stateRef.current.aimReticle.position.z = stateRef.current.mouseWorldPos.z;
        stateRef.current.aimReticle.rotation.y += delta * 1.5;

        // Pulse scale when mouse is pressed (looking around or aiming)
        const pulse = stateRef.current.isLookingAround ? 1.25 + Math.sin(time * 12) * 0.12 : 1.0;
        stateRef.current.aimReticle.scale.set(pulse, pulse, pulse);
      }

      // Animate 3D Folders (subtle floating pulse on lights)
      stateRef.current.stationMeshes.forEach(({ light }) => {
        light.intensity = 2.0 + Math.sin(time * 3) * 0.4;
      });

      // Animate Collectible Data USB drives & Collision Check
      stateRef.current.dataBits.forEach((bit) => {
        if (bit.collected) return;
        bit.mesh.rotation.y += delta * bit.rotationSpeed;
        bit.mesh.position.y = bit.baseY + Math.sin(time * 3 + bit.rotationSpeed) * 0.05;
        bit.light.position.y = bit.mesh.position.y;

        // Player Distance Check
        const dist = playerGroup.position.distanceTo(bit.mesh.position);
        if (dist < 1.6) {
          bit.collected = true;
          scene.remove(bit.mesh);
          scene.remove(bit.light);
          retroAudio.playCollect();
          stateRef.current.collectedCount++;
          onBitCollected(stateRef.current.collectedCount);
        }
      });

      // ==========================================
      // MOUSE & KEYBOARD DIRECTION CONTROL LOGIC
      // ==========================================
      const mouseDx = stateRef.current.mouseWorldPos.x - stateRef.current.playerPos.x;
      const mouseDz = stateRef.current.mouseWorldPos.z - stateRef.current.playerPos.z;
      const mouseDist = Math.hypot(mouseDx, mouseDz);
      const mouseAimAngle = Math.atan2(mouseDx, mouseDz);

      // Check for click-to-drive (when left button is held without fast drag)
      const isMouseDriving =
        stateRef.current.isLookingAround &&
        stateRef.current.activeMouseButton === 0 &&
        stateRef.current.dragDistance < 15 &&
        !activeModalRef.current &&
        mouseDist > 0.85;

      // Keyboard & Virtual Joystick Input
      let moveX = 0;
      let moveZ = 0;

      if (stateRef.current.keys.w) moveZ -= 1;
      if (stateRef.current.keys.s) moveZ += 1;
      if (stateRef.current.keys.a) moveX -= 1;
      if (stateRef.current.keys.d) moveX += 1;

      // Virtual Joystick Override (for mobile / touch)
      if (joystickVector && (Math.abs(joystickVector.x) > 0.1 || Math.abs(joystickVector.y) > 0.1)) {
        moveX = joystickVector.x;
        moveZ = joystickVector.y;
      }

      const isKeyMoving = Math.abs(moveX) > 0.05 || Math.abs(moveZ) > 0.05;
      const isMoving = isKeyMoving || isMouseDriving;
      const speed = stateRef.current.keys.shift ? 10.5 : 6.0;

      if (isMouseDriving) {
        // Direct Mouse Steering: walk toward the mouse cursor coordinate
        const moveDirX = mouseDx / mouseDist;
        const moveDirZ = mouseDz / mouseDist;

        stateRef.current.playerVelocity.x = moveDirX * speed;
        stateRef.current.playerVelocity.z = moveDirZ * speed;
        stateRef.current.playerAngle = mouseAimAngle;

        footstepTimer += delta;
        if (footstepTimer > (stateRef.current.keys.shift ? 0.22 : 0.35)) {
          footstepTimer = 0;
          if (!stateRef.current.isJumping) retroAudio.playFootstep();
        }
        stateRef.current.walkCycle += delta * (stateRef.current.keys.shift ? 18 : 11);
      } else if (isKeyMoving) {
        // True 3D Game Movement relative to Camera Orientation
        const camAngle = stateRef.current.cameraAngle;
        const forwardX = -Math.sin(camAngle);
        const forwardZ = -Math.cos(camAngle);
        const rightX = Math.cos(camAngle);
        const rightZ = -Math.sin(camAngle);

        const moveDirX = (-moveZ * forwardX) + (moveX * rightX);
        const moveDirZ = (-moveZ * forwardZ) + (moveX * rightZ);

        const moveLen = Math.hypot(moveDirX, moveDirZ);
        const normX = moveLen > 0 ? moveDirX / moveLen : 0;
        const normZ = moveLen > 0 ? moveDirZ / moveLen : 0;

        stateRef.current.playerVelocity.x = normX * speed;
        stateRef.current.playerVelocity.z = normZ * speed;

        if (mouseSteerModeRef.current || stateRef.current.activeMouseButton === 2) {
          // In Mouse Steer Mode or right-mouse hold, operative aligns with camera heading
          stateRef.current.playerAngle = camAngle + Math.PI;
        } else {
          // Standard movement heading
          stateRef.current.playerAngle = Math.atan2(normX, normZ);
        }

        footstepTimer += delta;
        if (footstepTimer > (stateRef.current.keys.shift ? 0.22 : 0.35)) {
          footstepTimer = 0;
          if (!stateRef.current.isJumping) retroAudio.playFootstep();
        }
        stateRef.current.walkCycle += delta * (stateRef.current.keys.shift ? 18 : 11);
      } else {
        // Idle / Stationary: Decelerate velocity
        stateRef.current.playerVelocity.x *= 0.8;
        stateRef.current.playerVelocity.z *= 0.8;
        stateRef.current.walkCycle = 0;

        // When idle and not dragging camera, operative smoothly turns to face cursor coordinate
        if (mouseDist > 0.75 && !activeModalRef.current && !stateRef.current.isLookingAround) {
          let angleDiff = mouseAimAngle - stateRef.current.playerAngle;
          while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
          while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
          stateRef.current.playerAngle += angleDiff * 0.12;
        }
      }

      // Visor & Head Dynamic Tracking (Operative looks towards mouse pointer)
      const { head, visor } = stateRef.current.playerParts;
      if (head && visor && mouseDist > 0.5) {
        let headDiff = mouseAimAngle - stateRef.current.playerAngle;
        while (headDiff > Math.PI) headDiff -= Math.PI * 2;
        while (headDiff < -Math.PI) headDiff += Math.PI * 2;
        const clampedTilt = THREE.MathUtils.clamp(headDiff * 0.45, -0.65, 0.65);
        head.rotation.y = clampedTilt;
        visor.rotation.y = clampedTilt;
      }

      // Apply Player Position Updates
      stateRef.current.playerPos.x += stateRef.current.playerVelocity.x * delta;
      stateRef.current.playerPos.z += stateRef.current.playerVelocity.z * delta;

      // Room Boundaries: Securely clamped inside the Office Room (-11.2 to +11.2)
      stateRef.current.playerPos.x = Math.max(-11.2, Math.min(11.2, stateRef.current.playerPos.x));
      stateRef.current.playerPos.z = Math.max(-11.2, Math.min(11.2, stateRef.current.playerPos.z));

      // Jump Physics
      if (stateRef.current.isJumping) {
        stateRef.current.playerPos.y += stateRef.current.playerVelocity.y * delta;
        stateRef.current.playerVelocity.y -= 19.8 * delta; // Gravity
        if (stateRef.current.playerPos.y <= 0) {
          stateRef.current.playerPos.y = 0;
          stateRef.current.playerVelocity.y = 0;
          stateRef.current.isJumping = false;
        }
      }

      // Sync 3D Player Group
      playerGroup.position.copy(stateRef.current.playerPos);
      playerGroup.rotation.y = stateRef.current.playerAngle;

      // Animate Limbs
      const { leftLeg, rightLeg, leftArm, rightArm, thrusterGlow } = stateRef.current.playerParts;
      if (leftLeg && rightLeg && leftArm && rightArm) {
        const swing = Math.sin(stateRef.current.walkCycle) * 0.55;
        leftLeg.rotation.x = swing;
        rightLeg.rotation.x = -swing;
        leftArm.rotation.x = -swing * 0.7;
        rightArm.rotation.x = swing * 0.7;
      }
      if (thrusterGlow) {
        thrusterGlow.intensity = isMoving ? (stateRef.current.keys.shift ? 2.5 : 1.5) : 0.4;
      }

      // Smooth Camera Follow with full Yaw & Pitch Look Around (Real Game 3D Orbit)
      const camDist = stateRef.current.cameraDistance;
      const pitch = stateRef.current.cameraPitch;
      const yaw = stateRef.current.cameraAngle;

      const horizontalDist = camDist * Math.cos(pitch);
      const targetCamX = stateRef.current.playerPos.x + Math.sin(yaw) * horizontalDist;
      const targetCamY = stateRef.current.playerPos.y + 1.8 + Math.sin(pitch) * camDist;
      const targetCamZ = stateRef.current.playerPos.z + Math.cos(yaw) * horizontalDist;

      camera.position.x += (targetCamX - camera.position.x) * 0.16;
      camera.position.y += (targetCamY - camera.position.y) * 0.16;
      camera.position.z += (targetCamZ - camera.position.z) * 0.16;

      camera.lookAt(
        stateRef.current.playerPos.x,
        stateRef.current.playerPos.y + 1.8,
        stateRef.current.playerPos.z
      );

      // Station Proximity Check
      let closestStation: StationLocation | null = null;
      let closestDist = Infinity;

      STATIONS.forEach((st) => {
        const stationPos = new THREE.Vector3(st.position[0], 0, st.position[2]);
        const dist = playerGroup.position.distanceTo(stationPos);
        if (dist < st.radius + 1.2) {
          if (dist < closestDist) {
            closestDist = dist;
            closestStation = st;
          }
        }
      });

      if (closestStation !== stateRef.current.nearbyStation) {
        stateRef.current.nearbyStation = closestStation;
        onStationProximity(closestStation);
      }

      // Render
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Handle dynamic light/dark theme transition
  useEffect(() => {
    const { scene, ambientLight, dirLight, fillLight } = stateRef.current;
    if (!scene || !ambientLight || !dirLight || !fillLight) return;
    const isLight = theme === 'light';

    scene.background = new THREE.Color(isLight ? 0xb4d3f5 : 0x060a14);
    scene.fog = new THREE.FogExp2(isLight ? 0xcbe2fb : 0x060a14, 0.014);

    ambientLight.color.setHex(isLight ? 0xe2e8f0 : 0x283548);
    ambientLight.intensity = isLight ? 3.0 : 2.2;

    dirLight.color.setHex(isLight ? 0xfff7ed : 0x38bdf8);
    dirLight.intensity = isLight ? 3.5 : 2.2;

    fillLight.color.setHex(isLight ? 0xffffff : 0xffedd5);
    fillLight.intensity = isLight ? 1.6 : 1.8;
  }, [theme]);

  // Handle on-screen Action Button (mobile / touch)
  useEffect(() => {
    if (isActionPressed && stateRef.current.nearbyStation) {
      retroAudio.playInteract();
      onOpenStation(stateRef.current.nearbyStation);
    }
  }, [isActionPressed, onOpenStation]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full cursor-crosshair overflow-hidden touch-none"
    />
  );
};
