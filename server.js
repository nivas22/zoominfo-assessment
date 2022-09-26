const express = require('express');
const config = require('config');
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(config.port, () => {
  console.log("Express server listening on:", config.port);
});
