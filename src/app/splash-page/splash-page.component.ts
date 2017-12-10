import { Component, OnInit } from '@angular/core';
import { SelectionsMadeService } from "../selections-made.service";

@Component({
  selector: 'app-splash-page',
  templateUrl: './splash-page.component.html',
  styleUrls: ['./splash-page.component.css']
})
export class SplashPageComponent implements OnInit {

  constructor(private selectionsMadeService: SelectionsMadeService) {
    selectionsMadeService.setProgress(1);
  }

  ngOnInit() {
  }

}
