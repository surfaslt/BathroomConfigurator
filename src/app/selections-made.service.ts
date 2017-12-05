import { Injectable } from '@angular/core';

@Injectable()
export class SelectionsMadeService {

  toilet: boolean = false;
  typeOfToilet: string = '';

  bath: boolean = false;
  typeOfBath: string = '';

  shower: boolean = false;
  typeOfShower: string = '';

  constructor() { }

}
