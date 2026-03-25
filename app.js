const express = require("express");
const app = express();

const port = 3000;

app.get("/", (req, res) => {
    res.send("<h1>Hi, Welcome to our app!<h1>");
});

app.listen(port, () => {
    console.log(`Server is listening on port : ${port}`);
    console.log("http://localhost:3000");
});