const db = require("../models");
const bcrypt = require("bcryptjs");
const User = db.user;

exports.userInfo = (req, res) => {
    User.findOne({
        where: {
            id: req.user.id,
        },
    }).then((user) => {
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        res.status(200).send({
            id: user.id,
            fullname: user.fullname,
            email: user.email,
        });
    });
}

exports.userList = (req, res) => {
    User.findAll({
        attributes: ["id", "fullname", "email"],
        // order by created at
        order: [
            ["created_at", "ASC"],
        ],
    }).then((users) => {
        if (!users) {
            return res.status(404).send({ message: "Users Not found." });
        }
        res.status(200).send(users);
    });
}

exports.createOrUpdateUser = (req, res) => {
    // check request has id
    if (req.body.id) {
        // check exist email
        User.findOne({
            where: {
                email: req.body.email,
            },
        }).then((user) => {
            if (user && user.id !== req.body.id) {
                return res.status(400).send({ message: "Email already exists." });
            }
            // update user
            User.update({
                fullname: req.body.fullname,
                email: req.body.email,
                // check if password is not empty
                password: req.body.password ? bcrypt.hashSync(req.body.password, 8) : user.password,
            }, {
                where: {
                    id: req.body.id,
                },
            }).then((user) => {
                res.status(200).send(user);
            });
        });
    } else {
        // check exist email
        User.findOne({
            where: {
                email: req.body.email,
            },
        }).then((user) => {
            if (user) {
                return res.status(400).send({ message: "Email already exists." });
            }
            // create user
            User.create({
                fullname: req.body.fullname,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 8),
            }).then((user) => {
                res.status(200).send(user);
            });
        });
    }
}

exports.deleteUser = (req, res) => {
    // check if user id equal 1 deny delete
    if (req.params.id === "1") {
        return res.status(400).send({ message: "You can't delete this user." });
    }

    User.destroy({
        where: {
            id: req.params.id,
        },
    }).then((user) => {
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        res.status(200).send({ message: "User deleted successfully." });
    });
}