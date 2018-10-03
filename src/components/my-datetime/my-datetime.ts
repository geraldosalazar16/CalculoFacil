import { Component, Input, OnInit } from '@angular/core';

/**
 * Generated class for the MyDatetimeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'my-datetime',
  templateUrl: 'my-datetime.html'
})
export class MyDatetimeComponent implements OnInit{

  @Input() label: string;
  @Input() descripcion: string;
  @Input() id: string;
  @Input() default: any; //El valor del componente
  @Input() habilitado: boolean;
  @Input() requerido: boolean;
  @Input() valor: string;

  constructor() {
    
  }
  ngOnInit(){
    if(this.default && !this.valor)
      this.valor = new Date(this.default).toISOString();
    else
      this.valor = new Date(this.valor).toISOString();
  }
}
