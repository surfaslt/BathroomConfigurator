import {Component, OnInit} from '@angular/core';
import {HelperService} from "../helper.service";
import {SelectionsMadeService} from "../selections-made.service";

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.css']
})
export class SummaryPageComponent implements OnInit {
  public data;
  constructor(private selectionsMadeService: SelectionsMadeService, private helperService: HelperService) {
    this.helperService.setProgress(6);
    this.data = this.generateArray(this.selectionsMadeService.getData());
  }

  ngOnInit() {  }

  // turns object into array
  generateArray(obj){
    return Object.keys(obj).map((key)=>{ return {key:key, value:obj[key]}});
  }

}
