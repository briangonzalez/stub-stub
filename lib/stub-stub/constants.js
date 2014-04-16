'use strict';

var _ = require('lodash');

var defaults = {
  port:       4343,
  stubsPath:  './stubs'
};

var appConstants = _.extend({}, defaults);

var constants = function(options){
  if ( !options )
    return appConstants;

  appConstants['port']      = options['port']       || defaults['port'];
  appConstants['stubsPath'] = options['stubsPath']  || defaults['stubsPath'];
  return appConstants;
};

module.exports = constants;