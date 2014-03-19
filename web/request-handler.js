var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var  httpHelpers = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if(req.url === "/") {
    res.writeHead(200, httpHelpers.headers);
    fs.readFile(path.join(archive.paths.siteAssets, "/index.html"), function (err, data) {
      if(err) {
        throw err;
      }
      res.end(data);
    });
    // res.end();

  }else if(req.url === "/www.google.com") {
    res.writeHead(200, httpHelpers.headers);
    fs.readFile(path.join(archive.paths.archivedSites, "www.google.com"), function (err, data) {
      if(err) {
        throw err;
      }
      res.end(data);
    });
    // res.end();

  }
  // res.end(archive.paths.list);
};
