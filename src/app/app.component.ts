import { Component, OnInit, ChangeDetectorRef, AfterViewChecked} from '@angular/core';
import { SelectionsMadeService } from "./selections-made.service";
import {HelperService} from "./helper.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewChecked{

  constructor(public selectionsMadeService: SelectionsMadeService, public helperService: HelperService, private cdRef: ChangeDetectorRef) {

  }

  ngOnInit() {

  }

  // gets rid of "Expression changed after it was checked" error.
  ngAfterViewChecked() {this.cdRef.detectChanges();}

}
