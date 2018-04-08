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
  public selectedProductDescriptions;
  constructor(private selectionsMadeService: SelectionsMadeService, private helperService: HelperService) {
    this.helperService.setProgress(6);
    this.data = this.generateArray(this.selectionsMadeService.getData());
    let selectedProducts = this.data.pop().value;
    this.selectedProductDescriptions = this.generateProductDescriptions( selectedProducts );
  }

  ngOnInit() {  }

  // turns object into array
  generateArray(obj){
    return Object.keys(obj).map((key)=>{ return {key:key, value:obj[key]}});
  }

  printPage = () => {
    window.print();
  }

  generateProductDescriptions = ( arr ) => {
    let descriptions = [];
    debugger;
    if( arr.length != 0 ) descriptions.push('Products:');
    for( let product of arr ) {
      descriptions.push('Cupboard:');
      descriptions.push('Params: width: ' + product.geometry.parameters.width + 'mm '
        + 'height: ' + product.geometry.parameters.height + 'mm, '
        + 'depth: ' + product.geometry.parameters.depth + 'mm, '
        + 'Mid point: x: ' + product.geometry.parameters.depth + 'mm, '
        + 'y: ' + product.geometry.parameters.depth + 'mm');
    }
    return descriptions;
  }

}
