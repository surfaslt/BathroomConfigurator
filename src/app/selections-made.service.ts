import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";

@Injectable()
export class SelectionsMadeService {

  private currentQuestion: number = 1;
  private progress: number = 25;
  private numberOfPages: number = 6;

  private data = {
    roomWidth: 2000,
    roomLength: 2000,
    doorPosition: 'Left',
    tubWidth: 700,
    tubLength: 1700,
    tubPosition: 'Left Bottom',
    hasToilet: false,
    toiletType: ''
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
    this.data.roomWidth = width;
  }

  setRoomLength(length: number):void {
    this.data.roomLength = length;
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

  setHasToilet( has: boolean ):void {
    this.data.hasToilet = has;
  }

  setToiletType( type: string ):void {
    this.data.toiletType = type;
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

  getHasToilet():boolean {
    return this.data.hasToilet;
  }

  getToiletType():string {
    return this.data.toiletType;
  }

}
