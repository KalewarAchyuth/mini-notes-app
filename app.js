const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Note = require("./models/note");

//--------------------MIDDLEWARES--------------------
app.use(express.urlencoded({extended : true}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));



//---------------------CONNECT DB------------------------
mongoose.connect("mongodb://127.0.0.1:27017/notesApp")
.then(() => console.log("DB CONNECTED"))
.catch((err) => console.log("ERROR", err));



// ------------------HOME PAGE----------------------- 
app.get("/", (req, res) => {
    res.redirect("/home");
});

app.get("/home", async(req, res) => {

    let notes = await Note.find();
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

    console.log(newNote);
    
    const note = new Note({
        text: newNote.trim(),
    });

    note.save()
    .then((res) => console.log(res))
    .catch((err) => console.log("ERROR", err));
    
    res.redirect("/home");
});


//------------------DELETE NOTE--------------------------
app.post("/delete/:id", async(req, res) => {
    let id = req.params.id;

    let deletedNote = await Note.findByIdAndDelete(id);
    console.log(deletedNote);

    res.redirect("/home");
});

//------------------EDIT NOTE--------------------------
app.post("/edit/:id", async(req, res) => {
    let id = req.params.id;
    let note = await Note.findById(id);

    if (!note) {
        return res.send("Note not found ❌");
    }

    res.render("edit", {note});
    
});

//------------------UPDATE NOTE--------------------------
app.post("/update/:id", async(req, res) => {
    let id = req.params.id;
    let updatedNote = req.body.text;
    
    await Note.findByIdAndUpdate(id, {text : updatedNote});
    res.redirect("/home");
})


const port = 3000;

app.listen(port, () => {
    console.log(`Server is listening on port : ${port}`);
    console.log(`http://localhost:${port}`);
});

