import { Component, Inject, Input, OnInit } from '@angular/core';
import { Game } from '../../model/game';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameService } from '../../services/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.scss'
})
export class DeleteModalComponent{

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { game: Game },
    private readonly router: Router,
    private readonly gameService: GameService
  ) { }

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

}
