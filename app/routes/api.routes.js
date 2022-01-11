const Router = require('@koa/router');
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const authJwt = require('../middlewares/authJwt');

module.exports = (app) => {
    

    const router = new Router();

    router.use(authJwt.verifyToken);

    // login post api
    router.post('/login', authController.login);

    // user infor get api
    router.get('/user', userController.userInfo);

    // user list get api
    router.get('/users', userController.userList);

    // user create or update post api
    router.put('/users', userController.createOrUpdateUser);

    // user delete post api
    router.delete('/users/:id', userController.deleteUser);

    app.use('/api/v1', router.routes(), router.allowedMethods());
}