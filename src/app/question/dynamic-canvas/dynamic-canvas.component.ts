import {Component, Input, OnInit, OnChanges} from '@angular/core';
import * as THREE from 'three';
import { SelectionsMadeService } from "../../selections-made.service";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-dynamic-canvas',
  templateUrl: './dynamic-canvas.component.html',
  styleUrls: ['./dynamic-canvas.component.css']
})
export class DynamicCanvasComponent implements OnInit, OnChanges {

  @Input() changeMade: string;

  private renderer: THREE.Object3D;
  private camera: THREE.Object3D;
  private scene: THREE.Object3D;
  private floor: THREE.Object3D;
  private roomWidthText: THREE.Object3D;
  private roomLengthText: THREE.Object3D;
  private doors: THREE.Object3D;
  private box: THREE.Object3D;
  private toilet: THREE.Object3D;
  private bathTub: THREE.Object3D;
  private controls: any; // might not be needded
  private currentPage: string ='';
  private assetsFolderPath: string ='./../../../assets/';
  private degree = Math.PI / 180;

  constructor(private selectionsMadeService: SelectionsMadeService) {}

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

    // create a box and add it to the scene
    let boxGeometry = new THREE.BoxGeometry(1,1,1);
    let boxMaterial = new THREE.MeshLambertMaterial({color:0xF3FFE2});
    let box = new THREE.Mesh(boxGeometry, boxMaterial);
    box.position.x = 0.5;
    box.rotation.y = 0.5;
    box.position.z = -5;

    let floorGeometry = new THREE.PlaneGeometry(100,100);
    let floorMaterial = new THREE.MeshBasicMaterial({
      color: 0xeeeeee,
      //wireframe: true
    });

    let floor = new THREE.Mesh(floorGeometry, floorMaterial);

    let loader = new THREE.FontLoader();
    loader.load( this.assetsFolderPath + 'fonts/optimer_regular.typeface.json', ( font ) => {
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
      roomWidthText.position.x = floor.position.y - floor.geometry.parameters.width / 3.5;
      roomWidthText.position.y = floor.position.y - floor.geometry.parameters.height / 2 - 10;
      roomWidthText.position.z = floor.position.z + 10;
      roomWidthText.rotation.x = 0;
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
      roomLengthText.position.x = floor.position.x - floor.geometry.parameters.width / 2 - 10;
      roomLengthText.position.y = floor.position.y - 40;
      roomLengthText.position.z = floor.position.z + 10;
      roomLengthText.rotation.x = 0.7;
      roomLengthText.rotation.y = 0.7;
      roomLengthText.rotation.z = 1.2;
      this.roomLengthText = roomLengthText;

      // loader is asynchronous so the only way to add the elements into the scene is after they load
      if(this.currentPage == 'showRoomDimensionsElements') {
        scene.add(roomWidthText);
        scene.add(roomLengthText);
      }
    });

    // create a door and add it to the scene
    let doorsGeometry = new THREE.PlaneGeometry(30,60);
    let doorsMaterial = new THREE.MeshLambertMaterial({
      color:0xFFFFFF,
      map: new THREE.TextureLoader().load(this.assetsFolderPath + 'textures/modern-door.jpg')
    });
    let doors = new THREE.Mesh(doorsGeometry, doorsMaterial);
    doors.position.x = floor.position.x - floorGeometry.parameters.width / 2 + doorsGeometry.parameters.width / 2;
    doors.position.y = floor.position.y - floorGeometry.parameters.height / 2 + doorsGeometry.parameters.height / 4;
    doors.position.z = floor.position.z + doorsGeometry.parameters.height / 2;
    doors.rotation.x = 1;

    camera.position.x = 0;
    camera.position.y = -50;
    camera.position.z = 100;

    camera.lookAt(scene.position);

