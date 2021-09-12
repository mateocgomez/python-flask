const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist/tutorial-canciones'));

app.get('/en/*', function(req,res) {
res.sendFile(path.join(__dirname+'/dist/tutorial-canciones/en/index.html'));
});

app.get('/es/*', function(req,res) {
  res.sendFile(path.join(__dirname+'/dist/tutorial-canciones/es/index.html'));
});

app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+'/dist/tutorial-canciones/es/index.html'));
});

app.listen(process.env.PORT || 5000);