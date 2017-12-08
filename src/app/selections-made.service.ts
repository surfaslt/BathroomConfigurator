import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";

@Injectable()
export class SelectionsMadeService {

  private data = {
    hasToilet: false,
    hasBath: false,
    hasShower: false,
    toiletType: '',
    bathType: '',
    showerType: ''
  }

  hasToiletChange: Subject<boolean> = new Subject<boolean>();
  hasBathChange: Subject<boolean> = new Subject<boolean>();
  hasShowerChange: Subject<boolean> = new Subject<boolean>();
  toiletTypeChange: Subject<string> = new Subject<string>();
  bathTypeChange: Subject<string> = new Subject<string>();
  showerTypeChange: Subject<string> = new Subject<string>();

  constructor() { }

  setData( data ) {
    this.data = data;
  }

  setHasToilet( has: boolean ){
    debugger;
    this.data.hasToilet = has;
    this.hasToiletChange.next(this.data.hasToilet);
  }

  setHasBath( has: boolean ){
    this.data.hasBath = has;
    this.hasBathChange.next(this.data.hasBath);
  }

  setHasShower( has: boolean ){
    this.data.hasShower = has;
    this.hasShowerChange.next(this.data.hasShower);
  }

  setToiletType( type: string ){
    this.data.toiletType = type;
    this.toiletTypeChange.next(this.data.toiletType);
  }

  setBathType( type: string ){
    this.data.bathType = type;
    this.bathTypeChange.next(this.data.bathType);
  }

  setShowerType( type: string ){
    this.data.showerType = type;
    this.showerTypeChange.next(this.data.showerType);
  }

  getData(): object{
    return this.data;
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
