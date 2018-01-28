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

  onSelectionChanged(changedName: string){
    this.userChangeMade = this.userChangeMade == changedName ? changedName + '1' : changedName; // triggers ngOnChanges() in dynamic-canvas component
  }

  nextQuestion(){
    this.currentQuestionNo++;
  }

  previousQuestion(){
    this.currentQuestionNo--;
  }




  ngOnDestroy(): void {
    this.selectionsMadeService.setCurrentQuestionNumber(this.currentQuestionNo);
  }

}
