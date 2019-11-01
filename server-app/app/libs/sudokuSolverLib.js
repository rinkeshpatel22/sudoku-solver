let solveSudoku = function (sudoku) {
  return new Promise((resolve, reject) => {
    try {
      var emptyPositions = saveEmptyPositions(sudoku);
      let limit = 9, i = 0, row, column, value, found;

      while (i < emptyPositions.length) {
        row = emptyPositions[i][0];
        column = emptyPositions[i][1];
        value = sudoku[row][column] + 1;  // Try the next value
        found = false;

        while (!found && value <= limit) {
          // If a valid value is found, mark found true, set the position to the value, and move to the next position until the limit
          if (checkValue(sudoku, column, row, value)) {
            found = true;
            sudoku[row][column] = value;
            i++;
          } else {
            value++;
          }
        }

        // If not found valid value, move back track to the previous position
        if (found === false) {
          sudoku[row][column] = null;
          i--; // Back track
        }
      }
      resolve(sudoku);
    } catch (error) {
      reject(error);
    }
  });
};

// Keep empty positions in one array 
let saveEmptyPositions = function (sudoku) {
  let emptyPositions = [];
  sudoku.forEach((rows, rowIndex) => rows.forEach((element, columnIndex) => {
    if (element === null) {
      emptyPositions.push([rowIndex, columnIndex]);
    }
  }));
  return emptyPositions;
};

// Check if the VALUE is already exists in current row, column or 3X3 square
// if not then place this value at this COLUMN & ROW position and move ahead else check for next value
let checkValue = function (sudoku, column, row, value) {
  let isColumnIncludesThisValue = sudoku.some(row => row[column] === value);
  let isRowIncludesThisValue = sudoku[row].includes(value);
  let is3X3SquareIncludesThisValue = check3x3Square(sudoku, column, row, value);
  return (!isColumnIncludesThisValue && !isRowIncludesThisValue && !is3X3SquareIncludesThisValue);
};

// Check if the value is already exists in current 3X3 square or not
let check3x3Square = function (sudoku, column, row, value) {
  let rowCorner = Math.floor(row / 3) * 3;
  let columnCorner = Math.floor(column / 3) * 3;
  let rows = [rowCorner, rowCorner + 1, rowCorner + 2];
  let columns = [columnCorner, columnCorner + 1, columnCorner + 2];
  return rows.some(row => columns.some(column => sudoku[row][column] === value));
};

module.exports = { solveSudoku: solveSudoku };