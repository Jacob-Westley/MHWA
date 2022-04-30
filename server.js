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
    app.use(express.static(path.join(__dirname, 'static')));

    //View engine Setup
    app.set("views", path.join(__dirname + '/views'));
    app.set("view engine", "ejs");

    //Render HTML Files
    app.engine("html", require("ejs").renderFile);

    //Session
    app.use(session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    }));

    //Connection to MySQL Server
    let mysqlServer = mysql.createConnection({
        host     : "localhost",
        user     : "root",
        password : "",
        database : "mental-health-web-app"
    });

    //Login
    app.get("/login", function(req, res) {
        res.render("login.html", {root: path.join(__dirname, "./views")});
        app.use(express.static(__dirname + '/views'));
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
                    console.log(req.session.username + " Logged in.");
                } else {
                    res.redirect('/invalid-login');
                }			
                res.end();
            });
        } else {
            res.send('Please enter Username and Password!');
            res.end();
        }
    });

    //Invalid Login
    app.get("/invalid-login", function(req, res) {
        res.render("invalid-login.html", {root: path.join(__dirname, "./views")});
        app.use(express.static(__dirname + '/views'));
    });

    //Signup
    app.get("/signup", function(req, res) {
        res.render("signup.html", {root: path.join(__dirname, "./views")});
        app.use(express.static(__dirname + '/views'));
    });

    //Invalid Signup
    app.get("/invalid-signup", function(req, res) {
        res.render("invalid-signup.html", {root: path.join(__dirname, "./views")});
        app.use(express.static(__dirname + '/views'));
    });

    app.post("/signup", function(req, res, usernamex) {

        let username = req.body.username;
        let password = req.body.password;
        let email = req.body.email;

        if (username && password && email) {
        
            // mysqlServer.connect(function(err) {
                // if (err) throw err;
                // console.log("Connected!");
                // let sql = "INSERT INTO usersdata (username, password, email) VALUES (" + "'" + username + "'" + "," + "'" + password + "'" + "," + "'" + email + "'" + ")";
                mysqlServer.query("INSERT INTO usersdata (username, password, email) VALUES (" + "'" + username + "'" + "," + "'" + password + "'" + "," + "'" + email + "'" + ")", function (err, result) {
                // if (err) throw err;
                console.log("New user created in database:");
                console.log("username: " + username);
                console.log("password: " + password);
                console.log("email:" + email);

                let usernamex = req.session.username;
                    
                });
            // });
        } else { 
            res.redirect('/invalid-signup');
        }
        });


    app.get("/about", function(req, res) {
        res.render("about.html", {root: path.join(__dirname, "./views")});
        app.use(express.static(__dirname + '/views'));
    });

    app.get("/home", function(req, res) {
        res.render("home.html", {usernamex: req.session.username});
        app.use(express.static(__dirname + '/views'));
    });

    app.get("/breathing", function(req, res) {
        res.render("breathing.html", {usernamex: req.session.username});
        app.use(express.static(__dirname + '/views'));
    });

    app.get("/mindfulness", function(req, res) {
        res.render("mindfulness.html", {usernamex: req.session.username});
        app.use(express.static(__dirname + '/views'));
    });

    app.get("/meditation-let-go", function(req, res) {
        res.render("meditation-let-go.html", {usernamex: req.session.username});
        app.use(express.static(__dirname + '/views'));
    });

    app.get("/meditation-be-present", function(req, res) {
        res.render("meditation-be-present.html", {usernamex: req.session.username});
        app.use(express.static(__dirname + '/views'));
    });
    
    
    // module.exports = usernamex;
    //Listen on Port 9000
    app.listen(port, function() {
        console.log("Listening on port " + port);
        open("http://localhost:9000/login");
    });