/**
 * Generates simple but recognisable low-poly ship GLB files.
 * Run:  node create-vessel-models.mjs   (from the merkwave/ dir that has node_modules)
 * Outputs four GLB files in the current working directory.
 */

// ── FileReader polyfill for GLTFExporter running in Node.js ──────────
import { Blob } from 'node:buffer';
global.Blob = Blob;
class FileReaderPolyfill {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then(buf => {
      this.result = buf;
      this.onload?.({ target: this });
      this.onloadend?.({ target: this });  // GLTFExporter uses onloadend
    });
  }
  readAsDataURL(blob) {
    blob.arrayBuffer().then(buf => {
      const b64 = Buffer.from(buf).toString('base64');
      const mime = blob.type || 'application/octet-stream';
      this.result = `data:${mime};base64,${b64}`;
      this.onload?.({ target: this });
      this.onloadend?.({ target: this });
    });
  }
}
if (typeof FileReader === 'undefined') global.FileReader = FileReaderPolyfill;

import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import fs from 'node:fs';

/* ─── Palette ─────────────────────────────────────────────────────── */
const HULL_COLOR     = new THREE.Color(0x1a3a5c);   // dark navy
const DECK_COLOR     = new THREE.Color(0x8b7355);   // wood tan
const SUPER_COLOR    = new THREE.Color(0xdce3ea);   // light gray
const ACCENT_COLOR   = new THREE.Color(0xe05c1a);   // orange accent
const CRANE_COLOR    = new THREE.Color(0xf0c040);   // crane yellow

/* ─── Helper: add a box mesh with optional color ─────────────────── */
function addBox(scene, w, h, d, x, y, z, color = HULL_COLOR, rotY = 0) {
  const geo = new THREE.BoxGeometry(w, h, d);
  const mat = new THREE.MeshPhysicalMaterial({
    color,
    roughness: 0.6,
    metalness: 0.15,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(x, y, z);
  mesh.rotation.y = rotY;
  scene.add(mesh);
  return mesh;
}

/* ─── Helper: hull made of 3 tapered box sections ────────────────── */
function addHullWedge(scene, length, color = HULL_COLOR) {
  const w = length * 0.22;
  const h = length * 0.14;
  // main mid section
  addBox(scene, length * 0.6, h, w * 1.9, 0,         h * 0.5, 0, color);
  // bow taper (narrower)
  addBox(scene, length * 0.25, h * 0.85, w * 1.1, length * 0.38, h * 0.42, 0, color);
  // bow tip (very narrow)
  addBox(scene, length * 0.18, h * 0.65, w * 0.35, length * 0.49, h * 0.32, 0, color);
  // stern section
  addBox(scene, length * 0.2, h, w * 1.5,  -length * 0.38, h * 0.5, 0, color);
}

/* ─── Vessel 1: Survey Vessel ────────────────────────────────────── */
function buildSurveyVessel() {
  const s = new THREE.Scene();
  const L = 10;
  addHullWedge(s, L, HULL_COLOR);
  // main deck
  addBox(s, L*0.9, 0.12, L*0.4, 0, L*0.08, 0, DECK_COLOR);
  // superstructure front block
  addBox(s, L*0.28, L*0.22, L*0.38, L*0.12, L*0.19, 0, SUPER_COLOR);
  // bridge top
  addBox(s, L*0.22, L*0.1, L*0.3, L*0.12, L*0.3, 0, new THREE.Color(0xb0b8c1));
  // twin mast
  addBox(s, 0.06, L*0.45, 0.06, L*0.22, L*0.38, 0, new THREE.Color(0x555555));
  // crane boom back
  addBox(s, L*0.35, 0.06, 0.06, -L*0.25, L*0.32, 0, CRANE_COLOR, -0.3);
  // funnel
  addBox(s, L*0.06, L*0.12, L*0.06, -L*0.05, L*0.26, 0, ACCENT_COLOR);
  // lab housing
  addBox(s, L*0.22, L*0.1, L*0.35, -L*0.2, L*0.14, 0, SUPER_COLOR);
  return s;
}

/* ─── Vessel 2: Offshore Support Vessel ─────────────────────────── */
function buildOSV() {
  const s = new THREE.Scene();
  const L = 10;
  addHullWedge(s, L, new THREE.Color(0x0d2a4a));
  addBox(s, L*0.85, 0.12, L*0.45, 0, L*0.08, 0, DECK_COLOR);
  // tall superstructure
  addBox(s, L*0.3, L*0.35, L*0.42, L*0.18, L*0.25, 0, SUPER_COLOR);
  addBox(s, L*0.25, L*0.15, L*0.35, L*0.18, L*0.44, 0, new THREE.Color(0x8fa0b0));
  // main crane pedestal
  addBox(s, L*0.08, L*0.08, L*0.08, -L*0.1, L*0.12, 0, CRANE_COLOR);
  // crane boom
  addBox(s, L*0.42, 0.07, 0.07, -L*0.1, L*0.35, 0, CRANE_COLOR, -0.45);
  // crane counter weight
  addBox(s, L*0.1, 0.14, 0.12, -L*0.28, L*0.22, 0, CRANE_COLOR);
  // comms mast
  addBox(s, 0.05, L*0.5, 0.05, L*0.26, L*0.42, 0, new THREE.Color(0x444444));
  // satellite dome
  const dome = new THREE.Mesh(
    new THREE.SphereGeometry(L*0.04, 8, 8),
    new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.3 })
  );
  dome.position.set(L*0.26, L*0.68, 0);
  s.add(dome);
  // orange accent stripe on hull
  addBox(s, L*0.95, 0.05, L*0.04, 0, L*0.05, L*0.23, ACCENT_COLOR);
  addBox(s, L*0.95, 0.05, L*0.04, 0, L*0.05, -L*0.23, ACCENT_COLOR);
  return s;
}

