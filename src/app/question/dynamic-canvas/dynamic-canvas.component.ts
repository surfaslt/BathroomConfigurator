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
  private shower: any;
  private scene: any;
  private camera: any;
  private renderer: any;
  private controls: any;

  constructor(private selectionsMadeService: SelectionsMadeService) {}

  ngOnChanges() {
    if(this.scene !== undefined) {

      let changeName = this.changeMade.indexOf('1') == -1 ? this.changeMade : this.changeMade.slice(0, -1);

      switch (changeName) {
        case 'hasToilet':
          console.log('hasToilet: ' + this.selectionsMadeService.getHasToilet());
          if( this.selectionsMadeService.getHasToilet() ){
            this.scene.add(this.toilet);
          } else {
            this.scene.remove(this.toilet);
          }
          break;
        case 'hasShower':
          console.log('hasShower: ' + this.selectionsMadeService.getHasShower());
          if( this.selectionsMadeService.getHasShower() ){
            this.scene.add(this.shower);
          } else {
            this.scene.remove(this.shower);
          }
          break;
        default:
          console.log('unrecognised change happened');
          if (this.selectionsMadeService.getHasToilet()) {
            this.scene.add(this.toilet);
          } else this.scene.remove(this.toilet);
          if (this.selectionsMadeService.getHasShower()) {
            this.scene.add(this.shower);
          } else this.scene.remove(this.shower);
          break;
      }
    }
  }

  ngOnInit() {

    // RENDERER
    let renderer = new THREE.WebGLRenderer({canvas: document.getElementById('myCanvas'), antialias:true});
    renderer.setClearColor(0x00ff00);
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


    /*
    camera.position.x = 5;
    camera.position.y = 5;
    camera.position.z = 5;

    camera.lookAt(scene.position);
*/
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
