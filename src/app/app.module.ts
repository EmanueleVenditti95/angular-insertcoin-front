import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material.module';
import { NavigationComponent } from './navigation/navigation.component';
import { GamesComponent } from './pages/games/games.component';
import { GameDetailComponent } from './pages/game-detail/game-detail.component';
import { GameCreationComponent } from './pages/game-creation/game-creation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GameEditComponent } from './pages/game-edit/game-edit.component'; // Importa ReactiveFormsModule

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    GamesComponent,
    GameDetailComponent,
    GameCreationComponent,
    GameEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
