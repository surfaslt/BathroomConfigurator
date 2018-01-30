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
  messagesToDynamicCanvasComponent: string[] = ['showRoomDimensionsElements','showDoorPositionElements','showTubParametersElements','','',''];

  constructor(private selectionsMadeService: SelectionsMadeService) {
    this.currentQuestionNo = selectionsMadeService.getCurrentQuestionNo();
    this.onChangeMade(this.messagesToDynamicCanvasComponent[this.currentQuestionNo-1]);
  }

  ngOnInit(){ }

  onChangeMade(changedName: string): void{
    console.log("question component - change was made!");
    this.userChangeMade = this.userChangeMade == changedName ? changedName + '1' : changedName; // triggers ngOnChanges() in dynamic-canvas component
  }

  nextQuestion(): void{
    this.currentQuestionNo++;
    this.onChangeMade(this.messagesToDynamicCanvasComponent[this.currentQuestionNo-1]);
  }

  previousQuestion():void {
    this.currentQuestionNo--;
    this.onChangeMade('');
  }

  ngOnDestroy(): void {
    this.selectionsMadeService.setCurrentQuestionNumber(this.currentQuestionNo);
  }

}
