var express = require('express');
var app = express();

var sanitizer = require('./index');

app.use(sanitizer(['fuck', 'fck']))


app.get('/', function(req, res){
	console.log(req.url)
	res.json(200, {a:'a', fuck:'fuck', c:'c', fck:'fcku', e:{e:'e', fuck:'eqwe'} });
});

app.listen(3000);