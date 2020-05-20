import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from './user';



@Injectable({
  providedIn: 'root'
})
export class AuthService {


//variable that holds the address of the authentication server.
  AUTH_SERVER = "http://localhost:8080/users/addUser";
  LOGIN_SERVER = "http://localhost:8080/users";

//This variable tracks the user's authentication state. 
//false means the user is not authenticated yet.
 authSubject  =  new  BehaviorSubject(false);

  constructor(private http: HttpClient) { }

  signIn(email: string, password: string){
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa(`${email}:${password}`));

     return this.http.get<any>(this.LOGIN_SERVER, {headers: headers}).pipe(
      map(user => {

        if (user) {
          user.authdata = btoa(`${email}:${password}`);
          localStorage.setItem('currentUser', JSON.stringify(user));
          user = JSON.parse(localStorage.getItem('currentUser'));
        }
        return user;
      })
    );
  }

  signOut() {
       localStorage.removeItem('currentUser');
  }

  isAuthenticated() {
    if (JSON.parse(localStorage.getItem('currentUser')))
      return true;
  }

}
