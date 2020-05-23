import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/components/services/auth.service';
import { User } from './auth/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tajseer-Watheq-app';
  home = "الصفحة الرئيسية";
  signUp ="التسجيل"
  signIn ="تسجيل الدخول"
  signOut = "تسجيل خروج"
  @Input() public isUserLoggedIn: boolean;
  @Input() public isUserLoggedOut: boolean;
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthService
    ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }
    
     
    logout() {
    this.authenticationService.signOut();
    this.router.navigate(['/login']);
    }
  }
  
