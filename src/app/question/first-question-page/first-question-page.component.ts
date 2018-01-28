import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SelectionsMadeService } from "../../selections-made.service";

@Component({
  selector: 'app-first-question-page',
  templateUrl: './first-question-page.component.html',
  styleUrls: ['./first-question-page.component.css']
})
export class FirstQuestionPageComponent implements OnInit {

  @Output() onSelectionChanged = new EventEmitter<string>();

  constructor(private selectionsMadeService: SelectionsMadeService) {
    selectionsMadeService.setProgress(5);
  }

  ngOnInit() {
  }

  changeHasToilet(toiletStatus: boolean):void {
    this.selectionsMadeService.setHasToilet(toiletStatus);
    this.onSelectionChanged.emit('hasToilet');
  }

  changeHasShower(showerStatus: boolean):void {
    this.selectionsMadeService.setHasShower(showerStatus);
    this.onSelectionChanged.emit('hasShower');
  }

}
