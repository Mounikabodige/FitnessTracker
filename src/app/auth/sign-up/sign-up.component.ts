import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  maxDate;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
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

}
