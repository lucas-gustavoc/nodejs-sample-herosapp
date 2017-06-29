var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var heroManager = require('./server/js/heromanager.js');

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))

// tell Express to parse incoming
// JSON objects
app.use(bodyParser.json());

app.use(express.static(__dirname + '/client'));

app.get('/', function (req, res) {
    fs.readFile(__dirname + '/client/index.html', function (err, data) {
        if (err) {
            throw err; 
        }
        res.set('Content-Type', 'text/html');
        res.send(data);
    });
});

app.get('/heros.json', function (req, res) {
    fs.readFile(__dirname + '/server/json/heros.json', function (err, data) {
        if (err) {
            throw err; 
        }
        res.set('Content-Type', 'text/javascript');
        res.send(data);
    });
});

app.post('/addhero', function (req, res) {
    res.send(heroManager.addhero(req.body));
});

app.post('/removehero', function (req, res) {
    res.send(heroManager.removehero(req.body.heroid));
});

app.listen(80, function () {
  console.log('Heros app listening on port 80!');
});