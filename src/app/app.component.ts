/**
 * This is the highest level component which holds the whole application inside of it
 */
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

  // Detects the changes inside application more frequently thus getting rid of
  // "Expression changed after it was checked" error which happens due to changing the status of progress bar frequently.
  ngAfterViewChecked() {this.cdRef.detectChanges();}

}
