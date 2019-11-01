const sudokuController = require("../controllers/sudokuController");
const appConfig = require("../../config/appConfig");

let setRouter = (app) => {
    let baseUrl = `${appConfig.apiVersion}`;
    app.get(`${baseUrl}/getSudoku`, sudokuController.getSudoku);
    app.post(`${baseUrl}/solveSudoku`, sudokuController.solveSudoku);
    app.post(`${baseUrl}/checkSudoku`, sudokuController.checkSudoku);
}; 

module.exports = { setRouter: setRouter };