const bcrypt = require('bcrypt');

var User = require('../models/user');

const validator = require('express-validator');

exports.user_create_post = [
    validator.body('username', 'Username required').trim().isLength({ min: 1 }),
    validator.body('password', 'Password required, minimum length 8').trim().isLength({ min: 8 }),
    //TODO: Add validators/sanitizers

    validator.sanitizeBody('username').escape(),
    validator.sanitizeBody('password').escape(),
    validator.sanitizeBody('name').escape(),

    (req, res) => {
        const errors = validator.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Validation error', errors: errors })
        }

        bcrypt.hash(req.body.password, 10, function(err, hash) {
            if(err) {
                console.log("Failed to hash password. Reason: " + err);
                return res.status(422).json({ message: "Something is wrong with provided credentials" })
            }

            let user = new User({
                username:req.body.username,
                password:hash,
                name:req.body.name
            })

            user.save(function(err, user) {
                if(err) {
                    console.log("Registration failed. Reason: " + err);
                    return res.status(422).json({ message: "Username already exists" })
                } else {
                    console.log("User created");
                    return res.status(200).json({ message: "Registration successful!" });
                }
            })
        })
    }
]

exports.user_update_put = [
    validator.body('password', 'Password required').trim().isLength({ min: 1 }),
    //TODO: Add validators/sanitizers

    validator.sanitizeBody('name').escape(),
    validator.sanitizeBody('password').escape(),

    (req, res) => {
        if (req.params.id !== req.decoded.id) {
            return res.status(403).json({message: 'Forbidden'})
        }
        const errors = validator.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Validation error', errors: errors })
        }

        bcrypt.hash(req.body.password, 10, function(err, hash) {
            if (err) {
                console.log("Failed to hash password. Reason: " + err);
                return res.status(422).json({ message: "Something is wrong with provided credentials" })
            }

            updatedUser = {
                password: hash,
                name: req.body.name
            }

            User.findOneAndUpdate({'_id': req.params.id}, updatedUser, {new: true}, function(err, user) {
                if (err) {
                    return res.status(500).json( { error: err } );
                }
                return res.status(200).json('User updated');
            })
        })
    }
]

exports.user_delete = [
    validator.body('id').custom((value, { req }) => {
        if (value !== req.decoded.id) {
          throw new Error("User id doesn't match");
        }
        return true;
    }),

    (req, res) => {
        const errors = validator.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Validation error', errors: errors })
        }

        User.findByIdAndDelete(req.params.id, function(err) {
            if (err) {
                return res.status(404).json({message:"User not found" + err})
            } else {
                return status(200).json({message:"User deleted"})
            }
        })
    }
]

exports.user_get = function(req, res) {
    User.findById(req.params.id, 'username name', function(err, user) {
        if (err) {
            return res.status(500).json({message:"User search failed: " + err})
        }
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        } else {
            return res.status(200).json(user)
        }
    })
}

exports.user_list_get = function(req, res) {
    User.find({}, 'username name', function(err, users) {
        if (err) {
            return res.status(500).json({message:"User search failed: " + err})
        } 
        if (!users) {
            return res.status(404).json({ message: 'Users not found' })
        } else {
            return res.status(200).json(users);
        }
    })
}