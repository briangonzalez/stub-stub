'use strict';

var chalk       = require('chalk');

function Logger() {
  this.colors  = ['bgBlue', 'blue'];
  this.index   = 0;
}

Logger.prototype.log = function() {
  var args = Array.prototype.slice.call(arguments);

  console.log(
    chalk[this.colors[this.index]](
      '[stub-stub]',
      args.join(' ')
    )
  );

  this.toggleIndex();
};

Logger.prototype.toggleIndex = function() {
  this.index === (this.colors.length - 1) ?
    this.index = 0 :
    this.index ++;
};

module.exports = new Logger();