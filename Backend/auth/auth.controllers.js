const User = require('../users/models/user.models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

var signUp = async (req, res, next) => {
    // const user = req.body;
    const user = await User.find({email: req.body.email});
    if(user.length >= 1){
        res.status(409).json({
            message: "User exists"
        });
    } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if(err){
                return res.status(500).json({
                    error: err
                });
            } else {
                const newUser = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: hash
                });
                newUser.save()
                    .then(result => {
                        console.log(result);
                        res.status(201).send("new user created successfully.");
                    })
                    .catch(err =>{
                        res.status(500).json({
                            error: err
                        })
                    })
            }
        })
    }
}

var signIn = (req, res, next) => {
    User.find({email: req.body.email})
        .exec()
        .then(user => {
            if(user.length < 1){
                res.status(401).json({
                    message: "E-mail is not registered"
                })
            }
            bcrypt.compare(req.body.password, user[0].hash, (err, result) => {
                if(err){
                    return res.status(500).json({
                        message: 'Auth Failed'
                    });
                }
                if(result){
                    const token = jwt.sign({
                        email: user[0].email
                    },
                    config.secret, {
                        expiresIn: "1h"
                    })
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

module.exports = {
    signUp,
    signIn
}