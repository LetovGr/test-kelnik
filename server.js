var express = require('express');
var fs = require('fs');
var app = express();

app.set('view engine', 'pug');
app.use('/static', express.static('build'));

app.get('/', function(req, res){
    res.render('index', {page: 'home'});
});

app.get('/about', function(req, res){
    res.render('index', {page: 'about'});
});

app.listen('3333');