const controller = require("../controllers/index.controller");
const authJwt = require("../middlewares/authJwt");

module.exports = function(app) {
    app.get('/', 
      controller.index,
    );
};