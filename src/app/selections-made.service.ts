import { Injectable } from '@angular/core';

@Injectable()
export class SelectionsMadeService {

  private data = {
    roomWidth: 2000,
    roomLength: 2000,
    doorPosition: 'Left',
    doorOpeningType: 'Inwards',
    tubWidth: 700,
    tubLength: 1700,
    tubPosition: 'Left Bottom',
    selectedProducts: []
  }

  constructor() { }

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

  setDoorOpeningType = (doorOpeningType: string):void => {
    this.data.doorOpeningType = doorOpeningType;
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

  getDoorOpeningType = ():string => {
    return this.data.doorOpeningType;
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

}
