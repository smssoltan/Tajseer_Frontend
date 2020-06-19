import { Component, OnInit } from '@angular/core';
import { User } from '../auth/components/Models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SignupViewModel } from '../auth/components/signup/signup.component';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  currentUser = localStorage.getItem("currentUser");
  // y=this.x.split("\\\"");
  noQuotation=this.currentUser.toString().replace(/\\/g, ""); //remove any (") char

  strToArray=this.noQuotation.split(",");    //from a string to an Array.
  nationalID=this.strToArray[6].substr(9,this.strToArray[6].length-10);     //from index #9 untill total length -10 chars.
  fullName=this.strToArray[1].substr(12,this.strToArray[1].length-13);
  phoneNumber=this.strToArray[3].substr(8,this.strToArray[3].length-9);
  numID = this.strToArray[0].substr(11,this.strToArray[0].length-1);
  emailExtracting=this.strToArray[4].substr(9,this.strToArray[4].length-10); //from index #9 untill total length -10 chars.
  passwordExtracted=this.strToArray[5].substr(12,this.strToArray[5].length-13)
  tempo=JSON.parse(localStorage.getItem('currentUser')).roleName;
  
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void { 
  }
  
  // userInterface: User
  // updateUserInfo(detail: User):void{
  //   let headers = new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   });
  //   let httpOptions = {
  //     headers: headers
  //   };
  
  
  //   console.log(this.numID);
  //   this.httpClient.put(`http://localhost:8080/users/${this.numID}`, JSON.stringify(detail), httpOptions).subscribe(
  //     data => {Name: this.userInterface.fullName; Email: this.userInterface.email; Password:this.userInterface.password; Phone:this.userInterface.pNum; DateOfBirth:this.userInterface.dob }
  //   );
  // }

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

  updateUserInfo():void{

    let url = "http://localhost:8080/users/";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    headers = headers.append('Authorization', 'Basic ' + btoa(`${this.emailExtracting}:123456Ms`));
    this.httpClient.put(url+this.numID+'/', this.model);
    

  }

}
