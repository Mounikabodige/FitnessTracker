import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LogInComponent } from './auth/log-in/log-in.component';
import { TrainingComponent } from './training/training.component';


const routes: Routes = [
  {path: '',component: WelcomeComponent},
  {path: 'signup',component: SignUpComponent},
  {path: 'login',component: LogInComponent},
  {path: 'training',component: TrainingComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
