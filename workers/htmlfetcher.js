// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.
// read list, is in list, is url archived
// go to last item in count and start scrapin'
//
//
var path = require('path');
var http = require('http');

exports.scrape = function(data) {
  http.get("http://" + data, function(res) {
    console.log("Got response: " + res.statusCode);

    var data = "";

    res.on("data", function(chunk){
      data += chunk;
    });

    res.on("end", function(){
      console.log(data);
    });

    // ).on('error', function(e) {
    //   console.log("Got error: " + e.message);
    // });
  });
};
