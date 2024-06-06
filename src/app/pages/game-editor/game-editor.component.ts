import { Component } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { Game } from '../../model/game';
import { GameService } from '../../services/game.service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-game-editor',
  templateUrl: './game-editor.component.html',
  styleUrl: './game-editor.component.scss'
})


export class GameEditorComponent {

  constructor(
    private readonly gameService: GameService,
    private router: Router
  ) { }

  game: Game = {};
  error = "";
 
  requestForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    descrizione: new FormControl('', Validators.required),
    video: new FormControl('', Validators.required),
    // id_categoria: new FormControl(0, [Validators.required, Validators.min(1)])
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
