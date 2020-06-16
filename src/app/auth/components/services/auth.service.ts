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
  LOGIN_SERVER = "http://localhost:8080/users/";
//This variable tracks the user's authentication state. 
//false means the user is not authenticated yet.
 authSubject  =  new  BehaviorSubject(false);

 
private currentUserSubject: BehaviorSubject<User>;
public currentUser: Observable<User>;

  constructor(private httpClient: HttpClient, ) { 
    
this.currentUserSubject = new BehaviorSubject<User>
(JSON.parse(localStorage.getItem('currentUser')));
this.currentUser = this.currentUserSubject.asObservable();
  }

  signIn(email: string, password: string){
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa(`${email}:${password}`));
    let getInfo = this.httpClient.get<any>(this.LOGIN_SERVER, {headers: headers});
     return getInfo.pipe(
      map(user => {

         // let x =JSON.stringify(Object.values(user)) FOR TESTING X VALUES
        // alert(x.indexOf(`\"email\":\"${email}\"`));  for DEBUG
        for(let y in user){
          let i = JSON.stringify((user[y])); //Represent the string iteration through the key & values of the whole object.
          // alert(i); //for DEBUG
          if(i.indexOf(`\"email\":\"${email}\"`) !== -1){
            localStorage.setItem('currentUser', JSON.stringify(i)); //stringify: takes an object and change it to a string.
            i = JSON.parse(localStorage.getItem('currentUser')); //parse: takes a string and  change it to an object.
        
            return i;  //return i to use as currentUser in the localStorage.
          }
        else{console.log("USER WASN'T FOUND IN THE OBJECT")}
        }
        // alert()); //index value of "email":"{email}"
       

        if (user) {
          user.authdata = btoa(`${email}:${password}`);
          // for (property in user){}
          } 
        
      })
    );
  }

  
// updateUserInfo():Observable<any>{
//   let numID = AccountSettingsComponent.prototype.strToArray[0].substr(11,AccountSettingsComponent.prototype.strToArray[0].length-1);
//   return 
//   // this.http.put<any>(this.LOGIN_SERVER+[this.ID])
// }

  signOut() {
       localStorage.removeItem('currentUser');
  }

  isAuthenticated() {
    if (JSON.parse(localStorage.getItem('currentUser'))){
      return true;
    }
  }

}
