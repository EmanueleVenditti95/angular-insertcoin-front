import { Component } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Router } from '@angular/router';
import { Category } from '../model/category';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})

export class NavigationComponent {

  constructor(
    private readonly categoryService: CategoryService,
    private router: Router,
    private readonly authService : AuthService
  ) { }

  isLogged?:boolean;
  categories: Category[] = [];
  username: string = "";
  authorities? : [];
  isAdmin? : boolean;

  ngOnInit(): void {

    this.authService.isLoggedIn().subscribe(loggedIn => {
      this.isLogged = loggedIn;     
      if (loggedIn) {
        this.getCategories();
        this.username = this.authService?.getUsername() as string;
        this.authService.getUser(this.username).subscribe(user => this.isAdmin = user.ruoli?.some(e => e.nome === 'ROLE_ADMIN'));
      }       
      else {
        this.categories = [];
        this.username = "";
      }
    });      
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((data:any) => {
      this.categories = data._embedded.categorie;   
    })
  }

  selectCategory(id?: number) {
    this.router.navigate(['/games/category/', id]); // Naviga a GamesComponent con il parametro categoryId
  }

  public logOut() : void {   
    this.authService.logOut();
    this.username = "";
    this.router.navigate(['/']); 
  }

}
