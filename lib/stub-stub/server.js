'use strict';

var Logger      = require('./logger');
var Resource    = require('./resource');
var Resources   = require('./resources');
var express     = require('express');
var server      = express();

server.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// -- Damn favicon --------------

server.get('/favicon.ico', function(req, res){
  res.send('Nope.');
});

// -- Capture all GET to / (home) ----------

server.get('/', function(req, res){
  res.send(
    new Resources().all()
  );
});

// -- Capture all GET to '/*' --------------
// -- GET: /cars
// -- GET: /cars/1
// -- GET: /cars?ids[]=1&ids[]=2&ids[]=3

var prefixRegex = /\/(api|v\d+)(?=\/)/g;

server.get('/*', function(req, res){

  var path = req.path.replace(prefixRegex, '');
  var url = req.originalUrl.replace(prefixRegex, '');

  Logger.log('GET:', req.originalUrl, JSON.stringify(req.query));

  var r  = new Resource({ url: url });
  var rs = new Resources({ path: path, ids: req.query.ids });

  if (req.query.ids || rs.isBaseResourceType()) {
    res.json(rs.asJSON());
  }
  else {
    res.json(r.asJSON({ extendWithDefaults: true }));
  }
});

// -- Capture all POST to '/*' --------------
// -- POST: /auth/do

server.post('/*', function(req, res){
  Logger.log('POST:', req.originalUrl);

  var r = new Resource({ url: req.originalUrl });
  res.json(r.asJSON({ extendWithDefaults: true }));
});

// -- Capture all PUT to '/*' --------------

server.put('/*', function(req, res){
  res.json({});
});

module.exports = server;
