const jwt = require('jsonwebtoken');
const User = require('../users/models/user.models');
const config = require('../config/auth.config');

module.exports = (req, res, next) => {
    const token = req.session.token;

    if(!token){
        return res.status(403).send({
            message: "token not found"
        });
    }

    jwt.verifyToken(token, config.secret, (err, decoded) => {
        if(err){
            return res.status(401).send({
                message: err
            });
        } else {
            req.userData = decoded.id;
            console.log(decoded.id);
            next();
        }
    });
}