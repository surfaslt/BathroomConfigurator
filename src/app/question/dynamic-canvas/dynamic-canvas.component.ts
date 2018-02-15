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
  private bathTub: THREE.Object3D;
  private placeholdersGroup: THREE.Group;
  private controls: any; // might not be needded
  private currentPage: string ='';
  private assetsFolderPath: string ='./../../../assets/';
  private placeholderMaterial;
  private raycaster: THREE.Raycaster;
  private mouse: THREE.Vector2;

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
    let light = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(light);
    let light1 = new THREE.PointLight(0xffffff, 0.1);
    light1.position.set( 0, 0, 5000);
    scene.add(light1);

    // Floors
    let floorGeometry = new THREE.PlaneGeometry(1,1);
    let floorMaterial = new THREE.MeshBasicMaterial({
      color: 0xeeeeee,
      //wireframe: true
    });
    let floor = new THREE.Mesh(floorGeometry, floorMaterial);// Update floor size from parameters
    this.updateFloorSize(floor);

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
      roomLengthText.rotation.z = THREE.Math.degToRad(80);
      this.roomLengthText = roomLengthText;

      this.resizeAndRepositionRoomDimensionTexts();

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
      map: new THREE.TextureLoader().load(this.assetsFolderPath + 'textures/modern-door.jpg'),
      transparent: true
    });
    let doors = new THREE.Mesh(doorsGeometry, doorsMaterial);
    // make doors sit on the edge of floor
    doors.position.y = floor.position.y - floor.scale.y / 2;
    doors.position.z = floor.position.z + doorsGeometry.parameters.height / 2;
    doors.rotation.x = THREE.Math.degToRad(90);

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

    bathTubGeometry.materials = [ bathTubTextureMaterial, bathTubMaterial ];

    let bathTubMaterials = [
      bathTubMaterial,
      bathTubMaterial,
      bathTubTextureMaterial,
      bathTubMaterial,
      bathTubMaterial,
      bathTubMaterial
    ];

    let bathTub = new THREE.Mesh( bathTubGeometry, bathTubMaterials );

    //let bathTub = new THREE.Mesh(bathTubGeometry, bathTubMaterial);

    bathTub.scale.set(this.selectionsMadeService.getTubWidth(), this.selectionsMadeService.getTubHeight(), this.selectionsMadeService.getTubLength());
    bathTub.position.z = floor.position.z + bathTub.scale.y / 2;
    bathTub.rotation.x = THREE.Math.degToRad(90);

    // setup placeholders group and material
    let placeholdersGroup = new THREE.Group();
    placeholdersGroup.position.z = floor.position.z + 1;
    let placeholderMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      transparent: true
    });

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

    // Define other parameters
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    // Update all the positions from selections
    this.updateView('doorPositionChanged');
    this.updateView('tubPositionChanged');

    // Add listeners for clickable elements
    //document.getElementById('myCanvas')

    renderer.context.canvas.addEventListener( 'mousedown', this.onDocumentMouseDown, false );
    renderer.context.canvas.addEventListener( 'touchstart', this.onDocumentTouchStart, false );
    this.animate();
  }

  animate = ():void => {
    requestAnimationFrame( this.animate );
    this.render();
  }

  render = ():void => {
    let timer = 0.002 * Date.now();
    for(let placeholder of this.placeholdersGroup.children){
      placeholder.material.opacity = 0.5 + Math.abs(0.5 * Math.sin(timer));
    }

    //this.box.position.y = 0.5 + 3 * Math.sin(timer);
    //this.box.rotation.x += THREE.Math.degToRad(3);

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
        this.updateCameraPosition();
        if (!isNullOrUndefined(this.roomWidthText) && !isNullOrUndefined(this.roomLengthText) && !isNullOrUndefined(this.doors)) {
          this.scene.add(this.roomWidthText);
          this.scene.add(this.roomLengthText);
          this.scene.remove(this.doors);
        }
        break;
      case 'roomParametersChanged':
        console.log('Switch went to roomParametersChanged!');
        this.updateFloorSize();
        this.resizeAndRepositionRoomDimensionTexts();
        this.updateCameraPosition();
        // make doors sit on the edge of floor
        this.doors.position.y = this.floor.position.y - this.floor.scale.y / 2;
        break;
      case 'showDoorPositionElements':
        console.log("Switch went to showDoorPositionElements!");
        this.updateCameraPosition(1.25);
        if (!isNullOrUndefined(this.roomWidthText) && !isNullOrUndefined(this.roomLengthText) && !isNullOrUndefined(this.doors) && !isNullOrUndefined(this.bathTub)) {
          this.doors.material.opacity = 1;
          this.scene.add(this.doors);
          this.updateView('doorPositionChanged');
          this.scene.remove(this.roomWidthText);
          this.scene.remove(this.roomLengthText);
          this.scene.remove(this.bathTub);
        }
        break;
      case 'doorPositionChanged':
        switch (this.selectionsMadeService.getDoorPosition()) {
          case 'Left':
            this.doors.position.x = this.floor.position.x - this.floor.scale.x / 2 + this.doors.geometry.parameters.width / 2;
            break;
          case 'Middle':
            this.doors.position.x = this.floor.position.x;
            break;
          case 'Right':
            this.doors.position.x = this.floor.position.x + this.floor.scale.x / 2 - this.doors.geometry.parameters.width / 2;
            break;
          default:
            console.log('Door position was not recognized!');
            break;
        }
        break;
      case 'showTubParametersElements':
        console.log("Switch went to showTubParametersElements!");
        this.updateCameraPosition();
        if (!isNullOrUndefined(this.doors) && !isNullOrUndefined(this.bathTub) && !isNullOrUndefined(this.placeholdersGroup)) {
          this.scene.remove(this.doors);
          this.scene.remove(this.placeholdersGroup);
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
            this.bathTub.rotation.y = THREE.Math.degToRad(0);
            this.bathTub.position.x = this.floor.position.x - this.floor.scale.x / 2 + this.bathTub.scale.x / 2;
            this.bathTub.position.y = this.floor.position.y - this.floor.scale.y / 2 + this.bathTub.scale.z / 2;
            break;
          case 'Left Top':
            this.bathTub.rotation.y = THREE.Math.degToRad(0);
            this.bathTub.position.x = this.floor.position.x - this.floor.scale.x / 2 + this.bathTub.scale.x / 2;
            this.bathTub.position.y = this.floor.position.y + this.floor.scale.y / 2 - this.bathTub.scale.z / 2;
            break;
          case 'Top Left':
            this.bathTub.rotation.y = THREE.Math.degToRad(90);
            this.bathTub.position.x = this.floor.position.x - this.floor.scale.x / 2 + this.bathTub.scale.z / 2;
            this.bathTub.position.y = this.floor.position.y + this.floor.scale.y / 2 - this.bathTub.scale.x / 2;
            break;
          case 'Top Right':
            this.bathTub.rotation.y = THREE.Math.degToRad(90);
            this.bathTub.position.x = this.floor.position.x + this.floor.scale.x / 2 - this.bathTub.scale.z / 2;
            this.bathTub.position.y = this.floor.position.y + this.floor.scale.y / 2 - this.bathTub.scale.x / 2;
            break;
          case 'Right Top':
            this.bathTub.rotation.y = THREE.Math.degToRad(0);
            this.bathTub.position.x = this.floor.position.x + this.floor.scale.x / 2 - this.bathTub.scale.x / 2;
            this.bathTub.position.y = this.floor.position.y + this.floor.scale.y / 2 - this.bathTub.scale.z / 2;
            break;
          case 'Right Bottom':
            this.bathTub.rotation.y = THREE.Math.degToRad(0);
            this.bathTub.position.x = this.floor.position.x + this.floor.scale.x / 2 - this.bathTub.scale.x / 2;
            this.bathTub.position.y = this.floor.position.y - this.floor.scale.y / 2 + this.bathTub.scale.z / 2;
            break;
          default:
            console.log('Tub position not recognised!');
            break;
        }
        break;
      case 'showPlaceholderElements':
        console.log('Placeholder elements in switch!!!');
        this.updateCameraPosition();
        if (!isNullOrUndefined(this.doors) && !isNullOrUndefined(this.bathTub) && !isNullOrUndefined(this.placeholdersGroup)) {
          for( let bathMaterial of this.bathTub.material ) { bathMaterial.opacity = 0.2; }
          this.doors.material.opacity = 0.2;
          this.scene.add(this.bathTub);
          this.scene.add(this.doors);

          this.scene.add(this.placeholdersGroup);
          // Add for left wall

          this.placeholdersGroup.add(this.createPlaceholderObject(this.selectionsMadeService.getPlaceholderMinWidth(),
            this.selectionsMadeService.getPlaceholderMinLength()));

          // Add for right wall

          // Add top wall

          // Add bottom wall

          /* BoundingBox collision
          var firstObject = ...your first object...

          var secondObject = ...your second object...

          firstBB = new THREE.Box3().setFromObject(firstObject);

          secondBB = new THREE.Box3().setFromObject(secondObject);

          var collision = firstBB.isIntersectionBox(secondBB);
           */

        }
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

  updateFloorSize = ( floor?: THREE.Object3D ):void => {
    floor = floor ? floor : this.floor;
    floor.scale.set( this.selectionsMadeService.getRoomWidth(), this.selectionsMadeService.getRoomLength(), 1 );
  }

  updateCameraPosition = (multiplier?:number):void => {
    multiplier = multiplier ? multiplier : 1;
    this.camera.position.y = - Math.max(this.floor.scale.y, this.floor.scale.x) * multiplier;
    this.camera.position.z = Math.max(this.floor.scale.y, this.floor.scale.x) * multiplier;
  }

  resizeAndRepositionRoomDimensionTexts = ():void => {

    let fontSize:number = Math.max(this.floor.scale.y, this.floor.scale.x) / 15;
    this.roomWidthText.scale.set(fontSize, fontSize, 1);
    this.roomLengthText.scale.set(fontSize, fontSize, 1);
    // multiply/divide fontsize to give more space between floor and text elements
    this.roomWidthText.position.x = this.floor.position.x - this.floor.scale.x / 4;
    this.roomWidthText.position.y = this.floor.position.y - this.floor.scale.y / 2 - fontSize * 1.5;
    this.roomWidthText.position.z = this.floor.position.z + 1;
    this.roomLengthText.position.x = this.floor.position.x - this.floor.scale.x / 2 - fontSize / 2;
    this.roomLengthText.position.y = this.floor.position.y - this.floor.scale.y / 3;
    this.roomLengthText.position.z = this.floor.position.z + 1;
  }

  updateTubSize = ():void => {
    this.bathTub.scale.set( this.selectionsMadeService.getTubWidth(), this.selectionsMadeService.getTubHeight(), this.selectionsMadeService.getTubLength());
  }

  onDocumentTouchStart = ( event ) => {

    event.preventDefault();

    event.clientX = event.touches[0].clientX;
    event.clientY = event.touches[0].clientY;
    this.onDocumentMouseDown( event );

  }

  onDocumentMouseDown = ( event ) => {

    event.preventDefault();

    let canvasBounds = this.renderer.context.canvas.getBoundingClientRect();

    this.mouse.x = ( ( event.clientX - canvasBounds.left ) / ( canvasBounds.right - canvasBounds.left ) ) * 2 - 1;
    this.mouse.y = - ( ( event.clientY - canvasBounds.top ) / ( canvasBounds.bottom - canvasBounds.top) ) * 2 + 1;

    this.raycaster.setFromCamera( this.mouse, this.camera );

    let intersects = this.raycaster.intersectObjects( this.placeholdersGroup.children );
    //let intersects = this.raycaster.intersectObjects( this.scene.children );
    console.log(this.mouse.x, this.mouse.y, intersects);
    if ( intersects.length > 0 ) {

      intersects[ 0 ].object.material.color.setHex( Math.random() * 0xffffff );

      /*
      let particleMaterial = new THREE.SpriteMaterial( {
        color: 0x000000,
        program: function ( context ) {
          context.beginPath();
          context.arc( 0, 0, 0.5, 0, Math.PI * 2, true );
          context.fill();
        }
      } );

      let particle = new THREE.Sprite( particleMaterial );
      particle.position.copy( intersects[ 0 ].point );
      particle.scale.x = particle.scale.y = 16;
      this.scene.add( particle );
      */

    }

    /*
            // Parse all the faces
            for ( var i in intersects ) {

                intersects[ i ].face.material[ 0 ].color.setHex( Math.random() * 0xffffff | 0x80000000 );

            }
            */
  }

}
