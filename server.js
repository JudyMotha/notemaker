//Call dependencies 
const express = require("express");
const path = require("path");
const fs = require("fs");

//Tells node that we are creating an "express" server;// Sets an initial port. 
const app = express();
const port = process.env.PORT || 3005;

//express. urlencoded() is a method inbuilt ;middleware;The class videos of  Express Day2 have this info;;handle data parsing
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//HTML Routes & api routes are below; can be kept in a separate files like Restaurant mini proj app
//db.json keeps track of note tracker saves ,deletes;//Mostly all these are ref to Starwars and Restaurant app..
// I think id can be best done from npm package UUID ;Many concepts for this HW  like req.bodywere repeated 7/17 MYSQL day 2 class  as well.Refer videos for later

app.get("/", function(req, res) {
res.sendFile(path.join(__dirname, '/public/index.html'));     
            });

app.get("/notes", function(req, res){
res.sendFile(path.join(__dirname, '/public/notes.html'));  
            });

app.get("/api/notes", function(req, res) {
res.sendFile(path.join(__dirname, "/db/db.json"));  
              });

app.get("/api/notes/:id", function(req, res) {
let Savednotetext = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
res.json(Savednotetext[Number(req.params.id)]);
             });

app.get("*", function(req, res) {    
res.sendFile(path.join(__dirname, '/public/index.html'));
            });

app.post("/api/notes", function(req, res) {
    let Savednotetext = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let newNote = req.body;
    let noteSavingID = Savednotetext.length.toString();
    newNote.id = noteSavingID;
    Savednotetext.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(Savednotetext));
    console.log("Saving note: ", newNote);
    res.json(Savednotetext);
});

//Deletes ;reassigns ID and rewrites in db.json
app.delete("/api/notes/:id", function(req, res) {
let Savednotetext = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
let currentid = req.params.id;
let upcoming_idno = 0;
Savednotetext = Savednotetext.filter((pnote) => {
return pnote.id != currentid;
    });

for (pnote of Savednotetext) {
pnote.id = upcoming_idno.toString();
upcoming_idno++;
    }

fs.writeFileSync("./db/db.json", JSON.stringify(Savednotetext));
res.json(Savednotetext);
});

app.listen(port, function() {
    console.log(`Waiting on port ${port}`);
});


//Alternate Code
//
//Initialization dependencies ,port ,express server ,middleware etc
//const express = require("express");
//const path = require("path");
//const fs = require("fs");
// const app = express();

//const PORT = process.env.PORT || 3005;

//let Notetextinfo= [];
 
//app.use(express.json());
//app.use(  express.urlencoded({    extended: true,  }));
//app.use(express.static(path.join(__dirname, "public")));

// api call response for the notes, an having results sent to browser in the form of an array of object
//app.get("/api/notes", function (err, res) {
//  try {
//    Notetextinfo= fs.readFileSync("db/db.json", "utf8");
//    console.log("Hello from the SERVER!");
//    Notetextinfo= JSON.parse(Notetextinfo);
//  } catch (err) {
//    console.log("\n error (catch err app.get):");
//    console.log(err);
//  }
//  res.json(Notetextinfo);
//});


//app.post("/api/notes", function (req, res) {
//  try {
//    Notetextinfo= fs.readFileSync("./db/db.json", "utf8");
//    console.log(Notetextinfo);
//    Notetextinfo= JSON.parse(Notetextinfo);
//    req.body.id = Notetextinfo.length;
//    Notetextinfo.push(req.body);
//    Notetextinfo= JSON.stringify(Notetextinfo);
//    fs.writeFile("./db/db.json", Notetextinfo, "utf8", function (err) {
//      if (err) throw err;
//    });

//    res.json(JSON.parse(Notetextinfo));
//  } catch (err) {
//    throw err;
//    console.error(err);
//  }
//});

//app.delete("/api/notes/:id", function (req, res) {
//  try {
//    Notetextinfo= fs.readFileSync("./db/db.json", "utf8");
 //   Notetextinfo= JSON.parse(Notetextinfo);
 //   Notetextinfo= Notetextinfo.filter(function (note) {
//      return note.id != req.params.id;
//    });
//    Notetextinfo= JSON.stringify(Notetextinfo);

//    fs.writeFile("./db/db.json", Notetextinfo, "utf8", function (err) {
//      if (err) throw err;
//    });

//    res.send(JSON.parse(Notetextinfo));
//  } catch (err) {
//    throw err;
//    console.log(err);
//  }
//});

// HTML  Requests


//app.get("/notes", function (req, res) {
//  res.sendFile(path.join(__dirname, "public/notes.html"));
//});

// If no matching route is found, then default to home
//app.get("*", function (req, res) {
 //   res.sendFile(path.join(__dirname, "public/index.html"));
    //});
    
    //app.get("/api/notes", function (req, res) {
    //  return res.sendFile(path.json(__dirname, "db/db.json"));
    //});
    
    // Start the server on the port
    //app.listen(PORT, function () {
    //  console.log("Server waits: " + PORT);
    //});
    



