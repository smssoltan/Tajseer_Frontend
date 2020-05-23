import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from '../../user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private AddUserURL = "http://localhost:8080/users/addUser"
  private GetAllUsersURL = "http://localhost:8080/users";
  private GetUserByIdURL = "http://localhost:8080/users/";
  private DeleteUserURL =  "http://localhost:8080/users/";

  constructor(private httpClient: HttpClient) { }

  addUser(user): Observable<User> {
    return this.httpClient.post<User>(this.AddUserURL, user);
  };

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.GetAllUsersURL);
  };

  getUserByID(userID: number): Observable<User> {
    return this.httpClient.get<User>(this.GetUserByIdURL + userID)
  };

  deleteUser(userID: number): Observable<User> {
    return this.httpClient.delete<User>(this.DeleteUserURL + userID);
  };

}