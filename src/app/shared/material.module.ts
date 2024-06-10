import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import {MatInput, MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatMenu, MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatListModule,
    MatInput,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatGridListModule
  ],
  exports: [
    CommonModule,
    MatToolbarModule,
    MatListModule,
    MatInput,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatGridListModule
  ]
})



export class MaterialModule { }
