import { Component, Input } from '@angular/core';

/**
 * Generated class for the MyPComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'my-p',
  templateUrl: 'my-p.html'
})
export class MyPComponent {

  @Input() label: string;
  @Input() descripcion: string;
  @Input() id: string;
  @Input() valores: any[]; 
  @Input() default: any; //El valor del componente
  @Input() habilitado: boolean;
  @Input() valor: string;

  constructor() {
    if(this.default)
      this.valor = this.default;
  }

}
