import { Component, OnInit, OnDestroy } from '@angular/core';
import { SelectionsMadeService } from './../selections-made.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit, OnDestroy {

  currentQuestionNo: number = 1;
  totalQuestionNo: number = 3;
  selectionsService: any;

  nextQuestion(){
    this.currentQuestionNo++;
  }

  previousQuestion(){
    this.currentQuestionNo--;
  }

  constructor(selectionsMadeService: SelectionsMadeService) {
    this.selectionsService = selectionsMadeService;
    this.currentQuestionNo = selectionsMadeService.getCurrentQuestionNo();
  }

  ngOnInit(){ }

  ngOnDestroy(): void {
    this.selectionsService.setCurrentQuestionNumber(this.currentQuestionNo);
  }

}
