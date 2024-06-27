import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsoleService {

  private baseUrl = "http://localhost:9797/insertcoinsrest/api/consoles";

  constructor(private http: HttpClient) { }

  getConsoles(): Observable<Console[]> {
    return this.http.get<Console[]>(this.baseUrl);
  }
}
