import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SelectionsMadeService } from "../../selections-made.service";

@Component({
  selector: 'app-parameters-page',
  templateUrl: './parameters-page.component.html',
  styleUrls: ['./parameters-page.component.css']
})
export class ParametersPageComponent implements OnInit {

  @Output() onChangeMade: EventEmitter<string> = new EventEmitter<string>();

  constructor(private selectionsMadeService: SelectionsMadeService) {
    selectionsMadeService.setProgress(2);
  }

  ngOnInit() {
  }

  setRoomWidth(event):void {
    this.selectionsMadeService.setRoomWidth(event.target.value);
    this.onChangeMade.emit('roomParametersChanged');
  }

  setRoomLength(event):void {
    this.selectionsMadeService.setRoomLength(event.target.value);
    this.onChangeMade.emit('roomParametersChanged');
  }

}
