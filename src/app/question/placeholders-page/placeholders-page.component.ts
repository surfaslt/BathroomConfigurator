/**
 * This component explains what needs to be done in 3D component to add furniture products to the room.
 * Basically the component is delegating its task to 3D component and question component that holds modal with
 * products fitting in the space
 */
import { Component } from '@angular/core';
import { HelperService } from "../../helper.service";

@Component({
  selector: 'app-placeholders-page',
  templateUrl: './placeholders-page.component.html',
  styleUrls: ['./placeholders-page.component.css']
})
export class PlaceholdersPageComponent {

  constructor(private helperService: HelperService) {
    helperService.setProgress(5);
  }

}
