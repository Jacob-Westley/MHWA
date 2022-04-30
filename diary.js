const session = require("express-session");
const express = require("express");
const mysql = require("mysql");
const open = require("open");
const path = require("path");
const fs = require("fs");
const port = 8000; 

    let usernamex = require("./index.js");

    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, 'static')));

    //View engine Setup
    app.set("views", path.join(__dirname + '/views'));
    app.set("view engine", "ejs");

    //Render HTML Files
    app.engine("html", require("ejs").renderFile);

    //Diary
    app.get("/diarycreation", function(req, res) {
        res.render("diarycreation2.html", {root: path.join(__dirname, "./views")});
        app.use(express.static(__dirname + '/views'));
    });

    app.post("/diarycreation", function(req, res) {

        let diaryentry = req.body.diaryentry;
        
            mysqlServer.connect(function(err) {
                if (err) throw err;
                console.log("Connected!");

                let sql = "INSERT INTO usersdiaries (username, diarytext) VALUES (" + username + "," + diaryentry + ")";
                mysqlServer.query(sql, function (err, result) {
                if (err) throw err;
                console.log("New diary entry created in database:");
                console.log(username);
                console.log(diaryentry);                
                });
            });
        });

    app.get("/diaryview", function(req, res) {
        res.render("diaryview.html", {root: path.join(__dirname, "./views")});
        app.use(express.static(__dirname + '/views'));
    });

    //Listen on Port 8000
    app.listen(port, function() {
        console.log("Listening on port " + port);
        open("http://localhost:9000/login");
    });