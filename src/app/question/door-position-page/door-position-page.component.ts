import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {SelectionsMadeService} from "../../selections-made.service";
import {HelperService} from "../../helper.service";

@Component({
  selector: 'app-door-position-page',
  templateUrl: './door-position-page.component.html',
  styleUrls: ['./door-position-page.component.css']
})
export class DoorPositionPageComponent implements OnInit {

  @Output() onChangeMade: EventEmitter<string> = new EventEmitter<string>();

  public doorPositionOptions: string[] = ['Left', 'Middle', 'Right'];
  public doorOpeningType: string;
  public doorPositionChosen: string;

  constructor(private selectionsMadeService: SelectionsMadeService, private helperService: HelperService) {
    helperService.setProgress(3);
    this.doorOpeningType = selectionsMadeService.getDoorOpeningType();
    this.doorPositionChosen = selectionsMadeService.getDoorPosition();
  }

  ngOnInit() {
  }

  doorOpeningTypeChanged = ():void => {
    console.log(this.doorOpeningType);
    this.selectionsMadeService.setDoorOpeningType(this.doorOpeningType);
    this.onChangeMade.emit('doorOpeningTypeChanged');
  }

  doorPositionChanged = ():void => {
    this.selectionsMadeService.setDoorPosition(this.doorPositionChosen);
    this.onChangeMade.emit('doorPositionChanged');
  }

}
