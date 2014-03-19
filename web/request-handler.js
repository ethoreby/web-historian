var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var  httpHelpers = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if(req.method === "GET") {
    res.writeHead(200, httpHelpers.headers);
    fs.readFile(path.join(archive.paths.siteAssets, "/index.html"), function (err, data) {
      if(err) {
        throw err;
      }
      res.end(data);
      console.log(data);
    });
    // res.end();

  }
  // res.end(archive.paths.list);
};
