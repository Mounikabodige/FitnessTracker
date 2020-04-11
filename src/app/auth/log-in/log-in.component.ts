import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  loginForm : FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email : new FormControl('',{validators:[Validators.required,Validators.email]}),
      password: new FormControl('',{validators:[ Validators.required]}),
    });
  }
  onSubmit(){
      console.log(this.loginForm);
    }
}
