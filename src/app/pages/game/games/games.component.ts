import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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
  urlCategory?: string;
  gameName: string = "";

  constructor(
    private gameService: GameService,
    public router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.categoryId = +params.get('categoryId')!;    
      if (this.categoryId !== null && this.categoryId > 0) {
        const category = this.getGamesByCategoryId(this.categoryId);
        this.urlCategory = `/games/category/${this.categoryId}`
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

  searchGames() {
    this.gameService.searchGame(this.gameName).subscribe((data : any) => {
      this.games = data.giochi;
      const input = this.gameName;
      this.pageTitle = 'Risultati per "' + input + '" :';
      this.gameName = ""; 
    })   
  }

}
