import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalculosPage } from './calculos';

@NgModule({
  declarations: [
    CalculosPage,
  ],
  imports: [
    IonicPageModule.forChild(CalculosPage),
  ],
})
export class CalculosPageModule {}
