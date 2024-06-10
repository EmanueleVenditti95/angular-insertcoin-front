import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Game } from '../../../model/game';
import { GameService } from '../../../services/game.service';
import { ActivatedRoute, Router } from "@angular/router"
@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrl: './game-edit.component.scss'
})
export class GameEditComponent {

  constructor(
    private readonly gameService: GameService,
    private router: Router,
    private readonly route: ActivatedRoute,
  ) { }

  game: Game = {};
  id: number = 0;
  error = "";
  requestForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    descrizione: new FormControl(''),
    video: new FormControl(''),
  });

  ngOnInit(): void {
    this.getGame();
    console.log(this.route.params);
    
  }

  getGame() {
    this.route.params.subscribe({
      next: value => {
        this.id = value['id'];
        this.gameService.getGame(this.id).subscribe({
          next: g => {
            this.game = g;
            this.requestForm.patchValue({
              nome: this.game.nome,
              descrizione: this.game.descrizione,
              video: this.game.video,
            });
          },
          error: err => {
            console.error('Game not found ', err);
            this.error = err;
          }
        })
      },
      error: err => console.error('Observable emitted an error: ', err)
    })
  }

  onSubmit() {
    if (this.requestForm.valid) {
      const formValue = this.requestForm.value;
      this.game = {
        id:this.id,
        nome: formValue.nome ?? '',
        descrizione: formValue.descrizione ?? '',
        video: formValue.video ?? ''
      };

      this.gameService.saveGame(this.game).subscribe({
        next: response => {
          console.log('gioco aggiornato', response);
          this.router.navigate(['/games/game/'+ this.id]);         
        },
        error: err => console.error('Errore durante l\'aggiornamento:', err)
      })
    } else {
      console.error('Form non valido');
    } 
  }
}