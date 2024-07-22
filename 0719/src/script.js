import * as THREE from "three";
import GUI from "lil-gui";
import Stats from "stats-js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";

//追加
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

//UIデバッグ
const gui = new GUI();

//FPSデバッグ
const stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

/*--------------------
必須項目
--------------------*/

//キャンバスの取得
const canvas = document.querySelector("#webgl");

//サイズ
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

//シーン
const scene = new THREE.Scene();

//カメラ
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    1000
);
camera.position.set(0, 0, 2); //調整
scene.add(camera);

//レンダラー
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

/*--------------------
オブジェクトの配置
--------------------*/

const uniforms = {
    uFrequency: { value: 10.0 },
    uTime: { value: 0 },
    uPositionx: { value: 0 },
    uPositiony: { value: 0 },
};

//マテリアル
const material = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    transparent: true,
    side: THREE.DoubleSide,
    uniforms: uniforms,
});

//ジオメトリ
const geometry = new THREE.PlaneGeometry(1, 1, 32, 32);

//メッシュ
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/*--------------------
イベント時の処理
--------------------*/

//マウスコントロール
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

window.addEventListener("resize", () => {
    //サイズのアップデート
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    //カメラのアップデート
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    //レンダラーのアップデート
    renderer.setSize(sizes.width, sizes.height);
});

//アニメーション
const clock = new THREE.Clock();

const animate = () => {
    stats.begin();
    renderer.render(scene, camera);
    controls.update();

    const elapsedTime = clock.getElapsedTime();

    //追加
    // const uniforms = material.uniforms;
    // uniforms.uTime.value = elapsedTime;

    stats.end();
    requestAnimationFrame(animate);
};

animate();

/*--------------------
GSAP
--------------------*/

gsap.from(material.uniforms.uFrequency, {
    value: 0,
    scrollTrigger: {
        trigger: ".scroll",
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
    },
});

gsap.from(material.uniforms.uPositionx, {
    value: 2,
    scrollTrigger: {
        trigger: ".scroll",
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
    },
});
gsap.from(material.uniforms.uPositiony, {
    value: 0.5,
    scrollTrigger: {
        trigger: ".scroll",
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
    },
});