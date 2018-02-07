import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SelectionsMadeService } from "../../selections-made.service";

@Component({
  selector: 'app-placeholders-page',
  templateUrl: './placeholders-page.component.html',
  styleUrls: ['./placeholders-page.component.css']
})
export class FirstQuestionPageComponent implements OnInit {

  @Output() onChangeMade: EventEmitter<string> = new EventEmitter<string>();

  constructor(private selectionsMadeService: SelectionsMadeService) {
    selectionsMadeService.setProgress(5);
  }

  ngOnInit() {
  }

  changeHasToilet(toiletStatus: boolean):void {
    this.selectionsMadeService.setHasToilet(toiletStatus);
    this.onChangeMade.emit('hasToilet');
  }

}
