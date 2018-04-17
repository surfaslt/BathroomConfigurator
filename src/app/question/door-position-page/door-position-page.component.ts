/**
 * this component allows user to choose where in the room his doors are and whether they open inwards or outwards
 */
import { Component, EventEmitter, Output } from '@angular/core';
import {SelectionsMadeService} from "../../selections-made.service";
import {HelperService} from "../../helper.service";

@Component({
  selector: 'app-door-position-page',
  templateUrl: './door-position-page.component.html',
  styleUrls: ['./door-position-page.component.css']
})
export class DoorPositionPageComponent {

  @Output() onChangeMade: EventEmitter<string> = new EventEmitter<string>(); // notifies question component about change made

  public doorPositionOptions: string[] = ['Left', 'Middle', 'Right']; // basic door positions in the room
  public doorOpeningType: string; // stores whether doors open inwards or outwards
  public doorPositionChosen: string; // stores which door position was selected by the user

  constructor(private selectionsMadeService: SelectionsMadeService, private helperService: HelperService) {
    helperService.setProgress(3); // update progress bar
    // pre-set selections from data in service class
    this.doorOpeningType = selectionsMadeService.getDoorOpeningType();
    this.doorPositionChosen = selectionsMadeService.getDoorPosition();
  }

  // sets the door opening type to the users selected opening type and notifies 3D component about it (through question component)
  doorOpeningTypeChanged = ():void => {
    this.selectionsMadeService.setDoorOpeningType(this.doorOpeningType);
    this.onChangeMade.emit('doorOpeningTypeChanged');
  }

  // sets the door position to the users selected position and notifies 3D component about it (through question component)
  doorPositionChanged = ():void => {
    this.selectionsMadeService.setDoorPosition(this.doorPositionChosen);
    this.onChangeMade.emit('doorPositionChanged');
  }

}
