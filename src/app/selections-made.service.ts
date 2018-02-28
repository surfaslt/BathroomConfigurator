import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";

@Injectable()
export class SelectionsMadeService {

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

  private data = {
    roomWidth: 2000,
    roomLength: 2000,
    doorPosition: 'Left',
    tubWidth: 700,
    tubLength: 1700,
    tubPosition: 'Left Bottom'
  }

  constructor() { }

  setCurrentQuestionNumber = ( questionNo:number ):void => {
    this.currentQuestion = Number(questionNo);
  }

  setProgress = ( pageNo:number ):void => {
    this.progress = Number(pageNo) / this.numberOfPages * 100;
  }

  setData = ( data ):void => {
    this.data = data;
  }

  setRoomWidth = (width: number):void => {
    this.data.roomWidth = Number(width);
  }

  setRoomLength = (length: number):void => {
    this.data.roomLength = Number(length);
  }

  setDoorPosition = (doorPosition: string):void => {
    this.data.doorPosition = doorPosition;
  }

  setTubWidth = (width: number):void => {
    this.data.tubWidth = Number(width);
  }

  setTubLength = (length: number):void => {
    this.data.tubLength = Number(length);
  }

  setTubPosition = (tubPosition: string):void => {
    this.data.tubPosition = tubPosition;
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

  getCurrentQuestionNo = ():number => {
    return this.currentQuestion;
  }

  getProgress = ():number => {
    return Math.round(this.progress);
  }

  getData = ():object => {
    return this.data;
  }

  getRoomWidth = ():number => {
    return this.data.roomWidth;
  }

  getRoomLength = ():number => {
    return this.data.roomLength;
  }

  getDoorPosition = ():string => {
    return this.data.doorPosition;
  }

  getTubWidth = ():number => {
    return this.data.tubWidth;
  }

  getTubLength = ():number => {
    return this.data.tubLength;
  }

  getTubPosition = ():string => {
    return this.data.tubPosition;
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

}
