/**
 * This component makes the creation of navigation between pages easier
 * Currently not used in the project, but might be useful in the future
 */
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  @Input() previousPage: string = '';
  @Input() nextPage: string = '';

  constructor() { }

  ngOnInit() {
  }

}
