var express = require('express');
var wheatherController = require('./controllers/wheatherController');
var pollutionController = require('./controllers/pollutionController');
var app = express();
var port = 3000;

wheatherController(app);
pollutionController(app);
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });
app.listen(port);


