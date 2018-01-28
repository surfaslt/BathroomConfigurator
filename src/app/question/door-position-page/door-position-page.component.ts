import { Component, OnInit } from '@angular/core';
import {SelectionsMadeService} from "../../selections-made.service";

@Component({
  selector: 'app-door-position-page',
  templateUrl: './door-position-page.component.html',
  styleUrls: ['./door-position-page.component.css']
})
export class DoorPositionPageComponent implements OnInit {

  constructor(private selectionsMadeService: SelectionsMadeService) {
    selectionsMadeService.setProgress(3);
  }

  ngOnInit() {
  }

}
