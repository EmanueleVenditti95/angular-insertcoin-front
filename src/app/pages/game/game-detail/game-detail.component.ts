import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Game } from '../../../model/game';
import { GameService } from '../../../services/game.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalComponent } from '../../../delete-modal/delete-modal.component';


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
    private sanitizer: DomSanitizer,
    public dialog: MatDialog
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
          next: data => {
            this.game = data.gioco; 
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

  openDialog(): void {
    this.dialog.open(DeleteModalComponent, {
      data: {game:this.game},
      width: '500px',
    });
  }

}
