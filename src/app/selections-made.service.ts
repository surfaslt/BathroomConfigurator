/**
 * This service holds all the selections made by the user.
 * This data is used by components that depend on previous users choices and the summary page component
 */
import { Injectable } from '@angular/core';

@Injectable()
export class SelectionsMadeService {

  private data = {
    roomWidth: 2000, // users bathroom width
    roomLength: 2000, // users bathroom length
    doorPosition: 'Left', // users selected door position
    doorOpeningType: 'Inwards', // users selected door opening type
    tubWidth: 700, // users selected tub width
    tubLength: 1700, // users selected tub length
    tubPosition: 'Left Bottom', // users selected tub position
    selectedProducts: [] // list of all furniture products selected by the user
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

  setSelectedProducts = (products):void => {
    this.data.selectedProducts = products;
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

  getSelectedProducts = () => {
    return this.data.selectedProducts;
  }

  addSelectedProduct = (product):void => {
    this.data.selectedProducts.push(product);
  }

  removeSelectedProduct = (product):void => {
    let prodIndex: number = this.data.selectedProducts.findIndex(product);
    this.data.selectedProducts = this.data.selectedProducts.splice(prodIndex, 1);
  }
}
