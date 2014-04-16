'use strict';

var CONSTANTS   = require('./constants')();
var path        = require('path');
var fs          = require('fs');
var _           = require('lodash');

function FileHelpers() {
  this.stubsPath = CONSTANTS.stubsPath;
}

FileHelpers.prototype.urlToFilePath = function(url) {
  return path.join(this.stubsPath, url + '.yml');
};

FileHelpers.prototype.resourceFilesForUrl = function(url) {
  var dir  = path.join(this.stubsPath, url);
  var files = fs.readdirSync(dir);

  var filteredFiles = _.filter(files, function(f){
                        return f !== 'default.yml';
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