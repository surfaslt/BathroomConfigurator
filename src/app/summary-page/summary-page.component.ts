import {Component, OnInit} from '@angular/core';
import {SelectionsMadeService} from "../selections-made.service";

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.css']
})
export class SummaryPageComponent implements OnInit {

  private data: object;
  constructor(private selectionsMadeService: SelectionsMadeService) {
    this.selectionsMadeService.setProgress(8);
    this.data = this.selectionsMadeService.getData();
  }

  ngOnInit() {  }

  // turns object into array
  generateArray(obj){
    return Object.keys(obj).map((key)=>{ return {key:key, value:obj[key]}});
  }

}
