import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Game } from '../../model/game';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss'
})

export class GamesComponent implements OnInit {

  games?: Game[];

  // Il costruttore prende un'istanza di GameService come dipendenza, utilizzando la Dependency Injection di Angular.
  // Questo servizio sarà usato per recuperare i dati dei giochi.
  constructor(private gameService: GameService) { }

  // Questo metodo viene eseguito al momento dell'inizializzazione del componente. 
  // Utilizza il gameService per ottenere i giochi.getGames() restituisce un Observable, al quale ci si sottoscrive (subscribe).
  ngOnInit(): void {
    this.gameService.getGames().subscribe((data: any) => {
      this.games = data._embedded.giochi;
      console.log(this.games);
    })
  }

}
