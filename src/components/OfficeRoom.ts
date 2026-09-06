import * as THREE from 'three';
import { StationLocation } from '../types';

export interface StationMeshEntry {
  station: StationLocation;
  group: THREE.Group;
  light: THREE.PointLight;
  folderMesh: THREE.Object3D;
}

export interface CollectibleBit {
  mesh: THREE.Mesh;
  light: THREE.PointLight;
  collected: boolean;
  baseY: number;
  rotationSpeed: number;
}

export interface OfficeSceneObjects {
  stationMeshes: StationMeshEntry[];
  dataBits: CollectibleBit[];
  animatedScreens: THREE.Mesh[];
  skyVehicles: THREE.Group[];
  deskLampLight: THREE.PointLight;
}

/**
 * Creates a procedural canvas texture with illuminated skyscraper windows
 */
function createSkyscraperWindowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Dark building facade base
  ctx.fillStyle = '#060a14';
  ctx.fillRect(0, 0, 256, 512);

  // Draw grid of windows
  const cols = 12;
  const rows = 28;
  const winW = 12;
  const winH = 10;
  const gapX = 9;
  const gapY = 8;
  const startX = 8;
  const startY = 10;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const isLit = Math.random() > 0.42;
      const x = startX + c * (winW + gapX);
      const y = startY + r * (winH + gapY);

      if (isLit) {
        const randCol = Math.random();
        if (randCol < 0.45) {
          ctx.fillStyle = '#ffde59'; // Warm office light
        } else if (randCol < 0.8) {
          ctx.fillStyle = '#00ffff'; // Cool cyber blue
        } else if (randCol < 0.92) {
          ctx.fillStyle = '#ff00ff'; // Cyberpunk neon pink
        } else {
          ctx.fillStyle = '#ffffff'; // Fluorescent white
        }
        ctx.fillRect(x, y, winW, winH);
      } else {
        ctx.fillStyle = '#0c1322';
        ctx.fillRect(x, y, winW, winH);
      }
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 2);
  return texture;
}

/**
 * Creates a canvas texture for computer monitor screens with cyber code
 */
function createTerminalScreenTexture(title: string, color: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#050b14';
  ctx.fillRect(0, 0, 512, 256);

  // Header bar
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 512, 28);
  ctx.fillStyle = '#000000';
  ctx.font = 'bold 14px monospace';
  ctx.fillText(`// ESTIN CYBER WORKSTATION : ${title}`, 12, 20);

  // Terminal lines
  ctx.fillStyle = color;
  ctx.font = '12px monospace';
  const lines = [
    'root@asmaa-workstation:~$ ./monitor_network.sh --live',
    '[OK] Threat Matrix Status: 0 INTRUSIONS DETECTED',
    '[NET] Eth0 Traffic: 1.48 Gb/s [ENCRYPTED AES-GCM]',
    '[DEF] Neural Sentinel AI: ONLINE (Weights: CrackGuard v2.4)',
    '[AIR] Air Algerie Payroll DB: SYNCED (300+ Active Records)',
    '[EDR] SentinelIR Windows Telemetry: 100% HEALTHY',
    '>> Awaiting Operator Command...'
  ];

  lines.forEach((line, i) => {
    ctx.fillText(line, 16, 60 + i * 26);
  });

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

/**
 * Creates floating text label sprites for 3D folders
 */
function createFolderBadgeSprite(label: string, colorHex: string): THREE.Sprite {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;

  // Background capsule pill
  ctx.fillStyle = 'rgba(7, 14, 28, 0.92)';
  ctx.strokeStyle = colorHex;
  ctx.lineWidth = 6;
  
  const x = 12, y = 14, w = 488, h = 100, radius = 24;
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  ctx.lineTo(x + radius, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Top mini badge
  ctx.fillStyle = colorHex;
  ctx.fillRect(36, 14, 130, 20);
  ctx.fillStyle = '#000000';
  ctx.font = 'bold 11px monospace';
  ctx.fillText('CLASSIFIED FILE', 44, 28);

  // Main Folder Label
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 24px monospace';
  ctx.fillText(`📁 ${label}`, 36, 68);

  // Subtitle
  ctx.fillStyle = colorHex;
  ctx.font = 'bold 14px monospace';
  ctx.fillText('[ CLICK OR PRESS E TO OPEN ]', 36, 96);

  const texture = new THREE.CanvasTexture(canvas);
  const spriteMat = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthTest: true,
  });
  const sprite = new THREE.Sprite(spriteMat);
  sprite.scale.set(3.2, 0.8, 1);
  return sprite;
}

