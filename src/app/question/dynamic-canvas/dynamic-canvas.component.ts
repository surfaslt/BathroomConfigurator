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

  private renderer: any;
  private camera: any;
  private scene: any;
  private roomWidthText: THREE.Object3D;
  private roomLengthText: THREE.Object3D;
  private doors: THREE.Object3D;
  private box: THREE.Object3D;
  private toilet: THREE.Object3D;
  private bathTub: THREE.Object3D;
  private controls: any; // might not be needded

  constructor(private selectionsMadeService: SelectionsMadeService) {}

  ngOnChanges() {
    if(this.scene !== undefined) {
      let changeName = this.changeMade.indexOf('1') == -1 ? this.changeMade : this.changeMade.slice(0, -1);

      console.log("hello from dynamic-canvas switch!");
      switch (changeName) {
        case 'showRoomDimensionsElements':
          this.scene.add(this.roomWidthText);
          this.scene.add(this.roomLengthText);
          console.log("Switch went to showRoomDimensionsElements!");
          break;
        case 'hideRoomDimensionsElements':
          this.scene.remove(this.roomWidthText);
          this.scene.remove(this.roomLengthText);
          console.log("Switch went to hideRoomDimensionsElements!");
          break;
        case 'showDoorPositionElements':
          this.scene.add(this.doors);
          console.log("Switch went to showDoorPositionElements!");
          break;
        case 'hideDoorPositionElements':
          this.scene.remove(this.doors);
          console.log("Switch went to hideDoorPositionElements!");
          break;
        default:
          /*this.scene.remove(this.roomWidthText);
          this.scene.remove(this.roomLengthText);
          this.scene.remove(this.doors);
          */
          console.log("Switch went to default!");
          break;
      }
    }
  }

  ngOnInit() {

    // RENDERER
    let renderer = new THREE.WebGLRenderer({canvas: document.getElementById('myCanvas'), antialias:true});
    renderer.setClearColor(0xffffff);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth/2, window.innerHeight/2);

    // CAMERA
    let camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 3000);

    // SCENE
    let scene = new THREE.Scene();

    // LIGHTS
    let light = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(light);
    let light1 = new THREE.PointLight(0xffffff, 0.5);
    scene.add(light1);


    let material = new THREE.MeshBasicMaterial({
      //color: 0xaaaaaa,
      color: 0xffffff,
      wireframe: true
    });


    // create a box and add it to the scene
    let boxGeometry = new THREE.BoxGeometry(1,1,1);
    let boxMaterial = new THREE.MeshLambertMaterial({color:0xF3FFE2});
    let box = new THREE.Mesh(boxGeometry, boxMaterial);
    box.position.x = 0.5;
    box.rotation.y = 0.5;
    box.position.z = -5;
    scene.add(box);


    let floorGeometry = new THREE.PlaneGeometry(100,100,100);
    let floorMaterial = new THREE.MeshBasicMaterial({
      color: 0xeeeeee,
      //wireframe: true
    });
    let floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.x = 0.5;
    floor.rotation.x = -0.5;
    floor.position.z = -100;
    scene.add(floor);

    let loader = new THREE.FontLoader();
    loader.load( './../../../assets/fonts/optimer_regular.typeface.json', ( font ) => {
      let textMaterial = new THREE.MeshLambertMaterial({color:0x444444});
      let roomWidthTextGeometry = new THREE.TextGeometry( 'Room width', {
        font: font,
        size: 8,
        height: 3,
        curveSegments: 10,
        bevelEnabled: false,
        bevelThickness: 1,
        bevelSize: 1,
        bevelSegments: 1
      });
      let roomWidthText = new THREE.Mesh(roomWidthTextGeometry, textMaterial);
      scene.add(roomWidthText);
      roomWidthText.position.x = -30;
      roomWidthText.position.y = -52;
      roomWidthText.position.z = -70;
      roomWidthText.rotation.x = -0.2;
      roomWidthText.rotation.y = 0;
      roomWidthText.rotation.z = 0;
      this.roomWidthText = roomWidthText;

      let roomLengthTextGeometry = new THREE.TextGeometry( 'Room length', {
        font: font,
        size: 8,
        height: 3,
        curveSegments: 12,
        bevelEnabled: false,
        bevelThickness: 1,
        bevelSize: 1,
        bevelSegments: 1
      });

      let roomLengthText = new THREE.Mesh(roomLengthTextGeometry, textMaterial);
      scene.add(roomLengthText);
      roomLengthText.position.x = -50;
      roomLengthText.position.y = -35;
      roomLengthText.position.z = -70;
      roomLengthText.rotation.x = -0.2;
      roomLengthText.rotation.y = 0.0;
      roomLengthText.rotation.z = 1.4;
      this.roomLengthText = roomLengthText;
    });

    /*
    camera.position.x = 5;
    camera.position.y = 5;
    camera.position.z = 5;

    camera.lookAt(scene.position);
    */

    // Assign local variables to globals so the shapes become accessible in other methods
    this.renderer = renderer;
    this.camera = camera;
    this.scene = scene;
    this.box = box;


    this.ngOnChanges();
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
