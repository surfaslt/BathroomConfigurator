import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-third-page',
  templateUrl: './third-page.component.html',
  styleUrls: ['./third-page.component.css']
})
export class ThirdPageComponent implements OnInit {

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
