import * as THREE from 'three';
import Planet from './Planet';
import MoonSurface from '/images/moon-surface.jpg';
import MoonBumpMap from '/images/moon-bump.jpg';

const canvas = document.querySelector("#three-canvas");
const scene = new THREE.Scene()
let sizes = {
    width: 500,
    height: canvas.clientHeight,
}

// Light
const light = new THREE.PointLight(0xffffff, 200)
light.position.set(2, 5, 8)
scene.add(light)

// Canvas
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setClearColor(0xfff, 0)

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
)
camera.position.z = 5

// Object
const moon = new Planet(2, 64, 32, MoonSurface, MoonBumpMap)
scene.add( moon.plane());


function animate() {
	requestAnimationFrame( animate );

	renderer.render( scene, camera );
}
animate();

// Rotate Object
canvas.addEventListener('mousedown', moon.allowRotate());
window.addEventListener('mouseup', moon.allowRotate());
window.addEventListener('mousemove', moon.rotate());

// Calculate screen width & height
window.addEventListener('resize', () => {
    sizes.width = canvas.clientWidth;
    sizes.height = canvas.clientHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    
    renderer.render(scene, camera); // -> Also needed
});
