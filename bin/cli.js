#!/usr/bin/env node

'use strict';
var Liftoff     = require('liftoff');
var chalk       = require('chalk');
var stubstub    = require('../lib/stub-stub');

var cli = new Liftoff({ name: 'stub-stub' });

cli.on('requireFail', function (name, err) {
  console.log('Unable to load:', name, err);
});

cli.launch(function(env){

  var CONSTANTS = stubstub.constants({
    port:       env.argv.port,
    stubsPath:  env.argv.stubs
  });

  stubstub.server.listen(CONSTANTS.port, function(a, b) {
    console.log(
      chalk.blue(   '[stub-stub] listening on port:', CONSTANTS.port),
      chalk.yellow( '\n[stub-stub] serving stubs from directory:', CONSTANTS.stubsPath)
    );
  });

});