var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var  httpHelpers = require('./http-helpers');
// require more modules/folders here!

var requestMethods = {
  "GET" : function(req, res){
    fs.readFile(archive.paths.list, 'utf8',  function(err, data) {
      console.log("THIS IS THE DATA", data);
      console.log("THIS IS THE REAAD URL",archive.paths.list);
      var targetUrl = (req.url).slice(1);
      if(data.indexOf('www.google.com') === -1) {
        res.writeHead(404, httpHelpers.headers);
        res.end();
      }else{
        var filePath = req.url === '/' ? path.join(archive.paths.siteAssets, "/index.html") : path.join(archive.paths.archivedSites, "www.google.com");
        res.writeHead(200, httpHelpers.headers);
        fs.readFile(filePath, function (err, data) {
          if(err) {
            throw err;
          }
          res.end(data);
        });
      }
    });

  },

  "POST": function(req, res){
    fs.appendFile(archive.paths.list, req._postData.url+'\n', function(err, data){
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

