/**
 * This component allows user to choose its bath tub/shower width and length.
 * It also allows the user to position the tub/shower to one of the eight pre-set tub positions.
 */
import { Component, Output, EventEmitter } from '@angular/core';
import {SelectionsMadeService} from "../../selections-made.service";
import {HelperService} from "../../helper.service";

@Component({
  selector: 'app-tub-parameters-page',
  templateUrl: './tub-parameters-page.component.html',
  styleUrls: ['./tub-parameters-page.component.css']
})
export class TubParametersPageComponent {

  @Output() onChangeMade: EventEmitter<string> = new EventEmitter<string>(); // notifies question component about change made
  tubPositionOptions: string[] = ['Left Bottom','Left Top','Top Left','Top Right','Right Top', 'Right Bottom',
    'Bottom Right', 'Bottom Left']; // pre-set tub positions in the room

  tubPositionChosen: string; // holds the users selection of tub position

  constructor(public selectionsMadeService: SelectionsMadeService, private helperService: HelperService) {
    helperService.setProgress(4);
    this.tubPositionChosen = selectionsMadeService.getTubPosition();
  }
  /**
   * checks if tub width is bigger than the room and if so sets it to be the same as room width
   * it also notifies 3D component about this event through question component
   */
  setTubWidth = (event):void => {
    let value = Number(event.target.value);
    let roomWidth = Number(this.selectionsMadeService.getRoomWidth());
    if(value > roomWidth) {
      value = roomWidth;
      event.target.value = roomWidth;
    }
    this.selectionsMadeService.setTubWidth(value);
    this.onChangeMade.emit('tubParametersChanged');
  }

  /**
   * checks if tub length is bigger than the room and if so sets it to be the same as room length
   * it also notifies 3D component about this event through question component
   */
  setTubLength = (event):void => {
    let value = Number(event.target.value);
    let roomLength = Number(this.selectionsMadeService.getRoomLength());
    if(value > roomLength) {
      value = roomLength;
      event.target.value = roomLength;
    }
    this.selectionsMadeService.setTubLength(value)
    this.onChangeMade.emit('tubParametersChanged');
  }

  /**
   * changes the position of the tub and notifies 3D component about it (through question component)
   * @param {string} tubPosition
   */
  tubPositionChanged = (tubPosition: string):void => {
    this.tubPositionChosen = tubPosition;
    this.selectionsMadeService.setTubPosition(tubPosition);
    this.onChangeMade.emit('tubPositionChanged');
  }

}
