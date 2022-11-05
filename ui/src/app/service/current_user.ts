import {Injectable} from '@angular/core';


@Injectable()

export class SharedService {

  SeqNr:number = 0;

  constructor() {}

  setValue(value:number){
   this.SeqNr = value;
  }

  getValue(){
   return this.SeqNr;
  }
}