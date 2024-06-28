import { Component } from '@angular/core';
import { FormGroup, FormControl,Validators, FormArray } from '@angular/forms';
import { Game } from '../../../model/game';
import { GameService } from '../../../services/game.service';
import { Router } from "@angular/router";
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../model/category';
import { Console } from '../../../model/console';
import { ConsoleService } from '../../../services/console.service';

@Component({
  selector: 'app-game-creation',
  templateUrl: './game-creation.component.html',
  styleUrls: [
    './game-creation.component.scss'
  ]
})


export class GameCreationComponent {

  constructor(
    private readonly gameService: GameService,
    private readonly categoryService: CategoryService,
    private readonly consoleService: ConsoleService,
    private router: Router
  ) { }

  game: Game = {};
  consoles : Console[] = [];
  categories: Category[] = [];
  error = "";
 
  requestForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    descrizione: new FormControl(''),
    video: new FormControl(''),
    img : new FormControl(''),
    categoria : new FormControl(null,Validators.required),
    consoles : new FormArray([])
  });

  ngOnInit(): void {
    this.getCategories();
    this.getConsoles();  
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((data:any) => {
      this.categories = data._embedded.categorie;
      console.log('categorie caricate');           
    })
  }

  getConsoles() {
    this.consoleService.getConsoles().subscribe((data:any) => {
      this.consoles = data.consoles;
      this.setConsolesInForm();
      console.log('consoles caricate');   
    })
  }

  setConsolesInForm() {
    const consolesFormArray = this.requestForm.get('consoles') as FormArray;
    this.consoles.forEach(console => {
      consolesFormArray.push(new FormControl());
    })
  }

  onSubmit() {
    if (this.requestForm.valid) {
      const formValue = this.requestForm.value;
      const selectedConsoles = this.consoles.filter((console, index) => formValue.consoles?.[index]);

      this.game = {
        nome: formValue.nome ?? '', // Usa una stringa vuota se formValue.nome è null o undefined
        descrizione: formValue.descrizione ?? '',
        video: formValue.video ?? '',
        img: formValue.img ?? '',
        categoria: this.categories.find(categoria => categoria.id === formValue.categoria),
        consoles: selectedConsoles ?? []
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
