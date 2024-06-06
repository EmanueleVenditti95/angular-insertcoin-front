import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { GamesComponent } from './pages/games/games.component';
import { GameDetailComponent } from './pages/game-detail/game-detail.component';
import { GameCreationComponent } from './pages/game-creation/game-creation.component'; 

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
        path: '',
        redirectTo: 'games',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
