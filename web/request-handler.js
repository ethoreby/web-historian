var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var  httpHelpers = require('./http-helpers');
// require more modules/folders here!

var requestMethods = {
  "GET" : function(req, res){
    var filePath = req.url === '/' ? path.join(archive.paths.siteAssets, "/index.html") : path.join(archive.paths.archivedSites, "www.google.com");
    res.writeHead(200, httpHelpers.headers);
    fs.readFile(filePath, function (err, data) {
      if(err) {
        throw err;
      }
      res.end(data);
    });
  },

  "POST": function(req, res){
    fs.writeFile(archive.paths.list, req._postData.url+'\n', function(err, data){
      if(err){
        throw err;
      }
      res.writeHead(302, httpHelpers.headers);
      res.end();
    });
  }
};

exports.handleRequest = function (req, res) {
  requestMethods[req.method](req, res);
};

