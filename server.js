var express = require('express');
var app = express();

// MIDDLEWARE
var serveStatic = require('serve-static');
app.use(serveStatic('public', {'index': ['index.html']}));
var bodyParser = require('body-parser');
app.use(bodyParser());

// ROUTES - WINE
var wine = require('./routes/wines'); 
app.get('/wines', wine.findAll);
app.get('/wines/:_id', wine.findById);
app.post('/wines', wine.add);
app.put('/wines/:_id', wine.update);
app.delete('/wines/:_id', wine.delete);
 
app.listen(3000);
