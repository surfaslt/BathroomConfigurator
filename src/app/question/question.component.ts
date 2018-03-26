import { Component, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { SelectionsMadeService } from './../selections-made.service';
import { HelperService } from './../helper.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements AfterViewInit, OnDestroy {

  @ViewChild('productsModal') productsModal: ModalDirective;

  public currentQuestionNo: number = 1;
  public totalQuestionNo: number = 4;
  public pageChange: string = '';
  public smallProductImagePaths: string[] = ['cupboard1.png', 'cupboard1.jpg', 'cupboard1.png'];
  public mediumProductImagePaths: string[] = ['cupboard2.png', 'cupboard2.jpg', 'cupboard2.png', 'cupboard2.png'];
  public largeProductImagePaths: string[] = ['cupboard3.png', 'cupboard3.jpg'];
  public smallProductWidthNeeded: number = 400;
  public mediumProductWidthNeeded: number = 500;
  public largeProductWidthNeeded: number = 600;
  private productImagesFolderPath: string;
  private messagesToDynamicCanvasComponent: string[] = ['showRoomDimensionsElements','showDoorPositionElements','showTubParametersElements','showPlaceholderElements'];


  constructor(private selectionsMadeService: SelectionsMadeService, public helperService:HelperService) {
    this.currentQuestionNo = helperService.getCurrentQuestionNo();
    this.productImagesFolderPath = helperService.getAssetsFolderPath() + 'productImages/';
  }

  ngAfterViewInit(){
    console.log("Question component, change will be made: ", this.messagesToDynamicCanvasComponent[this.currentQuestionNo-1]);
    this.pageChangeMade(this.messagesToDynamicCanvasComponent[this.currentQuestionNo-1]);
  }

  pageChangeMade = (changedName: string): void => {
    this.pageChange = this.pageChange == changedName ? changedName + '1' : changedName; // triggers ngOnChanges() in dynamic-canvas component
  }

  canvasChangeMade = (changedName: string): void => {
    console.log("maximum available space: ", this.helperService.getSelectedPlaceholderWidth(), this.helperService.getSelectedPlaceholderLength());
    // TODO pre-populate modal with images of stuff available to be put in the selected placeholder
    this.showProductModal();
  }

  productChosen = (imageSrc:string):void => {
    let splittedSrc:string[] = imageSrc.split("/");
    let productName:string = splittedSrc[splittedSrc.length - 1].split('.')[0];
    this.helperService.setSelectedProduct(productName);
    this.pageChangeMade('productForPlaceholderSelected');
    this.hideProductsModal();
  }

  showProductModal = (): void => {
    this.productsModal.show();
  }

  hideProductsModal = (): void => {
    this.productsModal.hide();
  }

  nextQuestion = (): void => {
    this.currentQuestionNo++;
    this.pageChangeMade(this.messagesToDynamicCanvasComponent[this.currentQuestionNo-1]);
  }

  previousQuestion = ():void => {
    this.currentQuestionNo--;
    this.pageChangeMade(this.messagesToDynamicCanvasComponent[this.currentQuestionNo-1]);
  }

  ngOnDestroy(): void {
    this.helperService.setCurrentQuestionNumber(this.currentQuestionNo);
  }

}
