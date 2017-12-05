import { Component, OnInit } from '@angular/core';
import { SelectionsMadeService } from './../selections-made.service';

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.css']
})
export class SecondPageComponent implements OnInit {

  constructor(private selectionsMadeService: SelectionsMadeService) { }

  ngOnInit() {
    console.log(this.selectionsMadeService);
  }

}
