const Koa = require("koa");
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger')
const Router = require('@koa/router');
const cors = require("koa2-cors");
const bcrypt = require("bcryptjs");
const config = require("./app/config/config.js");
const fs = require('fs');
const mime = require('mime-types')

const swagger = require("swagger2");
const {
    ui
} = require("swagger2-koa");

const app = new Koa();

const corsOptions = {
  origin: "http://localhost:8081"
};

const db = require("./app/models");
const User = db.user;
db.sequelize.sync().then(() => {
  // TODO: 
  setup();
});

const router = new Router();

router.get('/harry', async (ctx) => {
    ctx.body = {
        'version': 1,
        'api': 'User Management API',
        'doc': 'http://localhost:8080/swagger'
    }
});

// resources path
router.get('/public/:dir/:name', async (ctx) => {
  const path = __dirname + '/public/' + ctx.params.dir + '/' + ctx.params.name;

  const mimeType = mime.lookup(path);
  const src = fs.createReadStream(path); 
  ctx.response.set('Content-Type', mimeType);
  ctx.body = src;
});

// api routes
require("./app/routes/api.routes")(router);
require("./app/routes/index.routes")(router);

// set port, listen for requests
const PORT = config.PORT;

const swaggerDocument = swagger.loadDocumentSync(__dirname + "/api.yaml");


app
  .use(cors(corsOptions))
  .use(ui(swaggerDocument, "/swagger"))
  .use(logger())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())

  .listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

function setup() {
  User.findOne({
    where: {id: 1}
  }).then(user => {

    if (!user) {
      User.create({
        id: 1,
        email: 'hungtranqt93@gmail.com',
        password: bcrypt.hashSync('123456', 8),
        fullname: 'Tran Vinh Hung',
      })
    }

  })
}