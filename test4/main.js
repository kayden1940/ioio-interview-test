import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import breath from "./breath.png";

// import galaxyVertexShader from "./shaders/galaxy/vertex.glsl?raw";
// import galaxyFragmentShader from "./shaders/galaxy/fragment.glsl?raw";
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

//cube
// const geometry = new THREE.BoxGeometry(2, 2, 2);
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// plane
// Create a texture loader so we can load our image file
var loader = new THREE.TextureLoader();

// Animate
const tick = () => {
  // const elapsedTime = clock.getElapsedTime();

  // console.log("log", cameraPositions);

  camera.lookAt(new THREE.Vector3(0, 0, 0));
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

// Load an image file into a custom material
var material = new THREE.MeshLambertMaterial({
  map: loader.load(
    "./breath.png",
    () => tick()
  ),
});

// create a plane geometry for the image with a width of 10
// and a height that preserves the image's aspect ratio
var geometry = new THREE.PlaneGeometry(10, 10);

// combine our image geometry and material into a mesh
var mesh = new THREE.Mesh(geometry, material);

// set the position of the image mesh in the x,y,z dimensions
mesh.position.set(0, 0, 0);

// add the image to the scene
scene.add(mesh);

// Event: on screen resizes
window.addEventListener("resize", () => {
  renderer.setSize(width, height);
});

/**
 * Lights
 **/

// Add a point light with #fff color, .7 intensity, and 0 distance
var light = new THREE.PointLight(0xffffff, 1, 0);

// Specify the light's position
light.position.set(1, 1, 100);

// Add the light to the scene
scene.add(light);

// const clock = new THREE.Clock();

// color update test
// geometry.attributes.color.needsUpdate = true;
