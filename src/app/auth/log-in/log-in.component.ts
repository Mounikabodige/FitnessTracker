import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthService } from '../auth.service';
import { UIService } from '../../shared/ui.service';
import  * as fromRoot from './../../app.reducer';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  loginForm : FormGroup;
  isLoading$ : Observable<boolean>;

  constructor(private authService: AuthService,
    private uiService : UIService,
    private store : Store< fromRoot.State>) { }


  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    // this.loadingSubs = this.uiService.loadingStateChanged
    // .subscribe(isLoading =>{
    //   this.isLoading = isLoading;
    // });
    
    this.loginForm = new FormGroup({
      email : new FormControl('',{validators:[Validators.required,Validators.email]}),
      password: new FormControl('',{validators:[ Validators.required]}),
    });
  }


  onSubmit(){
      this.authService.login({
        email :this.loginForm.value.email,
        password :this.loginForm.value.password
      });
    }

}
