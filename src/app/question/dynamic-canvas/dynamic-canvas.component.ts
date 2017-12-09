import {Component, Input, OnInit, OnChanges} from '@angular/core';
import * as THREE from 'three';
import { SelectionsMadeService } from "../../selections-made.service";

@Component({
  selector: 'app-dynamic-canvas',
  templateUrl: './dynamic-canvas.component.html',
  styleUrls: ['./dynamic-canvas.component.css']
})
export class DynamicCanvasComponent implements OnInit, OnChanges {

  @Input() changeMade: string;

  private box: any;
  private toilet: any;
  private scene: any;
  private camera: any;
  private renderer: any;

  constructor(private selectionsMadeService: SelectionsMadeService) {}

  ngOnChanges() {
    let changeName = this.changeMade.indexOf('1') == -1 ? this.changeMade : this.changeMade.slice(0, -1);

    switch (changeName) {
      case 'hasToilet':
        console.log('hasToilet: ' + this.selectionsMadeService.getHasToilet());
        break;
      case 'hasShower':
        console.log('hasShower: ' + this.selectionsMadeService.getHasShower());
        break;
      default:
        console.log('unrecognised change happened');
        break;
    }

  }

  ngOnInit() {
    // create the scene
    let scene = new THREE.Scene();

    this.scene = scene;

    // create the camera
    // first attribute zooms in/zooms out the view
    let camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);

    this.camera = camera;

    let renderer = new THREE.WebGLRenderer();

    this.renderer = renderer;

    // set size
    renderer.setSize(window.innerWidth/2, window.innerHeight/2);

    // add canvas to dom
    document.getElementById('canvasContainer').appendChild(renderer.domElement);
    //document.getElementsByClassName('canvasContainer')[0].appendChild(renderer.domElement);

    // add axis to the scene
    let axis = new THREE.AxesHelper(10);

    scene.add(axis);

    // add lights
    let light = new THREE.DirectionalLight(0xffffff, 1.0);

    light.position.set(100, 100, 100);

    scene.add(light);

    let light2 = new THREE.DirectionalLight(0xffffff, 1.0);

    light2.position.set(-100, 100, -100);

    scene.add(light2);

    let material = new THREE.MeshBasicMaterial({
      //color: 0xaaaaaa,
      color: 0xffffff,
      wireframe: true
    });

    //===========================================================================
    //create a blue LineBasicMaterial
    let lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });

    // create a 2 - line geometry
    let lineGeometry = new THREE.Geometry();
    lineGeometry.vertices.push(new THREE.Vector3(-5, 0, 0));
    lineGeometry.vertices.push(new THREE.Vector3(0, 5, 0));
    lineGeometry.vertices.push(new THREE.Vector3(5, 0, 0));

    let line = new THREE.Line(lineGeometry, lineMaterial);

    scene.add(line);

    // TODO: figure out why text is not getting added to the scene

    /*
    // Create text
    let textGeometry;

    var loader = new THREE.FontLoader();

    loader.load( 'assets/fonts/helvetiker_regular.typeface.json', function ( font ) {

      textGeometry = new THREE.TextGeometry( 'Hello three.js!', {
        font: font,
        size: 80,
        height: 5,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 10,
        bevelSize: 8,
        bevelSegments: 5
      } );

      textGeometry.computeBoundingBox();
      textGeometry.computeVertexNormals();

      // Create text material
      let textMaterial = new THREE.MeshPhongMaterial( { color: 0x0000ff, flatShading: true } );

      let text = new THREE.Mesh( textGeometry, textMaterial );

      text.position.x = 0;
      text.position.y = 5;
      text.position.z = 0;

      scene.add(text);

    } );
    */

    this.toilet = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);

    scene.add(this.toilet);

    this.toilet.position.x = -1;
    this.toilet.position.y = -1;
    this.toilet.position.z = 5;

    //===========================================================================

    // create a box and add it to the scene
    this.box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);

    scene.add(this.box);

    this.box.position.x = 0.5;
    this.box.rotation.y = 0.5;

    camera.position.x = 5;
    camera.position.y = 5;
    camera.position.z = 5;

    camera.lookAt(scene.position);
    this.animate();
  }

  animate = () => {
    //debugger;
    requestAnimationFrame( this.animate );
    this.render();
  }

  render = () => {
    //debugger;

    let timer = 0.002 * Date.now();
    this.box.position.y = 0.5 + 3 * Math.sin(timer);
    this.box.rotation.x += 0.05;
    this.renderer.render(this.scene, this.camera);
  }

}
