/**
 * This service holds values that helps system to do message passing.
 * Its purpose is to store data that needs to be accessed/shared by multiple components.
 */
import { Injectable } from '@angular/core';

@Injectable()
export class HelperService {

  private currentQuestionNo: number = 1; // used by questionComponent to know which question to show
  private totalQuestionNo: number = 5; // Used to toggle "next page" button in the view
  private progress: number = 25; // progressBar uses this to set progress
  private numberOfPages: number = 6; // total number of pages in the application
  private doorWidth: number = 762; // constant
  private doorHeight: number = 1981; // constant
  private tubHeight: number = 510; // constant
  private placeholderMinWidth: number = 400; // constant
  private placeholderMinLength: number = 400; // constant
  private selectedPlaceholderWidth: number = 400; // used for calculation of available space to put furniture in
  private selectedPlaceholderLength: number = 400; // used for calculation of available space to put furniture in
  private selectedProduct: string; // product that has been selected in question component modal and should appear in 3D view
  private assetsFolderPath: string ='../../../assets/'; // shortcut for assets folder

  constructor() { }

  setCurrentQuestionNumber = ( questionNo:number ):void => {
    this.currentQuestionNo = Number(questionNo);
  }

  setTotalQuestionNumber = ( questionNo:number ):void => {
    this.totalQuestionNo = Number(questionNo);
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
    return this.currentQuestionNo;
  }

  getTotalQuestionNo = ():number => {
    return this.totalQuestionNo;
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

  getAssetsFolderPath = ():string => {
    return this.assetsFolderPath;
  }

}
