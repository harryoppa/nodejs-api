const jwt = require("jsonwebtoken");
const config = require("../config/config.js");

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;

        console.log('verify now', req.token);

        jwt.verify(req.token, config.auth.secret, (err, authData) => { // authData is the decoded token
            if (err) {
                res.status(401).send({
                    message: "Unauthorized!"
                });
            } else {
                req.user = {
                    id: authData.id,
                };
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