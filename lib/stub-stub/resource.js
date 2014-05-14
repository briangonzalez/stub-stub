'use strict';

var helpers     = require('./file-helpers');
var _           = require('lodash');
var fs          = require('fs');
var YAMLReader  = require('./yaml-reader');
var path        = require('path');
var inflect     = require('inflect');

function Resource(opts) {
  this.url      = opts.url;
  this.path     = opts.path || helpers.urlToFilePath(opts.url);
}

Resource.prototype.asJSON = function(opts) {
  opts = opts || {};
  var extendWithDefaults = opts.extendWithDefaults === false || true;

  this.contents = this.contents || YAMLReader.read(this.path);

  if ( extendWithDefaults )
    this.contents = _.extend(this.base(), this.contents);

  this.contents = _.extend({ id: this.id() }, this.contents);

  if ( !opts.noNestedType ) {
    var contents = {};
    contents[ inflect.singularize(this.type()) ] = this.contents;
    this.contents = contents;
  }

  return this.contents;
};

Resource.prototype.base = function() {
  return YAMLReader.read(this.basePath());
};

Resource.prototype.basePath = function() {
  var pathChunks = this.path.split('/');
  pathChunks[ pathChunks.length - 1 ] = 'default.yml';
  return pathChunks.join('/');
};

Resource.prototype.id = function() {
  return path.basename(this.path).split('.')[0];
};

Resource.prototype.doesExist = function() {
  return fs.existsSync(this.path);
};

Resource.prototype.type = function() {
  return this.url.split('/')[1];
};

module.exports = Resource;
