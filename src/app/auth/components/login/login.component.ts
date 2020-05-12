import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string;
  password:string;

  constructor() { }

  ngOnInit(): void {
  }
  
  onLogin() {
    console.log(this.email);  // { first: '', last: '' }
    console.log(this.password);  // false
  }
}
