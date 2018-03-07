import { Injectable } from '@angular/core';

@Injectable()
export class HelperService {

  // Values that are NOT chosen by user - globally accessible file storage for program to work
  private currentQuestion: number = 1;
  private progress: number = 25;
  private numberOfPages: number = 6;
  private doorWidth: number = 762;
  private doorHeight: number = 1981;
  private tubHeight: number = 510;
  private placeholderMinWidth: number = 400;
  private placeholderMinLength: number = 400;
  private selectedPlaceholderWidth: number = 400;
  private selectedPlaceholderLength: number = 400;
  private selectedProduct: string;

  constructor() { }

  setCurrentQuestionNumber = ( questionNo:number ):void => {
    this.currentQuestion = Number(questionNo);
  }

  setProgress = ( pageNo:number ):void => {
    this.progress = Number(pageNo) / this.numberOfPages * 100;
  }

  setSelectedPlaceholderWidth = (width: number):void => {
    this.selectedPlaceholderWidth = Number(width);
  }

  setSelectedPlaceholderLength = (length: number):void => {
    this.selectedPlaceholderLength = Number(length);
  }

  incSelectedPlaceholderWidth = (width: number):void => {
    this.selectedPlaceholderWidth += Number(width);
  }

  incSelectedPlaceholderLength = (length: number):void => {
    this.selectedPlaceholderLength += Number(length);
  }

  setSelectedProduct = (product: string):void => {
    this.selectedProduct = product;
  }

  getCurrentQuestionNo = ():number => {
    return this.currentQuestion;
  }

  getProgress = ():number => {
    return Math.round(this.progress);
  }

  getDoorWidth = ():number => {
    return this.doorWidth;
  }

  getDoorHeight = ():number => {
    return this.doorHeight;
  }

  getTubHeight = ():number => {
    return this.tubHeight;
  }

  getPlaceholderMinWidth = ():number => {
    return this.placeholderMinWidth;
  }

  getPlaceholderMinLength = ():number => {
    return this.placeholderMinLength;
  }

  getSelectedPlaceholderWidth = ():number => {
    return this.selectedPlaceholderWidth;
  }

  getSelectedPlaceholderLength = ():number => {
    return this.selectedPlaceholderLength;
  }

  getSelectedProduct = ():string => {
    return this.selectedProduct;
  }

}
