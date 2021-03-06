/**
 * 3D component in this application responsible for creating and showing dynamic 3D view replicating the users choices made
 */
import {Component, Input, OnInit, OnChanges, EventEmitter, Output} from '@angular/core';
import * as THREE from 'three';
import * as OrbitControls from 'three-orbitcontrols';
import { SelectionsMadeService } from "../../selections-made.service";
import { isNullOrUndefined } from "util";
import { HelperService } from "../../helper.service";

@Component({
  selector: 'app-dynamic-canvas',
  templateUrl: './dynamic-canvas.component.html',
  styleUrls: ['./dynamic-canvas.component.css']
})
export class DynamicCanvasComponent implements OnInit, OnChanges {

  @Input() changeMade: string; // gets notified about events happened by question component
  @Output() onChangeMade: EventEmitter<string> = new EventEmitter<string>(); // notifies question component about change made

  private renderer: THREE.Object3D;
  private camera: THREE.Object3D;
  private scene: THREE.Object3D;
  private floor: THREE.Object3D;
  private backWall: THREE.Object3D;
  private leftWall: THREE.Object3D;
  private rightWall: THREE.Object3D;
  private roomWidthText: THREE.Object3D; // used in parameters page
  private roomLengthText: THREE.Object3D; // used in parameters page
  private doors: THREE.Object3D;
  private doorsOpening: THREE.Object3D;
  private bathTub: THREE.Object3D;
  private placeholdersGroup: THREE.Group;
  private selectedProductsGroup: THREE.Group; // holds all furniture products selected by the user
  private controls: any; // allows users to control the view with the mouse
  private currentPage: string =''; // holds value of current question page
  private assetsFolderPath: string; // shortcut for assets folder path
  private placeholderMaterial; // the pattern of placeholder
  private raycaster: THREE.Raycaster; // used for picking
  private mouse: THREE.Vector2; // reference of mouse click
  private intersectables: THREE.Object3D[]; // group of objects that are being tested for intersecting
  private selectedPlaceholder: THREE.Object3D; // the placeholder that was clicked by the user
  private nearbyPlaceholdersToSelected: THREE.Object3D[]; // group of nearbly placeholders to the selected placeholder
  private showDoorsOpening: boolean = true; // toggles display of door opening
  private transparentObjectOpacity:number = 0.5; // constant for opacity of furniture when its made transparent
  private placeholdersClickable:boolean = false;
  constructor(private selectionsMadeService: SelectionsMadeService, private helperService: HelperService) {
    this.assetsFolderPath = helperService.getAssetsFolderPath();
  }

  ngOnInit() {

    // RENDERER
    let renderer = new THREE.WebGLRenderer({canvas: document.getElementById('myCanvas'), antialias:true});
    renderer.setClearColor(0xffffff);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth/2, window.innerHeight/2);

    // CAMERA
    let camera = new THREE.PerspectiveCamera(1000, window.innerWidth / window.innerHeight, 0.1, 30000);
    camera.up.set(0,-1,0);

    // CONTROLS
    let controls = new OrbitControls( camera, renderer.domElement );

    // SCENE
    let scene = new THREE.Scene();

    // LIGHTS
    let light = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(light);
    let light1 = new THREE.PointLight(0xffffff, 0.1);
    light1.position.set( 0, 0, 5000);
    scene.add(light1);

    // Floors
    let floorGeometry = new THREE.PlaneGeometry(1,1);
    let floorMaterial = new THREE.MeshBasicMaterial({
      color:0xFFFFFF,
      map: new THREE.TextureLoader().load(this.helperService.getAssetsFolderPath() + 'textures/floorTiles.png', function ( texture ) {

        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.offset.set( 0, 0 );
        texture.repeat.set( 2, 2 );

      }),
      side: THREE.DoubleSide
    });
    let floor = new THREE.Mesh(floorGeometry, floorMaterial);// Update floor size from parameters
    this.updateFloorSize(floor);

    // Walls
    let backWallMaterial = new THREE.MeshLambertMaterial({
      color:0xFFFFFF,
      //color: 0xeeeeee,
      map: new THREE.TextureLoader().load(this.assetsFolderPath + 'textures/backWall.png'),
      transparent: true
    });
    let backWall = new THREE.Mesh(floorGeometry, backWallMaterial);

    let leftWallMaterial = new THREE.MeshLambertMaterial({
      color:0xFFFFFF,
      map: new THREE.TextureLoader().load(this.assetsFolderPath + 'textures/sideWalls.png'),
      transparent: true
    });
    let leftWall = new THREE.Mesh(floorGeometry, leftWallMaterial);

    let rightWallMaterial = new THREE.MeshLambertMaterial({
      color:0xFFFFFF,
      map: new THREE.TextureLoader().load(this.assetsFolderPath + 'textures/sideWalls.png'),
      transparent: true
    });
    let rightWall = new THREE.Mesh(floorGeometry, rightWallMaterial);

    this.updateWallsSize(floor, backWall, leftWall, rightWall);
    backWall.position.z = floor.position.z + this.getHeight(backWall) / 2;
    backWall.rotation.x = THREE.Math.degToRad(90);
    leftWall.position.z = floor.position.z + this.getHeight(leftWall) / 2;
    leftWall.rotation.x = THREE.Math.degToRad(90);
    leftWall.rotation.y = THREE.Math.degToRad(90);
    rightWall.position.z = floor.position.z + this.getHeight(rightWall) / 2;
    rightWall.rotation.x = THREE.Math.degToRad(90);
    rightWall.rotation.y = THREE.Math.degToRad(-90);

