import { Component, OnInit, OnDestroy } from '@angular/core';
import { SelectionsMadeService } from './../selections-made.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit, OnDestroy {

  currentQuestionNo: number = 1;
  totalQuestionNo: number = 6;
  userChangeMade: string = '';

  constructor(private selectionsMadeService: SelectionsMadeService) {
    this.currentQuestionNo = selectionsMadeService.getCurrentQuestionNo();
  }

  ngOnInit(){ }

  onChangeMade(changedName: string): void{
    console.log("question component has received the emit!");
    this.userChangeMade = this.userChangeMade == changedName ? changedName + '1' : changedName; // triggers ngOnChanges() in dynamic-canvas component
  }

  nextQuestion(): void{
    this.currentQuestionNo++;
  }

  previousQuestion():void {
    this.currentQuestionNo--;
  }

  ngOnDestroy(): void {
    this.selectionsMadeService.setCurrentQuestionNumber(this.currentQuestionNo);
  }

}
