import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../components/Models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

//variable that holds the address of the authentication server.
AUTH_SERVER = "http://localhost:8080/users/addUser";
LOGIN_SERVER = "http://localhost:8080/users/";
headers = new HttpHeaders({
  'Content-Type': 'application/json'
});
user$:string;
users_id: number;

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

  login(email: string, password: string){
  this.headers = this.headers.append('Authorization', 'Basic ' + btoa(`${email}:${password}`));
  let getInfo = this.httpClient.get<any>(this.LOGIN_SERVER, {headers: this.headers});
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

  logOut() {
       localStorage.removeItem('currentUser');
  }

  getRole(){
    if (JSON.parse(localStorage.getItem('currentUser')))
      this.user$=JSON.parse(localStorage.getItem('currentUser')).roleName;
      return this.user$;
  }

  getUserId(){
    if (JSON.parse(localStorage.getItem('currentUser')))
      this.users_id=JSON.parse(localStorage.getItem('currentUser')).users_id;
    return this.users_id;
  }

  isAuthenticated() {
    if (JSON.parse(localStorage.getItem('currentUser'))){
      return true;
    }
  }

}


