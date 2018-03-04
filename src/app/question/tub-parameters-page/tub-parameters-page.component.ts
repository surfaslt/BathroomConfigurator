import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {SelectionsMadeService} from "../../selections-made.service";

@Component({
  selector: 'app-tub-parameters-page',
  templateUrl: './tub-parameters-page.component.html',
  styleUrls: ['./tub-parameters-page.component.css']
})
export class TubParametersPageComponent implements OnInit {

  @Output() onChangeMade: EventEmitter<string> = new EventEmitter<string>();
  tubPositionOptions: string[] = ['Left Bottom','Left Top','Top Left','Top Right','Right Top', 'Right Bottom', 'Bottom Right', 'Bottom Left'];
  tubPositionChosen: string;

  constructor(private selectionsMadeService: SelectionsMadeService) {
    selectionsMadeService.setProgress(4);
    this.tubPositionChosen = selectionsMadeService.getTubPosition();
  }

  ngOnInit() {
  }

  setTubWidth = (event):void => {
    this.selectionsMadeService.setTubWidth(event.target.value);
    this.onChangeMade.emit('tubParametersChanged');
  }

  setTubLength = (event):void => {
    this.selectionsMadeService.setTubLength(event.target.value)
    this.onChangeMade.emit('tubParametersChanged');
  }

  tubPositionChanged = (tubPosition: string):void => {
    this.tubPositionChosen = tubPosition;
    this.selectionsMadeService.setTubPosition(tubPosition);
    this.onChangeMade.emit('tubPositionChanged');
  }

}
