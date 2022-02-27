const express = require("express");
const path = require("path");
const fs = require("fs");
const port = 9000; 

    const app = express();

    app.get("/", function(req, res) {

        res.sendFile("index.html", {root: path.join(__dirname, "./pages")});
        app.use(express.static(__dirname + '/pages'));
    });


    app.get("/signup", function(req, res) {

        res.sendFile("signup.html", {root: path.join(__dirname, "./pages")});
        app.use(express.static(__dirname + '/pages'));
    });


    app.get("/feeling", function(req, res) {

        res.sendFile("feeling.html", {root: path.join(__dirname, "./pages")});
        app.use(express.static(__dirname + '/pages'));
    });


    app.get("/home", function(req, res) {

        res.sendFile("home.html", {root: path.join(__dirname, "./pages")});
        app.use(express.static(__dirname + '/pages'));
    });


app.listen(port, function() {
    console.log("Listening on port " + port);
});