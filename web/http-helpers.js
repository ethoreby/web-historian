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

exports.serveLoadingPage = function(res) {
  res.writeHead(302, httpHelpers.headers);
  fs.readFile(path.join(archive.paths.siteAssets, "/loading.html"), function (err, data) {
    if(err) {
      throw err;
    }
    res.end(data);
  });
};
