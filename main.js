import './style.css'
import * as THREE from 'three';
//import { Scene } from 'three';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000);

//Render the graphic
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('bg')

});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);

//positon camera along the Z axis 
camera.position.setZ(30);

//call the render method passing (scene, camera ) as arguments #renderDraw
renderer.render(scene,camera);

//draw object to the canvas/scene
const geometry = new THREE.TorusGeometry(16, 3, 5, 100);
//style the object to make it visible
const material = new THREE.MeshStandardMaterial( { color: 0x873EC3} );
//combine the geometry and material
const torus = new THREE.Mesh( geometry, material );
//add to canvas
scene.add(torus);

//add lightning to material or object to bring it to life 
//when using *MeshStandardMaterial
const pointLight = new THREE.PointLight(0xffffff);
const ambientLight = new THREE.AmbientLight(0xffffff);
//set light position and xyz values
pointLight.position.set(20,20,20);

scene.add(pointLight,ambientLight);


//adjust light in dom
const lightHelper = new THREE.PointLightHelper(pointLight);
//grid
const gridHelper = new THREE.GridHelper(200,50);

//scene.add(gridHelper,lightHelper);

//controls(move around)
const controls = new OrbitControls(camera,renderer.domElement);


function addStar() {
  const geometry = new THREE.SphereGeometry(0.1, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}
Array(200).fill().forEach(addStar);

// Background
const spaceTexture = new THREE.TextureLoader().load('img/illustration_hd_vaporwave.jpg');
scene.background = spaceTexture;

// Avatar
const clintonTexture = new THREE.TextureLoader().load('img/ava.jpg');
const clinton = new THREE.Mesh(new THREE.BoxGeometry(10,10,10), new THREE.MeshBasicMaterial({ map: clintonTexture }));

scene.add(clinton);


// Moon
const moonTexture = new THREE.TextureLoader().load('img/moon.jpg');
const normalTexture = new THREE.TextureLoader().load('img/normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(5, 32, 32),
  new THREE.MeshStandardMaterial({map:moonTexture, })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);



// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  clinton.rotation.y += 0.01;
  clinton.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();



//loop the render so it keeps running without having to call it 
var animate = function(){
  requestAnimationFrame(animate);
  
  //set animation
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();


  renderer.render(scene,camera);
}
animate();
// function animate(){
//   requestAnimationFrame(animate);
//   renderer.render(scene,camera);
// }

