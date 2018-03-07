import { Component, OnInit } from '@angular/core';
import {HelperService} from "../helper.service";

@Component({
  selector: 'app-splash-page',
  templateUrl: './splash-page.component.html',
  styleUrls: ['./splash-page.component.css']
})
export class SplashPageComponent implements OnInit {

  constructor(private helperService: HelperService) {
    helperService.setProgress(1);
  }

  ngOnInit() {
  }

}
