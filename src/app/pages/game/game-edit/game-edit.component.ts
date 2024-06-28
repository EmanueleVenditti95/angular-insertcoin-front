import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Game } from '../../../model/game';
import { GameService } from '../../../services/game.service';
import { CategoryService } from '../../../services/category.service';
import { ActivatedRoute, Router } from "@angular/router"
import { Category } from '../../../model/category';
import { ConsoleService } from '../../../services/console.service';
import { Console } from '../../../model/console';
@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrl: './game-edit.component.scss'
})
export class GameEditComponent {

  constructor(
    private readonly gameService: GameService,
    private readonly categoryService: CategoryService,
    private readonly consoleService: ConsoleService,
    private router: Router,
    private readonly route: ActivatedRoute,
  ) { }

  categories: Category[] = [];
  consoles: Console[] = [];
  oldCategory?: number;
  oldConsoles?: Console[];
  game: Game = {};
  id: number = 0;
  error = "";

  requestForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    descrizione: new FormControl(''),
    video: new FormControl(''),
    img : new FormControl(''),
    categoria : new FormControl(),
    consoles : new FormArray([])
  });

  ngOnInit(): void {
    this.getGame();
    this.getCategories();
    this.getConsoles();      
  }

  getGame() {
    this.route.params.subscribe({
      next: value => {
        this.id = value['id'];
        this.gameService.getGame(this.id).subscribe({
          next: data => {
            this.game = data.gioco;
            this.oldCategory = this.game.categoria?.id;
            this.oldConsoles = this.game.consoles;
            
            this.requestForm.patchValue({
              nome: this.game.nome,
              descrizione: this.game.descrizione,
              video: this.game.video,
              img: this.game.img,
              categoria:this.game.categoria?.id,
            });
            this.setOldConsolesInForm();

          console.log(this.requestForm.value);
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

  getConsoles() {
    this.consoleService.getConsoles().subscribe((data:any) => {
      this.consoles = data.consoles;
      this.setOldConsolesInForm();
    })
  }

  setOldConsolesInForm() {
    const consolesFormArray = this.requestForm.get('consoles') as FormArray;
    this.consoles.forEach(console => {
      const isSelected = this.oldConsoles?.some(oldConsole => oldConsole.id === console.id)
      consolesFormArray.push(new FormControl(isSelected));
    })
  }

  onSubmit() {
    if (this.requestForm.valid) {
      const formValue = this.requestForm.value;
      const selectedConsoles = this.consoles.filter((console, index) => formValue.consoles?.[index]);

      this.game = {
        id:this.id,
        nome: formValue.nome ?? '',
        descrizione: formValue.descrizione ?? '',
        video: formValue.video ?? '',
        img: formValue.img ?? '',
        categoria: this.categories.find(categoria => categoria.id === formValue.categoria),
        consoles: selectedConsoles ?? []
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
