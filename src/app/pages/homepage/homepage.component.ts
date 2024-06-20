import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

  constructor(private readonly service : AuthService) {}
  
  isLogged?:boolean;
  username?:string;

  ngOnInit(): void {
    this.service.isLoggedIn().subscribe(loggedIn => {
      this.isLogged = loggedIn;
      if (loggedIn) {
        this.username = localStorage.getItem("username") as string;
      } else {
        this.username = '';
      }
    });
  }
}
