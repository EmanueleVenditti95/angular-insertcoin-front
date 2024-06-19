import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private baseUrl = "http://localhost:9797/insertcoinsrest";

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
}
