var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var  httpHelpers = require('./http-helpers');
var workers = require('../workers/htmlfetcher');
// require more modules/folders here!

var requestMethods = {
  "GET": function(req, res){
    archive.readListOfUrls(function(list) {
      if(!archive.isUrlInList(req.url.slice(1), list)) {
        res.writeHead(404, httpHelpers.headers);
        res.end();
      }else{
        var filePath = req.url === '/' ? path.join(archive.paths.siteAssets, "/index.html") : path.join(archive.paths.archivedSites, req.url.slice(1));
        res.writeHead(200, httpHelpers.headers);
        archive.isURLArchived(req.url.slice(1), function(htmlReady){
          if(htmlReady){
            fs.readFile(filePath, function (err, data) {
              if(err) {
                throw err;
              }
              res.end(data);
            });
          }else {
            //redirect to loading page
            httpHelpers.serveLoadingPage(res);
          }
        });
      }
    });
  },

  "POST": function(req, res){
    var data = "";

    req.on("data", function(chunk){
      data += chunk;
    });

    req.on("end", function(){
      data = data.slice(4);     //removes "url="
      // workers.scrape(data);
      //read list
      archive.readListOfUrls(function(list) {
        if(archive.isUrlInList(data, list)) {               //if in list
          archive.isURLArchived(data, function(htmlReady) { //and in archive
            if(htmlReady) {                                 //and scraped
              var filePath = path.join(archive.paths.archivedSites, data);
              res.writeHead(302, httpHelpers.headers);      //redirect and serve

              fs.readFile(filePath, function (err, data) {
                if(err) {
                  throw err;
                }
                res.end(data);
              });
            }else {                                         //serve loading page if not ready
              httpHelpers.serveLoadingPage(res);
            }
          });
        }else{
          archive.addUrlToList(data, function(){
            //redirect to loading page
            httpHelpers.serveLoadingPage(res);
          });
        }
      });
      //check list
    });
  } //end POST method
}; // requestMethod object

exports.handleRequest = function (req, res) {
  requestMethods[req.method](req, res);
};

