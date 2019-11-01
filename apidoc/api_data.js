define({ "api": [
  {
    "group": "Sudoku",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/getSudoku",
    "title": "Get Puzzle",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\"  : false,\n\"status\" : \"200\",\n\"message\": \"Get Sudoku successfull\",\n\"data\"   :  '[6,null,null,1,5,7,null,null,null,3,null,null,2,null,4,null,9,null,null,1,null,null,null,6,null,4,null,2,6,null,null,1,null,8,null,3,5,null,null,null,null,null,9,2,4,null,null,3,9,null,null,null,null,5,1,3,null,6,null,2,null,null,null,9,4,6,8,3,1,7,null,null,7,null,null,null,4,9,null,1,null]'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:- Get Sudoku Failed:",
          "content": "\n\n{\n  \"error\"  : true,\n  \"status\" : \"403\",\n  \"message\": \"Get Sudoku failed\",\n  \"data\"   : {}\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:- Internal Server Error:",
          "content": "\n\n{\n  \"error\"  : true,\n  \"status\" : \"500\",\n  \"message\": \"Internal Server Error\",\n  \"data\"   : {}\n }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/sudokuRoute.js",
    "groupTitle": "Sudoku",
    "name": "GetApiV1Getsudoku"
  },
  {
    "group": "Sudoku",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/checkSudoku",
    "title": "Check Puzzle",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "sudoku",
            "description": "<p>Entered values to check valid or not. (body params)(required)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"sudoku\": '[[6,7,2,8,9,4,5,3,1],\n             [5,4,9,1,6,3,8,2,3],\n             [8,3,1,5,2,7,6,4,9],\n             [2,8,4,9,1,6,7,5,3],\n             [3,9,6,4,7,5,2,1,8],\n             [1,5,7,3,8,2,4,9,6],\n             [4,1,5,7,3,8,9,6,2],\n             [7,6,3,2,4,9,1,8,5],\n             [9,2,8,6,5,1,3,7,4]]'\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:- Invalid entires found:",
          "content": "{   \n    \"error\":false,\n    \"status\":\"200\",\n    \"message\":\"Invalid entires found\",\n    \"data\":'[7,14,17,35]'\n}",
          "type": "json"
        },
        {
          "title": "Success-Response:- No invalid entires found:",
          "content": "{   \n    \"error\":false,\n    \"status\":\"200\",\n    \"message\":\"No invalid entires found\",\n    \"data\": []\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:- Check Sudoku failed:",
          "content": "\n{\n  \"error\"  : true,\n  \"status\" : \"403\",\n  \"message\": \"Check Sudoku failed\",\n  \"data\"   : {}\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:- Internal Server Error:",
          "content": "\n{\n  \"error\"  : true,\n  \"status\" : \"500\",\n  \"message\": \"Internal Server Error\",\n  \"data\"   : {}\n }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/sudokuRoute.js",
    "groupTitle": "Sudoku",
    "name": "PostApiV1Checksudoku"
  },
  {
    "group": "Sudoku",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/solveSudoku",
    "title": "Solve Puzzle",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "sudoku",
            "description": "<p>Unsolved Puzzle to solve. (body params)(required)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"sudoku\":  '[[null,null,null,null,9,null,5,null,1],\n             [null,null,null,null,null,null,null,2,null],\n             [8,3,null,null,2,null,null,null,null],\n             [null,null,4,null,1,6,7,5,null],\n             [3,null,null,null,7,5,null,1,8],\n             [null,5,null,null,null,null,null,9,null],\n             [4,1,null,null,null,null,9,null,2],\n             [7,null,3,null,null,null,1,null,null],\n             [null,2,null,6,5,null,null,null,4]]'\n }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:- Solved:",
          "content": "{\n\"error\"  : false,\n\"status\" : \"200\",\n\"message\": \"Sudoku solved successfully\",\n\"data\"   :  '[[6,7,2,8,9,4,5,3,1],\n             [5,4,9,1,6,3,8,2,7],\n             [8,3,1,5,2,7,6,4,9],\n             [2,8,4,9,1,6,7,5,3],\n             [3,9,6,4,7,5,2,1,8],\n             [1,5,7,3,8,2,4,9,6],\n             [4,1,5,7,3,8,9,6,2],\n             [7,6,3,2,4,9,1,8,5],\n             [9,2,8,6,5,1,3,7,4]]'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:- Solve Sudoku failed:",
          "content": "\n{\n  \"error\"  : true,\n  \"status\" : \"403\",\n  \"message\": \"Solve Sudoku failed\",\n  \"data\"   : {}\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:- Internal Server Error:",
          "content": "\n{\n  \"error\"  : true,\n  \"status\" : \"500\",\n  \"message\": \"Internal Server Error\",\n  \"data\"   : {}\n }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/sudokuRoute.js",
    "groupTitle": "Sudoku",
    "name": "PostApiV1Solvesudoku"
  }
] });
