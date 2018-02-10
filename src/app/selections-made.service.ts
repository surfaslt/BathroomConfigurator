import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";

@Injectable()
export class SelectionsMadeService {

  private currentQuestion: number = 1;
  private progress: number = 25;
  private numberOfPages: number = 6;
  private doorWidth: number = 762;
  private doorHeight: number = 1981;
  private placeholderMinWidth: number = 400;
  private placeholderMinLength: number = 400;

  private data = {
    roomWidth: 2000,
    roomLength: 2000,
    doorPosition: 'Left',
    tubWidth: 700,
    tubLength: 1700,
    tubPosition: 'Left Bottom'
  }

  constructor() { }

  setCurrentQuestionNumber( questionNo:number ):void {
    this.currentQuestion = questionNo;
  }

  setProgress( pageNo:number ):void {
    this.progress = pageNo / this.numberOfPages * 100;
  }

  setData( data ):void {
    this.data = data;
  }

  setRoomWidth(width: number):void {
    this.data.roomWidth = +width;
  }

  setRoomLength(length: number):void {
    this.data.roomLength = +length;
  }

  setDoorPosition(doorPosition: string):void {
    this.data.doorPosition = doorPosition;
  }

  setTubWidth(width: number):void {
    this.data.tubWidth = width;
  }

  setTubLength(length: number):void {
    this.data.tubLength = length;
  }

  setTubPosition(tubPosition: string):void {
    this.data.tubPosition = tubPosition;
  }

  getCurrentQuestionNo():number {
    return this.currentQuestion;
  }

  getProgress():number {
    return Math.round(this.progress);
  }

  getData():object {
    return this.data;
  }

  getRoomWidth():number {
    return this.data.roomWidth;
  }

  getRoomLength():number {
    return this.data.roomLength;
  }

  getDoorPosition():string {
    return this.data.doorPosition;
  }

  getTubWidth():number {
    return this.data.tubWidth;
  }

  getTubLength():number {
    return this.data.tubLength;
  }

  getTubPosition():string {
    return this.data.tubPosition;
  }

  getDoorWidth():number {
    return this.doorWidth;
  }

  getDoorHeight():number {
    return this.doorHeight;
  }

  getPlaceholderMinWidth():number {
    return this.placeholderMinWidth;
  }

  getPlaceholderMinLength():number {
    return this.placeholderMinLength;
  }

}
