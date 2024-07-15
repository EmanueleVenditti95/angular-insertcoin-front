import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  private accessToken = 'access_token';

  saveToken(token: string): void {
    if (this.isBrowser()) {
      sessionStorage.setItem(this.accessToken, token);
    }
  }

  getToken(): string | null {
    if (this.isBrowser()) {
      return sessionStorage.getItem(this.accessToken);
    }
    return null;
  }

  removeToken(): void {
    if (this.isBrowser()) {
      sessionStorage.removeItem(this.accessToken);
    }
  }

  getUsername() :string | null {
    let username:string | null = null;
    
    if (this.isBrowser())
      username = sessionStorage.getItem("username");

    return username;
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof sessionStorage !== 'undefined';
  }
}
