/**
 * Lets user choose its room parameters (width and length) and updates 3D view accordingly
 */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SelectionsMadeService } from "../../selections-made.service";
import {HelperService} from "../../helper.service";

@Component({
  selector: 'app-parameters-page',
  templateUrl: './parameters-page.component.html',
  styleUrls: ['./parameters-page.component.css']
})
export class ParametersPageComponent {

  @Output() onChangeMade: EventEmitter<string> = new EventEmitter<string>(); // notifies question component about change made

  constructor(public selectionsMadeService: SelectionsMadeService, private helperService: HelperService) {
    helperService.setProgress(2);
  }

  /**
   * sets room width in selectionsMade service and informs 3D component about the event through question component
   * @param event
   */
  setRoomWidth(event):void {
    this.selectionsMadeService.setRoomWidth(event.target.value);
    this.onChangeMade.emit('roomParametersChanged');
  }

  /**
   * sets room length in selectionsMade service and informs 3D component about the event through question component
   * @param event
   */
  setRoomLength(event):void {
    this.selectionsMadeService.setRoomLength(event.target.value);
    this.onChangeMade.emit('roomParametersChanged');
  }

}
