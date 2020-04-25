import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {StoreModule } from '@ngrx/store';

import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';

import { AngularFireModule } from 'angularfire2';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module'
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { AuthService } from './auth/auth.service';
import { TrainingService } from './training/training.service';
import { environment } from '../environments/environment';
import { UIService } from './shared/ui.service';
import { AuthRoutingModule } from './auth/auth.routing.module';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { appReducer } from  './app.reducer';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AuthModule,
    SharedModule,
    AuthRoutingModule,
    AngularFirestoreModule,
    StoreModule.forRoot({ui: appReducer}),
  ],

  providers: [AuthService,TrainingService,UIService],
  bootstrap: [AppComponent],
})
export class AppModule { }
