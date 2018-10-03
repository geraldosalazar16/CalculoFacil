import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import PNotify from 'pnotify/dist/es/PNotify';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons';
/*
  Generated class for the PnotifyProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PnotifyProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PnotifyProvider Provider');
  }
  getPNotify() {
    PNotifyButtons; // Initiate the module. Important!
    return PNotify;
  }
}
