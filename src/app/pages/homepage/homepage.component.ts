import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

  constructor(
    private readonly service : AuthService,
    public router:Router
  ) {}
  
  isLogged?:boolean;
  username?:string;

  ngOnInit(): void {
    this.service.isLoggedIn().subscribe(loggedIn => {
      this.isLogged = loggedIn;
      if (loggedIn) {
        this.username = localStorage.getItem("username") as string;
        this.username = this.username.charAt(0).toUpperCase() + this.username.slice(1);
      } else {
        this.username = '';
      }
    });
  }
}
