const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));



// ------------------HOME PAGE----------------------- 
app.get("/", (req, res) => {
    res.redirect("/home");
});

app.get("/home", (req, res) => {
    let notes = ["study", "gym", "code"];
    res.render("home", {notes});
});



const port = 3000;

app.listen(port, () => {
    console.log(`Server is listening on port : ${port}`);
    console.log(`http://localhost:${port}`);
});

