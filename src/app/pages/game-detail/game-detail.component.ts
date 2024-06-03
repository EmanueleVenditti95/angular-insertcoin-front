import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Game } from '../../model/game';
import { GameService } from '../../services/game.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrl: './game-detail.component.scss'
})
export class GameDetailComponent implements OnInit{
  
  game?: Game;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly gameService: GameService,
    private readonly router: Router,
    private sanitizer: DomSanitizer
  ) { }

  getVideoUrl(game?: Game): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${game?.video}`);
  }
  
  ngOnInit(): void {
     this.route.params.pipe(
       switchMap(params => this.gameService.getGame(params['id'])),

       catchError(err => {
         this.router.navigate(['/']);
         throw err;
       }),

       map((game: Game) => this.game = game)
     )
     .subscribe();
     console.log(this.game);
     
  }
}
