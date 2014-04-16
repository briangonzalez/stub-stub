'use strict';

var Resource      = require('./resource');
var helpers       = require('./file-helpers');
var YAMLReader    = require('./yaml-reader');
var _             = require('lodash');

function Resources(opts) {
  opts = opts || {};
  this.url      = opts.url;
}

Resources.prototype.asJSON = function() {
  var files = helpers.resourceFilesForUrl(this.url);

  return _.map(files, function(file){
    var r = new Resource({ path: file })
    var js = r.asJSON();
    js.id = r.id();
    return js;
  });

};

Resources.prototype.all = function() {
  var files = helpers.allResources();
  return _.map(files, function(f){
    return "<div><a href='/"+ f +"'>"+ f +"</a></div>"
  }).join('');
};

Resources.prototype.isBaseResourceType = function() {
  var files   = helpers.allResources();
  var chunks  = this.url.split('/');
  return _.contains(files, chunks[chunks.length - 1]);
};

module.exports = Resources;