/**
 * Builds the entire 3D Office Room with windows, city skyline, walls, and furniture
 */
export function buildOfficeRoom(scene: THREE.Scene): OfficeSceneObjects {
  // 1. Room Floor: Parquet / Dark Slate Floor
  const floorGeo = new THREE.PlaneGeometry(26, 26);
  const floorMat = new THREE.MeshStandardMaterial({
    color: 0x141b2b,
    roughness: 0.35,
    metalness: 0.5,
  });
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  // Sleek geometric floor grid lines
  const floorGrid = new THREE.GridHelper(26, 26, 0x1e3a5f, 0x0f172a);
  floorGrid.position.y = 0.01;
  scene.add(floorGrid);

  // Executive Woven Carpet under the main desk
  const rugGeo = new THREE.PlaneGeometry(12, 9);
  const rugMat = new THREE.MeshStandardMaterial({
    color: 0x0b1526,
    roughness: 0.9,
    metalness: 0.1,
  });
  const rug = new THREE.Mesh(rugGeo, rugMat);
  rug.rotation.x = -Math.PI / 2;
  rug.position.set(0, 0.02, -4.5);
  rug.receiveShadow = true;
  scene.add(rug);

  // Rug accent border
  const rugBorderGeo = new THREE.RingGeometry(5.8, 6.0, 4);
  const rugBorderMat = new THREE.MeshBasicMaterial({ color: 0x00ffcc, side: THREE.DoubleSide, transparent: true, opacity: 0.4 });
  const rugBorder = new THREE.Mesh(rugBorderGeo, rugBorderMat);
  rugBorder.rotation.x = -Math.PI / 2;
  rugBorder.rotation.z = Math.PI / 4;
  rugBorder.position.set(0, 0.025, -4.5);
  scene.add(rugBorder);

  // 2. BACK WALL (Z = -13) WITH HUGE PANORAMIC CITY WINDOWS
  const wallMat = new THREE.MeshStandardMaterial({ color: 0x0d1424, roughness: 0.8, metalness: 0.2 });
  
  // Left pillar of back wall
  const leftPillar = new THREE.Mesh(new THREE.BoxGeometry(2.5, 6.5, 0.6), wallMat);
  leftPillar.position.set(-11.75, 3.25, -13);
  scene.add(leftPillar);

  // Right pillar of back wall
  const rightPillar = new THREE.Mesh(new THREE.BoxGeometry(2.5, 6.5, 0.6), wallMat);
  rightPillar.position.set(11.75, 3.25, -13);
  scene.add(rightPillar);

  // Top header above windows
  const topHeader = new THREE.Mesh(new THREE.BoxGeometry(26, 1.2, 0.6), wallMat);
  topHeader.position.set(0, 5.9, -13);
  scene.add(topHeader);

  // Bottom window sill
  const windowSill = new THREE.Mesh(new THREE.BoxGeometry(22, 0.9, 0.8), new THREE.MeshStandardMaterial({ color: 0x111c30, roughness: 0.4, metalness: 0.7 }));
  windowSill.position.set(0, 0.45, -12.9);
  scene.add(windowSill);

  // 3 Large Panoramic Window Panes (Glass + Mullions)
  const windowGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0x88ccff,
    transparent: true,
    opacity: 0.18,
    roughness: 0.05,
    metalness: 0.9,
    reflectivity: 0.9,
    clearcoat: 1.0,
  });

  const mullionMat = new THREE.MeshStandardMaterial({ color: 0x1a263d, metalness: 0.8, roughness: 0.3 });

  // Glass surface
  const glassPane = new THREE.Mesh(new THREE.PlaneGeometry(21, 4.4), windowGlassMat);
  glassPane.position.set(0, 3.1, -12.95);
  scene.add(glassPane);

  // Vertical Window Mullions
  for (let x of [-7, -3.5, 0, 3.5, 7]) {
    const mullion = new THREE.Mesh(new THREE.BoxGeometry(0.2, 4.4, 0.3), mullionMat);
    mullion.position.set(x, 3.1, -12.9);
    scene.add(mullion);
  }

  // Horizontal Mullions
  for (let y of [2.0, 4.2]) {
    const hMullion = new THREE.Mesh(new THREE.BoxGeometry(21, 0.15, 0.3), mullionMat);
    hMullion.position.set(0, y, -12.9);
    scene.add(hMullion);
  }

  // 3. 3D CITY SKYLINE OUTSIDE WINDOWS
  const skylineTexture = createSkyscraperWindowTexture();
  const skyVehicles: THREE.Group[] = [];

  const buildingMat = new THREE.MeshStandardMaterial({
    color: 0x1a233a,
    map: skylineTexture,
    roughness: 0.5,
    metalness: 0.7,
    emissive: 0x112233,
    emissiveIntensity: 0.35,
  });

  // Generate 26 3D skyscrapers at various distances behind the window
  for (let i = 0; i < 26; i++) {
    const bWidth = 2.5 + Math.random() * 4.5;
    const bHeight = 12 + Math.random() * 28;
    const bDepth = 3.0 + Math.random() * 5.0;

    const bX = -28 + (i / 25) * 56 + (Math.random() - 0.5) * 2;
    const bZ = -18 - Math.random() * 32;

    const buildingGeo = new THREE.BoxGeometry(bWidth, bHeight, bDepth);
    const building = new THREE.Mesh(buildingGeo, buildingMat);
    building.position.set(bX, bHeight / 2 - 2, bZ);
    scene.add(building);

    // Antenna with blinking warning light on tall buildings
    if (bHeight > 22) {
      const antGeo = new THREE.CylinderGeometry(0.08, 0.15, 4, 6);
      const antMat = new THREE.MeshBasicMaterial({ color: 0x64748b });
      const antenna = new THREE.Mesh(antGeo, antMat);
      antenna.position.set(bX, bHeight + 1.8, bZ);
      scene.add(antenna);

      const beaconGeo = new THREE.SphereGeometry(0.25, 8, 8);
      const beaconMat = new THREE.MeshBasicMaterial({ color: 0xff0044 });
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.position.set(bX, bHeight + 3.8, bZ);
      scene.add(beacon);
    }
  }

  // Moving aerial transit vehicles across the night skyline
  for (let v = 0; v < 3; v++) {
    const vehGroup = new THREE.Group();
    const vBody = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 0.4, 0.6),
      new THREE.MeshBasicMaterial({ color: 0x0ea5e9 })
    );
    vehGroup.add(vBody);

    const headLight = new THREE.PointLight(v === 0 ? 0x00ffff : 0xff3366, 2.0, 10);
    vehGroup.add(headLight);

    vehGroup.position.set(-25 + v * 18, 12 + v * 3, -24 - v * 6);
    scene.add(vehGroup);
    skyVehicles.push(vehGroup);
  }

  // Distant stars & twilight haze behind skyline
  const starCount = 600;
  const starGeo = new THREE.BufferGeometry();
  const starPos = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i++) {
    starPos[i * 3] = (Math.random() - 0.5) * 120;
    starPos[i * 3 + 1] = 6 + Math.random() * 45;
    starPos[i * 3 + 2] = -35 - Math.random() * 45;
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xcfe2ff, size: 0.9, transparent: true, opacity: 0.8 }));
  scene.add(stars);

  // 4. SIDE WALLS & ENTRANCE WALL
  // Left Wall (X = -13) with Bookshelves and Framed Diplomas
  const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.6, 6.5, 26), wallMat);
  leftWall.position.set(-13, 3.25, 0);
  scene.add(leftWall);

  // Right Wall (X = +13) with Strategy Whiteboard
  const rightWall = new THREE.Mesh(new THREE.BoxGeometry(0.6, 6.5, 26), wallMat);
  rightWall.position.set(13, 3.25, 0);
  scene.add(rightWall);

  // Front Wall (Z = +13) with Frosted Glass Entrance Doors
  const frontWallPillar1 = new THREE.Mesh(new THREE.BoxGeometry(8, 6.5, 0.6), wallMat);
  frontWallPillar1.position.set(-9, 3.25, 13);
  scene.add(frontWallPillar1);

  const frontWallPillar2 = new THREE.Mesh(new THREE.BoxGeometry(8, 6.5, 0.6), wallMat);
  frontWallPillar2.position.set(9, 3.25, 13);
  scene.add(frontWallPillar2);

  const entranceHeader = new THREE.Mesh(new THREE.BoxGeometry(10, 1.8, 0.6), wallMat);
  entranceHeader.position.set(0, 5.6, 13);
  scene.add(entranceHeader);

  // Frosted sliding glass doors
  const doorMat = new THREE.MeshPhysicalMaterial({ color: 0x00ffcc, transparent: true, opacity: 0.25, roughness: 0.2 });
  const doorLeft = new THREE.Mesh(new THREE.BoxGeometry(4.8, 4.7, 0.1), doorMat);
  doorLeft.position.set(-2.4, 2.35, 12.9);
  scene.add(doorLeft);

  const doorRight = new THREE.Mesh(new THREE.BoxGeometry(4.8, 4.7, 0.1), doorMat);
  doorRight.position.set(2.4, 2.35, 12.9);
  scene.add(doorRight);

  // Biometric keycard reader next to door
  const keypad = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.6, 0.4), new THREE.MeshBasicMaterial({ color: 0x00ff99 }));
  keypad.position.set(5.2, 2.2, 12.7);
  scene.add(keypad);

  // Ceiling
  const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(26, 26), new THREE.MeshStandardMaterial({ color: 0x080e1b, roughness: 0.9 }));
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.y = 6.4;
  scene.add(ceiling);

  // Recessed LED ceiling perimeter light strips
  const ceilingLight = new THREE.RectAreaLight ? null : null;
  const topPointLight = new THREE.PointLight(0xa5b4fc, 1.5, 25);
  topPointLight.position.set(0, 5.8, 0);
  scene.add(topPointLight);

  // 5. EXECUTIVE FURNITURE
  // ==========================================
  // A. Main Executive Desk (Center, Z = -5)
  // ==========================================
  const deskGroup = new THREE.Group();
  deskGroup.position.set(0, 0, -5.0);

  // Desktop Tabletop (Dark walnut + metallic trim)
  const deskTop = new THREE.Mesh(
    new THREE.BoxGeometry(6.6, 0.14, 2.6),
    new THREE.MeshStandardMaterial({ color: 0x1a2130, roughness: 0.3, metalness: 0.6 })
  );
  deskTop.position.y = 1.2;
  deskTop.castShadow = true;
  deskTop.receiveShadow = true;
  deskGroup.add(deskTop);

  // Desk Legs (Matte Black Steel)
  const legMat = new THREE.MeshStandardMaterial({ color: 0x0a0e17, metalness: 0.9, roughness: 0.3 });
  const leg1 = new THREE.Mesh(new THREE.BoxGeometry(0.2, 1.2, 2.4), legMat);
  leg1.position.set(-3.1, 0.6, 0);
  deskGroup.add(leg1);

  const leg2 = new THREE.Mesh(new THREE.BoxGeometry(0.2, 1.2, 2.4), legMat);
  leg2.position.set(3.1, 0.6, 0);
  deskGroup.add(leg2);

  // Modesty panel
  const modesty = new THREE.Mesh(new THREE.BoxGeometry(6.0, 0.8, 0.08), legMat);
  modesty.position.set(0, 0.7, -1.0);
  deskGroup.add(modesty);

  // Desk Lamp with warm amber glow
  const lampPole = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.7), legMat);
  lampPole.position.set(2.4, 1.6, -0.6);
  deskGroup.add(lampPole);

  const lampShade = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.25, 8), new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.8 }));
  lampShade.position.set(2.4, 1.95, -0.6);
  lampShade.rotation.x = Math.PI / 6;
  deskGroup.add(lampShade);

  const deskLampLight = new THREE.PointLight(0xfef08a, 2.2, 7.5);
  deskLampLight.position.set(2.4, 1.9, -0.6);
  deskGroup.add(deskLampLight);

  // Keyboard and Mousepad
  const mousepad = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.02, 1.0), new THREE.MeshStandardMaterial({ color: 0x050a14 }));
  mousepad.position.set(0, 1.28, 0.2);
  deskGroup.add(mousepad);

  const keyboard = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.04, 0.45), new THREE.MeshStandardMaterial({ color: 0x22d3ee, metalness: 0.8 }));
  keyboard.position.set(-0.2, 1.3, 0.2);
  deskGroup.add(keyboard);

  // Coffee Mug
  const mug = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.1, 0.24, 12), new THREE.MeshStandardMaterial({ color: 0x00ffcc }));
  mug.position.set(2.2, 1.38, 0.3);
  deskGroup.add(mug);

  // Dual Curved Workstation Monitors
  const animatedScreens: THREE.Mesh[] = [];
  const screenMat1 = new THREE.MeshBasicMaterial({ map: createTerminalScreenTexture('DEFENSE TELEMETRY', '#00ffcc') });
  const screenMat2 = new THREE.MeshBasicMaterial({ map: createTerminalScreenTexture('SYSTEM RADAR', '#f43f5e') });

  // Left Monitor
  const monitorFrame1 = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.05, 0.08), legMat);
  monitorFrame1.position.set(-1.0, 2.05, -0.45);
  monitorFrame1.rotation.y = 0.18;
  deskGroup.add(monitorFrame1);

  const screen1 = new THREE.Mesh(new THREE.PlaneGeometry(1.7, 0.95), screenMat1);
  screen1.position.set(-1.0, 2.05, -0.4);
  screen1.rotation.y = 0.18;
  deskGroup.add(screen1);
  animatedScreens.push(screen1);

  // Right Monitor
  const monitorFrame2 = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.05, 0.08), legMat);
  monitorFrame2.position.set(0.95, 2.05, -0.45);
  monitorFrame2.rotation.y = -0.18;
  deskGroup.add(monitorFrame2);

  const screen2 = new THREE.Mesh(new THREE.PlaneGeometry(1.7, 0.95), screenMat2);
  screen2.position.set(0.95, 2.05, -0.4);
  screen2.rotation.y = -0.18;
  deskGroup.add(screen2);
  animatedScreens.push(screen2);

  // Monitor Stand Arm
  const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.8), legMat);
  stand.position.set(0, 1.6, -0.5);
  deskGroup.add(stand);

  // Executive Chair Behind Desk
  const chairMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.4, metalness: 0.5 });
  const chairSeat = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.15, 1.2), chairMat);
  chairSeat.position.set(0, 1.0, -1.5);
  deskGroup.add(chairSeat);

  const chairBack = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.6, 0.15), chairMat);
  chairBack.position.set(0, 1.85, -2.0);
  chairBack.rotation.x = -0.12;
  deskGroup.add(chairBack);

  const chairBase = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.8), legMat);
  chairBase.position.set(0, 0.4, -1.5);
  deskGroup.add(chairBase);

  scene.add(deskGroup);

  // ==========================================
  // B. Side Credenza Tables for Folders
  // ==========================================
  const tableMat = new THREE.MeshStandardMaterial({ color: 0x151f33, roughness: 0.3, metalness: 0.6 });

  // Left Credenza (Projects Folder Table)
  const leftCredenza = new THREE.Mesh(new THREE.BoxGeometry(3.6, 1.0, 1.8), tableMat);
  leftCredenza.position.set(-6.8, 0.5, -4.8);
  leftCredenza.castShadow = true;
  leftCredenza.receiveShadow = true;
  scene.add(leftCredenza);

  // Right Credenza (Experience & Missions Folder Table)
  const rightCredenza = new THREE.Mesh(new THREE.BoxGeometry(3.6, 1.0, 1.8), tableMat);
  rightCredenza.position.set(6.8, 0.5, -4.8);
  rightCredenza.castShadow = true;
  rightCredenza.receiveShadow = true;
  scene.add(rightCredenza);

  // Left Research Table (Skills Binder Table)
  const leftRefTable = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.0, 1.8), tableMat);
  leftRefTable.position.set(-7.8, 0.5, 3.5);
  leftRefTable.castShadow = true;
  leftRefTable.receiveShadow = true;
  scene.add(leftRefTable);

  // Right Academy Console Table (Certifications Table)
  const rightCertTable = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.0, 1.8), tableMat);
  rightCertTable.position.set(7.8, 0.5, 3.5);
  rightCertTable.castShadow = true;
  rightCertTable.receiveShadow = true;
  scene.add(rightCertTable);

  // Center Lounge Coffee Table (Contact & Comms Dossier Table)
  const coffeeTable = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 0.7, 24), tableMat);
  coffeeTable.position.set(0, 0.35, 6.2);
  coffeeTable.castShadow = true;
  coffeeTable.receiveShadow = true;
  scene.add(coffeeTable);

  // Armchairs around coffee table
  const chairMat2 = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.7 });
  const loungeChair1 = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.8, 1.2), chairMat2);
  loungeChair1.position.set(-2.4, 0.4, 6.2);
  scene.add(loungeChair1);

  const loungeChair2 = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.8, 1.2), chairMat2);
  loungeChair2.position.set(2.4, 0.4, 6.2);
  scene.add(loungeChair2);

  // ==========================================
  // C. Bookshelf, Strategy Board, Server Rack & Plants
  // ==========================================
  // Left Bookshelf
  const shelfWood = new THREE.MeshStandardMaterial({ color: 0x1e1b18, roughness: 0.6 });
  const bookColors = [0xef4444, 0x3b82f6, 0x10b981, 0xf59e0b, 0x8b5cf6, 0x06b6d4];

  for (let s = 0; s < 5; s++) {
    const shelf = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.08, 6.5), shelfWood);
    shelf.position.set(-12.4, 0.8 + s * 1.0, 0);
    scene.add(shelf);

    // Books on each shelf
    for (let b = 0; b < 12; b++) {
      const bH = 0.55 + Math.random() * 0.3;
      const bT = 0.12 + Math.random() * 0.1;
      const col = bookColors[Math.floor(Math.random() * bookColors.length)];
      const book = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, bH, bT),
        new THREE.MeshStandardMaterial({ color: col, roughness: 0.4 })
      );
      book.position.set(-12.4, 0.8 + s * 1.0 + bH / 2, -2.8 + b * 0.5);
      scene.add(book);
    }
  }

  // Framed Academic Certificates on Left Wall
  const certFrameGeo = new THREE.BoxGeometry(0.08, 1.4, 2.0);
  const certFrameMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.8, roughness: 0.2 });
  const certFrame1 = new THREE.Mesh(certFrameGeo, certFrameMat);
  certFrame1.position.set(-12.6, 4.2, -4.5);
  scene.add(certFrame1);

  const certPaper1 = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 1.2), new THREE.MeshBasicMaterial({ color: 0xfef3c7 }));
  certPaper1.rotation.y = Math.PI / 2;
  certPaper1.position.set(-12.55, 4.2, -4.5);
  scene.add(certPaper1);

  // Strategy Whiteboard on Right Wall
  const boardFrame = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 2.6, 5.2),
    new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8 })
  );
  boardFrame.position.set(12.6, 3.2, 0);
  scene.add(boardFrame);

  const boardSurface = new THREE.Mesh(
    new THREE.PlaneGeometry(5.0, 2.4),
    new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.1, metalness: 0.1 })
  );
  boardSurface.rotation.y = -Math.PI / 2;
  boardSurface.position.set(12.54, 3.2, 0);
  scene.add(boardSurface);

  // Enterprise Server Rack Tower in Corner
  const rackMat = new THREE.MeshStandardMaterial({ color: 0x090d16, metalness: 0.9, roughness: 0.2 });
  const serverRack = new THREE.Mesh(new THREE.BoxGeometry(1.4, 4.8, 1.4), rackMat);
  serverRack.position.set(-11.2, 2.4, 11.2);
  scene.add(serverRack);

  // Server LEDs
  const ledMatGreen = new THREE.MeshBasicMaterial({ color: 0x10b981 });
  const ledMatBlue = new THREE.MeshBasicMaterial({ color: 0x06b6d4 });
  for (let l = 0; l < 8; l++) {
    const led1 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.06, 0.06), ledMatGreen);
    led1.position.set(-10.45, 0.8 + l * 0.5, 11.2);
    scene.add(led1);

    const led2 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.06, 0.06), ledMatBlue);
    led2.position.set(-10.45, 0.8 + l * 0.5 + 0.15, 11.2);
    scene.add(led2);
  }

  // Potted Office Plants
  const potGeo = new THREE.CylinderGeometry(0.6, 0.45, 1.2, 16);
  const potMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.3 });

  // Plant 1 (Back Left Corner)
  const pot1 = new THREE.Mesh(potGeo, potMat);
  pot1.position.set(-10.8, 0.6, -11.0);
  scene.add(pot1);

  const plantLeafMat = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.6 });
  for (let leaf = 0; leaf < 6; leaf++) {
    const angle = (leaf / 6) * Math.PI * 2;
    const plantLeaf = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.4, 0.06), plantLeafMat);
    plantLeaf.position.set(
      -10.8 + Math.cos(angle) * 0.4,
      1.6 + Math.sin(angle) * 0.1,
      -11.0 + Math.sin(angle) * 0.4
    );
    plantLeaf.rotation.z = Math.cos(angle) * 0.45;
    plantLeaf.rotation.x = Math.sin(angle) * 0.45;
    scene.add(plantLeaf);
  }

  // Plant 2 (Back Right Corner)
  const pot2 = new THREE.Mesh(potGeo, potMat);
  pot2.position.set(10.8, 0.6, -11.0);
  scene.add(pot2);

  for (let leaf = 0; leaf < 6; leaf++) {
    const angle = (leaf / 6) * Math.PI * 2;
    const plantLeaf = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.4, 0.06), plantLeafMat);
    plantLeaf.position.set(
      10.8 + Math.cos(angle) * 0.4,
      1.6 + Math.sin(angle) * 0.1,
      -11.0 + Math.sin(angle) * 0.4
    );
    plantLeaf.rotation.z = Math.cos(angle) * 0.45;
    plantLeaf.rotation.x = Math.sin(angle) * 0.45;
    scene.add(plantLeaf);
  }

  // 6. SCATTER INTERACTIVE 3D FOLDERS
  const stationMeshes = buildFolderStations(scene);

  // 7. SCATTER COLLECTIBLE DATA CHIPS / USB DISKS
  const dataBits = buildOfficeCollectibles(scene);

  return {
    stationMeshes,
    dataBits,
    animatedScreens,
    skyVehicles,
    deskLampLight,
  };
}

