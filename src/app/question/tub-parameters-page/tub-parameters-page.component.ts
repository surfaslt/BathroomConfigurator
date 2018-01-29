import { Component, OnInit } from '@angular/core';
import {SelectionsMadeService} from "../../selections-made.service";

@Component({
  selector: 'app-tub-parameters-page',
  templateUrl: './tub-parameters-page.component.html',
  styleUrls: ['./tub-parameters-page.component.css']
})
export class TubParametersPageComponent implements OnInit {

  constructor(private selectionsMadeService: SelectionsMadeService) {
    selectionsMadeService.setProgress(4);
  }

  ngOnInit() {
  }

  setTubWidth(event):void {
    this.selectionsMadeService.setTubWidth(event.target.value);
  }

  setTubLength(event):void {
    this.selectionsMadeService.setTubLength(event.target.value)
  }

}
