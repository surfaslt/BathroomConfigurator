import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {HelperService} from "../../helper.service";

@Component({
  selector: 'app-placeholders-page',
  templateUrl: './placeholders-page.component.html',
  styleUrls: ['./placeholders-page.component.css']
})
export class PlaceholdersPageComponent implements OnInit {

  @Output() onChangeMade: EventEmitter<string> = new EventEmitter<string>();

  constructor(private helperService: HelperService) {
    helperService.setProgress(5);
  }

  ngOnInit() {
  }


}
