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
  private bathTub: THREE.Object3D;
  private placeholdersGroup: THREE.Group;
  private controls: any; // might not be needded
  private currentPage: string ='';
  private assetsFolderPath: string ='./../../../assets/';
  private degree = Math.PI / 180;
  private placeholderMaterial;

  constructor(private selectionsMadeService: SelectionsMadeService) {}

  ngOnInit() {

    // RENDERER
    let renderer = new THREE.WebGLRenderer({canvas: document.getElementById('myCanvas'), antialias:true});
    renderer.setClearColor(0xffffff);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth/2, window.innerHeight/2);

    // CAMERA
    let camera = new THREE.PerspectiveCamera(1000, window.innerWidth / window.innerHeight, 0.1, 30000);

    // SCENE
    let scene = new THREE.Scene();

    // LIGHTS
    let light = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(light);
    let light1 = new THREE.PointLight(0xffffff, 0.5);
    scene.add(light1);

    // Floors
    let floorGeometry = new THREE.PlaneGeometry(this.selectionsMadeService.getRoomWidth(),this.selectionsMadeService.getRoomLength());
    let floorMaterial = new THREE.MeshBasicMaterial({
      color: 0xeeeeee,
      //wireframe: true
    });
    let floor = new THREE.Mesh(floorGeometry, floorMaterial);

    let fontSize:number = floorGeometry.parameters.height / 15;
    // Texts
    let loader = new THREE.FontLoader();
    loader.load( this.assetsFolderPath + 'fonts/optimer_regular.typeface.json', ( font ) => {
      let textMaterial = new THREE.MeshLambertMaterial({color:0x444444});
      let roomWidthTextGeometry = new THREE.TextGeometry( 'Room width', {
        font: font,
        size: fontSize,
        height: 3,
        curveSegments: 10,
        bevelEnabled: false,
        bevelThickness: 1,
        bevelSize: 1,
        bevelSegments: 1
      });
      let roomWidthText = new THREE.Mesh(roomWidthTextGeometry, textMaterial);
      roomWidthText.position.x = floor.position.x - floor.geometry.parameters.width / 4;
      // multiply by 1.5 to give space between floor and text elements
      roomWidthText.position.y = floor.position.y - floor.geometry.parameters.height / 2 - roomWidthTextGeometry.parameters.parameters.size * 1.5;
      roomWidthText.position.z = floor.position.z;
      this.roomWidthText = roomWidthText;

      let roomLengthTextGeometry = new THREE.TextGeometry( 'Room length', {
        font: font,
        size: fontSize,
        height: 3,
        curveSegments: 12,
        bevelEnabled: false,
        bevelThickness: 1,
        bevelSize: 1,
        bevelSegments: 1
      });

      let roomLengthText = new THREE.Mesh(roomLengthTextGeometry, textMaterial);
      roomLengthText.position.x = floor.position.x - floor.geometry.parameters.width / 2 - roomLengthTextGeometry.parameters.parameters.size / 2;
      roomLengthText.position.y = floor.position.y - floor.geometry.parameters.height / 3;
      roomLengthText.position.z = floor.position.z;
      roomLengthText.rotation.x = THREE.Math.degToRad(20);
      roomLengthText.rotation.y = THREE.Math.degToRad(10);
      roomLengthText.rotation.z = THREE.Math.degToRad(80);
      this.roomLengthText = roomLengthText;

      // loader is asynchronous so the only way to add the elements into the scene is after they load
      if(this.currentPage == 'showRoomDimensionsElements') {
        scene.add(roomWidthText);
        scene.add(roomLengthText);
      }
    });

    // create Doors and add it to the scene
    let doorsGeometry = new THREE.PlaneGeometry(this.selectionsMadeService.getDoorWidth(),this.selectionsMadeService.getDoorHeight());
    let doorsMaterial = new THREE.MeshLambertMaterial({
      color:0xFFFFFF,
      map: new THREE.TextureLoader().load(this.assetsFolderPath + 'textures/modern-door.jpg')
    });
    let doors = new THREE.Mesh(doorsGeometry, doorsMaterial);
    doors.position.y = floor.position.y - floorGeometry.parameters.height / 2;
    doors.position.z = floor.position.z + doorsGeometry.parameters.height / 2;
    doors.rotation.x = THREE.Math.degToRad(90);

    // create a box and add it to the scene
    /*
    let bathTubMaterials = [
      new THREE.MeshLambertMaterial({
        color:0xFFFFFF
      }),        // Left side
      new THREE.MeshLambertMaterial({
        color:0xFFFFFF
      }),       // Right side
      new THREE.MeshLambertMaterial({
        color:0xFFFFFF,
        map: new THREE.TextureLoader().load(this.assetsFolderPath + 'textures/tub.png')
      }),         // Top side
      null,      // Bottom side
      new THREE.MeshLambertMaterial({
        color:0xFFFFFF
      }),       // Front side
      new THREE.MeshLambertMaterial({
        color:0xFFFFFF
      })         // Back side
    ];
    */
    //let bathTubGeometry = new THREE.BoxGeometry(30,60,30,1,1,1,bathTubMaterials);
    //let bathTub = new THREE.Mesh(bathTubGeometry, new THREE.MeshFaceMaterial());

    let bathTubGeometry = new THREE.BoxGeometry(this.selectionsMadeService.getTubWidth(),510, this.selectionsMadeService.getTubLength());
    let bathTubMaterial = new THREE.MeshLambertMaterial({
      color:0xFFFFFF,
      map: new THREE.TextureLoader().load(this.assetsFolderPath + 'textures/tub.png')
    });
    let bathTub = new THREE.Mesh(bathTubGeometry, bathTubMaterial);
    bathTub.position.z = floor.position.z + bathTubGeometry.parameters.height / 2;
    bathTub.rotation.x = THREE.Math.degToRad(90);

    // setup placeholders group and material
    let placeholdersGroup = new THREE.Group();
    placeholdersGroup.position.z = floor.position.z + 1;
    let placeholderMaterial = new THREE.MeshBasicMaterial({
      color: 0x999999
    });

    // create a box and add it to the scene
    let boxGeometry = new THREE.BoxGeometry(100,100,100);
    let boxMaterial = new THREE.MeshLambertMaterial({color:0xF3FFE2});
    let box = new THREE.Mesh(boxGeometry, boxMaterial);
    box.position.x = 0.5;
    box.position.z = -5;
    box.rotation.y = THREE.Math.degToRad(30);

    // Adjust camera position so that view would not be from above.
    camera.rotation.x = THREE.Math.degToRad(60);
    camera.rotation.y = THREE.Math.degToRad(0);
    camera.rotation.z = THREE.Math.degToRad(180);

    // Assign local variables to globals so the shapes become accessible in other methods
    this.renderer = renderer;
    this.camera = camera;
    this.scene = scene;
    this.floor =  floor;
    this.doors = doors;
    this.bathTub = bathTub;
    this.placeholdersGroup = placeholdersGroup;
    this.placeholderMaterial = placeholderMaterial;
    this.box = box;

    // Update all the positions from selections
    this.updateView('doorPositionChanged');
    this.updateView('tubPositionChanged');

    this.animate();
  }

  animate = () => {
    requestAnimationFrame( this.animate );
    this.render();
  }

  render = () => {
    let timer = 0.002 * Date.now();
    this.box.position.y = 0.5 + 3 * Math.sin(timer);
    this.box.rotation.x += THREE.Math.degToRad(3);
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
        console.log('Switch went to ShowRoomDimensionElements!');
        this.camera.position.y = -this.selectionsMadeService.getRoomLength();
        this.camera.position.z = this.selectionsMadeService.getRoomWidth();
        if (!isNullOrUndefined(this.roomWidthText) && !isNullOrUndefined(this.roomLengthText) && !isNullOrUndefined(this.doors)) {
          this.scene.add(this.roomWidthText);
          this.scene.add(this.roomLengthText);
          this.scene.remove(this.doors);
        }
        break;
      case 'roomParametersChanged':
        //this.updateFloorSize();
        console.log('Switch went to roomParametersChanged!');
        break;
      case 'showDoorPositionElements':
        console.log("Switch went to showDoorPositionElements!");
        this.camera.position.y = -this.selectionsMadeService.getRoomLength()*1.25;
        this.camera.position.z = this.selectionsMadeService.getRoomWidth()*1.25;
        if (!isNullOrUndefined(this.roomWidthText) && !isNullOrUndefined(this.roomLengthText) && !isNullOrUndefined(this.doors) && !isNullOrUndefined(this.bathTub)) {
          this.scene.add(this.doors);
          this.scene.remove(this.roomWidthText);
          this.scene.remove(this.roomLengthText);
          this.scene.remove(this.bathTub);
        }
        break;
      case 'doorPositionChanged':
        switch (this.selectionsMadeService.getDoorPosition()) {
          case 'Left':
            this.doors.position.x = this.floor.position.x - this.floor.geometry.parameters.width / 2 + this.doors.geometry.parameters.width / 2;
            break;
          case 'Middle':
            this.doors.position.x = this.floor.position.x;
            break;
          case 'Right':
            this.doors.position.x = this.floor.position.x + this.floor.geometry.parameters.width / 2 - this.doors.geometry.parameters.width / 2;
            break;
          default:
            console.log('Door position was not recognized!');
            break;
        }
        break;
      case 'showTubParametersElements':
        console.log("Switch went to showTubParametersElements!");
        this.camera.position.y = -this.selectionsMadeService.getRoomLength();
        this.camera.position.z = this.selectionsMadeService.getRoomWidth();
        if (!isNullOrUndefined(this.doors) && !isNullOrUndefined(this.bathTub) && !isNullOrUndefined(this.placeholdersGroup)) {
          this.scene.remove(this.doors);
          this.scene.remove(this.placeholdersGroup);
          this.scene.add(this.bathTub);
        }
        break;
      case 'tubParametersChanged':
        console.log('Switch went to tubParametersChanged!');
        break;
      case 'tubPositionChanged':
        console.log('Switch went to tubPositionChanged!');
        switch (this.selectionsMadeService.getTubPosition()) {
          case 'Left Bottom':
            this.bathTub.rotation.y = THREE.Math.degToRad(0);
            this.bathTub.position.x = this.floor.position.x - this.floor.geometry.parameters.width / 2 + this.bathTub.geometry.parameters.width / 2;
            this.bathTub.position.y = this.floor.position.y - this.floor.geometry.parameters.height / 2 + this.bathTub.geometry.parameters.depth / 2;
            break;
          case 'Left Top':
            this.bathTub.rotation.y = THREE.Math.degToRad(0);
            this.bathTub.position.x = this.floor.position.x - this.floor.geometry.parameters.width / 2 + this.bathTub.geometry.parameters.width / 2;
            this.bathTub.position.y = this.floor.position.y + this.floor.geometry.parameters.height / 2 - this.bathTub.geometry.parameters.depth / 2;
            break;
          case 'Top Left':
            this.bathTub.rotation.y = THREE.Math.degToRad(90);
            this.bathTub.position.x = this.floor.position.x - this.floor.geometry.parameters.width / 2 + this.bathTub.geometry.parameters.depth / 2;
            this.bathTub.position.y = this.floor.position.y + this.floor.geometry.parameters.height / 2 - this.bathTub.geometry.parameters.width / 2;
            break;
          case 'Top Right':
            this.bathTub.rotation.y = THREE.Math.degToRad(90);
            this.bathTub.position.x = this.floor.position.x + this.floor.geometry.parameters.width / 2 - this.bathTub.geometry.parameters.depth / 2;
            this.bathTub.position.y = this.floor.position.y + this.floor.geometry.parameters.height / 2 - this.bathTub.geometry.parameters.width / 2;
            break;
          case 'Right Top':
            this.bathTub.rotation.y = THREE.Math.degToRad(180);
            this.bathTub.position.x = this.floor.position.x + this.floor.geometry.parameters.width / 2 - this.bathTub.geometry.parameters.width / 2;
            this.bathTub.position.y = this.floor.position.y + this.floor.geometry.parameters.height / 2 - this.bathTub.geometry.parameters.depth / 2;
            break;
          case 'Right Bottom':
            this.bathTub.rotation.y = THREE.Math.degToRad(180);
            this.bathTub.position.x = this.floor.position.x + this.floor.geometry.parameters.width / 2 - this.bathTub.geometry.parameters.width / 2;
            this.bathTub.position.y = this.floor.position.y - this.floor.geometry.parameters.height / 2 + this.bathTub.geometry.parameters.depth / 2;
            break;
          default:
            console.log('Tub position not recognised!');
            break;
        }
        break;
      case 'showPlaceholderElements':
        console.log('Placeholder elements in switch!!!');
        this.camera.position.y = -this.selectionsMadeService.getRoomLength();
        this.camera.position.z = this.selectionsMadeService.getRoomWidth();
        if (!isNullOrUndefined(this.bathTub) && !isNullOrUndefined(this.placeholdersGroup)) {
          this.scene.remove(this.bathTub);
          this.scene.add(this.placeholdersGroup);
        }
        this.placeholdersGroup.add(this.createPlaceholderObject(this.selectionsMadeService.getPlaceholderMinWidth(), this.selectionsMadeService.getPlaceholderMinLength()));

        break;
      default:
        console.log("Switch went to default!");
        break;
    }
  }

  createPlaceholderObject = ( width: number, length: number):THREE.Object3D => {
    let placeholderGeometry = new THREE.PlaneGeometry(width, length);
    let placeholder:THREE.Object3D = new THREE.Mesh(placeholderGeometry, this.placeholderMaterial);
    return placeholder;
  }

  updateFloorSize = () => {
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

    this.floor = new THREE.Mesh(floorGeometry, floorMaterial);
  }
}
