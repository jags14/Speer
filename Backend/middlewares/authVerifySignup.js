const User = require('../users/models/user.models');

function verifySignup(req, res, next){
    // verify if email is unique
    User.find({email: req.body.email})
        .then((err, user) => {
            if(err){
                res.status(500).json({
                    message: 'Internal server error'
                });
                return;
            }
            if(user){
                res.status(400).send("Email already exists");
                return;
            } else {
                next();
            }
        })
    // verify the username

}

module.exports = verifySignup;