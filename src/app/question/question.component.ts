import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { SelectionsMadeService } from './../selections-made.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements AfterViewInit, OnDestroy {

  currentQuestionNo: number = 1;
  totalQuestionNo: number = 4;
  userChangeMade: string = '';
  messagesToDynamicCanvasComponent: string[] = ['showRoomDimensionsElements','showDoorPositionElements','showTubParametersElements','showPlaceholderElements'];

  constructor(private selectionsMadeService: SelectionsMadeService) {
    this.currentQuestionNo = selectionsMadeService.getCurrentQuestionNo();
  }

  ngAfterViewInit(){
    console.log("Question component, change will be made: ", this.messagesToDynamicCanvasComponent[this.currentQuestionNo-1]);
    this.onChangeMade(this.messagesToDynamicCanvasComponent[this.currentQuestionNo-1]);
  }

  onChangeMade(changedName: string): void{
    this.userChangeMade = this.userChangeMade == changedName ? changedName + '1' : changedName; // triggers ngOnChanges() in dynamic-canvas component
    console.log("question component - change was made!");
  }

  nextQuestion(): void{
    this.currentQuestionNo++;
    this.onChangeMade(this.messagesToDynamicCanvasComponent[this.currentQuestionNo-1]);
  }

  previousQuestion():void {
    this.currentQuestionNo--;
    this.onChangeMade(this.messagesToDynamicCanvasComponent[this.currentQuestionNo-1]);
  }

  ngOnDestroy(): void {
    this.selectionsMadeService.setCurrentQuestionNumber(this.currentQuestionNo);
  }

}
