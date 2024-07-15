import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) { }

  private baseUrl = "http://localhost:9797/insertcoinsrest";
  private loggedIn = new BehaviorSubject<boolean>(this.tokenStorage.getToken() !== null);

  logIn(username?: string, password?: string): Observable<HttpResponse<any>> {
    return this.http.post(
      this.baseUrl + "/login", //URL
      { 
        username: username,      //BODY
        password: password
      }, 
      {                       //OPTIONS
      observe: 'response', // Observe the full response
      withCredentials: true
    });
  }

  registerUser(user : User) {
    return this.http.post(this.baseUrl + "/api/utenti/inserimento",user)
  }

  saveUser(token: string, username: string): void {
    this.tokenStorage.saveToken(token);
    sessionStorage.setItem("username", username);
    this.loggedIn.next(true);
  }

  getUsername() :string | null {
    return this.tokenStorage.getUsername();
  }

  getUser(username: string | null) : Observable<User> {
    return this.http.get(this.baseUrl + "/api/utenti/" + username);
  }

  getToken(): string | null {
    return this.tokenStorage.getToken();
  }

  logOut(): void {
      this.tokenStorage.removeToken();
      sessionStorage.clear();
      this.loggedIn.next(false);
      console.log("Logout");    
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
}
