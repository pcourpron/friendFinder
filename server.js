var express = require('express')

var bodyParser = require("body-parser");
var path = require("path");


var app  = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('app'));
app.use(express.static('routing'));


require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

var PORT = process.env.PORT || 5000




app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });

