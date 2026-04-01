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

    if(!newNote || newNote.trim() === "") {
        return res.send("Note cannot be empty");
    }
    notes.push(newNote.trim());
    
    res.redirect("/home");
});


//------------------DELETE NOTE--------------------------
app.post("/delete/:index", (req, res) => {
    let idx = req.body.index;
    notes.splice(idx, 1);

    res.redirect("/home");
});

//------------------EDIT NOTE--------------------------
app.post("/edit/:index", (req, res) => {
    let idx = req.params.index;
    let note = notes[idx];


    res.render("edit", {note, idx});
    
});

//------------------UPDATE NOTE--------------------------
app.post("/update/:index", (req, res) => {
    let idx = req.params.index;
    let updatedNote = req.body.note;
    
    notes[idx] = updatedNote;

    res.redirect("/home");
})


const port = 3000;

app.listen(port, () => {
    console.log(`Server is listening on port : ${port}`);
    console.log(`http://localhost:${port}`);
});

