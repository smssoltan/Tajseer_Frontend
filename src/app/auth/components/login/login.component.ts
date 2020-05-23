import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {AppComponent} from '../../../app.component'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error = false;

  constructor(private formBuilder: FormBuilder, //private authService: AuthenticationService,
     private router: Router, private route: ActivatedRoute,
     private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.authService.signOut();

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
}
// for accessing to form fields

get form() {
  return this.loginForm.controls;
}

// login(form){
//   console.log(form.value);
//   this.authService.signIn(form.value).subscribe((res)=>{
//     console.log("Logged in!");
//     this.router.navigateByUrl('');
//   });    
// }

handleLogin() {
  this.authService.signIn(this.form.email.value, this.form.password.value).subscribe(
    result => {
      alert("حياك الله، تم تسجيل دخولك بنجاح.")
      this.router.navigate([this.returnUrl]);
      AppComponent.prototype.isUserLoggedIn =true ;
      AppComponent.prototype.isUserLoggedOut =true;
      console.log("User is Login status = "+AppComponent.prototype.isUserLoggedIn);
      
    }, error => {
      this.error = true;
      alert("ERROR")
    }
  )
}

  
}
