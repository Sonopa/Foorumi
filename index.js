const express = require("express");
const bodyParser = require("body-parser");

let app = express();
let port = process.env.PORT || 3001;

app.use(bodyParser.json());

app.listen(port);

console.log("Running on port " + port);