import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Game } from '../../../model/game';
import { GameService } from '../../../services/game.service';
import { CategoryService } from '../../../services/category.service';
import { ActivatedRoute, Router } from "@angular/router"
import { Category } from '../../../model/category';
@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrl: './game-edit.component.scss'
})
export class GameEditComponent {

  constructor(
    private readonly gameService: GameService,
    private readonly categoryService: CategoryService,
    private router: Router,
    private readonly route: ActivatedRoute,
  ) { }

  categories?: Category[];
  selectedCategory?: number;
  game: Game = {};
  id: number = 0;
  error = "";
  requestForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    descrizione: new FormControl(''),
    video: new FormControl(''),
    img : new FormControl(''),
    categoria : new FormControl()
  });

  ngOnInit(): void {
    this.getGame();
    this.getCategories()  
  }

  getGame() {
    this.route.params.subscribe({
      next: value => {
        this.id = value['id'];
        this.gameService.getGame(this.id).subscribe({
          next: data => {
            this.game = data.gioco;
            this.selectedCategory = this.game.categoria?.id;
            
            this.requestForm.patchValue({
              nome: this.game.nome,
              descrizione: this.game.descrizione,
              video: this.game.video,
              img: this.game.img,
              categoria:this.game.categoria?.id 
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

  getCategories() {
    this.categoryService.getCategories().subscribe((data:any) => {
      this.categories = data._embedded.categorie;     
    })
  }

  onSubmit() {
    if (this.requestForm.valid) {
      const formValue = this.requestForm.value;
      this.game = {
        id:this.id,
        nome: formValue.nome ?? '',
        descrizione: formValue.descrizione ?? '',
        video: formValue.video ?? '',
        img: formValue.img ?? ''
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
