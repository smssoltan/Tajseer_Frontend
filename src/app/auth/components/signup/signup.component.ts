import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink, ROUTES, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  showMe=true;
  showMeNot=false;

  orgForm(){
    this.showMe=false
    this.showMeNot=true
  }

  userForm(){
    this.showMeNot=false;
    this.showMe=true;
  }

  model:SignupViewModel = {

    fullName:'',
    email:'',
    password:'',
    natID:null,
    dob:'',
    pNum:'',
    address:'',
    contactNum: ''  }
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
  }

}

export interface SignupViewModel {
  fullName:string;
  email:string;
  password:string;
  natID: number;
  dob: string;
  pNum: string;
  address: string;
  contactNum: string;

}
