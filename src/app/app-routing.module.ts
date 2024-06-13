import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { GamesComponent } from './pages/game/games/games.component';
import { GameDetailComponent } from './pages/game/game-detail/game-detail.component';
import { GameCreationComponent } from './pages/game/game-creation/game-creation.component'; 
import { GameEditComponent } from './pages/game/game-edit/game-edit.component';

const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    children: [
      {
        path: 'games',
        component: GamesComponent
      },
      {
        path: 'games/add',
        component: GameCreationComponent
      },
      {
        path: 'games/game/:id',
        component: GameDetailComponent
      },
      {
        path: 'games/edit/:id',
        component: GameEditComponent
      },
      {
        path: '',
        redirectTo: 'games',
        pathMatch: 'full'
      },
      {
        path: 'games/category/:categoryId',
        component: GamesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
