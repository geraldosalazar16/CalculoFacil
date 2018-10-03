import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CommonModule } from '@angular/common';

import { IonicModule } from 'ionic-angular';

import { InputComponent } from './input/input';
import { BotonComponent } from './boton/boton';
import { SelectComponent } from './select/select';
import { MyDatetimeComponent } from './my-datetime/my-datetime';
import { MyToggleComponent } from './my-toggle/my-toggle';
import { MyPComponent } from './my-p/my-p';

import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
	declarations: [InputComponent,
    BotonComponent,
    SelectComponent,
    MyDatetimeComponent,
    MyToggleComponent,
    MyPComponent,],
	imports: [CommonModule, IonicModule,BrMaskerModule],
	exports: [InputComponent,
    BotonComponent,
    SelectComponent,
    MyDatetimeComponent,
    MyToggleComponent,
    MyPComponent,],
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	  ]
})
export class ComponentsModule {}
