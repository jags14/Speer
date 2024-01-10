const jwt = require('jsonwebtoken');
const User = require('../users/models/user.models');
const config = require('../config/auth.config');

module.exports = (req, res, next) => {
    const token = req.header('Authorization');
    
    if(!token){
        return res.status(401).send({
            message: "Unauthorized"
        });
    }
    try {
        const decoded = jwt.verify(token, config.secret);
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({message: 'Token is not Valid'})
    }
    // jwt.verifyToken(token, config.secret, (err, decoded) => {
    //     if(err){
    //         return res.status(401).send({
    //             message: err
    //         });
    //     } else {
    //         req.userData = decoded.id;
    //         console.log(decoded.id);
    //         next();
    //     }
    // });
}