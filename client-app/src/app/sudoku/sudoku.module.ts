import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SudokuRoutingModule } from './sudoku-routing.module';
import { SudokuComponent } from './sudoku/sudoku.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SudokuComponent],
  imports: [
    CommonModule,
    SudokuRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class SudokuModule { }
