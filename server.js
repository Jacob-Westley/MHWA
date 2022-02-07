const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 9000; 


app.get("/", function(req, res) {

    res.sendFile("login.html", {root: path.join(__dirname, "./pages")});
    app.use(express.static(__dirname + '/pages'));
});



app.get("/createAccount", function(req, res) {

    res.sendFile("signup.html", {root: path.join(__dirname, "./pages")});
    app.use(express.static(__dirname + '/pages'));
});



app.post("/createAccount", function(req, res) {

    let usernameIn = req.body.userName;
    let emailaddressIn = req.body.emailAddress;
    let passwordIn = req.body.passWord;
    let confirmedpasswordIn = req.body.confirmedPassword;

    const mongoose = require("mongoose");

    mongoose.connect("mongodb://localhost/MHWA")
        .then(() => console.log("Connected to mongoDB..."))
        .catch(err => console.error("Could not connect to MongoDB...", err));
    
        const userSchema = new mongoose.Schema({
            username: String,
            emailaddress: String,
            password: String,
            confirmedpassword: String

        });
    
    const User = mongoose.model("usercredentials", userSchema);
    
    async function getUsers(){
        const users = await User
        .find({ username: usernameIn, emailAddress: emailaddressIn, password: passwordIn, confirmedPassword: confirmedpasswordIn})
        .limit(1)
        console.log(users);
    }

    getUsers();

    if(!users) {

        res.redirect("http://localhost:9000/login");
        console.log("Incorrect username or password");

    } 
    else 
    { 
        res.redirect("http://localhost:9000/home");
    }
});


app.listen(port, function() {
    console.log("Listening on port " + port);
});