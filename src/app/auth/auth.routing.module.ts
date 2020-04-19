import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';

import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';

const routes: Routes =[
    {path: 'signup',component: SignUpComponent},
  {path: 'login',component: LogInComponent},
]


@NgModule({
    imports:[
        RouterModule.forChild(routes)
    ],
    exports : [RouterModule]

})
export class AuthRoutingModule{}