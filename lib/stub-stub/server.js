'use strict';

var Logger      = require('./logger');
var Resource    = require('./resource');
var Resources   = require('./resources');
var express     = require('express');
var server      = express();

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

server.get('/*', function(req, res){
  Logger.log('GET:', req.originalUrl);

  var r  = new Resource({ url: req.originalUrl });
  var rs = new Resources({ url: req.originalUrl });

  if ( r.doesExist() || !rs.isBaseResourceType() ){
    res.json(r.asJSON({ extendWithDefaults: true }));
  }
  else {
    res.json(rs.asJSON());
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
  res.json({ message: 'ok' });
});

module.exports = server;