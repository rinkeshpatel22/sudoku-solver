const sudokuSolverLib = require("../libs/sudokuSolverLib");
const responseGeneratorLib = require("../libs/responseGeneratorLib");
const sudokuChekerLib = require("../libs/sudokuChekerLib");
const sudokuGeneratorLib = require("../libs/sudokuGeneratorLib");

// GET SUDOKU
let getSudoku = (req, res) => {
    try {
        sudokuGeneratorLib.generateSudoku().then(sudoku => {
            let response = responseGeneratorLib.generateResponse(false, "200", "Get Sudoku successfull", sudoku);
            res.send(response);
        }).catch(error => {
            let response = responseGeneratorLib.generateResponse(true, "403", "Get Sudoku failed", error);
            res.status(403);
            res.send(response);
        });
    } catch (error) {
        let response = responseGeneratorLib.generateResponse(true, "500", "Internal server error", error);
        res.status(500);
        res.send(response);
    }
};

// CHECK SUDOKU
let checkSudoku = (req, res) => {
    try {
        if (req.body && req.body.sudoku) {
            sudokuChekerLib.checkSudoku(req.body.sudoku).then(result => {
                let message = result.length > 0 ? "Invalid entires found" : "No invalid entires found";
                let response = responseGeneratorLib.generateResponse(false, "200", message, result);
                res.send(response);
            }).catch(error => {
                let response = responseGeneratorLib.generateResponse(true, "403", "Check Sudoku failed", error);
                res.status(403);
                res.send(response);
            });
        } else {
            let response = responseGeneratorLib.generateResponse(true, "400", "Bad request");
            res.send(response);
        }
    } catch (error) {
        let response = responseGeneratorLib.generateResponse(true, "500", "Internal server error", error);
        res.status(500);
        res.send(response);
    }
};

// SOLVE SUDOKU
let solveSudoku = (req, res) => {
    try{
        if (req.body && req.body.sudoku) {
            sudokuSolverLib.solveSudoku(req.body.sudoku).then(result => {
                let message = result.length > 0 ? "Sudoku solved successfully" : "Sudoku not solved";
                let response = responseGeneratorLib.generateResponse(false, "200", message, result);
                res.send(response);
            }).catch(error => {
                let response = responseGeneratorLib.generateResponse(true, "403", "Solve Sudoku failed", error);
                res.status(403);
                res.send(response);
            });
        } else {
            let response = responseGeneratorLib.generateResponse(true, "400", "Bad request");
            res.send(response);
        }
    } catch (error){
        let response = responseGeneratorLib.generateResponse(true, "500", "Internal server error", error);
        res.status(500);
        res.send(response);
    }
};

module.exports = {
    getSudoku: getSudoku,
    solveSudoku: solveSudoku,
    checkSudoku: checkSudoku
};