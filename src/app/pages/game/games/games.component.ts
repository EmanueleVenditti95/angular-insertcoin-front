import { Component, OnInit } from '@angular/core';
import { GameService } from '../../../services/game.service';
import { Game } from '../../../model/game';
import { Router } from '@angular/router';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss'
})

export class GamesComponent implements OnInit {

  games?: Game[];

  // Il costruttore prende un'istanza di GameService come dipendenza, utilizzando la Dependency Injection di Angular.
  // Questo servizio sarà usato per recuperare i dati dei giochi.
  constructor(
    private gameService: GameService,
    private router: Router
  ) { }

  // Questo metodo viene eseguito al momento dell'inizializzazione del componente. 
  // Utilizza il gameService per ottenere i giochi.getGames() restituisce un Observable, al quale ci si sottoscrive (subscribe).
  ngOnInit(): void {
    this.getGames();
  }

  getGames() {
    this.gameService.getGames().subscribe((data: any) => {
      this.games = data._embedded.giochi;
    })
  }

  // deleteGame(id?:number): void {
  //   this.gameService.deleteGame(id).subscribe(
  //     response => {
  //       console.log('Gioco cancellato:', response);
  //       this.games = this.games?.filter(game => game.id !== id);
  //     },
  //     error => {
  //       console.error('Errore durante la cancellazione:', error);
  //     }
  //   );
  // }   
}
