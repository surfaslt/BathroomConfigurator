import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.css']
})
export class SecondPageComponent implements OnInit {

  obj = {
    id: 1,
    name: "Umair"
  }

  arr = [0, 1, 2, 3, 'blah', 'meh', 6];

  showMessage = false;

  constructor() { }

  ngOnInit() {
  }

}
