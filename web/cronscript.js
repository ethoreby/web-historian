var htmlFetcher = require('../workers/htmlfetcher');
var archive = require('../helpers/archive-helpers');

archive.readListOfUrls(function(list) {
  for(var i = 0; i < list.length; i++) {
    archive.isURLArchived(list[i], function(hasArchive) {
      if(!hasArchive) {
        htmlFetcher.scrape(list[i]);
      }
    });
  }
});
