import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  maxDate;

  constructor() { }

  ngOnInit(): void {
    this.maxDate =new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }
  onSubmit(form: NgForm)
  {
    console.log(form);
  }

}
