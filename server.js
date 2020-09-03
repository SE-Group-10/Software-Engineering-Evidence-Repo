var express = require('express');
var app = express();
var path = require('path');
const PORT = process.env.PORT || 8080;

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.get('/static/js/:file', function(req, res) {
    res.sendFile(path.join(__dirname + '/build/static/js/' + req.params.file));
});

app.get('/static/css/:file', function(req, res) {
    res.sendFile(path.join(__dirname + '/build/static/css/' + req.params.file));
});

app.get('/:file', function(req, res) {
    res.sendFile(path.join(__dirname + '/build/' + req.params.file));
});


app.listen(PORT);