/**
 * this component displays the summary of all users selections made and allows him to print it
 * together with the 3D view of the room
 */
import {Component} from '@angular/core';
import {HelperService} from "../../helper.service";
import {SelectionsMadeService} from "../../selections-made.service";

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.css']
})

export class SummaryPageComponent {

  public data; // stores all info but products about the users selections made in previous stages
  public selectedProductDescriptions:string[]; // stores descriptions of selected products

  constructor(private selectionsMadeService: SelectionsMadeService, private helperService: HelperService) {
    this.helperService.setProgress(6);
    this.data = this.generateArray(this.selectionsMadeService.getData());
    let selectedProducts = this.data.pop().value; // gets selected products array which is the last element in the "data" array
    this.selectedProductDescriptions = this.generateProductDescriptions( selectedProducts );
  }

  /**
   * turns object into array
   * @param obj
   * @returns {object[]}
   */
  generateArray(obj):object[] {
    return Object.keys(obj).map((key)=>{ return {key:key, value:obj[key]}});
  }

  /**
   * calls browsers print() method
   */
  printPage = ():void => {
    window.print();
  }

  /**
   * Produces a descriptive 1-line summary about each product in the array
   * basically a toString() method of the product objects that can deal with whole array of objects
   * @param arr
   * @returns {string[]}
   */
  generateProductDescriptions = ( arr ):string[] => {
    let descriptions:string[] = [];
    if( arr.length != 0 ) descriptions.push('Products:');
    for( let product of arr ) {
      descriptions.push('Cupboard - '
        + 'Params: width: ' + product.geometry.parameters.width + 'mm '
        + 'height: ' + product.geometry.parameters.height + 'mm, '
        + 'depth: ' + product.geometry.parameters.depth + 'mm, '
        + 'Mid point: x: ' + product.position.x + 'mm, '
        + 'y: ' + product.position.y + 'mm');
    }
    return descriptions;
  }

}
