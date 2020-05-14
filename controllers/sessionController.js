const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var Session = require('../models/session');
var User = require('../models/user');
var config = require('../config')


exports.login_post = function(req, res) {
    if (!req.body) {
        return res.status(422).json({message:"Missing valid credentials"})
    }
    if (!req.body.username || !req.body.password) {
        return res.status(422).json({message:"Missing valid credentials"})
    }
    if (req.body.username.length < 3 || req.body.password.length < 8) {
        return res.status(422).json({message:"Missing valid credentials"})
    }
    user = User.findOne({'username':req.body.username}, function(err, user) {
        if (err) {
            return res.status(404).json({message:'Wrong username or password'})
        }
        if (!user) {
            return res.status(404).json({message:'Wrong username or password'})
        } else {
            bcrypt.compare(req.body.password, user.password, function(err, result) {
                if (err) {
                    return res.status(404).json({message:'Wrong username or password'}) 
                }
                if (result) {
                    // TODO: Check here if a valid token already exists for the user
                    let token = jwt.sign({id: user.id, username: user.username, role:user.role}, config.secret, {expiresIn: 6000})
                    let session = new Session ({
                        username: user.username,
                        user_id: user._id,
                        token: token
                    })
                    session.save(function(err, session) {
                        if(err) {
                            console.log("Login failed. Reason: " + err);
                            return res.status(422).json({ message: "Failed login: " + err })
                        } else {
                            console.log("Logged in");
                            return res.status(200).json({ session });
                        }
                    })
                } else {
                    return res.status(404).json({message:'Wrong username or password'})  
                }
            });
        }
    })
}

exports.logout_post = function(req, res) {
    Session.findOneAndDelete({'token':req.authorization}, function(err) {
        if (err) {
            return res.status(404).json({message: 'Session not found'})
        } else {
            return res.status(200).json({message: 'Logged out'})
        }
    })
}