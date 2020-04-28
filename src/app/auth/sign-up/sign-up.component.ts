import { Component, OnInit ,OnDestroy} from '@angular/core';
import { NgForm } from '@angular/forms';
import {Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthService } from '../auth.service';
import { UIService } from 'src/app/shared/ui.service';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit ,OnDestroy{
  maxDate;
  isLoading = false;
  private loadingSubs: Subscription;

  constructor(private authService:AuthService,
    private uiService: UIService,
    private store : Store<fromRoot.>) { }

  ngOnInit(): void {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading =>
      {
        this.isLoading = isLoading;

        });
    this.maxDate =new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }
  onSubmit(form: NgForm)
  {
   this.authService.registerUser({
     email: form.value.email,
     password: form.value.password
   });
  }
  ngOnDestroy(){
    if(this.loadingSubs){
    this.loadingSubs.unsubscribe();
    }
  }

}
