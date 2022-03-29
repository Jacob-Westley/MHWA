const express = require("express");
const path = require("path");
const fs = require("fs");
const port = 9000; 

    const app = express();

    app.get("/", function(req, res) {

        res.sendFile("index.html", {root: path.join(__dirname, "./pages")});
        app.use(express.static(__dirname + '/pages'));
    });

    app.get("/about", function(req, res) {

        res.sendFile("about.html", {root: path.join(__dirname, "./pages")});
        app.use(express.static(__dirname + '/pages'));
    });

    app.get("/home", function(req, res) {

        res.sendFile("home.html", {root: path.join(__dirname, "./pages")});
        app.use(express.static(__dirname + '/pages'));
    });

    app.get("/breathing", function(req, res) {

        res.sendFile("breathing.html", {root: path.join(__dirname, "./pages")});
        app.use(express.static(__dirname + '/pages'));
    });

    app.get("/mindfulness", function(req, res) {

        res.sendFile("minfulness.html", {root: path.join(__dirname, "./pages")});
        app.use(express.static(__dirname + '/pages'));
    });

    app.get("/diarycreation", function(req, res) {

        res.sendFile("diarycreation.html", {root: path.join(__dirname, "./pages")});
        app.use(express.static(__dirname + '/pages'));
    });

    app.get("/diaryview", function(req, res) {

        res.sendFile("diaryview.html", {root: path.join(__dirname, "./pages")});
        app.use(express.static(__dirname + '/pages'));
    });

    app.get("/signup", function(req, res) {

        res.sendFile("signup3.html", {root: path.join(__dirname, "./pages")});
        app.use(express.static(__dirname + '/pages'));
    });

    app.post("/", function(req, res) {

        let directoryIn = req.body.directoryIn;
        console.log(directoryIn);
      
    });


app.listen(port, function() {
    console.log("Listening on port " + port);
});