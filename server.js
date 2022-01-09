const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const config = require("./app/config/config.js");

const app = express();

const corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const User = db.user;
db.sequelize.sync().then(() => {
  // TODO: 
  setup();
});


app.get('/harry', (req, res) => {
    res.json({ message: 'harry dep trai' });
});

// resources path
app.get('/public/:dir/:name', (req, res) => {
    res.sendFile(__dirname + '/public/' + req.params.dir + '/' + req.params.name);
});

// api routes
require("./app/routes/api.routes")(app);
require("./app/routes/index.routes")(app);

// set port, listen for requests
const PORT = config.PORT;
app.listen(PORT, () => {
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