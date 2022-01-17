const PORT = 8000;
const axios = require("axios").default;
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/solve", (req, res) => {

    const options = {
        method: 'POST',
        url: 'https://sudoku-solver2.p.rapidapi.com/',
        headers: {
            'content-type': 'application/json',
            'x-rapidapi-host': 'sudoku-solver2.p.rapidapi.com',
            'x-rapidapi-key': process.env.API_KEY
        },
        data: {
            input: req.body.data
        }
    };

    axios.request(options).then(response => {
        res.send(response.data);
    }).catch(error => {
        console.log(error);
        res.error(error);
    });
});

app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));