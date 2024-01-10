const User = require('../users/models/user.models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

var getUsers = (req, res) => {
    User.find()
        .exec()
        .then (users => {
            if(!users){
                return res.status(404).json({
                    message: 'Users not found'
                })
            }
            const numUsers = users.length;
            const result = users;
            res.status(200).json({
                totalUsers: numUsers,
                user: result.map(eachUser => {
                    return {
                        username: eachUser.username,
                        email: eachUser.email,
                        request: {
                            type: 'Get',
                            url: 'http://localhost:4000/api/auth/users' + eachUser._id
                        }
                    }
                })
            })
        })
        .catch(err => {
            return res.status(404).json({
                error: err
            })
        })
}

var signUp = async (req, res, next) => {
    // const user = req.body;
    User.find({email: req.body.email})
    .exec()
    .then(users => {
        if(users.length >= 1){
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
    })
}

var signIn = (req, res, next) => {
    // console.log('inside signin controller');
    User.find({email: req.body.email})
        .exec()
        .then(user => {
            console.log(user);
            if(user.length < 1){
                res.status(401).json({
                    message: "E-mail is not registered"
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if(err){
                    return res.status(500).json({
                        message: 'Auth Failed'
                    });
                }
                if(result){
                    const token = jwt.sign({
                        userId: user[0].id
                    },
                    config.secret, {
                        expiresIn: "1h"
                    });
                    res.status(200).json({
                        message: "User Found",
                        user_token: token
                    });
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
    getUsers,
    signUp,
    signIn
}