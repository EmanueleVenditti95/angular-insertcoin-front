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

  isLoading: boolean = true;
  categoryId?: number;
  games: Game[] = [];
  pageTitle: String = '';
  urlCategory?: string;
  gameName: string = "";
  urlSearch?: string;

  constructor(
    private gameService: GameService,
    public router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.categoryId = +params.get('categoryId')!;
      this.gameName = params.get('nome')!;  

      if (this.categoryId && this.categoryId > 0) {
        const category = this.getGamesByCategoryId(this.categoryId);
        this.urlCategory = `/games/category/${this.categoryId}`
      } else if (this.gameName != '' && this.gameName) {
        this.searchGames();
        this.urlSearch = `/games/search/${this.gameName}`
      } else {
        this.getGames();
        this.pageTitle = 'Lista giochi: '
      }
    });
  }

  getGames() {
    this.gameService.getGames().subscribe((data: any) => {
      this.isLoading = false;
      this.games = data.giochi;  
    })
  }

  getGamesByCategoryId(id: number) {
    this.gameService.getGamesByCategoryId(id).subscribe((data: any) => {
      this.isLoading = false;
      this.games = data.giochi;
      this.pageTitle = 'Lista giochi ' + this.games[0].categoria?.nome + ':';          
    })
  }

  searchGames() {
    this.gameService.searchGame(this.gameName).subscribe((data : any) => {
      this.isLoading = false;
      this.games = data.giochi;
      const input = this.gameName;
      this.pageTitle = 'Risultati per "' + input + '" :';
      this.gameName = ""; 
    })   
  }

  navigateTo(input : string) {
    let url = `games/search/${input}`;
    this.router.navigateByUrl(url);
  }

}
