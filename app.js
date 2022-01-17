// Introducing an IIFE for avoiding pollution in global namespace
(function (fetchTool) {
    const puzzleContainer = document.querySelector("#puzzle-container");
    const solvePuzzleBtn = document.querySelector("#solve-puzzle-btn");
    const clearPuzzleBtn = document.querySelector("#clear-puzzle-btn");
    const messageBlock = document.querySelector("#message");

    const puzzleSquares = 81;

    let sudokuValues = [];

    const clearSudokuValues = () => {
        // clear the message field
        messageBlock.innerHTML = "";
        sudokuValues = [];
        const allInputs = document.querySelectorAll("input");

        allInputs.forEach(input => {
            input.value = "";
        });
    }

    // This method 
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

    const solveSudoku = () => {
        // clear the message field
        messageBlock.innerHTML = "";
        joinSudokuValues();

        const dataToSend = sudokuValues.join("");
        console.log("data to send: ", dataToSend);

        var options = {
            method: 'POST',
            url: 'https://sudoku-solver2.p.rapidapi.com/',
            headers: {
                'content-type': 'application/json',
                'x-rapidapi-host': 'sudoku-solver2.p.rapidapi.com',
                'x-rapidapi-key': '30be91547fmsh3a5434302748c46p1ab85djsn00e64d098375'
            },
            data: {
                input: dataToSend
            }
        };

        fetchTool.request(options).then(response => {
            populateResult(response.data);
            console.log('data is:', response.data);
        }).catch(function (error) {
            console.error(error);
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

        puzzleContainer.appendChild(inputEl);
    }
})(axios);





