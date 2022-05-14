const exphbs = require("express-handlebars");
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
    app.use(express.static(__dirname + '/public')); // Allows access to public CSS and JS files.

    let engines = require('consolidate');

    //View engine Setup
    app.set("views", path.join(__dirname + '/views'));
    app.set("view engine", "ejs");

    //Render HTML Files
    app.engine(".html", require("ejs").renderFile);

    // Handlebars Templating Engine
    const handlebars = exphbs.create({ extname: '.hbs', });
    app.engine('.hbs', handlebars.engine);
    app.set('view engine', '.hbs');

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

    // Initial Connection
    app.get("/", function(req, res) {
        console.log("New client connected");
        res.redirect("/login");
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

    app.post("/signup", function(req, res) {
        let username = req.body.username;
        let password = req.body.password;
        let email = req.body.email;
        if (username && password && email) {
                mysqlServer.query("INSERT INTO usersdata (username, password, email) VALUES (" + "'" + username + "'" + "," + "'" + password + "'" + "," + "'" + email + "'" + ")", function (err, result) {
                console.log("New user created in database:");
                console.log("username: " + username);
                console.log("email:" + email);
                req.session.loggedin = true;
                req.session.username = username;
                console.log(req.session.username + " Logged in.");
                res.redirect('/home');
                });
        } else { 
            res.redirect('/invalid-signup');
        }
        });

    //About
    app.get("/about", function(req, res) {
        res.render("about.html", {root: path.join(__dirname, "./views")});
        app.use(express.static(__dirname + '/views'));
    });

    //Home
    app.get("/home", function(req, res) {

        if (req.session.loggedin = true && req.session.username) {
            res.render("home.html", {usernamex: req.session.username});
            app.use(express.static(__dirname + '/views'));
        } else {
            res.redirect('/login');
        }

    });

    //Breathing Exercise
    app.get("/breathing", function(req, res) {

        if (req.session.loggedin = true && req.session.username) {
            res.render("breathing.html", {usernamex: req.session.username});
            app.use(express.static(__dirname + '/views'));
        } else {
            res.redirect('/login');
        }

    });

    //Mindfulness
    app.get("/mindfulness", function(req, res) {

        if (req.session.loggedin = true && req.session.username) {
            res.render("mindfulness.html", {usernamex: req.session.username});
        app.use(express.static(__dirname + '/views'));
        } else {
            res.redirect('/login');
        }

    });

    //Meditation Let Go
    app.get("/meditation-let-go", function(req, res) {

        if (req.session.loggedin = true && req.session.username) {
            res.render("meditation-let-go.html", {usernamex: req.session.username});
            app.use(express.static(__dirname + '/views'));
        } else {
            res.redirect('/login');
        }

    });

    //Meditation Be Present
    app.get("/meditation-be-present", function(req, res) {

        if (req.session.loggedin = true && req.session.username) {
            res.render("meditation-be-present.html", {usernamex: req.session.username});
        app.use(express.static(__dirname + '/views'));
        } else {
            res.redirect('/login');
        }

    });

    //Diary View
    app.get("/diary-view", function(req, res) {

        if (req.session.loggedin = true && req.session.username) {
            res.render("diaryview.html", {usernamex: req.session.username});
        app.use(express.static(__dirname + '/views'));
        } else {
            res.redirect('/login');
        }
    });

    //Diary Creation
    app.get("/diary-creation", function(req, res) {

        if (req.session.loggedin = true && req.session.username) {
            res.render("diary-creation.html", {usernamex: req.session.username});
        app.use(express.static(__dirname + '/views'));
        } else {
            res.redirect('/login');
        }
    });

    //Diary
    app.post("/diary-creation", function(req, res) {

        let username = req.session.username;
        let feeling = req.body.feeling;
        let diary = req.body.diary;

        if (username && feeling && diary) {
                
                mysqlServer.query("INSERT INTO usersdiaries (username, feeling, diary) VALUES (" + "'" + username + "'" + "," + "'" + feeling + "'" + "," + "'" + diary + "'" + ")", function (err, result) {
                console.log(username + " created a new diary");
                console.log("Feeling: " + diary);
                console.log("Diary: " + feeling);                
                res.send("Diary Entry Created Succesfully: " + "Feeling: " + feeling + "Diary: " + diary);            
                });
        } else { 
            res.send("Diary not uploaded."); 
            console.log("error");
            console.log("Feeling: " + diary);
            console.log("Diary: " + feeling);                           
        }
        });

    //Logout
    app.get("/logout", function(req, res) {
        req.session.loggedin = false;         
        console.log(req.session.username + " Logged out"); 
        req.session.username = "";    
        res.redirect('/login');
    });

    //Logged in Test
    app.get("/logged-in-test", function(req, res) {
        
        if (req.session.loggedin = true && req.session.username) {
            res.send("Hi, " + req.session.username);
        } else {
            res.send("Not logged in");
        }
    });

    //Account Management
    app.get("/account-management", function(req, res) {

        if (req.session.loggedin = true && req.session.username) {
            res.render("account-management.html", {usernamex: req.session.username});
            app.use(express.static(__dirname + '/views'));
        } else {
            res.redirect('/login');
        }
    });

    //Delete account
    app.get("/delete-account", function(req, res) {

        if (req.session.loggedin = true && req.session.username) {
            res.render("delete-account.html", {usernamex: req.session.username});
            app.use(express.static(__dirname + '/views'));
        } else {
            res.redirect('/login');
        }
    });

    app.post("/delete-account", function(req, res) {      
        let username = req.session.username;
                mysqlServer.query("DELETE FROM usersdata WHERE username = " + "'" + req.session.username + "'", function (err, result) {
                console.log(username + " deleted their account");                                
                });

                mysqlServer.query("DELETE FROM usersdiaries WHERE username = " + "'" + req.session.username + "'", function (err, result) {
                console.log("All diary entries belonging to " + username + " have been erased.");
                // res.send("Account and all diary entries deleted.");
                res.redirect("/deleted-account");
                req.session.loggedin = false;         
                console.log(req.session.username + " Logged out"); 
                req.session.username = ""; 
                });
            });

    //Deleted account
    app.get("/deleted-account", function(req, res) {

            res.render("deleted-account.html", {usernamex: req.session.username});
            app.use(express.static(__dirname + '/views'));
    });
      
    //Change Password
    app.get("/change-password", function(req, res) {

        if (req.session.loggedin = true && req.session.username) {
            res.render("change-password.html", {usernamex: req.session.username});
            app.use(express.static(__dirname + '/views'));
        } else {
            res.redirect('/login');
        }
    });

    app.post("/change-password", function(req, res) {
        let username = req.session.username;
        let newpassword = req.body.newpassword;
        if (newpassword) {        
                mysqlServer.query("UPDATE usersdata SET password = " + "'" + newpassword + "'" + "WHERE username = " + "'" + req.session.username + "'", function (err, result) {
                console.log(username + " updated their password");
                res.redirect('/changed-password');              
                });
        } else {             
            res.send("Unable to change password.");
        }
        });

    //Changed Password
    app.get("/changed-password", function(req, res) {

        if (req.session.loggedin = true && req.session.username) {
            res.render("changed-password.html", {usernamex: req.session.username});
            app.use(express.static(__dirname + '/views'));
        } else {
            res.redirect('/login');
        }
    });

    // Change Username
    app.get("/change-username", function(req, res) {

        if (req.session.loggedin = true && req.session.username) {
            res.render("change-username.html", {usernamex: req.session.username});
            app.use(express.static(__dirname + '/views'));
        } else {
            res.redirect('/login');
        }
    });

    app.post("/change-username", function(req, res) {
        let username = req.session.username;
        let newusername = req.body.newusername;
        if (newusername) {            
                mysqlServer.query("UPDATE usersdata SET username = " + "'" + newusername + "'" + "WHERE username = " + "'" + req.session.username + "'", function (err, result) {
                console.log(username + " renamed to " + newusername);
                req.session.username = newusername;
                res.redirect('/changed-username');                
                });
        } else {             
            res.send("Unable to change username.");
        }
        });

    // Changed Username
    app.get("/changed-username", function(req, res) {

        if (req.session.loggedin = true && req.session.username) {
            res.render("changed-username.html", {usernamex: req.session.username});
            app.use(express.static(__dirname + '/views'));
        } else {
            res.redirect('/login');
        }
    });


    //Diary
    app.get('/diary', function (req, res) {

      if (req.session.loggedin = true && req.session.username) {
        mysqlServer.query('SELECT * FROM usersdiaries WHERE username = ' + '"' + req.session.username + '"', (err, rows) => {
          
              let removedEntry = req.query.removed;
              res.render('diary.hbs', { rows, removedEntry, usernamex: req.session.username});
          });
          } else {
            res.redirect('/login');
        }
      });
 
    //Add Entry
    app.get('/addentry', function (req, res) {

        if (req.session.loggedin = true && req.session.username) {
            res.render('add-entry.hbs', {usernamex: req.session.username});        
        } else {
          res.redirect('/login');
        }
    });

    app.post('/addentry', function (req, res) {
        // res.render('add-entry.hbs');
        let username = req.session.username;
        const { id, feeling, diary } = req.body;
        mysqlServer.query('INSERT INTO usersdiaries SET username = ?, feeling = ?, diary = ?', [username, feeling, diary], (err, rows) => {
            res.redirect('/diary');
        });
      });

    //Edit Entry
    app.get('/editentry/:id', function (req, res) {

        if (req.session.loggedin = true && req.session.username) {
          mysqlServer.query('SELECT * FROM usersdiaries WHERE id = ?', [req.params.id], (err, rows) => {
              res.render('edit-entry.hbs', { rows, usernamex: req.session.username });
          });
        } else {
          res.redirect('/login');
      }
        });

    app.post('/editentry/:id', function (req, res) {
        let username = req.session.username;
        const { id, feeling, diary } = req.body;
        mysqlServer.query('UPDATE usersdiaries SET username = ?, feeling = ?, diary = ? WHERE id = ?', [username, feeling, diary, req.params.id], (err, rows) => {
      
            res.redirect('/diary');
           
        });
      });
     
    //View Entry
    app.get('/viewentry/:id', function (req, res) {
        
        if (req.session.loggedin = true && req.session.username) {
            mysqlServer.query('SELECT * FROM usersdiaries WHERE id = ?', [req.params.id], (err, rows) => {         
                res.render('view-entry.hbs', { rows, usernamex: req.session.username });
            });
        } else {
            res.redirect('/login');
        }
    });

    //Delete Entry
    app.get('/:id', function (req, res) {
        if (req.session.loggedin = true && req.session.username) {
          let username = req.session.username;
          const { id, feeling, diary } = req.body;
        
          mysqlServer.query('DELETE FROM usersdiaries WHERE id = ?', [req.params.id], (err, rows) => {
              res.redirect('/diary');   
          });
        } else {
          res.redirect('/login');
        }
        });

    //Listen on Port 9000
    app.listen(port, function() {
        console.log("Listening on port " + port);
        open("http://localhost:9000");
    });