import {Component, OnInit} from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Martynas App';
  box: any;
  scene: any;
  camera: any;
  renderer: any;

  ngOnInit() {
    // create the scene
    let scene: THREE.Scene = new THREE.Scene();
    debugger;
    this.scene = scene;

    // create the camera
    let camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    this.camera = camera;

    let renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();

    this.renderer = renderer;

    // set size
    renderer.setSize(window.innerWidth, window.innerHeight);

    // add canvas to dom
    document.body.appendChild(renderer.domElement);

    // add axis to the scene
    let axis = new THREE.AxisHelper(10);

    scene.add(axis);

    // add lights
    let light = new THREE.DirectionalLight(0xffffff, 1.0);

    light.position.set(100, 100, 100);

    scene.add(light);

    let light2 = new THREE.DirectionalLight(0xffffff, 1.0);

    light2.position.set(-100, 100, -100);

    scene.add(light2);

    let material = new THREE.MeshBasicMaterial({
      color: 0xaaaaaa,
      wireframe: true
    });

    // create a box and add it to the scene
    let box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);

    this.box = box;

    scene.add(box);

    box.position.x = 0.5;
    box.rotation.y = 0.5;

    camera.position.x = 5;
    camera.position.y = 5;
    camera.position.z = 5;

    camera.lookAt(scene.position);

    this.animate();
  }

  animate(): void {
    debugger;
    requestAnimationFrame(animate);
    this.render();
  }

  render(): void {
    debugger;
    let timer = 0.002 * Date.now();
    this.box.position.y = 0.5 + 0.5 * Math.sin(timer);
    this.box.rotation.x += 0.1;
    this.renderer.render(this.scene, this.camera);
  }


}
