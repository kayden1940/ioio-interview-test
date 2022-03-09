import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import breath from "./breath.png";

import fragmentShader from "./shaders/fragmentShader.glsl?raw";
import vertexShader from "./shaders/vertexShader.glsl?raw";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader.js';
// import gsap from "gsap";

const canvas = document.querySelector("canvas");
const scene = new THREE.Scene();
const width = window.innerWidth;
const height = window.innerHeight;

// Base camera
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
});
renderer.setSize(width, height);
renderer.setClearColor(0xffffff);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

camera.position.z = 10;
camera.position.x = -1.5;
camera.position.y = 2;

// control
const controls = new OrbitControls(camera, renderer.domElement);

// plane
// Create a texture loader so we can load our image file
const loader = new THREE.TextureLoader();
const imageTexture = new THREE.TextureLoader().load("./breath.png");

// let material = new THREE.ShaderMaterial({
//   vertexShader: vertexShader,
//   fragmentShader: fragmentShader,
//   // transparent: true,
//   // wireframe: true,
//   side: THREE.DoubleSide,
//   uniforms: {
//     uTexture: {
//       //texture data
//       value: imageTexture,
//     },
//     uOffset: {
//       //distortion strength
//       value: new THREE.Vector2(0.1, 0.2),
//     },
//     uAlpha: {
//       //opacity
//       value: 1.0,
//     },
//   },
// });

// Load an image file into a custom material
let material = new THREE.MeshLambertMaterial({
  map: loader.load("./breath.png", () => tick()),
});

const geometry = new THREE.PlaneGeometry(10, 10);

// combine our image geometry and material into a mesh
const mesh = new THREE.Mesh(geometry, material);

// set the position of the image mesh in the x,y,z dimensions
mesh.position.set(0, 0, 0);

// add the image to the scene
scene.add(mesh);

//Lights

const light = new THREE.PointLight(0xffffff, 1, 0);

// Specify the light's position
light.position.set(1, 1, 100);

// Add the light to the scene
scene.add(light);

// postprocessing

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const effect2 = new ShaderPass(RGBShiftShader);
effect2.uniforms["amount"].value = 0.03;
composer.addPass(effect2);

// Event: on screen resizes
window.addEventListener("resize", () => {
  renderer.setSize(width, height);
  composer.setSize(width, height);
});

// Animate
const tick = () => {
  // const elapsedTime = clock.getElapsedTime();

  // console.log("log", cameraPositions);
  window.requestAnimationFrame(tick);

  camera.lookAt(new THREE.Vector3(0, 0, 0));
  controls.update();

  // Render
  // renderer.render(scene, camera);
  composer.render();

  // Call tick again on the next frame
};

// const clock = new THREE.Clock();

// color update test
// geometry.attributes.color.needsUpdate = true;
