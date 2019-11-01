let checkSudoku = (sudoku) => {
    return new Promise((resolve, reject) => {
        try {
            let errorIndexList = [];
            let indexCounter = 0;
            sudoku.forEach((row, rowIndex) => {
                row.forEach((value, columnIndex) => {
    
                    if (value) {
                        // check the current row if the value repeats
                        if (sudoku[rowIndex].some((element, index) => element === value && index !== columnIndex)) {
                            errorIndexList.push(indexCounter);
                        }
    
                        // check the current column if the value repeats
                        if (sudoku.some((row, index) => row[columnIndex] === value && index !== rowIndex)) {
                            errorIndexList.push(indexCounter);
                        }
    
                        // Check the current 3X3 square if the value repeats
                        let rowCorner = Math.floor(rowIndex / 3) * 3;
                        let columnCorner = Math.floor(columnIndex / 3) * 3;
                        let rows = [rowCorner, rowCorner + 1, rowCorner + 2];
                        let columns = [columnCorner, columnCorner + 1, columnCorner + 2];
                        if (rows.some(row => columns.some(column => sudoku[row][column] === value && column !== columnIndex) && row !== rowIndex)) {
                            errorIndexList.push(indexCounter);
                        }
                    }
                    indexCounter++;
                });
            });
            resolve([...new Set(errorIndexList)]);
        } catch(error){
            reject(error);
        }
    });
};

module.exports = { checkSudoku: checkSudoku };