/**
 * Builds realistic 3D Manila/Cyber Dossier Folders for all stations
 */
function buildFolderStations(scene: THREE.Scene): StationMeshEntry[] {
  const stationEntries: StationMeshEntry[] = [];

  const STATIONS_CONFIG = [
    {
      id: 'station-about',
      name: 'OPERATIVE DOSSIER',
      color: '#00ff96',
      pos: [-2.2, 1.28, -4.6] as [number, number, number],
      rotY: 0.15,
      type: 'about',
      isWorkstation: false,
    },
    {
      id: 'station-projects',
      name: 'PROJECTS ARCHIVE',
      color: '#00ffff',
      pos: [-6.8, 1.05, -4.8] as [number, number, number],
      rotY: -0.1,
      type: 'projects',
      isWorkstation: false,
    },
    {
      id: 'station-experience',
      name: 'CAREER & MISSIONS FILE',
      color: '#ff007f',
      pos: [6.8, 1.05, -4.8] as [number, number, number],
      rotY: 0.2,
      type: 'experience',
      isWorkstation: false,
    },
    {
      id: 'station-skills',
      name: 'SKILLS ARSENAL BINDER',
      color: '#f1c40f',
      pos: [-7.8, 1.05, 3.5] as [number, number, number],
      rotY: 0.35,
      type: 'skills',
      isWorkstation: false,
    },
    {
      id: 'station-certs',
      name: 'CERTIFICATIONS ARCHIVE',
      color: '#9b59b6',
      pos: [7.8, 1.05, 3.5] as [number, number, number],
      rotY: -0.25,
      type: 'certs',
    },
    {
      id: 'station-contact',
      name: 'COMMS & DISPATCH DOSSIER',
      color: '#2ecc71',
      pos: [0, 0.75, 6.2] as [number, number, number],
      rotY: 0.1,
      type: 'contact',
    },
  ];

  STATIONS_CONFIG.forEach((cfg) => {
    const group = new THREE.Group();
    group.position.set(cfg.pos[0], cfg.pos[1], cfg.pos[2]);

    let folderInteractiveMesh: THREE.Object3D;

    // Realistic 3D Manila Dossier Folder
    const folderColor = new THREE.Color(cfg.color);
    const folderCoverMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.4,
      metalness: 0.3,
    });

    // Bottom folder cover
    const bottomCover = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.04, 1.0), folderCoverMat);
    bottomCover.castShadow = true;
    group.add(bottomCover);

    // Top folder cover (ajar at 20 degrees angle)
    const topCover = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.04, 1.0), folderCoverMat);
    topCover.position.set(0, 0.12, -0.05);
    topCover.rotation.x = -0.25;
    group.add(topCover);

    // Dossier Papers inside (White/Ivory sheets)
    const paperMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.8 });
    for (let p = 0; p < 3; p++) {
      const sheet = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.015, 0.9), paperMat);
      sheet.position.set(0.02 * p, 0.03 + p * 0.02, 0.02 * p);
      group.add(sheet);
    }

    // Colored Folder Tab
    const tabMat = new THREE.MeshBasicMaterial({ color: folderColor });
    const tab = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.05, 0.18), tabMat);
    tab.position.set(0.45, 0.16, -0.5);
    group.add(tab);

    // Glowing Classification Label on folder face
    const labelBadge = new THREE.Mesh(
      new THREE.PlaneGeometry(0.8, 0.25),
      new THREE.MeshBasicMaterial({ color: folderColor, side: THREE.DoubleSide })
    );
    labelBadge.rotation.x = -Math.PI / 2 - 0.25;
    labelBadge.position.set(0, 0.15, 0.1);
    group.add(labelBadge);

    folderInteractiveMesh = bottomCover;

    group.rotation.y = cfg.rotY;

    // Floating 3D Holographic Badge Sprite above the folder
    const badgeSprite = createFolderBadgeSprite(cfg.name, cfg.color);
    badgeSprite.position.set(0, 1.2, 0);
    group.add(badgeSprite);

    // Dedicated Point Light illuminating the folder
    const folderLight = new THREE.PointLight(cfg.color, 2.2, 4.5);
    folderLight.position.set(0, 0.8, 0);
    group.add(folderLight);

    scene.add(group);

    // Find the corresponding StationLocation
    const matchedStation: StationLocation = {
      id: cfg.id,
      name: cfg.name,
      label: `Folder: ${cfg.name}`,
      icon: 'Folder',
      color: cfg.color,
      position: [cfg.pos[0], 0, cfg.pos[2]],
      radius: 2.8,
      type: cfg.type as any,
    };

    stationEntries.push({
      station: matchedStation,
      group,
      light: folderLight,
      folderMesh: folderInteractiveMesh,
    });
  });

  return stationEntries;
}

