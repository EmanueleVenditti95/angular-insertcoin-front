import { Component, EventEmitter, Output } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Router } from '@angular/router';
import { Category } from '../model/category';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})

export class NavigationComponent {

  constructor(
    private readonly categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCategories()      
  }

  categories: Category[] = [];

  getCategories() {
    this.categoryService.getCategories().subscribe((data:any) => {
      this.categories = data._embedded.categorie;     
    })
  }

  selectCategory(id?: number) {
    this.router.navigate(['/games/category/', id]); // Naviga a GamesComponent con il parametro categoryId
  }
}
