import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { GameService } from '../../services/game.service';
import { Game } from '../../model/game';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

  constructor(
    private readonly service : AuthService,
    private readonly gameService : GameService,
    public router:Router
  ) {}
  
  isLogged?:boolean;
  isLoading?:boolean;
  username?:string;
  games:Game[] = [];

  ngOnInit(): void {
    this.getRandGames();
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

  getRandGames() {
    this.gameService.getRandGames().subscribe((data: any) => {
      this.isLoading = false;
      this.games = data.giochi;
    })
  }
}