/**
 * Builds scattered collectible USB Data Drives and Microchips around the office
 */
function buildOfficeCollectibles(scene: THREE.Scene): CollectibleBit[] {
  const dataBits: CollectibleBit[] = [];

  // Coordinates on top of tables, desks, and shelves around the office
  const bitCoordinates: [number, number, number][] = [
    [-1.2, 1.35, -4.2],  // Main desk left
    [1.4, 1.35, -4.2],   // Main desk right
    [-5.6, 1.15, -4.4],  // Left credenza
    [5.6, 1.15, -4.4],   // Right credenza
    [-6.8, 1.15, 3.2],   // Left research table
    [6.8, 1.15, 3.2],    // Right cert table
    [-1.0, 0.85, 6.0],   // Coffee table
    [1.0, 0.85, 6.0],    // Coffee table
    [-12.2, 1.9, -1.0],  // Bookshelf tier 2
    [-12.2, 2.9, 1.5],   // Bookshelf tier 3
    [-10.2, 2.5, 10.8],  // Near server rack
    [10.2, 0.5, 9.8],    // Office floor corridor
    [-3.0, 0.5, 0.0],    // Office center rug
    [3.0, 0.5, 0.0],     // Office center rug
  ];

  bitCoordinates.forEach(([bx, by, bz]) => {
    // Cyber USB Flash Drive mesh
    const driveGroup = new THREE.Mesh(
      new THREE.BoxGeometry(0.35, 0.12, 0.6),
      new THREE.MeshStandardMaterial({
        color: 0x00ffcc,
        emissive: 0x00ccff,
        emissiveIntensity: 0.8,
        metalness: 0.9,
      })
    );
    driveGroup.position.set(bx, by, bz);
    driveGroup.castShadow = true;

    const bitLight = new THREE.PointLight(0x00ffff, 0.9, 3.5);
    bitLight.position.set(bx, by + 0.1, bz);

    scene.add(driveGroup);
    scene.add(bitLight);

    dataBits.push({
      mesh: driveGroup,
      light: bitLight,
      collected: false,
      baseY: by,
      rotationSpeed: 1.5 + Math.random() * 2,
    });
  });

  return dataBits;
}
