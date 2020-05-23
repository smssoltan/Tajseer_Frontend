import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../../user';
import { tap } from 'rxjs/operators';


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

 
private currentUserSubject: BehaviorSubject<User>;
public currentUser: Observable<User>;

  constructor(private httpClient: HttpClient) { 
    
this.currentUserSubject = new BehaviorSubject<User>
(JSON.parse(localStorage.getItem('currentUser')));
this.currentUser = this.currentUserSubject.asObservable();
  }

  signIn(email: string, password: string){
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa(`${email}:${password}`));

     return this.httpClient.get<any>(this.LOGIN_SERVER, {headers: headers}).pipe(
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

  login(email:string, password:string) {
    return this.httpClient.post<{access_token:  string}>('http://localhost:8080/users', {email, password}).pipe(tap(res => {
    localStorage.setItem('access_token', res.access_token);
}))
}

register(email:string, password:string) {
  return this.httpClient.post<{access_token: string}>('http://localhost:8080/users/addUser', {email, password}).pipe(tap(res => {
  this.login(email, password)
}))
}

logout() {
  localStorage.removeItem('access_token');
}

public get loggedIn(): boolean{
  return localStorage.getItem('access_token') !==  null;
}


  signOut() {
       localStorage.removeItem('currentUser');
  }

  isAuthenticated() {
    if (JSON.parse(localStorage.getItem('currentUser')))
      return true;
  }

}
