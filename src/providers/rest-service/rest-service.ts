import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { Observable } from 'rxjs/Observable';

/*
  Generated class for the RestServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestServiceProvider {

  constructor(public http: HttpClient) {
    //console.log('Hello RestServiceProvider Provider');
  }
  getEstructura(url) {
    return this.http.get(url);
  }
  getEstructuras(){
    return this.http.get<Estructura[]>('http://minotaria.net/base/angular/calculofacil/api_racoo/estructuras.php').toPromise();
  }
  getUrl(url,params){
    //return this.http.get(url,{params: {geraldo: '1'}});
    params.forEach(element => {
      element.error = "Error!";
    });
    var data = JSON.stringify(params);
    return this.http.get(url,{params: {data: data}});
    //return this.http.get(url,params);
    //return this.http.post(url,datos);
  }
  postData(url: string,data: any){
    return this.http.post(url,JSON.stringify(data));
  }
  getCalculos(){
    return this.http.get('http://minotaria.net/base/angular/calculofacil/api_racoo/calculos_guardados/leer_calculos.php');
  }
}
export interface Estructura {
  estructura: string;
  tipo: number;
  url: string;
  inicial: boolean;
}
export interface Calculo {
  nombre: string;
  data: ObjCalculo[];
}
export interface ObjCalculo {
  id: string;
  valor: any;
  error: string;
}