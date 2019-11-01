import { TestBed } from '@angular/core/testing';

import { SudokuService } from './sudoku.service';

describe('SudokuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SudokuService = TestBed.get(SudokuService);
    expect(service).toBeTruthy();
  });
});
