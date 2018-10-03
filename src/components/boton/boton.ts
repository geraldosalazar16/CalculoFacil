import { Component, Input } from '@angular/core';

/**
 * Generated class for the BotonComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'boton',
  templateUrl: 'boton.html'
})
export class BotonComponent {

  @Input() nombre: string;
  @Input() descripcion: string;
  @Input() id: string;
  @Input() color: string;
  @Input() url: string;
  @Input() habilitado: boolean;
  @Input() accion: string;

  constructor() {

  }
  click(){
    //Llamada a la url
  }
}
