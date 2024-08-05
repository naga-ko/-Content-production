import * as THREE from "three";
import GUI from 'lil-gui';
import Stats from 'stats-js';
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// UIデバッグ
const gui = new GUI();

// FPSデバッグ
const stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

/*--------------------
必須項目
--------------------*/

// キャンバスの取得
const canvas = document.querySelector("#webgl");

// サイズ
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

// シーン
const scene = new THREE.Scene();

// カメラ
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
camera.position.set(0, 0, 6);
scene.add(camera);

// ライト
const directionalLight = new THREE.DirectionalLight(0xffffff, 4);
directionalLight.position.set(0.5, 1, 0);
scene.add(directionalLight);

// レンダラー
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
});
renderer.setSize(sizes.width, sizes.height);

// オブジェクトの追加
const shapes = [];
const shapesConfig = [
    { geometry: new THREE.BoxGeometry(1, 1, 1), material: new THREE.MeshNormalMaterial() },
    { geometry: new THREE.SphereGeometry(0.5, 32, 32), material: new THREE.MeshNormalMaterial() },
    { geometry: new THREE.ConeGeometry(0.5, 1, 32), material: new THREE.MeshNormalMaterial() },
    { geometry: new THREE.TorusGeometry(0.5, 0.2, 16, 100), material: new THREE.MeshNormalMaterial() },
    { geometry: new THREE.DodecahedronGeometry(0.5), material: new THREE.MeshNormalMaterial() }
];

shapesConfig.forEach(config => {
    const mesh = new THREE.Mesh(config.geometry, config.material);
    mesh.position.set(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5);
    scene.add(mesh);
    shapes.push(mesh);

    gsap.to(
        mesh.position,
        {
            x: Math.random() * 10 - 5,
            y: Math.random() * 10 - 5,
            z: Math.random() * 10 - 5,
            scrollTrigger: {
                trigger: "#skills",
                start: "top 90%",
                end: "bottom 10%",
                scrub: true,
            },
        }
    );

    gsap.to(
        mesh.rotation,
        {
            x: Math.random() * Math.PI * 0.5,
            y: Math.random() * Math.PI * 0.5,
            z: Math.random() * Math.PI * 0.5,
            scrollTrigger: {
                trigger: "#skills",
                start: "top 90%",
                end: "bottom 10%",
                scrub: true,
            },
        }
    );
});

// GLTFデータの読み込み
const group = new THREE.Group();
scene.add(group);

const gltfLoader = new GLTFLoader();
let gltfModel;
gltfLoader.load("models/scene.gltf", (gltf) => {
    gltf.scene.scale.set(0.03, 0.03, 0.03);
    gltf.scene.position.set(-3, 0, 0);
    gltf.scene.rotation.set(-1, 0, -0.3);
    group.add(gltf.scene);
    gltfModel = gltf.scene;

    gsap.to(
        gltfModel.position,
        {
            x: 3,
            scrollTrigger: {
                trigger: "#skills",
                start: "top 90%",
                end: "bottom 10%",
                scrub: true,
            },
        }
    );

    gsap.to(
        gltfModel.rotation,
        {
            y: Math.PI * 0.5,
            scrollTrigger: {
                trigger: "#skills",
                start: "top 90%",
                end: "bottom 10%",
                scrub: true,
            },
            duration: 3
        }
    );
});

/*--------------------
イベント時の処理
--------------------*/

window.addEventListener("resize", () => {
    // サイズのアップデート
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // カメラのアップデート
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // レンダラーのアップデート
    renderer.setSize(sizes.width, sizes.height);
});

// アニメーション
const animate = () => {
    stats.begin();
    renderer.render(scene, camera);
    stats.end();

    requestAnimationFrame(animate);
};

animate();