    // Texts
    let loader = new THREE.FontLoader();
    loader.load( this.assetsFolderPath + 'fonts/optimer_regular.typeface.json', ( font ) => {
      let textMaterial = new THREE.MeshLambertMaterial({color:0x444444});

      let roomWidthTextGeometry = new THREE.TextGeometry( 'Room width', {
        font: font,
        size: 1,
        height: 3,
        curveSegments: 10,
        bevelEnabled: false,
        bevelThickness: 1,
        bevelSize: 1,
        bevelSegments: 1
      });
      let roomWidthText = new THREE.Mesh(roomWidthTextGeometry, textMaterial);
      this.roomWidthText = roomWidthText;

      let roomLengthTextGeometry = new THREE.TextGeometry( 'Room length', {
        font: font,
        size: 1,
        height: 3,
        curveSegments: 12,
        bevelEnabled: false,
        bevelThickness: 1,
        bevelSize: 1,
        bevelSegments: 1
      });

      let roomLengthText = new THREE.Mesh(roomLengthTextGeometry, textMaterial);
      roomLengthText.rotation.x = THREE.Math.degToRad(20);
      roomLengthText.rotation.y = THREE.Math.degToRad(10);
      roomLengthText.rotation.z = THREE.Math.degToRad(84);
      this.roomLengthText = roomLengthText;

      this.resizeAndRepositionRoomDimensionTexts();

      // loader is asynchronous so the only way to add the elements into the scene is after they load
      if(this.currentPage == 'showRoomDimensionsElements') {
        scene.add(roomWidthText);
        scene.add(roomLengthText);
      }
    });

    // create Doors and add it to the scene
    let doorsGeometry = new THREE.PlaneGeometry(this.helperService.getDoorWidth(),this.helperService.getDoorHeight());
    let doorsMaterial = new THREE.MeshLambertMaterial({
      color:0xFFFFFF,
      map: new THREE.TextureLoader().load(this.assetsFolderPath + 'textures/modern-door.jpg'),
      side: THREE.DoubleSide,
      transparent: true
    });
    let doors = new THREE.Mesh(doorsGeometry, doorsMaterial);
    doors.position.z = floor.position.z + this.getHeight(doors) / 2;
    doors.rotation.x = THREE.Math.degToRad(90);

    let doorsOpeningMaterial = new THREE.MeshLambertMaterial({
      color:0xFFFFFF,
      map: new THREE.TextureLoader().load(this.assetsFolderPath + 'textures/doorOpeningMaterial.png'),
      transparent: true
    });
    let doorsOpeningGeometry = new THREE.PlaneGeometry(this.helperService.getDoorWidth(),this.helperService.getDoorWidth());
    let doorsOpening:THREE.Object3D = new THREE.Mesh(doorsOpeningGeometry, doorsOpeningMaterial);
    doorsOpening.position.z = floor.position.z + 1;

    // Create and do initial setup to bath tub element
    let bathTubGeometry = new THREE.BoxGeometry(1,1,1);

    let bathTubTextureMaterial = new THREE.MeshLambertMaterial({
      map: new THREE.TextureLoader().load(this.assetsFolderPath + 'textures/tub.png'),
      transparent: true
    });

    let bathTubMaterial = new THREE.MeshLambertMaterial({
      color:0xFFFFFF,
      transparent: true
    });

    let bathTubMaterials = [
      bathTubMaterial,
      bathTubMaterial,
      bathTubMaterial,
      bathTubMaterial,
      bathTubTextureMaterial,
      bathTubMaterial
    ];

    let bathTub = new THREE.Mesh( bathTubGeometry, bathTubMaterials );
    this.bathTub = bathTub;
    this.updateTubSize();
    bathTub.position.z = floor.position.z + bathTub.scale.z / 2;

