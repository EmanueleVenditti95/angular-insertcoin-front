import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material.module';
import { NavigationComponent } from './navigation/navigation.component';
import { GamesComponent } from './pages/game/games/games.component';
import { GameDetailComponent } from './pages/game/game-detail/game-detail.component';
import { GameCreationComponent } from './pages/game/game-creation/game-creation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GameEditComponent } from './pages/game/game-edit/game-edit.component';
import { CategoriesComponent } from './pages/category/categories/categories.component'; // Importa ReactiveFormsModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { HomepageComponent } from './pages/homepage/homepage.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    GamesComponent,
    GameDetailComponent,
    GameCreationComponent,
    GameEditComponent,
    CategoriesComponent,
    DeleteModalComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  exports: [
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
