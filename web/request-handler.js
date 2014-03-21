var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var  httpHelpers = require('./http-helpers');
var workers = require('../workers/htmlfetcher');
var _ = require('underscore');
// require more modules/folders here!

var requestMethods = {
  "GET": function(req, res){
    var url = req.url.slice(1);
    if(url === "" || url === "styles.css" || url === "loading.html") {  //check if local resource
      httpHelpers.serveLocalResource(req, res);
    }else {                                           //external url
      archive.readListOfUrls(function(list) {
        if(!archive.isUrlInList(req.url.slice(1), list)) {
          res.writeHead(404, httpHelpers.headers);
          res.end();
        }else{
          var filePath = path.join(archive.paths.archivedSites, req.url.slice(1));
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
              httpHelpers.serveLocalResource(req, res, true);
            }
          });
        }
      });
    }
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

              fs.readFile(filePath, function (err, data) {
                if(err) {
                  throw err;
                }
                res.end(data);
              });
            }else {                                         //serve loading page if not ready
              httpHelpers.serveLocalResource(req, res, true);
            }
          });
        }else{
          archive.addUrlToList(data, function(){
            //redirect to loading page
            httpHelpers.serveLocalResource(req, res, true);
            //workers.scrape(data);
          });
        }
      });
      //check list
    });
  } //end POST method
};  //requestMethod object

exports.handleRequest = function (req, res) {
  requestMethods[req.method](req, res);
};

