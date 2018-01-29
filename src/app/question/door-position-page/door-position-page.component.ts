import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {SelectionsMadeService} from "../../selections-made.service";

@Component({
  selector: 'app-door-position-page',
  templateUrl: './door-position-page.component.html',
  styleUrls: ['./door-position-page.component.css']
})
export class DoorPositionPageComponent implements OnInit {

  @Output() onChangeMade: EventEmitter<string> = new EventEmitter<string>();

  constructor(private selectionsMadeService: SelectionsMadeService) {
    selectionsMadeService.setProgress(3);
    this.onChangeMade.emit('hideRoomDimensionsElements');
    console.log("hello from door-position-page contructor!");
  }

  ngOnInit() {
  }

}