    // Assign local variables to globals so the shapes become accessible in other methods
    this.renderer = renderer;
    this.camera = camera;
    this.scene = scene;
    this.floor =  floor;
    this.box = box;
    this.doors = doors;
    this.animate();
  }

  animate = () => {
    requestAnimationFrame( this.animate );
    this.render();
  }

  render = () => {
    let timer = 0.002 * Date.now();
    this.box.position.y = 0.5 + 3 * Math.sin(timer);
    this.box.rotation.x += 0.05;
    this.renderer.render(this.scene, this.camera);
  }

  ngOnChanges() {
    if(this.scene !== undefined) {
      let changeName: string = this.changeMade.indexOf('1') == -1 ? this.changeMade : this.changeMade.slice(0, -1);
      // ngOnChanges by default happens before ngOnInit, so I need to check for null pointers and add
      // the correct elements to my scene according to the page user is on.
      console.log('ngOnChanges, changeName: ', changeName);
      this.currentPage = changeName;
      this.updateView(changeName);
    }
  }

  ngAfterViewInit(){
    this.scene.add(this.floor);
    console.log("DynamicCanvas afterViewInit:", this.currentPage);
    this.updateView(this.currentPage);
  }

  updateView(stageName:string):void {
    console.log("hello from dynamic-canvas switch! stageName: ", stageName);
    switch (stageName) {
      case 'showRoomDimensionsElements':
        if(!isNullOrUndefined(this.roomWidthText)  && !isNullOrUndefined(this.roomLengthText) && !isNullOrUndefined(this.doors)) {
          this.scene.add(this.roomWidthText);
          this.scene.add(this.roomLengthText);
          this.scene.remove(this.doors);
        }
        console.log("Switch went to showRoomDimensionsElements!");
        break;
      case 'showDoorPositionElements':
        console.log("Switch went to showDoorPositionElements!");
        if(!isNullOrUndefined(this.roomWidthText) && !isNullOrUndefined(this.roomLengthText) && !isNullOrUndefined(this.doors) && !isNullOrUndefined(this.box)) {
          //this.updateFloorSize();
          this.scene.add(this.doors);
          this.scene.remove(this.roomWidthText);
          this.scene.remove(this.roomLengthText);
          this.scene.remove(this.box);
        }
        break;
      case 'doorPositionChanged':
        console.log(this.doors);
        if(this.selectionsMadeService.getDoorPosition() == 'Left') {
          this.doors.position.x = this.floor.position.x - this.floor.geometry.parameters.width / 2 + this.doors.geometry.parameters.width / 2;
          debugger;
        } else if(this.selectionsMadeService.getDoorPosition() == 'Right') {
          this.doors.position.x = this.floor.position.x + this.doors.geometry.parameters.width / 2;
          debugger;
        } else if(this.selectionsMadeService.getDoorPosition() == 'Middle'){
          this.doors.position.x = this.floor.position.x;
          debugger;
        } else {
          console.log('Door position was not recognized!');
          debugger;
        }
        break;
      case 'showTubParametersElements':
        console.log("Switch went to showTubParametersElements!");
        if(!isNullOrUndefined(this.box) && !isNullOrUndefined(this.doors)) {
          this.scene.remove(this.doors);
          this.scene.add(this.box);
        }
        break;
      default:
        console.log("Switch went to default!");
        break;
    }
  }

  updateFloorSize(){
    let roomW: number = this.selectionsMadeService.getRoomWidth();
    let roomL: number = this.selectionsMadeService.getRoomLength();

    let sceneBoundingBox = new THREE.Box3().setFromObject(this.scene);
    let sceneHeight: number = sceneBoundingBox.max.z - sceneBoundingBox.min.z;
    let sceneLength: number = sceneBoundingBox.max.x - sceneBoundingBox.min.x;
    let sceneWidth: number = sceneBoundingBox.max.y - sceneBoundingBox.min.y;

    /* tried to update width and height without recreating the object
    this.floor.geometry.parameters.width = sceneWidth * 0.8 / 10;
    let ratioRealVSDrawn = roomW / this.floor.geometry.parameters.width;
    this.floor.geometry.parameters.height = roomL / ratioRealVSDrawn;
    */

    let floorWidth = sceneWidth * 0.8 / 10;
    let ratioRealVSDrawn = roomW / this.floor.geometry.parameters.width;
    let floorHeight = roomL / ratioRealVSDrawn;

    let floorGeometry = new THREE.PlaneGeometry(floorWidth, floorHeight);
    let floorMaterial = new THREE.MeshBasicMaterial({
      color: 0xeeeeee
    });

    debugger;

    this.floor = new THREE.Mesh(floorGeometry, floorMaterial);
  }
}
