module.exports = (app) => {
    const authController = require('../controllers/auth.controller');

    const router = require("express").Router();

    // login post api
    router.post('/login', authController.login);

    

    app.use('/api/v1', router);
}