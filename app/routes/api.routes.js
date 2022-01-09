module.exports = (app) => {
    const authController = require('../controllers/auth.controller');
    const userController = require('../controllers/user.controller');
    const authJwt = require('../middlewares/authJwt');

    const router = require("express").Router();

    // login post api
    router.post('/login', authController.login);

    // user infor get api
    router.get('/user', authJwt.verifyToken, userController.userInfo);

    // user list get api
    router.get('/users', authJwt.verifyToken, userController.userList);

    // user create or update post api
    router.put('/users', authJwt.verifyToken, userController.createOrUpdateUser);

    // user delete post api
    router.delete('/users/:id', authJwt.verifyToken, userController.deleteUser);

    app.use('/api/v1', router);
}