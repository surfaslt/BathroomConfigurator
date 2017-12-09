import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-first-question-page',
  templateUrl: './first-question-page.component.html',
  styleUrls: ['./first-question-page.component.css']
})
export class FirstQuestionPageComponent implements OnInit {

  @Output() onVoted = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

}
