import { Component,
ViewChildren,
QueryList,
AfterViewInit } from '@angular/core';
import { IonicPage, 
  NavController, 
  NavParams,
  ViewController } from 'ionic-angular';

import { Componente } from '../../app/models/componente.model';

import { InputComponent } from '../../components/input/input';
import { MyDatetimeComponent } from '../../components/my-datetime/my-datetime';
import { MyToggleComponent } from '../../components/my-toggle/my-toggle';
import { SelectComponent } from '../../components/select/select';

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage implements AfterViewInit{

  componentes: Array<Componente> = [];

  @ViewChildren(InputComponent) inputs: QueryList<InputComponent>;
  @ViewChildren(MyDatetimeComponent) datetimes: QueryList<MyDatetimeComponent>;
  @ViewChildren(MyToggleComponent) toggles: QueryList<MyToggleComponent>;
  @ViewChildren(SelectComponent) selects: QueryList<SelectComponent>;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private view: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
  }
  ionViewWillLoad(){
    this.componentes = this.navParams.get('componentes');
  }
  closeModal(){    
    this.view.dismiss();
  }
  salvarModal(){
    var val;
    this.inputs.forEach(input => {
      val = input.valor;
      this.actualizar_componente(input,val)
    });
    this.datetimes.forEach(datetime => {
      val = datetime.valor;
      this.actualizar_componente(datetime,val)
    });
    this.toggles.forEach(toggle => {
      val = toggle.valor;
      this.actualizar_componente(toggle,val)
    });
    this.selects.forEach(select => {
      val = select.valor;
      this.actualizar_componente(select,val)
    });
    this.view.dismiss(this.componentes);
  }
  ngAfterViewInit(){

  }
  actualizar_componente(comp,valor){
    this.componentes.forEach(componente => {
      if(componente.id == comp.id){
        componente.valor = valor;
        return;
      }
    });
  }
}
