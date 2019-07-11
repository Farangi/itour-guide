import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlertComponent } from './alert';

@NgModule({
  declarations: [
    AlertComponent,
  ],
  imports: [
    IonicPageModule.forChild(AlertComponent),
  ],
  exports: [
    AlertComponent
  ]
})
export class LoginPageModule {}
