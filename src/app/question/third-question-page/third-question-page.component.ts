import { Component, OnInit } from '@angular/core';
import {SelectionsMadeService} from "../../selections-made.service";

@Component({
  selector: 'app-third-question-page',
  templateUrl: './third-question-page.component.html',
  styleUrls: ['./third-question-page.component.css']
})
export class ThirdQuestionPageComponent implements OnInit {

  constructor(private selectionsMadeService: SelectionsMadeService) {
    selectionsMadeService.setProgress(7);
  }

  ngOnInit() {
  }

}