/* ─── Vessel 3: Platform Supply Vessel ──────────────────────────── */
function buildPSV() {
  const s = new THREE.Scene();
  const L = 10;
  addHullWedge(s, L, new THREE.Color(0x18304e));
  // large flat cargo deck (characteristic of PSV)
  addBox(s, L*0.85, 0.1, L*0.5, -L*0.03, L*0.08, 0, DECK_COLOR);
  // cargo containers simulation
  const cColors = [0xd04020, 0x3080d0, 0x30a050, 0xe0c020];
  for (let i = 0; i < 4; i++) {
    addBox(s, L*0.1, L*0.07, L*0.18, -L*0.34 + i * L*0.14, L*0.15, L*0.12, new THREE.Color(cColors[i]));
    addBox(s, L*0.1, L*0.07, L*0.18, -L*0.34 + i * L*0.14, L*0.15, -L*0.12, new THREE.Color(cColors[i]));
  }
  // forward superstructure (compact on PSV)
  addBox(s, L*0.25, L*0.3, L*0.44, L*0.28, L*0.22, 0, SUPER_COLOR);
  // bridge add-on
  addBox(s, L*0.2, L*0.12, L*0.38, L*0.28, L*0.38, 0, new THREE.Color(0x7a8e9e));
  // mast
  addBox(s, 0.05, L*0.38, 0.05, L*0.32, L*0.5, 0, new THREE.Color(0x333333));
  // funnel
  addBox(s, L*0.07, L*0.2, L*0.07, L*0.08, L*0.26, 0, ACCENT_COLOR);
  return s;
}

/* ─── Vessel 4: AHTS (Anchor Handling Tug Supply) ────────────────── */
function buildAHTS() {
  const s = new THREE.Scene();
  const L = 10;
  // AHTS has a more compact, powerful looking hull
  addHullWedge(s, L*0.85, new THREE.Color(0x121e2d));
  addBox(s, L*0.8, 0.12, L*0.5, 0, L*0.09, 0, DECK_COLOR);
  // large stern roller area (characteristic feature)
  addBox(s, L*0.18, L*0.12, L*0.52, -L*0.37, L*0.08, 0, new THREE.Color(0x888888));
  // AHTS crane / a-frame
  addBox(s, 0.07, L*0.3, 0.07, -L*0.28, L*0.22, L*0.18, CRANE_COLOR);
  addBox(s, 0.07, L*0.3, 0.07, -L*0.28, L*0.22, -L*0.18, CRANE_COLOR);
  addBox(s, 0.07, 0.07, L*0.36, -L*0.28, L*0.38, 0, CRANE_COLOR);
  // superstructure – higher volume than survey vessel
  addBox(s, L*0.32, L*0.38, L*0.46, L*0.14, L*0.27, 0, SUPER_COLOR);
  addBox(s, L*0.26, L*0.13, L*0.38, L*0.14, L*0.47, 0, new THREE.Color(0x7f9191));
  // exhaust stacks (twin, characteristic)
  addBox(s, L*0.07, L*0.22, L*0.07, L*0.03, L*0.34, L*0.14, ACCENT_COLOR);
  addBox(s, L*0.07, L*0.22, L*0.07, L*0.03, L*0.34, -L*0.14, ACCENT_COLOR);
  // navigation mast
  addBox(s, 0.06, L*0.42, 0.06, L*0.25, L*0.5, 0, new THREE.Color(0x555555));
  // waterline accent stripe
  addBox(s, L*0.88, 0.04, L*0.04, 0, L*0.04, L*0.26, new THREE.Color(0xff0000));
  addBox(s, L*0.88, 0.04, L*0.04, 0, L*0.04, -L*0.26, new THREE.Color(0xff0000));
  return s;
}

/* ─── Export ──────────────────────────────────────────────────────── */
const exporter = new GLTFExporter();

const vessels = [
  { name: 'survey-vessel',   build: buildSurveyVessel },
  { name: 'offshore-osv',    build: buildOSV         },
  { name: 'supply-psv',      build: buildPSV         },
  { name: 'ahts-tug',        build: buildAHTS        },
];

for (const v of vessels) {
  const scene = v.build();
  const gltf = await exporter.parseAsync(scene, { binary: true });
  fs.writeFileSync(`${v.name}.glb`, Buffer.from(gltf));
  const kb = (gltf.byteLength / 1024).toFixed(1);
  console.log(`✓  ${v.name}.glb  (${kb} KB)`);
}
console.log('All vessel GLB files generated.');
