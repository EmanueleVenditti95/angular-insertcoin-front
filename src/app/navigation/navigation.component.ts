import { Component } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Router } from '@angular/router';
import { Category } from '../model/category';
import { AuthService } from '../services/auth.service';
import { ConsoleService } from '../services/console.service';
import { Console } from '../model/console';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})

export class NavigationComponent {

  constructor(
    private readonly categoryService: CategoryService,
    private router: Router,
    private readonly authService : AuthService,
    private readonly consoleService : ConsoleService
  ) { }

  isLogged?:boolean;
  categories: Category[] = [];
  cons: Console[] = [];
  username: string = "";
  authorities? : [];
  isAdmin? : boolean;

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(loggedIn => {
      this.isLogged = loggedIn;     
      if (loggedIn) {
        this.getCategories();
        this.getConsoles();
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

  getConsoles(){
    this.consoleService.getConsoles().subscribe((data:any) => {
      this.cons = data.consoles;    
    })
  }

  selectCategory(id?: number) {
    this.router.navigate(['/games/category/', id]); // Naviga a GamesComponent con il parametro categoryId
  }

  selectConsole(id?:number, nome?:string) {
    this.router.navigate(['/games/console/', id,nome]);
  }

  goToFavorites() {
    this.router.navigate(['/games/', 'favorites']);
  }

  public logOut() : void {   
    this.authService.logOut();
    this.username = "";
    this.router.navigate(['/']); 
  }

}
