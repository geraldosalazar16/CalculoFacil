import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { RestServiceProvider,ObjCalculo,Calculo } from '../../providers/rest-service/rest-service';
import { HomePage } from '../home/home';

/**
 * Generated class for the CalculosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-calculos',
  templateUrl: 'calculos.html',
})
export class CalculosPage {

  calculos;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private restProvider: RestServiceProvider) {
  }

  ionViewDidLoad() {
    this.restProvider.getCalculos().
    subscribe(calculos => {
      this.calculos = calculos;
    });
  }
  //Crear un nuevo cálculo
  crear_calculo(){
    this.navCtrl.push(HomePage,{data:''});
  }
  //Abre un cálculo
  abrir_calculo(calculo){
    this.navCtrl.push(HomePage,{data:calculo});
  }
}
