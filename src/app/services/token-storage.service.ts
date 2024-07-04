import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  private accessToken = 'access_token';

  saveToken(token: string): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.accessToken, token);
    }
  }

  getToken(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem(this.accessToken);
    }
    return null;
  }

  removeToken(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.accessToken);
    }
  }

  getUsername() :string | null {
    let username:string | null = null;
    
    if (this.isBrowser())
      username = localStorage.getItem("username");

    return username;
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}
