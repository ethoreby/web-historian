// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.
// read list, is in list, is url archived
// go to last item in count and start scrapin'
//
//
var path = require('path');
var http = require('http');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');

exports.scrape = function(url) {
  http.get("http://" + url, function(res) {
    console.log("Got response: " + res.statusCode);

    var data = "";

    res.on("data", function(chunk){
      data += chunk;
    });

    res.on("end", function(){
      fs.writeFile(path.join(archive.paths.archivedSites, archive.url), data);
    });
  });
};
