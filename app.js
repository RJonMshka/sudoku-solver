// Introducing an IIFE for avoiding pollution in global namespace
(function(fetchTool) {
    const puzzleContainer = document.querySelector("#puzzle-container");
    const solvePuzzleBtn = document.querySelector("#solve-puzzle-btn");

    const puzzleSquares = 81;

    let sudokuValues = [];

    const clearSudokuValues = () => {
        sudokuValues = [];
    }

    // This method 
    const joinSudokuValues = () => {
        clearSudokuValues();

        const allInputs = document.querySelectorAll("input");

        allInputs.forEach( input => {
            if(input.value) {
                sudokuValues.push(input.value);
            } else {
                sudokuValues.push(".");
            }
        });

        console.log(sudokuValues);
    };

    const solveSudoku = () => {
        joinSudokuValues();

        const dataToSend = sudokuValues.join("");

        var options = {
        method: 'POST',
        url: 'https://solve-sudoku.p.rapidapi.com/',
        headers: {
            'content-type': 'application/json',
            'x-rapidapi-host': 'solve-sudoku.p.rapidapi.com',
            'x-rapidapi-key': ''
        },
        data: {
            puzzle: dataToSend
        }
        };

        fetchTool.request(options).then(function (response) {
            console.log('data is:', response.data);
        }).catch(function (error) {
            console.error(error);
        });
    };

    // added click listener for solve button
    solvePuzzleBtn.addEventListener("click", solveSudoku);

    // loop over squares to create squares numbered inputs
    for (let i = 0; i< puzzleSquares; i++) {
        const inputEl = document.createElement("input");
        inputEl.setAttribute("type", "number");
        inputEl.setAttribute("min", 0);
        inputEl.setAttribute("max", 9);
    
        puzzleContainer.appendChild(inputEl);
    }
})(axios);





