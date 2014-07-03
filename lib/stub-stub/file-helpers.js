'use strict';

var constants   = require('./constants')
var path        = require('path');
var fs          = require('fs');
var _           = require('lodash');

function FileHelpers() {
  this.stubsPath = constants.stubsPath;
}

FileHelpers.prototype.urlToFilePath = function(url) {
  url = url.indexOf('?') !== -1 ? url.substr(0, url.indexOf('?')) : url;
  return path.join(this.stubsPath, url + '.yml');
};

FileHelpers.prototype.resourceFilesForUrl = function(url, ids) {
  var dir  = path.join(this.stubsPath, url);
  var files = fs.readdirSync(dir);

  var filteredFiles = _.filter(files, function(f){
    if (path.extname(f) !== '.yml') return false;
    if (f === 'default.yml') return false;
    if (ids && ids.indexOf(path.basename(f, '.yml')) === -1) return false;
    return true;
  });

  return _.map(filteredFiles, function(f){
    return path.join(dir, f);
  });
};

FileHelpers.prototype.allResources = function() {
  var dir     = path.join(this.stubsPath);
  var files   = fs.readdirSync(dir);
  var self = this;

  return _.filter(files, function(file){
    var f = path.join(self.stubsPath, file);
    return fs.statSync(f).isDirectory();
  });

};

module.exports = new FileHelpers();
