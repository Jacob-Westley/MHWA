const session = require("express-session");
const express = require("express");
const mysql = require("mysql");
const open = require("open");
const path = require("path");
const fs = require("fs");
const port = 9000; 

    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    // app.use(express.static(path.join(__dirname, 'static')));

    app.use(session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    }));

    //Connection to MySQL Server
    const mysqlServer = mysql.createConnection({
        host     : "localhost",
        user     : "root",
        password : "",
        database : "mental-health-web-app"
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
        res.sendFile("mindfulness.html", {root: path.join(__dirname, "./pages")});
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

    //Signup
    app.get("/signup", function(req, res) {
        res.sendFile("signup.html", {root: path.join(__dirname, "./pages")});
        app.use(express.static(__dirname + '/pages'));
    });

    app.post("/signup", function(req, res) {

        let username = req.body.username;
        let password = req.body.password;
        let email = req.body.email;
        
            mysqlServer.connect(function(err) {
                if (err) throw err;
                console.log("Connected!");
                let sql = "INSERT INTO usersdata (username, password, email) VALUES (" + "'" + username + "'" + "," + "'" + password + "'" + "," + "'" + email + "'" + ")";
                mysqlServer.query(sql, function (err, result) {
                if (err) throw err;
                console.log("New user created in database:");
                console.log("username: " + username);
                console.log("password: " + password);
                console.log("email:" + email);
                });
            });
        });

    //Login
    app.get("/login", function(req, res) {
        res.sendFile("login.html", {root: path.join(__dirname, "./pages")});
        app.use(express.static(__dirname + '/pages'));
    });

    app.post('/login', function(req, res) {

        let username = req.body.username;
        let password = req.body.password;
        
        if (username && password) {
            
            mysqlServer.query('SELECT * FROM usersdata WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
                
                if (error) throw error;
            
                if (results.length > 0) {
                
                    req.session.loggedin = true;
                    req.session.username = username;
                    
                    res.redirect('/home');
                } else {
                    res.send('Incorrect Username and/or Password!');
                }			
                res.end();
            });
        } else {
            res.send('Please enter Username and Password!');
            res.end();
        }
    });

    app.listen(port, function() {
        console.log("Listening on port " + port);
        open("http://localhost:9000/login");
    });