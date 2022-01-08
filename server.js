const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
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

app.get('/harry', (req, res) => {
    res.json({ message: 'harry dep trai' });
});


// set port, listen for requests
const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});