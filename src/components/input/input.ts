import { Component, Input, OnInit } from '@angular/core';
/**
 * Generated class for the InputComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'my-input',
  templateUrl: 'input.html'
})
export class InputComponent implements OnInit{
  @Input() label: string;
  @Input() placeholder: string;
  @Input() descripcion: string;
  @Input() id: string;
  @Input() default: string;
  @Input() habilitado: boolean;
  @Input() requerido: boolean;
  @Input() bloqueado: boolean;
  @Input() mascara: any;
  @Input() valor: string;
  @Input() error: string;


  constructor() {
  }
  ngOnInit(){
    //this.valor = this.default;
  }
  ngAfterViewinit(){
    
  }
}
