const jwt = require("jsonwebtoken");
const config = require("../config/config.js");

// verify token middleware
const verifyToken = async (ctx, next) => {
    console.log('url', ctx.url);
    // if url has login, skip verification
    if (ctx.url.includes("/login")) {
        await next();
        return;
    }

    // get token from header
    const bearerHeader = ctx.request.header.authorization;
    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        ctx.token = bearerToken;
        // verify token
        await jwt.verify(ctx.token, config.auth.secret, async (err, authData) => {
            if (err) {
                ctx.status = 401;
                ctx.body = {
                    message: "Unauthorized!"
                };
            } else {
                ctx.user = {
                    id: authData.id,
                };
                await next();
            }
        });
    } else {
        // if xhr
        if (ctx.request.header["x-requested-with"] === "XMLHttpRequest") {
            ctx.status = 403;
            ctx.body = {
                message: "No token provided!"
            };
        } else {
            ctx.redirect("/login");
        }
    }
}

module.exports = {
    verifyToken,

}