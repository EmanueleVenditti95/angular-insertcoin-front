import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Game } from '../../model/game';
import { GameService } from '../../services/game.service';
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
    descrizione: new FormControl('', Validators.required),
    video: new FormControl('', Validators.required),
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
    //TODO...
  }
}
