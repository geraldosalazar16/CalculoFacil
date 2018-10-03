import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

/**
 * Generated class for the MyToggleComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'my-toggle',
  templateUrl: 'my-toggle.html'
})
export class MyToggleComponent implements OnInit{

  @Input() label: string;
  @Input() descripcion: string;
  @Input() id: string;
  @Input() valores: any[]; 
  @Input() default: any; //El valor del componente
  @Input() habilitado: boolean;
  @Input() requerido: boolean;
  @Input() valor: boolean;
  @Input() error: string;

  @Output() evento = new EventEmitter();

  constructor() {

  }
  ngOnInit(){
    //this.valor = <boolean>this.default;
  }
  cambio(){
    this.evento.emit(this.valor);
  }
}
