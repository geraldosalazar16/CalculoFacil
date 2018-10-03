import { Component, Input, OnInit,  Output, EventEmitter } from '@angular/core';

/**
 * Generated class for the SelectComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'my-select',
  templateUrl: 'select.html'
})
export class SelectComponent implements OnInit{

  @Input() label: string;
  @Input() descripcion: string;
  @Input() id: string;
  @Input() valores: any[]; 
  @Input() default: any; //El valor del componente
  @Input() habilitado: boolean;
  @Input() requerido: boolean;
  @Input() bloqueado: boolean;
  @Input() valor: string;
  @Input() error: string;

  @Output() cambio_select = new EventEmitter();

  constructor() {
    if(this.valor && !this.default){
      this.default = this.valor;
    }
    if(!this.valor && this.default){
      this.valor = this.default;
    }
  }
  ngOnInit(){
    
  }
  cambio(){
    this.cambio_select.emit(this.valor);
  }
}
