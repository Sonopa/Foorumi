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
            let token = jwt.sign({id: users[i].id, username: users[i].username}, config.secret, {expiresIn: 600})
            let session = {
                username: users[i].username,
                id: users[i].id,
                token: token
            }
            loggedSessions.push(session);
            return res.status(200).json({token:token});
        }
    }
    return res.status(403).json({message:"Failed login"});
});

app.get("/users", function(req, res) {
    tempUsers = [];
    for(let i = 0; i < users.length; i++) {
        let user = {
            username: users[i].username,
            name: users[i].name,
            id: users[i].id
        }
        tempUsers.push(user);
    }
    return res.status(200).json(tempUsers);
});

app.get("/users/:id", function(req, res) {
    for(let i = 0; i < users.length; i++) {
        if (parseInt(req.params.id, 10) === users[i].id)
        let user = {
            username: users[i].username,
            id: users[i].id,
            name: users[i].name
        }
        return res.status(200).json(user);
    }
    return res.status(404).json({message: "User not found"});
});

//TODO:  Update user
app.post("/users/:id", middleware.checkToken, function (req, res) {
    let id = parseInt(req.params.id, 10);
    // Check that id is the same as the id of the logged in user
    if (id === req.decoded.id) {
        for (let i = 0; i < users.length; i++) {
            if (id === users[i].id) {
                modifiedUser = {
                    id: users[i].id,
                    username: req.body.username || users[i].username,
                    password: req.body.password || users[i].password,
                    name: req.body.name || users[i].name
                }
                users[i] = modifiedUser;
                return res.status(200).json({message:"User modified"});
            }
        }
    } else {
        return res.status(403).json({message:"Forbidden"})
    }
})

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