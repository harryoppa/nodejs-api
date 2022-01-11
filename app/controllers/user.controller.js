const db = require("../models");
const bcrypt = require("bcryptjs");
const User = db.user;

exports.userInfo = async (ctx) => {
    
    const user = await User.findOne({
        where: {
            id: ctx.user.id,
        },
    });

    if (!user) {
        ctx.status = 404;
        ctx.body = {
            message: "User Not found.",
        };
        return;
    }

    ctx.body = {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
    };
}

exports.userList = async (ctx) => {
    const users = await User.findAll({
        attributes: ["id", "fullname", "email"],
        // order by created at
        order: [
            ["created_at", "ASC"],
        ],
    });

    if (!users) {
        ctx.status = 404;
        ctx.body = {
            message: "Users Not found.",
        };
        return;
    }
    
    ctx.body = users;
}

exports.createOrUpdateUser = async (ctx) => {
    // check request has id
    if (ctx.request.body.id) {
        // check exist email
        const userExist = await User.findOne({
            where: {
                email: ctx.request.body.email,
            },
        })

        if (userExist && userExist.id !== ctx.request.body.id) {
            ctx.status = 400;
            ctx.body = {
                message: "Email already exists.",
            };
        }
        // update user
        const user = await User.update({
            fullname: ctx.request.body.fullname,
            email: ctx.request.body.email,
            // check if password is not empty
            password: ctx.request.body.password ? bcrypt.hashSync(ctx.request.body.password, 8) : userExist.password,
        }, {
            where: {
                id: ctx.request.body.id,
            },
        });

        if (!user) {
            ctx.status = 404;
            ctx.body = {
                message: "User Not found.",
            };
        } else {
            ctx.status = 200;
            ctx.body = user;
        }

    } else {
        // check exist email
        const user = await User.findOne({
            where: {
                email: ctx.request.body.email,
            },
        });

        if (user) {
            ctx.status = 400;
            ctx.body = {
                message: "Email already exists.",
            };
        } else {

            // create user
            const user = await User.create({
                fullname: ctx.request.body.fullname,
                email: ctx.request.body.email,
                password: bcrypt.hashSync(ctx.request.body.password, 8),
            });

            if (!user) {
                ctx.status = 404;
                ctx.body = {
                    message: "User Not found.",
                };
            } else {
                // return res.status(200).send(user);
                ctx.status = 200;
                ctx.body = user;
            }
        }
    }
}

exports.deleteUser = async (ctx) => {
    // check if user id equal 1 deny delete
    if (ctx.params.id === "1") {
        ctx.status = 400;
        ctx.body = {
            message: "You can't delete this user.",
        };
        return;
    }

    const user = await User.destroy({
        where: {
            id: ctx.params.id,
        },
    });

    if (!user) {
        ctx.status = 404;
        ctx.body = {
            message: "User Not found.",
        };
    }

    ctx.status = 200;
    ctx.body = {
        message: "User deleted successfully.",
    };
}