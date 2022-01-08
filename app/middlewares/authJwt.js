const jwt = require("jsonwebtoken");
const config = require("../config/config.js");

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;

        jwt.verify(req.token, config.secret, (err, authData) => { // authData is the decoded token
            if (err) {
                res.status(401).send({
                    message: "Unauthorized!"
                });
            } else {
                req.authData = authData;
                next();
            }
        });
    } else {
        if (req.xhr) {
            res.status(403).send({
                message: "No token provided!"
            });
        } else {
            res.redirect('/login');
        }
    }
};

module.exports = {
    verifyToken,

}