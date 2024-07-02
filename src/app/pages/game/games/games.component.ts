import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { GameService } from '../../../services/game.service';
import { Game } from '../../../model/game';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../model/user';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss'
})

export class GamesComponent implements OnInit {

  isLoading: boolean = true;
  pageTitle: String = '';
  urlSearch?: string;

  categoryId?: number;
  urlCategory?: string;

  games: Game[] = [];
  gameName: string = "";

  consoleId: number = 0;
  consoleName?: string;

  constructor(
    private gameService: GameService,
    private userService: AuthService,
    public router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.categoryId = +params.get('categoryId')!;
      this.gameName = params.get('gameName')!;
      this.consoleId = +params.get('consoleId')!; 
      this.consoleName = params.get('consoleName')!; 
      
      if (this.categoryId && this.categoryId > 0) {
        const category = this.getGamesByCategoryId(this.categoryId);
        this.urlCategory = `/games/category/${this.categoryId}`
      } else if (this.gameName != '' && this.gameName) {
        this.searchGames();
        this.urlSearch = `/games/search/${this.gameName}`
      } else if (this.consoleId && this.consoleId > 0) {
        this.getGamesByConsoleId(this.consoleId)
      } else if (params.get('favorites') != null) {
        this.getFavoritesGames();
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

  getFavoritesGames() {
    this.userService.getUser(this.userService.getUsername()).subscribe(data => {
      this.isLoading = false;
      this.games = data.giochi as Game[];         
    })
  }

  getGamesByCategoryId(id: number) {
    this.gameService.getGamesByCategoryId(id).subscribe((data: any) => {
      this.isLoading = false;
      this.games = data.giochi;
      this.pageTitle = 'Lista giochi ' + this.games[0].categoria?.nome + ':';          
    })
  }

  getGamesByConsoleId(id:number) {
    this.gameService.getGamesByConsoleId(id).subscribe((data: any) => {
      this.isLoading = false;
      this.games = data.giochi;
      this.pageTitle = 'Lista giochi per "' + this.consoleName + '" :';
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
