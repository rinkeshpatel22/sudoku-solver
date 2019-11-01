import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '**', redirectTo: 'sudoku', pathMatch: 'full' },
  { path: 'sudoku', loadChildren: 'src/app/sudoku/sudoku.module#SudokuModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
