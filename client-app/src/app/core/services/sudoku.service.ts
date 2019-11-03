import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConstants } from '../Constants/app-constants';
import { SudokuResponse } from '../interfaces/sudoku-response';
import { SudokuRequest } from '../interfaces/sudoku-request';
import { solveSudokuResponse } from '../interfaces/solve-sudoku-response';

@Injectable({
  providedIn: 'root'
})
export class SudokuService {

  private apiBaseUrl: string;
  constructor(public httpClient: HttpClient) {
    this.apiBaseUrl = localStorage.getItem(AppConstants.WEB_API_BASE_URL);
  }

  // Get Sudoku
  public getSudoku(): Observable<SudokuResponse> {
    return this.httpClient.get(`${this.apiBaseUrl}${AppConstants.GET_SUDOKU_ENDPOINT}`)
      .pipe(map((response: SudokuResponse) => response));
  }

  // Solve Sudoku
  public solveSudoku(requestData): Observable<solveSudokuResponse> {
    const requestPayload: SudokuRequest = {
      sudoku: requestData
    };
    return this.httpClient.post(`${this.apiBaseUrl}${AppConstants.SOLVE_SUDOKU_ENDPOINT}`, requestPayload)
      .pipe(map((response: solveSudokuResponse) => response));
  }

  // Check Sudoku
  public checkSudoku(requestData): Observable<SudokuResponse> {
    const requestPayload: SudokuRequest = {
      sudoku: requestData
    };
    return this.httpClient.post(`${this.apiBaseUrl}${AppConstants.CHEK_SUDOKU_ENDPOINT}`, requestPayload)
      .pipe(map((response: SudokuResponse) => response));
  }
}
