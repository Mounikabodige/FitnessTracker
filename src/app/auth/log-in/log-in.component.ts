import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { UIService } from '../../shared/ui.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit,OnDestroy {
  loginForm : FormGroup;
  isLoading = false;
  private loadingSubs : Subscription;

  constructor(private authService: AuthService,
    private uiService : UIService) { }


  ngOnInit(): void {
    this.loadingSubs = this.uiService.loadingStateChanged
    .subscribe(isLoading =>{
      this.isLoading = isLoading;
    });
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


    ngOnDestroy() {
      if(this.loadingSubs){
      this.loadingSubs.unsubscribe();
      }
    }
}
