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

    };

    // added click listener for solve button
    solvePuzzleBtn.addEventListener("click", joinSudokuValues);

    // loop over squares to create squares numbered inputs
    for (let i = 0; i< puzzleSquares; i++) {
        const inputEl = document.createElement("input");
        inputEl.setAttribute("type", "number");
        inputEl.setAttribute("min", 0);
        inputEl.setAttribute("max", 9);
    
        puzzleContainer.appendChild(inputEl);
    }
})(axios);





