const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//--------------------MIDDLEWARES--------------------
app.use(express.urlencoded({extended : true}));


let notes = ["study", "gym", "code"];

// ------------------HOME PAGE----------------------- 
app.get("/", (req, res) => {
    res.redirect("/home");
});

app.get("/home", (req, res) => {
    res.render("home", {notes});
});


//------------------ADD NOTE--------------------------
app.get("/new", (req, res) => {
    res.render("new");
});

app.post("/add", (req, res) => {
    let newNote = req.body.text;
    notes.push(newNote);
    console.log("New note : ", newNote);
    
    res.redirect("/home");
});



const port = 3000;

app.listen(port, () => {
    console.log(`Server is listening on port : ${port}`);
    console.log(`http://localhost:${port}`);
});

