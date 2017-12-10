import { Component, OnInit } from '@angular/core';
import { SelectionsMadeService } from '../../selections-made.service';

@Component({
  selector: 'app-second-question-page',
  templateUrl: './second-question-page.component.html',
  styleUrls: ['./second-question-page.component.css']
})
export class SecondQuestionPageComponent implements OnInit {

  constructor(private selectionsMadeService: SelectionsMadeService) {
    selectionsMadeService.setProgress(4);
  }

  ngOnInit() { }

}
