var express = require('express')
var app = express()

app.get('/', function (req, res) {
    res.send('Hello Heros!')
})

app.listen(80, function () {
    console.log('Heros app listening on port 80!')
})