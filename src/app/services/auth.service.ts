import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

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

  logIn(email?: string, password?: string): Observable<HttpResponse<any>> {
    return this.http.post(
      this.baseUrl + "/login", //URL
      { 
        username: email,      //BODY
        password: password
      }, 
      {                       //OPTIONS
      observe: 'response', // Observe the full response
      withCredentials: true
    });
  }

  saveUser(token: string, username: string): void {
    this.tokenStorage.saveToken(token);
    localStorage.setItem("username", username);
    this.loggedIn.next(true);
  }

  getToken(): string | null {
    return this.tokenStorage.getToken();
  }

  logOut(): void {
      this.tokenStorage.removeToken();
      localStorage.clear();
      this.loggedIn.next(false);
      console.log("Logout");    
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
}
