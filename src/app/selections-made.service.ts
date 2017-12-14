import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";

@Injectable()
export class SelectionsMadeService {

  private currentQuestion: number = 1;
  private progress: number = 25;
  private numberOfPages: number = 6;

  private data = {
    roomWidth: 2000,
    roomHeight: 2000,
    hasToilet: false,
    hasBath: false,
    hasShower: false,
    toiletType: '',
    bathType: '',
    showerType: ''
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

  setRoomHeight(height: number):void {
    this.data.roomHeight = height;
  }

  setHasToilet( has: boolean ):void {
    this.data.hasToilet = has;
  }

  setHasBath( has: boolean ):void {
    this.data.hasBath = has;
  }

  setHasShower( has: boolean ):void {
    this.data.hasShower = has;
  }

  setToiletType( type: string ):void {
    this.data.toiletType = type;
  }

  setBathType( type: string ):void {
    this.data.bathType = type;
  }

  setShowerType( type: string ):void {
    this.data.showerType = type;
  }

  getCurrentQuestionNo():number {
    return this.currentQuestion;
  }

  getProgress(): number {
    return Math.round(this.progress);
  }

  getData(): object{
    return this.data;
  }

  getRoomWidth():number {
    return this.data.roomWidth;
  }

  getRoomHeight():number {
    return this.data.roomHeight;
  }

  getHasToilet(): boolean {
    return this.data.hasToilet;
  }

  getHasBath(): boolean {
    return this.data.hasBath;
  }

  getHasShower(): boolean {
    return this.data.hasShower;
  }

  getToiletType(): string {
    return this.data.toiletType;
  }

  getBathType(): string {
    return this.data.bathType;
  }

  getShowerType(): string {
    return this.data.showerType;
  }

}
