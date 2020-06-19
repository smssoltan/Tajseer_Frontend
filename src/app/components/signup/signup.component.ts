import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink, ROUTES, Router } from '@angular/router';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  showMe=true;
  showMeNot=false;
  firstElement = document.getElementById("org")
  secondElement = document.getElementById("user");

  orgForm(){
    this.showMe=false
    this.showMeNot=true
    // SignupViewModel.authValues ={
    // valueName: "ROLE_ORG",
    // valueNum: 3};
    

    // console.log("THE AUTH NAME IS "+this.authValues);
    
  }

  userForm(){
    this.showMeNot=false;
    this.showMe=true;
    
  //  this.authValues ={
  //   valueName: "ROLE_USER",
  //   valueNum: 2};
    // console.log("THE AUTH NAME IS "+this.authValues);
    
  }

  // model:authorityModel ={
  //   authName:'',
  //   authID: null
  // },

  model:SignupViewModel = {

    fullName:'',
    email:'',
    password:'',
    natID:null,
    dob:'',
    pNum:'',
    address:'',
    contactNum: '',
    // authValues: ''
    authority:{authName:"", authID:null},
    //  a(){if(SignupComponent.prototype.orgForm.call){}}
    }

  

  constructor( private http: HttpClient,
    private router: Router
    ) { }

  ngOnInit(): void {
  }


  sendSignup():void{

    let url = "http://localhost:8080/users/addUser";
    this.http.post(url, this.model).subscribe(
      res => 
      {console.log("post completed!");
      
        this.router.navigate(['/login'])
      
      }, 
      err => {
        alert("error")
      }
    );
    // alert(this.model.fullName+'\n'+
    //   this.model.email+'\n'+
    //   this.model.password+'\n'+
    //   this.model.natID+'\n'+
    //   this.model.dob+'\n'+
    //   this.model.pNum+'\n'+
    //   this.model.address+'\n'+
    //   this.model.contactNum)
    alert("مرحباً "+
    this.model.fullName+"."+"\n \n"+
    "تم تسجيلك بنجاح")
    // alert(this.valueName);
  }

}

import {authorityModel} from "./authority.model"

export interface SignupViewModel {
  fullName:string;
  email:string;
  password:string;
  natID: number;
  dob: string;
  pNum: string;
  address: string;
  contactNum: string;
  authority: authorityModel
}


// export interface authValues {authName: string;
  
//   authNum:number};
