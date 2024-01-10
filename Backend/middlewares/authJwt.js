const jwt = require('jsonwebtoken');
const User = require('../users/models/user.models');
const config = require('../config/auth.config');

module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    
    if(!token){
        return res.status(403).send({
            message: "token not found"
        });
    }
    const decoded = jwt.verify(token, config.secret, null);
    req.userData = decoded;
    next();
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