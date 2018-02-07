import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {SelectionsMadeService} from "../../selections-made.service";

@Component({
  selector: 'app-tub-parameters-page',
  templateUrl: './tub-parameters-page.component.html',
  styleUrls: ['./tub-parameters-page.component.css']
})
export class TubParametersPageComponent implements OnInit {

  @Output() onChangeMade: EventEmitter<string> = new EventEmitter<string>();
  tubPositionAvailableOptions: number = 6;
  tubPositionOptions: string[] = ['Left Bottom','Left Top','Top Left','Top Right','Right Top', 'Right Bottom'];
  tubPositionChosen: string;

  constructor(private selectionsMadeService: SelectionsMadeService) {
    selectionsMadeService.setProgress(4);
    this.tubPositionChosen = selectionsMadeService.getTubPosition();
  }

  ngOnInit() {
  }

  setTubWidth(event):void {
    this.selectionsMadeService.setTubWidth(event.target.value);
    this.onChangeMade.emit('tubParametersChanged');
  }

  setTubLength(event):void {
    this.selectionsMadeService.setTubLength(event.target.value)
    this.onChangeMade.emit('tubParametersChanged');
  }

  tubPositionChanged():void {
    this.selectionsMadeService.setTubPosition(this.tubPositionChosen);
    this.onChangeMade.emit('tubPositionChanged');
  }

}
