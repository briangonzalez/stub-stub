'use strict';

var Resource      = require('./resource');
var helpers       = require('./file-helpers');
var inflect       = require('inflect')
var YAMLReader    = require('./yaml-reader');
var _             = require('lodash');

function Resources(opts) {
  opts = opts || {};
  this.path = opts.path;
  this.ids = opts.ids;
}

Resources.prototype.asJSON = function() {
  var files = helpers.resourceFilesForUrl(this.path, this.ids);

  var objects = _.map(files, function(file){
    var r = new Resource({ path: file });
    var js = r.asJSON({ noNestedType: true });
    return js;
  });

  var result = {};
  result[ inflect.pluralize(this.type()) ] = objects;
  return result;
};

Resources.prototype.all = function() {
  var files = helpers.allResources();
  return _.map(files, function(f){
    return "<div><a href='/"+ f +"'>"+ f +"</a></div>";
  }).join('');
};

Resources.prototype.isBaseResourceType = function() {
  var files   = helpers.allResources();
  var chunks  = this.path.split('/');
  return _.contains(files, chunks[chunks.length - 1]);
};

Resources.prototype.type = function() {
  return this.path.split('/')[1];
};

module.exports = Resources;