    // setup placeholders group and material
    let placeholdersGroup = new THREE.Group();
    let placeholderMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      transparent: true
    });

    // Assign local variables to globals so that the objects become accessible in other methods
    this.renderer = renderer;
    this.camera = camera;
    this.controls = controls;
    this.scene = scene;
    this.floor =  floor;
    this.backWall = backWall;
    this.leftWall = leftWall;
    this.rightWall = rightWall;
    this.doors = doors;
    this.doorsOpening = doorsOpening;
    this.placeholdersGroup = placeholdersGroup;
    this.placeholderMaterial = placeholderMaterial;
    this.selectedProductsGroup = new THREE.Group();
    this.selectedProductsGroup.children = this.selectionsMadeService.getSelectedProducts();
    // Define other parameters
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    // Update all the positions from selections
    this.updateView('doorPositionChanged');
    this.updateDoorsPositionY();
    this.updateView('tubPositionChanged');

    // Add listeners for clickable elements
    renderer.context.canvas.addEventListener( 'mousedown', this.onDocumentMouseDown, false );
    renderer.context.canvas.addEventListener( 'touchstart', this.onDocumentTouchStart, false );
    this.animate();
  }

  /**
   * 3D animation loop method
   * ran automatically
   */
  animate = ():void => {
    requestAnimationFrame( this.animate );
    this.render();
  }

  /**
   * rendering loop method
   * at the moment just keeps periodically changing the opacity of all placeholders to create glowing effect
   */
  render = ():void => {
    let timer = 0.002 * Date.now();
    for(let placeholder of this.placeholdersGroup.children){
      placeholder.material.opacity = 0.5 + Math.abs(0.5 * Math.sin(timer));
    }
    // required if controls.enableDamping or controls.autoRotate are set to true
    //this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  /**
   * gets triggered when a change happens in input variable which means that it
   * catches and deals with events received from parent component (question page component)
   */
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

  /**
   * makes the initial update of the 3D world after all objects are defined
   */
  ngAfterViewInit(){
    this.scene.add(this.floor);
    this.updateView(this.currentPage);
  }

  /**
   * adds/removes/updates objects that are (not) needed for the current page
   * @param {string} stageName
   */
  updateView(stageName:string):void {
    console.log("hello from dynamic-canvas switch! stageName: ", stageName);
    switch (stageName) {
      case 'showRoomDimensionsElements':
        console.log('Switch went to ShowRoomDimensionElements!');
        this.updateCameraPosition();
        if (!isNullOrUndefined(this.roomWidthText) && !isNullOrUndefined(this.roomLengthText)
          && !isNullOrUndefined(this.doors) && !isNullOrUndefined(this.doorsOpening)
          && !isNullOrUndefined(this.backWall) && !isNullOrUndefined(this.leftWall)
          && !isNullOrUndefined(this.rightWall) ) {
          this.scene.add(this.roomWidthText);
          this.scene.add(this.roomLengthText);
          this.scene.remove(this.backWall);
          this.scene.remove(this.leftWall);
          this.scene.remove(this.rightWall);
          this.scene.remove(this.doors);
          this.scene.remove(this.doorsOpening);
        }
        break;
      case 'roomParametersChanged':
        console.log('Switch went to roomParametersChanged!');
        this.updateFloorSize();
        this.updateWallsSize();
        this.resizeAndRepositionRoomDimensionTexts();
        this.updateCameraPosition();
        this.updateDoorsPositionY();
        break;
      case 'showDoorPositionElements':
        console.log("Switch went to showDoorPositionElements!");
        this.updateCameraPosition(1.25);
        if (!isNullOrUndefined(this.roomWidthText) && !isNullOrUndefined(this.roomLengthText)
          && !isNullOrUndefined(this.doors) && !isNullOrUndefined(this.bathTub)
          && !isNullOrUndefined(this.backWall) && !isNullOrUndefined(this.leftWall)
          && !isNullOrUndefined(this.rightWall) ) {
          this.doors.material.opacity = 1;
          this.doorsOpening.material.opacity = 1;
          this.scene.add(this.backWall);
          this.scene.add(this.leftWall);
          this.scene.add(this.rightWall);
          this.scene.add(this.doors);
          if(this.showDoorsOpening) this.scene.add(this.doorsOpening);
          this.updateView('doorPositionChanged');
          this.scene.remove(this.roomWidthText);
          this.scene.remove(this.roomLengthText);
          this.scene.remove(this.bathTub);
        }
        break;
      case 'doorOpeningTypeChanged':
        // Show doors opening object only when "inwards" door opening is selected
        this.showDoorsOpening = this.selectionsMadeService.getDoorOpeningType() === 'Inwards';
        // Remove doors opening object from the scene if doors are not opening inwards
        if(this.showDoorsOpening) { this.scene.add(this.doorsOpening); }
        else { this.scene.remove(this.doorsOpening); }
        break;
      case 'doorPositionChanged':
        switch (this.selectionsMadeService.getDoorPosition()) {
          case 'Left':
            this.doors.position.x = this.floor.position.x - this.getWidth(this.floor) / 2 + this.getWidth(this.doors) / 2;
            break;
          case 'Middle':
            this.doors.position.x = this.floor.position.x;
            break;
          case 'Right':
            this.doors.position.x = this.floor.position.x + this.getWidth(this.floor) / 2 - this.getWidth(this.doors) / 2;
            break;
          default:
            console.log('Door position was not recognized!');
            break;
        }
        this.doorsOpening.position.x = this.doors.position.x;
        break;
      case 'showTubParametersElements':
        console.log("Switch went to showTubParametersElements!");
        this.updateCameraPosition();
        if (!isNullOrUndefined(this.doors) && !isNullOrUndefined(this.doorsOpening)
          && !isNullOrUndefined(this.bathTub) && !isNullOrUndefined(this.placeholdersGroup)
          && !isNullOrUndefined(this.selectedProductsGroup)) {
          this.doors.material.opacity = this.transparentObjectOpacity;
          this.doorsOpening.material.opacity = this.transparentObjectOpacity;
          this.scene.remove(this.placeholdersGroup);
          this.placeholdersClickable = false;
          this.scene.remove(this.selectedProductsGroup);
          for( let bathMaterial of this.bathTub.material ) { bathMaterial.opacity = 1.0; }
          this.scene.add(this.bathTub);
          this.updateView('tubPositionChanged');
        }
        break;
      case 'tubParametersChanged':
        console.log('Switch went to tubParametersChanged!');
        this.updateTubSize();
        this.updateView('tubPositionChanged');
        break;
      case 'tubPositionChanged':
        console.log('Switch went to tubPositionChanged!');
        switch (this.selectionsMadeService.getTubPosition()) {
          case 'Left Bottom':
            this.bathTub.rotation.z = THREE.Math.degToRad(0); // reset bathtub rotation to appear in the view vertically
            this.bathTub.position.x = this.floor.position.x - this.getWidth(this.floor) / 2 + this.getWidth(this.bathTub) / 2;
            this.bathTub.position.y = this.floor.position.y - this.getHeight(this.floor) / 2 + this.getHeight(this.bathTub) / 2;
            break;
          case 'Left Top':
            this.bathTub.rotation.z = THREE.Math.degToRad(0); // reset bathtub rotation to appear in the view vertically
            this.bathTub.position.x = this.floor.position.x - this.getWidth(this.floor) / 2 + this.getWidth(this.bathTub) / 2;
            this.bathTub.position.y = this.floor.position.y + this.getHeight(this.floor) / 2 - this.getHeight(this.bathTub) / 2;
            break;
          case 'Top Left':
            this.bathTub.rotation.z = THREE.Math.degToRad(90); // reset bathtub rotation to appear in the view horizontally
            this.bathTub.position.x = this.floor.position.x - this.getWidth(this.floor) / 2 + this.getHeight(this.bathTub) / 2;
            this.bathTub.position.y = this.floor.position.y + this.getHeight(this.floor) / 2 - this.getWidth(this.bathTub) / 2;
            break;
          case 'Top Right':
            this.bathTub.rotation.z = THREE.Math.degToRad(90); // reset bathtub rotation to appear in the view horizontally
            this.bathTub.position.x = this.floor.position.x + this.getWidth(this.floor) / 2 - this.getHeight(this.bathTub) / 2;
            this.bathTub.position.y = this.floor.position.y + this.getHeight(this.floor) / 2 - this.getWidth(this.bathTub) / 2;
            break;
          case 'Right Top':
            this.bathTub.rotation.z = THREE.Math.degToRad(0); // reset bathtub rotation to appear in the view vertically
            this.bathTub.position.x = this.floor.position.x + this.getWidth(this.floor) / 2 - this.getWidth(this.bathTub) / 2;
            this.bathTub.position.y = this.floor.position.y + this.getHeight(this.floor) / 2 - this.getHeight(this.bathTub) / 2;
            break;
          case 'Right Bottom':
            this.bathTub.rotation.z = THREE.Math.degToRad(0); // reset bathtub rotation to appear in the view vertically
            this.bathTub.position.x = this.floor.position.x + this.getWidth(this.floor) / 2 - this.getWidth(this.bathTub) / 2;
            this.bathTub.position.y = this.floor.position.y - this.getHeight(this.floor) / 2 + this.getHeight(this.bathTub) / 2;
            break;
          case 'Bottom Right':
            this.bathTub.rotation.z = THREE.Math.degToRad(90); // reset bathtub rotation to appear in the view horizontally
            this.bathTub.position.x = this.floor.position.x + this.getWidth(this.floor) / 2 - this.getHeight(this.bathTub) / 2;
            this.bathTub.position.y = this.floor.position.y - this.getHeight(this.floor) / 2 + this.getWidth(this.bathTub) / 2;
            break;
          case 'Bottom Left':
            this.bathTub.rotation.z = THREE.Math.degToRad(90); // reset bathtub rotation to appear in the view horizontally
            this.bathTub.position.x = this.floor.position.x - this.getWidth(this.floor) / 2 + this.getHeight(this.bathTub) / 2;
            this.bathTub.position.y = this.floor.position.y - this.getHeight(this.floor) / 2 + this.getWidth(this.bathTub) / 2;
            break;
          default:
            console.log('Tub position not recognised!');
            break;
        }
        break;
      case 'showPlaceholderElements':
        console.log('Placeholder elements in switch!!!');
        this.updateCameraPosition();
        if (!isNullOrUndefined(this.doors) && !isNullOrUndefined(this.doorsOpening)
          && !isNullOrUndefined(this.bathTub) && !isNullOrUndefined(this.backWall)
          && !isNullOrUndefined(this.leftWall) && !isNullOrUndefined(this.rightWall)
          && !isNullOrUndefined(this.placeholdersGroup) && !isNullOrUndefined(this.selectedProductsGroup)) {
          this.scene.add(this.backWall);
          this.scene.add(this.leftWall);
          this.scene.add(this.rightWall);
          for( let bathMaterial of this.bathTub.material ) { bathMaterial.opacity = this.transparentObjectOpacity; }
          this.doors.material.opacity = this.transparentObjectOpacity;
          this.scene.add(this.bathTub);
          this.scene.add(this.doors);
          this.scene.add(this.placeholdersGroup);
          this.scene.add(this.selectedProductsGroup);
          this.placeholdersClickable = true;

          this.updatePlaceholders();
        }
        break;
      case 'productForPlaceholderSelected':
        console.log('Product for placeholder selected switch!!!');
        let product: THREE.Object3D;
        switch (this.helperService.getSelectedProduct()) {
          case 'cupboard1':
            product = this.createCupboard1();
            this.selectedProductsGroup.add(product);
            console.log('Selected item was: cupboard1!');
            break;
          case 'cupboard2':
            product = this.createCupboard2();
            this.selectedProductsGroup.add(product);
            console.log('Selected item was: cupboard2!');
            break;
          case 'cupboard3':
            product = this.createCupboard3();
            this.selectedProductsGroup.add(product);
            console.log('Selected item was: cupboard3!');
            break;
          default:
            console.log('FAULT: PRODUCT NOT RECOGNISED!');
            break;
        }

        // Find out which wall they are ramming against and rotate accordingly
        let scaleUp:number = 0.05;
        // Scale placeholder up by a bit and check for intersections with other placeholder to find out if there is
        // any space nearby that can be borrowed and used to place bigger furniture
        console.log(this.selectedPlaceholder);
        this.selectedPlaceholder.scale.x += scaleUp;
        this.selectedPlaceholder.scale.y += scaleUp;
        if(this.intersects(this.selectedPlaceholder, this.backWall)) {
          console.log("placeholer is near the back wall");
          product.rotation.z = THREE.Math.degToRad(0);
        } else
        if(this.intersects(this.selectedPlaceholder, this.leftWall)) {
          console.log("placeholer is near the left wall");
          product.rotation.z = THREE.Math.degToRad(90);
        } else
        if(this.intersects(this.selectedPlaceholder, this.rightWall)) {
          console.log("placeholer is near the right wall");
          product.rotation.z = THREE.Math.degToRad(-90);
        } else {
          console.log("placeholer is at the front");
          product.rotation.z = THREE.Math.degToRad(180);
        }
        this.selectedPlaceholder.scale.x -= scaleUp;
        this.selectedPlaceholder.scale.y -= scaleUp;

        // TODO for some reason bottom right corner does not detect a nearby placeholder on the left. This becomes
        // TODO obvious when you put a 400x400 product just above the corner and try to add something to the corner
        // TODO update product positioning algorithm

        // Re-position non-small products
        if(this.getWidth(product) > this.getWidth(this.selectedPlaceholder)) {
          if(this.nearbyPlaceholdersToSelected.length >= 1) {

            product.position.x = this.selectedPlaceholder.position.x;
            product.position.y = this.selectedPlaceholder.position.y;
            product.position.z = this.floor.position.z + this.getHeight(product) / 2;
          } else {
            console.log("Error: too big product was selected for the available space");
          }
          // Re-position small products
        } else {
        product.position.x = this.selectedPlaceholder.position.x;
        product.position.y = this.selectedPlaceholder.position.y;
        product.position.z = this.floor.position.z + this.getHeight(product) / 2;
      }

        this.updatePlaceholders();
        break;
      case 'showSummaryElements':
        console.log("Switch went to showTubParametersElements!");
        this.updateCameraPosition(1.25);
        if (!isNullOrUndefined(this.doors) && !isNullOrUndefined(this.doorsOpening)
          && !isNullOrUndefined(this.bathTub) && !isNullOrUndefined(this.placeholdersGroup)
          && !isNullOrUndefined(this.selectedProductsGroup)) {
          this.doors.material.opacity = this.transparentObjectOpacity;
          this.doorsOpening.material.opacity = this.transparentObjectOpacity;
          this.scene.remove(this.placeholdersGroup);
          this.placeholdersClickable = false;
          for( let bathMaterial of this.bathTub.material ) { bathMaterial.opacity = 1.0; }
          this.scene.add(this.bathTub);
        }
        break;
      default:
        console.log("Fault: switch went to default!");
        break;
    }
  }

  /**
   * recalculates the available space in the room and puts placeholders where furniture product would fit
   */
  updatePlaceholders = ():void => {
    // reset placeholdersGroup
    this.placeholdersGroup.children = [];
    // set intersectables
    this.intersectables = [];
    this.intersectables.push(this.bathTub);
    if(this.showDoorsOpening) this.intersectables.push(this.doorsOpening);
    this.intersectables = this.intersectables.concat(this.selectedProductsGroup.children);
    this.intersectables.push(this.backWall);
    // constants for further calculations
    let placeholdersWidth = this.helperService.getPlaceholderMinWidth();
    let placeholdersLength = this.helperService.getPlaceholderMinLength();
    let zCoord = this.floor.position.z + 1;
    // Add placeholders for left wall
    let xCoordFloorLeft = this.floor.position.x - this.getWidth(this.floor) / 2;
    let xCoord = xCoordFloorLeft + placeholdersWidth / 2;
    this.addPlaceholdersVertically(xCoord, zCoord, placeholdersWidth, placeholdersLength);
    // Add placeholders for the right wall
    let xCoordFloorRight = this.floor.position.x + this.getWidth(this.floor) / 2;
    xCoord = xCoordFloorRight - placeholdersWidth / 2;
    this.addPlaceholdersVertically(xCoord, zCoord, placeholdersWidth, placeholdersLength);
    // Set different intersectables
    this.intersectables.pop(); // remove the backWall from intersectable objects list
    this.intersectables.push(this.rightWall);
    this.intersectables = this.intersectables.concat(this.placeholdersGroup.children);
    // Add placeholders for the top wall
    let yCoordFloorBottom = this.floor.position.y - this.getHeight(this.floor) / 2;
    let yCoord = yCoordFloorBottom + placeholdersLength / 2;
    this.addPlaceholdersHorizontally(yCoord, zCoord, placeholdersWidth, placeholdersLength);

    // Add placeholders for the bottom wall
    let yCoordFloorTop = this.floor.position.y + this.getHeight(this.floor) / 2;
    yCoord = yCoordFloorTop - placeholdersLength / 2;
    this.addPlaceholdersHorizontally(yCoord, zCoord, placeholdersWidth, placeholdersLength);
  }

  /**
   * traverses through the vertical space (y position) in the room from the bottom to the top on x and z positions until
   * the top part of the floor and puts placeholders where possible
   * @param {number} xCoord
   * @param {number} zCoord
   * @param {number} placeholdersWidth
   * @param {number} placeholdersLength
   */
  addPlaceholdersVertically = (xCoord:number, zCoord:number, placeholdersWidth:number, placeholdersLength:number):void => {
    let yCoordFloorBottom = this.floor.position.y - this.getHeight(this.floor) / 2;
    let yCoordFloorTop = this.floor.position.y + this.getHeight(this.floor) / 2;
    let yCoord = yCoordFloorBottom + placeholdersLength / 2;
    while( yCoord <= yCoordFloorTop) {
      // BoundingBox collision
      let newPlaceholder = this.createPlaceholderObject(placeholdersWidth,placeholdersLength);
      newPlaceholder.position.x = xCoord;
      newPlaceholder.position.y = yCoord;
      newPlaceholder.position.z = zCoord;
      let collisionHappened: boolean = false;
      for(let intersectable of this.intersectables) {
        if( this.intersects(newPlaceholder, intersectable) ) {
          let intersectableHeight = this.getHeight(intersectable);
          // if the intersectable is rotated then its width should be used instead of height
          if( THREE.Math.radToDeg(intersectable.rotation.z) % 180 != 0 ) {
            intersectableHeight = this.getWidth(intersectable);
          }
          // if the last placeholder could have been bigger - make it bigger
          if(this.placeholdersGroup.children.length != 0) {
            let lastPlaceholder = this.placeholdersGroup.children[this.placeholdersGroup.children.length - 1];
            let yCoordIntersectableBottom = intersectable.position.y - intersectableHeight / 2;
            // if the intersected item is the back wall
            if( intersectable == this.backWall ) {
              yCoordIntersectableBottom = intersectable.position.y;
            }
            let yCoordLastPlaceholderTop = lastPlaceholder.position.y + this.getHeight(lastPlaceholder)/2;
            // if there still is unused space in between the last placeholder and the object
            // detected by collision - give that space to the placeholder.
            if( yCoordIntersectableBottom > yCoordLastPlaceholderTop ) {
              let difference = yCoordIntersectableBottom - yCoordLastPlaceholderTop;
              this.setHeight( lastPlaceholder, this.getHeight(lastPlaceholder) + difference );
              lastPlaceholder.position.y += difference / 2;
            }
          }
            yCoord = intersectable.position.y + intersectableHeight / 2 + placeholdersLength / 2 + 1;
          collisionHappened = true;
          break;
        }
      }
      if(!collisionHappened) {
        this.placeholdersGroup.add(newPlaceholder);
        yCoord = yCoord + placeholdersLength + 1;
      }
    }
  }

  /**
   * traverses through the horizontal space (x position) in the room from the left to the right on y and z positions
   * until the right-most part of the floor and puts placeholders where possible
   * @param {number} yCoord
   * @param {number} zCoord
   * @param {number} placeholdersWidth
   * @param {number} placeholdersLength
   */
  addPlaceholdersHorizontally = (yCoord:number, zCoord:number, placeholdersWidth:number, placeholdersLength:number):void => {
    let xCoordFloorLeft = this.floor.position.x - this.getWidth(this.floor) / 2;
    let xCoordFloorRight = this.floor.position.x + this.getWidth(this.floor) / 2;
    let xCoord = xCoordFloorLeft + placeholdersWidth / 2;
    while( xCoord <= xCoordFloorRight) {
      // BoundingBox collision
      let newPlaceholder = this.createPlaceholderObject(placeholdersWidth,placeholdersLength);
      newPlaceholder.position.x = xCoord;
      newPlaceholder.position.y = yCoord;
      newPlaceholder.position.z = zCoord;
      let collisionHappened: boolean = false;
      for(let intersectable of this.intersectables) {
        if( this.intersects(newPlaceholder, intersectable) ) {
          let intersectableWidth = this.getWidth(intersectable);
          // if intersectable was rotated, then its width should be taken instead of height
          if( THREE.Math.radToDeg(intersectable.rotation.z) % 180 != 0 ) {
            intersectableWidth = this.getHeight(intersectable);
          }
          // if the last placeholder could have been bigger - make it bigger
          if(this.placeholdersGroup.children.length != 0) {
            let lastPlaceholder = this.placeholdersGroup.children[this.placeholdersGroup.children.length - 1];
            let xCoordIntersectableLeft = intersectable.position.x - intersectableWidth / 2;
            // if the intersected item is the right wall
            if( intersectable == this.rightWall ) {
              xCoordIntersectableLeft = intersectable.position.x;
            }
            let xCoordLastPlaceholderRight = lastPlaceholder.position.x + this.getWidth(lastPlaceholder)/2;
            // if there still is unused space in between the last placeholder and the object
            // detected by collision - give that space to the placeholder.
            if( xCoordIntersectableLeft > xCoordLastPlaceholderRight ) {
              let difference = xCoordIntersectableLeft - xCoordLastPlaceholderRight;
              // if the gap between placeholder and object is bigger than placeholders widht,
              // then there must be some other object in between them and space reimbursement is unneeded
              if (difference < this.getWidth(newPlaceholder)) {
                this.setWidth(lastPlaceholder, this.getWidth(lastPlaceholder) + difference);
                lastPlaceholder.position.x += difference / 2;
              }
            }
          }
          xCoord = intersectable.position.x + intersectableWidth / 2 + placeholdersLength / 2 + 1;
          collisionHappened = true;
          break;
        }
      }
      if(!collisionHappened) {
        this.placeholdersGroup.add(newPlaceholder);
        xCoord = xCoord + placeholdersWidth + 1;
      }
    }
  }

  /**
   * does bounding box collision detection on two objects
   * @param {THREE.Object3D} firstObject
   * @param {THREE.Object3D} secondObject
   * @returns {boolean}
   */
  intersects = (firstObject: THREE.Object3D, secondObject: THREE.Object3D):boolean => {
    let firstBB: THREE.Box3 = new THREE.Box3().setFromObject(firstObject);
    let secondBB: THREE.Box3 = new THREE.Box3().setFromObject(secondObject);
    let collision: boolean = firstBB.intersectsBox(secondBB);
    return collision;
  }

  /**
   * creates placeholder object by parameters supplied
   * @param {number} width
   * @param {number} length
   * @returns {THREE.Object3D}
   */
  createPlaceholderObject = ( width: number, length: number):THREE.Object3D => {
    let placeholderGeometry: THREE.Object3D = new THREE.PlaneGeometry(width, length);
    let placeholder:THREE.Object3D = new THREE.Mesh(placeholderGeometry, this.placeholderMaterial);
    return placeholder;
  }

  /**
   * updates the size of the floor
   * @param {THREE.Object3D} floor
   */
  updateFloorSize = ( floor?: THREE.Object3D ):void => {
    floor = floor ? floor : this.floor;
    floor.scale.set( this.selectionsMadeService.getRoomWidth(), this.selectionsMadeService.getRoomLength(), 1 );
  }

  // updates the size of all the walls
  updateWallsSize = ( floor?: THREE.Object3D, backWall?: THREE.Object3D, leftWall?: THREE.Object3D, rightWall?: THREE.Object3D ):void => {
    // check if parameters were supplied
    // if not, use global variables instead
    floor = floor ? floor : this.floor;
    backWall = backWall ? backWall : this.backWall;
    leftWall = leftWall ? leftWall : this.leftWall;
    rightWall = rightWall ? rightWall : this.rightWall;

    this.setWidth(backWall, this.getWidth(floor));
    this.setWidth(leftWall, this.getHeight(floor));
    this.setWidth(rightWall, this.getHeight(floor));

    this.setHeight(backWall, 2000);
    this.setHeight(rightWall, 2000);
    this.setHeight(leftWall, 2000);

    backWall.position.x = floor.position.x;
    backWall.position.y = floor.position.y + this.getHeight(floor) / 2;

    leftWall.position.x = floor.position.x - this.getWidth(floor) / 2;
    leftWall.position.y = floor.position.y;

    rightWall.position.x = floor.position.x + this.getWidth(floor) / 2;
    rightWall.position.y = floor.position.y;
  }

  /**
   * changes the distance between the camera and the room
   * @param {number} multiplier
   */
  updateCameraPosition = (multiplier?:number):void => {
    multiplier = multiplier ? multiplier : 1;

    this.camera.position.y = - Math.max(this.floor.scale.y, this.floor.scale.x) * multiplier;
    this.camera.position.z = Math.max(this.floor.scale.y, this.floor.scale.x) * multiplier;
    this.controls.update(); // controls need to be updated after every manual camera's transform
  }

  /**
   * Resizes and repositions the "room width" and the "room length" text elements
   */
  resizeAndRepositionRoomDimensionTexts = ():void => {
    let fontSize:number = Math.max(this.floor.scale.y, this.floor.scale.x) / 15;
    this.roomWidthText.scale.set(fontSize, fontSize, 1);
    this.roomLengthText.scale.set(fontSize, fontSize, 1);
    // multiply or divide the fontsize to give more space between floor and text elements
    this.roomWidthText.position.x = this.floor.position.x - this.floor.scale.x / 4;
    this.roomWidthText.position.y = this.floor.position.y - this.floor.scale.y / 2 - fontSize * 1.5;
    this.roomWidthText.position.z = this.floor.position.z + 1;
    this.roomLengthText.position.x = this.floor.position.x - this.floor.scale.x / 2 - fontSize / 2;
    this.roomLengthText.position.y = this.floor.position.y - this.floor.scale.y / 3;
    this.roomLengthText.position.z = this.floor.position.z + 1;
  }

  /**
   * adds support for touch screens
   * @param event
   */
  onDocumentTouchStart = ( event ):void => {
    event.preventDefault();
    event.clientX = event.touches[0].clientX;
    event.clientY = event.touches[0].clientY;
    this.onDocumentMouseDown( event );
  }

  /**
   * catches the event of mouse clicking on 3D canvas and checks if placeholder was clicked
   * @param event
   */
  onDocumentMouseDown = ( event ):void => {
    event.preventDefault();
    if( this.placeholdersClickable ) {
      let canvasBounds = this.renderer.context.canvas.getBoundingClientRect();
      this.mouse.x = ((event.clientX - canvasBounds.left) / (canvasBounds.right - canvasBounds.left)) * 2 - 1;
      this.mouse.y = -((event.clientY - canvasBounds.top) / (canvasBounds.bottom - canvasBounds.top)) * 2 + 1;
      this.raycaster.setFromCamera(this.mouse, this.camera);
      // check if the thing clicked was a placeholder
      let intersects = this.raycaster.intersectObjects(this.placeholdersGroup.children);
      console.log(this.mouse.x, this.mouse.y, intersects);
      if (intersects.length > 0) {
        this.placeholderClicked(intersects[0].object);
      }
    }
  }

  /**
   * checks if clicked placeholder has any nearby placeholders thus calculating the available space for furniture
   * products to be put in. Notifies question component that placeholder was clicked.
   * @param {THREE.Object3D} placeholder
   */
  private placeholderClicked = (placeholder:THREE.Object3D):void => {
    this.selectedPlaceholder = placeholder;
    this.nearbyPlaceholdersToSelected = []; // reset the list of the nearby placeholders
    this.helperService.setSelectedPlaceholderWidth(this.getWidth(this.selectedPlaceholder));
    this.helperService.setSelectedPlaceholderLength(this.getHeight(this.selectedPlaceholder));
    // check total available space around the placeholder
    let scaleUp:number = 0.05;
    // Scale placeholder up by a bit and check for intersections with other placeholder
    console.log(this.selectedPlaceholder);
    this.selectedPlaceholder.scale.x += scaleUp;
    this.selectedPlaceholder.scale.y += scaleUp;
    this.intersectables = [];
    this.intersectables = this.intersectables.concat(this.placeholdersGroup.children);
    // get rid of the selected placeholder from intersectables list
    this.intersectables.splice(this.intersectables.indexOf(this.selectedPlaceholder), 1);
    // And find the nearby placeholders
    for(let intersectable of this.intersectables){
      if(this.intersects(this.selectedPlaceholder, intersectable)){
        // add the nearby placeholder objects to array for use if bigger than 400x400 product is selected
        this.nearbyPlaceholdersToSelected.push(intersectable);
        // find their position relative to the selected placeholder and
        // put maximum available space in the service class.
        // left or right
        if(this.selectedPlaceholder.position.x != intersectable.position.x
          && this.selectedPlaceholder.position.y == intersectable.position.y) {
          this.helperService.incSelectedPlaceholderWidth(this.getWidth(intersectable));
          console.log("Has placeholder left/right");
        }
        // above or below
        if(this.selectedPlaceholder.position.x == intersectable.position.x
          && this.selectedPlaceholder.position.y != intersectable.position.y) {
          this.helperService.incSelectedPlaceholderLength(this.getHeight(intersectable));
          console.log("Has placeholder above/below");
        }
      }
    }
    // reset the scale of the selected placeholder to the original state
    this.selectedPlaceholder.scale.x -= scaleUp;
    this.selectedPlaceholder.scale.y -= scaleUp;
    // notify questionComponent about the click
    this.onChangeMade.emit('placeholderClicked');
  }

  /**
   * updates the doors position to appear at the bottom of the room
   */
  updateDoorsPositionY = ():void => {
    this.doors.position.y = this.floor.position.y - this.floor.scale.y / 2;
    this.doorsOpening.position.y = this.doors.position.y + this.getWidth(this.doorsOpening) / 2;
  }

  /**
   * updates the size of the tub
   */
  updateTubSize = ():void => {
    this.bathTub.scale.set( this.selectionsMadeService.getTubWidth(), this.selectionsMadeService.getTubLength(), this.helperService.getTubHeight());
  }

  /**
   * calculates objects real width by combining both width and scale parameters
   * @param {THREE.Object3D} object
   * @returns {number}
   */
  getWidth = ( object: THREE.Object3D ):number => {
    let scaleWidth:number = object.scale.x;
    let geometryWidth:number = object.geometry.parameters.width;

    return scaleWidth * geometryWidth;
  }

  /**
   * calculates what should be the scale of the object to make it look like it has the specified width
   * @param {THREE.Object3D} object
   * @param {number} newWidth
   */
  setWidth = ( object: THREE.Object3D, newWidth: number):void => {
    object.scale.x = newWidth / object.geometry.parameters.width;
  }

  /**
   * calculates objects real height by combining both its height and its scale parameters
   * @param {THREE.Object3D} object
   * @returns {number}
   */
  getHeight = ( object: THREE.Object3D ):number => {
    let scaleHeight:number = object.scale.y;
    let geometryHeight:number = object.geometry.parameters.height;
    return scaleHeight * geometryHeight;
  }

  /**
   * calculates what should be the scale of the object to make it look like it has the specified height
   * @param {THREE.Object3D} object
   * @param {number} newHeight
   */
  setHeight = ( object: THREE.Object3D, newHeight: number):void => {
    object.scale.y = newHeight / object.geometry.parameters.height;
  }

  /**
   * calculates objects real depth by combining both its depth and its scale parameters
   * @param {THREE.Object3D} object
   * @returns {number}
   */
  getDepth = ( object: THREE.Object3D ):number => {
    let scaleDepth:number = object.scale.z;
    let geometryDepth:number = object.geometry.parameters.depth;

    return scaleDepth * geometryDepth;
  }

  /**
   * calculates what should be the scale of the object to make it look like it has the specified depth
   * @param {THREE.Object3D} object
   * @param {number} newDepth
   */
  setDepth = ( object: THREE.Object3D, newDepth: number):void => {
    object.scale.y = newDepth / object.geometry.parameters.depth;
  }

  /**
   * creates small cupboard furniture object of type "cupboard1"
   * @returns {THREE.Object3D}
   */
  createCupboard1 = ():THREE.Object3D => {
    let cupboardGeometry = new THREE.BoxGeometry(400,400,400);
    let cupboardMaterials = this.createCupboardsMaterials('textures/cupboard1.png', 0xB7925E);
    return new THREE.Mesh(cupboardGeometry, cupboardMaterials);
  }

  /**
   * creates medium cupboard furniture object of type "cupboard2"
   * @returns {THREE.Object3D}
   */
  createCupboard2 = ():THREE.Object3D => {
    let cupboardGeometry = new THREE.BoxGeometry(500,400,400);
    let cupboardMaterials = this.createCupboardsMaterials('textures/cupboard2.png', 0xECEBE9);
    return new THREE.Mesh(cupboardGeometry, cupboardMaterials);
  }

  /**
   * creates large cupboard furniture object of type "cupboard3"
   * @returns {THREE.Object3D}
   */
  createCupboard3 = ():THREE.Object3D => {
    let cupboardGeometry = new THREE.BoxGeometry(600,400,400);
    let cupboardMaterials = this.createCupboardsMaterials('textures/cupboard3.png', 0xA47041);
    return new THREE.Mesh(cupboardGeometry, cupboardMaterials);
  }

  /**
   * a shortcut function for creating materials for cupboards
   * @param {string} imagePath
   * @param {THREE.Color} solidColour
   * @returns {THREE.MeshLambertMaterial[]}
   */
  createCupboardsMaterials = (imagePath:string, solidColour:THREE.Color) => {
    let cupboardMaterial = new THREE.MeshLambertMaterial({
      color: solidColour,
      transparent: true
    });
    let cupboardTextureMaterial = new THREE.MeshLambertMaterial({
      color: 0xFFFFFF,
      map: new THREE.TextureLoader().load(this.assetsFolderPath + imagePath),
      transparent: true
    });
    return [
      cupboardMaterial,
      cupboardMaterial,
      cupboardMaterial,
      cupboardTextureMaterial,
      cupboardMaterial,
      cupboardMaterial
    ];
  }

}
