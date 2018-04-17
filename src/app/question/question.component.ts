/**
 * This component holds other components that asks users relative questions and also 3D component displaying users
 * choices. This component also acts as a bridge of communication between the prior and the latter.
 */
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

  public currentQuestionNo: number = 1; // Holds value of which question no. to show
  public totalQuestionNo: number = 5; // Used to toggle "next page" button in the view
  public pageChange: string = ''; // holds the change made in the page to be passed to 3D component
  // The below pre-populates product selection modal with images of products.
  public smallProductImagePaths: string[] = ['cupboard1.png', 'cupboard1.jpg', 'cupboard1.png'];
  public mediumProductImagePaths: string[] = ['cupboard2.png', 'cupboard2.jpg', 'cupboard2.png', 'cupboard2.png'];
  public largeProductImagePaths: string[] = ['cupboard3.png', 'cupboard3.jpg'];
  public smallProductWidthNeeded: number = 400; // constant for small product size
  public mediumProductWidthNeeded: number = 500; // constant for medium product size
  public largeProductWidthNeeded: number = 600; // constant for large product size
  private productImagesFolderPath: string; // shortcut to product images folder
  // messages that are passed to 3D component
  private messagesToDynamicCanvasComponent: string[] = ['showRoomDimensionsElements','showDoorPositionElements',
    'showTubParametersElements','showPlaceholderElements','showSummaryElements'];

  constructor(private selectionsMadeService: SelectionsMadeService, public helperService:HelperService) {
    this.currentQuestionNo = helperService.getCurrentQuestionNo();
    this.totalQuestionNo = this.helperService.getTotalQuestionNo();
    this.productImagesFolderPath = helperService.getAssetsFolderPath() + 'productImages/';
  }

  ngAfterViewInit(){
    // updates 3D world to display relevant info to the current page
    this.pageChangeMade(this.messagesToDynamicCanvasComponent[this.currentQuestionNo-1]);
  }

  /**
   * forced 3D component to update itself even if its input value is the same as it was
   * this is needed because the data in the service classes might have updated and so the view needs to be refreshed
   */
  pageChangeMade = (changedName: string): void => {
    this.pageChange = this.pageChange == changedName ? changedName + '1' : changedName; // triggers ngOnChanges() in dynamic-canvas component
  }

  /**
   * receives messages from 3D component: when placeholder is clicked - displays modal with products
   * @param {string} changedName
   */
  canvasChangeMade = (changedName: string): void => {
    this.showProductModal();
  }

  /**
   * gets triggered when product is selected in the modal. Puts the selected product into helperService class and
   * notifies the 3D component
   * @param {string} imageSrc
   */
  productChosen = (imageSrc:string):void => {
    let splittedSrc:string[] = imageSrc.split("/");
    let productName:string = splittedSrc[splittedSrc.length - 1].split('.')[0];
    this.helperService.setSelectedProduct(productName);
    this.pageChangeMade('productForPlaceholderSelected');
    this.hideProductsModal();
  }

  /**
   * shows popup window with available products to replace the placeholder clicked
   */
  showProductModal = (): void => {
    this.productsModal.show();
  }

  /**
   * closes the popup window with available products to replace the placeholder clicked
   */
  hideProductsModal = (): void => {
    this.productsModal.hide();
  }

  /**
   * changes the page forwards and notifies 3D component to update itself accordingly
   */
  nextQuestion = (): void => {
    this.currentQuestionNo++;
    this.helperService.setCurrentQuestionNumber(this.currentQuestionNo);
    this.pageChangeMade(this.messagesToDynamicCanvasComponent[this.currentQuestionNo-1]);
  }

  /**
   * changes the page backwards and notifies 3D component to update itself accordingly
   */
  previousQuestion = ():void => {
    this.currentQuestionNo--;
    this.helperService.setCurrentQuestionNumber(this.currentQuestionNo);
    this.pageChangeMade(this.messagesToDynamicCanvasComponent[this.currentQuestionNo-1]);
  }

  /**
   * when user goes out of question component, it records the page number that the user was on so that next time the
   * user is on question component, the component displays the same page.
   * this method was essential for navigation when summary page component was not underneath question component
   * and now it is left in case it is needed again
   */
  ngOnDestroy(): void {
    this.helperService.setCurrentQuestionNumber(this.currentQuestionNo);
  }

}
