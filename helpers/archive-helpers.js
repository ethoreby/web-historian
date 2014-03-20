var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var archive = require('../helpers/archive-helpers');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  fs.readFile(archive.paths.list, 'utf8',  function(err, data){
    if(err) {
      throw err;
    }
    callback(data.split('\n'));
  });
};

exports.isUrlInList = function(url, list){
  if(_.indexOf(list, url) !== -1){
    return true;
  }
  return false;
};

exports.addUrlToList = function(data, callback){
  fs.appendFile(archive.paths.list, data + '\n', function(err, data){
    if(err){
      throw err;
    }else{
      callback();
    }
  });
};

exports.isURLArchived = function(){


};

exports.downloadUrls = function(){
};
