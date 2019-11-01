import { Component, OnInit } from '@angular/core';
import { SudokuService } from 'src/app/core/services/sudoku.service';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { LoaderService } from 'src/app/core/Services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { AppConstants } from 'src/app/core/Constants/app-constants';
import { MessageConstants } from 'src/app/core/constants/message-constants';

@Component({
  selector: 'app-sudoku',
  templateUrl: './sudoku.component.html',
  styleUrls: ['./sudoku.component.scss']
})
export class SudokuComponent implements OnInit {

  public puzzle;
  public sudokuFormGroup: FormGroup;

  constructor(
    private sudokuService: SudokuService,
    private formBuilder: FormBuilder,
    private loaderService: LoaderService,
    private toastrService: ToastrService) { }

  public ngOnInit(): void {
    this.loaderService.start();
    this.getSudoku();
    this.sudokuFormGroup = this.formBuilder.group({
      cells: this.formBuilder.array([])   // create reactive form group
    });
  }

  // GET SUDOKU
  private getSudoku(): void {
    this.sudokuService.getSudoku().subscribe(response => {
      if (response.data && response.data.length > 0) {
        if (this.cells && this.cells.length > 0) {
          this.sudokuFormGroup.get(AppConstants.CELLS).setValue(response.data);
        } else {
          response.data.forEach(value => this.cells.push(this.formBuilder.control(value))); // create form controls for each cell
        }
        this.puzzle = this.get2DArray(response.data);
        this.loaderService.stop();
        this.toastrService.success(MessageConstants.GET_SUCCESS);
      } else {
        this.loaderService.stop();
        this.toastrService.error(MessageConstants.SUDOKU_NOTFOUND);
      }
    }, () => {
      this.loaderService.stop();
      this.toastrService.error(MessageConstants.GET_FAILED);
    });
  }

  // SOLVE SUDOKU
  public solveSudoku(): void {
    this.loaderService.start();
    this.sudokuService.solveSudoku(this.puzzle).subscribe(response => {
      if (response.data && response.data.length > 0) {
        const flatArray = response.data.reduce((acc, val) => acc.concat(val), []);
        this.sudokuFormGroup.get(AppConstants.CELLS).setValue(flatArray);
      } else {
        this.loaderService.stop();
        this.toastrService.error(MessageConstants.SUDOKU_NOTFOUND);
      }
      this.loaderService.stop();
      this.toastrService.success(MessageConstants.SOLVE_SUCCESS);
    }, () => {
      this.loaderService.stop();
      this.toastrService.error(MessageConstants.SOLVE_FAILED);
    });
  }

  // CHECK SUDOKU
  public checkSudoku(): void {
    this.loaderService.start();
    this.resetErrors();
    const requestData = this.get2DArray([...this.sudokuFormGroup.get(AppConstants.CELLS).value]);
    this.sudokuService.checkSudoku(requestData).subscribe(response => {
      if (response.data && response.data.length > 0) {
        response.data.forEach(index => {
          this.sudokuFormGroup.get(AppConstants.CELLS)[AppConstants.CONTROLS][index].setErrors(true);
        });
        this.toastrService.error(MessageConstants.CHECK_INVALID);
      } else {
        this.toastrService.success(MessageConstants.CHECK_VALID);
      }
      this.loaderService.stop();
    }, () => {
      this.loaderService.stop();
      this.toastrService.error(MessageConstants.CHECK_FAILED);
    });
  }

  // RESET SUDOKU
  public resetSudoku(): void {
    this.sudokuFormGroup.reset();
    const flatArray = this.puzzle.reduce((acc, val) => acc.concat(val), []);
    this.sudokuFormGroup.get(AppConstants.CELLS).setValue(flatArray);
  }

  // prevent invalid input values on keypress event
  public onKeyPress(event): void {
    if (event.key === '0' || event.target.value.length > 0) {
      event.preventDefault();
    }
    event.target.classList.remove(AppConstants.ERR_CLASS);
  }

  // convert 1D array into 2D array to pass in checkSudoku API request
  private get2DArray(array): Array<number> {
    const newArray = [];
    while (array.length) {
      newArray.push(array.splice(0, 9));
    }
    return newArray;
  }

  // getter for sudoku cells form array
  get cells(): FormArray {
    return this.sudokuFormGroup.get(AppConstants.CELLS) as FormArray;
  }

  // reset checked errors
  private resetErrors(): void {
    this.sudokuFormGroup.get(AppConstants.CELLS)[AppConstants.CONTROLS].forEach(control => control.errors = null);
  }

}
