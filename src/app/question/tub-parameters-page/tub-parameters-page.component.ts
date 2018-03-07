import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {SelectionsMadeService} from "../../selections-made.service";
import {HelperService} from "../../helper.service";

@Component({
  selector: 'app-tub-parameters-page',
  templateUrl: './tub-parameters-page.component.html',
  styleUrls: ['./tub-parameters-page.component.css']
})
export class TubParametersPageComponent implements OnInit {

  @Output() onChangeMade: EventEmitter<string> = new EventEmitter<string>();
  tubPositionOptions: string[] = ['Left Bottom','Left Top','Top Left','Top Right','Right Top', 'Right Bottom', 'Bottom Right', 'Bottom Left'];
  tubPositionChosen: string;

  constructor(private selectionsMadeService: SelectionsMadeService, private helperService: HelperService) {
    helperService.setProgress(4);
    this.tubPositionChosen = selectionsMadeService.getTubPosition();
  }

  ngOnInit() {
  }

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

  tubPositionChanged = (tubPosition: string):void => {
    this.tubPositionChosen = tubPosition;
    this.selectionsMadeService.setTubPosition(tubPosition);
    this.onChangeMade.emit('tubPositionChanged');
  }

}
