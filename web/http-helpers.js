var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var  httpHelpers = require('./http-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)
};

// As you progress, keep thinking about what helper functions you can put here!

exports.serveLocalResource = function(req, res, load) {
  res.writeHead(200, httpHelpers.headers);
  var url = req.url.slice(1);
  var filePath;
  if(load) {
    filePath = path.join(archive.paths.siteAssets, "/loading.html");
  }else if(url === "") {
    filePath = path.join(archive.paths.siteAssets, "/index.html");
  }else {
    filePath = path.join(archive.paths.siteAssets, "/styles.css");
  }

  fs.readFile(filePath, function (err, data) {
    if(err) {
      throw err;
    }
    res.end(data);
  });
};
