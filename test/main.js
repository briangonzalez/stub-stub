
var request   = require('supertest');
var assert    = require("assert");
var http      = require('http');

var stubstub  = require('../lib/stub-stub');
var server    = stubstub.server;

describe('GET /cars', function(){

  it('respond with json', function(done){
    request(server)
      .get('/cars/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        if (err) throw err;
        assert.equal("Mercedes", res.body.car.name);
        done();
      });
  });

  it('respond with json, even when it does not exist (extended with defaults)', function(done){
    request(server)
      .get('/cars/1000000')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        if (err) throw err;
        assert.equal("My Car", res.body.car.name);
        assert.equal("$10,000", res.body.car.price);
        done();
      });
  });

});

describe('POST /auth', function(){

  it('all POSTSs respond with json', function(done){
    request(server)
      .post('/auth/do')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        if (err) throw err;
        assert.equal("ABCDEFG", res.body.auth.token);
        assert.equal(true, res.body.auth.success);
        done();
      });
  });

});
