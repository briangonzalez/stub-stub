'use strict';

var argv  = require('minimist')(process.argv.slice(2));
var _     = require('lodash');

var defaults = {
  port:       4343,
  stubsPath:  './api-stubs'
};

var appConstants = _.extend(defaults, {
  port:       argv.port   || defaults['port'],
  stubsPath:  argv.stubs  || defaults['stubsPath']
});

module.exports = appConstants;
