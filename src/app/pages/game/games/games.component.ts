import { Component, Input, OnInit } from '@angular/core';
import { GameService } from '../../../services/game.service';
import { Game } from '../../../model/game';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss'
})

export class GamesComponent implements OnInit {

  categoryId?: number;
  games: Game[] = [];
  pageTitle: String = '';

  constructor(
    private gameService: GameService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  // Questo metodo viene eseguito al momento dell'inizializzazione del componente. 
  // Utilizza il gameService per ottenere i giochi.getGames() restituisce un Observable, al quale ci si sottoscrive (subscribe).
  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.categoryId = +params.get('categoryId')!;    
      if (this.categoryId !== null && this.categoryId > 0) {
        const category = this.getGamesByCategoryId(this.categoryId);
      } else {
        this.getGames();
        this.pageTitle = 'Lista giochi: '
      }
    });
  }

  getGames() {
    this.gameService.getGames().subscribe((data: any) => {
      this.games = data.giochi;  
    })
  }

  getGamesByCategoryId(id: number) {
    this.gameService.getGamesByCategoryId(id).subscribe((data: any) => {
      this.games = data.giochi;
      this.pageTitle = 'Lista giochi ' + this.games[0].categoria?.nome + ':';          
    })
  }

}
