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
  var constants = stubstub.constants;

  stubstub.server.listen(constants.port, function(a, b) {
    console.log(
      chalk.blue(   '[stub-stub] listening on port:', constants.port),
      chalk.yellow( '\n[stub-stub] serving stubs from directory:', constants.stubsPath)
    );
  });

});
