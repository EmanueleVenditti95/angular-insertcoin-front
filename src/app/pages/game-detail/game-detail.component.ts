import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Game } from '../../model/game';
import { GameService } from '../../services/game.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { log } from 'console';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrl: './game-detail.component.scss'
})
export class GameDetailComponent implements OnInit {

  game: Game = {};
  id: number = 0;
  error?: Error;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly gameService: GameService,
    private readonly router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.getGame();
  }


  getVideoUrl(game?: Game): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${game?.video}`);
  }

  getGame() {
    this.route.params.subscribe({
      next: value => {
        this.id = value['id'];
        this.gameService.getGame(this.id).subscribe({
          next: g => {
            this.game = g; 
            console.log(this.game);
          },
          error: err => {
            console.error('Game not found ' , err);
            this.error = err;
          }
        })
      },
      error: err => console.error('Observable emitted an error: ' , err)
    })
  }

  deleteGame(id?:number): void {
    this.gameService.deleteGame(id).subscribe(
      response => {
        console.log('Gioco cancellato:', response);
        this.router.navigate(['']);
      },
      error => {
        console.error('Errore durante la cancellazione:', error);
      }
    );
  }

  // ngOnInit(): void {
  //   console.log("SONO ON INIT DA ALTRA PAGINA");
  //   this.route.params.subscribe(
  //     // switchMap(params => this.gameService.getGame(params['id'])),
  //     // map((game: Game) => this.game = game),
  //     value =>{
  //       console.log("SONO IN PARAMS");
  //       let prova: number = value['id'];
  //       console.log("CHIAMO SERVICE");
  //       this.gameService.getGame(prova).subscribe(g => {
  //         console.log("SONO IN SERVICE");
  //         this.game = g
  //       })
  //       console.log("SERVICE END");
  //     });
  // }

}
