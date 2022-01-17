// Introducing an IIFE for avoiding pollution in global namespace
(function () {
    const puzzleContainer = document.querySelector("#puzzle-container");
    const solvePuzzleBtn = document.querySelector("#solve-puzzle-btn");
    const clearPuzzleBtn = document.querySelector("#clear-puzzle-btn");
    const messageBlock = document.querySelector("#message");

    const puzzleSquares = 81;

    let sudokuValues = [];

    // Clears the grid
    const clearSudokuValues = () => {
        // clear the message field
        messageBlock.innerHTML = "";
        sudokuValues = [];
        const allInputs = document.querySelectorAll("input");

        allInputs.forEach(input => {
            input.value = "";
        });
    }

    // This method extracts the input puzzle
    const joinSudokuValues = () => {
        sudokuValues = [];

        const allInputs = document.querySelectorAll("input");
        let emptyCells = 0;

        allInputs.forEach(input => {
            if (input.value && input.value !== "") {
                // input required for the api is that if empty cells are encountered, then number of empty cells have to be placed between two 'x' characters 
                if (emptyCells) {
                    sudokuValues.push(`x${emptyCells}x`);
                    emptyCells = 0;
                }
                sudokuValues.push(input.value);
            } else {
                emptyCells++;
            }
        });
        // checking if there are empty cells at the end
        if (emptyCells) {
            sudokuValues.push(`x${emptyCells}x`);
            emptyCells = 0;
        }

    };

    // This method populates the result in the 9x9 sudoku grid
    const populateResult = response => {
        const allInputs = document.querySelectorAll("input");
        if (response.canBeSolved && response.answer) {
            allInputs.forEach((input, index) => {
                input.value = response.answer[index];
            });
        } else {
            messageBlock.innerHTML = response.message;
        }
    }

    // This method is the main resolver for Sudoku Puzzle
    const solveSudoku = () => {
        // clear the message field
        messageBlock.innerHTML = "";
        joinSudokuValues();

        const dataToSend = sudokuValues.join("");

        fetch("http://localhost:8000/solve", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                data: dataToSend
            })
        }).then(response => response.json())
            .then(data => {
                populateResult(data);
                
            }).catch(function (error) {
            });
    };

    // added click listener for solve button
    solvePuzzleBtn.addEventListener("click", solveSudoku);

    // clear inputs and data
    clearPuzzleBtn.addEventListener("click", clearSudokuValues);

    // loop over squares to create squares numbered inputs
    for (let i = 0; i < puzzleSquares; i++) {
        const inputEl = document.createElement("input");
        inputEl.setAttribute("type", "number");
        inputEl.setAttribute("min", 0);
        inputEl.setAttribute("max", 9);


        // rule for distinguishing odd cells
        if (
            ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && (i < 21 || i > 53)) ||
            ((i % 9 == 3 || i % 9 == 4 || i % 9 == 5) && (i > 29 && i < 51)) ||
            ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && (i < 27 || i > 59))
        ) {
            inputEl.classList.add('odd-section')
        }

        puzzleContainer.appendChild(inputEl);
    }
})();





