import { Component } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { Game } from '../../../model/game';
import { GameService } from '../../../services/game.service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-game-creation',
  templateUrl: './game-creation.component.html',
  styleUrl: './game-creation.component.scss'
})


export class GameCreationComponent {

  constructor(
    private readonly gameService: GameService,
    private router: Router
  ) { }

  game: Game = {};
  error = "";
 
  requestForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    descrizione: new FormControl(''),
    video: new FormControl(''),
  });

  onSubmit() {
    if (this.requestForm.valid) {
      const formValue = this.requestForm.value;
      this.game = {
        nome: formValue.nome ?? '', // Usa una stringa vuota se formValue.nome è null o undefined
        descrizione: formValue.descrizione ?? '',
        video: formValue.video ?? ''
      };
      
      this.gameService.addGame(this.game).subscribe({
          next: response => {
            console.log('gioco creato', 'id:' + response);
            this.router.navigate(['/games/game/'+ response]);          
          },
          error: err => console.error('Errore durante la creazione:', err)
        })
    } else {
      console.error('Form non valido');
    } 
  }

  
}
