import {Component, OnInit, ChangeDetectorRef, AfterViewChecked} from '@angular/core';
import { SelectionsMadeService } from "./selections-made.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewChecked{

  constructor(private selectionsMadeService: SelectionsMadeService, private cdRef: ChangeDetectorRef) {

  }

  ngOnInit() {

  }

  ngAfterViewChecked()
  {
    this.cdRef.detectChanges();
  }

}
