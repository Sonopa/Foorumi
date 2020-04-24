const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config.js');
const jwt = require('jsonwebtoken');
const middleware = require('./middleware');
const topicrouter = require('./routes/topicrouter')


let app = express();
let port = process.env.PORT || 3001;

app.use(bodyParser.json());

let user_id = 1;

// USER DB
const users = [];

// SESSION MANAGEMENT

const loggedSessions = [];
const time_to_live = 1000*60*5;

// LOGIN API

app.post("/register", function(req, res) {
    if (!req.body) {
        return res.status(422).json({message:"Missing valid credentials"})
    }
    if (!req.body.username || !req.body.password) {
        return res.status(422).json({message:"Missing valid credentials"})
    }
    if (req.body.username.length < 3 || req.body.password.length < 8) {
        return res.status(422).json({message:"Missing valid credentials"})
    }
    for (let i = 0; i < users.length; i++) {
        if (req.body.username === users[i].username) {
            return res.status(409).json({message:"Username not available"})
        }
    }

    let user = {
        id: user_id,
        username:req.body.username,
        password:req.body.password,
        name:req.body.name
    }
    users.push(user);
    user_id++;
    return res.status(200).json({message:"Registration successful"})
});

app.post("/login", function(req, res) {
    if (!req.body) {
        return res.status(422).json({message:"Missing valid credentials"})
    }
    if (!req.body.username || !req.body.password) {
        return res.status(422).json({message:"Missing valid credentials"})
    }
    if (req.body.username.length < 3 || req.body.password.length < 8) {
        return res.status(422).json({message:"Missing valid credentials"})
    }
    for (let i = 0; i < users.length; i++) {
        if (req.body.username === users[i].username && req.body.password === users[i].password) {
            //TODO: Change config.secret to an env variable
            let token = jwt.sign({username: req.body.username}, config.secret, {expiresIn: 60})
            let session = {
                username: users[i].username,
                token: token
            }
            loggedSessions.push(session);
            return res.status(200).json({token:token})
        }
    }
    return res.status(403).json({message:"Failed login"})
});

app.post("/logout", function(req, res) {
    let username = req.body.username;
    for (let i = 0; i < loggedSessions.length; i++) {
        if (username === loggedSessions[i].username) {
            loggedSessions.splice(i, 1);
            return res.status(200).json({message:"Logged out"})
        }
    }
    return res.status(404).json({message:"Session not found"})
});

app.use("/api", topicrouter);

app.listen(port);

console.log("Running on port " + port);