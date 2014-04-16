'use strict';

var _           = require('lodash');
var fs          = require('fs');
var YAML        = require('yamljs');

function YAMLReader(){

};

YAMLReader.prototype.read = function(path) {
  return fs.existsSync(path) ? YAML.load(path) : {};
};

YAMLReader.prototype.readExtend = function(paths) {
  paths = paths || [];
  var data = {};

  var self = this;
  _.each(paths, function(path){
    _.extend( data, self.read(path) );
  });

  return data;
};

module.exports = new YAMLReader();