import { Component, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { SelectionsMadeService } from './../selections-made.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements AfterViewInit, OnDestroy {

  @ViewChild('productsModal') productsModal: ModalDirective;

  private currentQuestionNo: number = 1;
  private totalQuestionNo: number = 4;
  private pageChange: string = '';
  private productImagesFolderPath: string ='./../../assets/productImages/';
  private messagesToDynamicCanvasComponent: string[] = ['showRoomDimensionsElements','showDoorPositionElements','showTubParametersElements','showPlaceholderElements'];
  private smallProductImagePaths: string[] = ['cupboard1.png', 'cupboard1.png', 'cupboard1.png'];
  private mediumProductImagePaths: string[] = ['cupboard2.png', 'cupboard2.png', 'cupboard2.png', 'cupboard2.png'];
  private largeProductImagePaths: string[] = ['cupboard3.png', 'cupboard3.png'];
  private smallProductWidthNeeded: number = 400;
  private mediumProductWidthNeeded: number = 500;
  private largeProductWidthNeeded: number = 600;

  constructor(private selectionsMadeService: SelectionsMadeService) {
    this.currentQuestionNo = selectionsMadeService.getCurrentQuestionNo();
  }

  ngAfterViewInit(){
    console.log("Question component, change will be made: ", this.messagesToDynamicCanvasComponent[this.currentQuestionNo-1]);
    this.pageChangeMade(this.messagesToDynamicCanvasComponent[this.currentQuestionNo-1]);
  }

  pageChangeMade = (changedName: string): void => {
    this.pageChange = this.pageChange == changedName ? changedName + '1' : changedName; // triggers ngOnChanges() in dynamic-canvas component
  }

  canvasChangeMade = (changedName: string): void => {
    console.log("maximum available space: ", this.selectionsMadeService.getSelectedPlaceholderWidth(), this.selectionsMadeService.getSelectedPlaceholderLength());
    // TODO pre-populate modal with images of stuff available to be put in the selected placeholder
    this.showProductModal();
  }

  productChosen = (imageSrc:string):void => {
    let splittedSrc:string[] = imageSrc.split("/");
    let productName:string = splittedSrc[splittedSrc.length - 1].split('.')[0];
    this.selectionsMadeService.setSelectedProduct(productName);
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
    this.selectionsMadeService.setCurrentQuestionNumber(this.currentQuestionNo);
  }

}
