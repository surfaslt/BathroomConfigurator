import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {SelectionsMadeService} from "../../selections-made.service";

@Component({
  selector: 'app-door-position-page',
  templateUrl: './door-position-page.component.html',
  styleUrls: ['./door-position-page.component.css']
})
export class DoorPositionPageComponent implements OnInit {

  @Output() onChangeMade: EventEmitter<string> = new EventEmitter<string>();

  private doorPositionOptions: string[] = ['Left', 'Middle', 'Right'];
  private doorPositionChosen: string;

  constructor(private selectionsMadeService: SelectionsMadeService) {
    selectionsMadeService.setProgress(3);
    this.doorPositionChosen = selectionsMadeService.getDoorPosition();
  }

  ngOnInit() {
  }

  doorPositionChanged = ():void => {
    this.selectionsMadeService.setDoorPosition(this.doorPositionChosen);
    this.onChangeMade.emit('doorPositionChanged');
  }

}
