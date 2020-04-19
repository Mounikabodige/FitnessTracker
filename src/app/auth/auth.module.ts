import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from 'angularfire2/auth';


import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
declarations:[
    SignUpComponent,
    LogInComponent,],


imports:[
    SharedModule,
    ReactiveFormsModule,
    AngularFireAuthModule,

],
    
})
export class  AuthModule{

}