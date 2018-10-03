import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalPage } from './modal';

import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ModalPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ModalPage),
  ],
})
export class ModalPageModule {}
