var cheerio = require('cheerio');
module.exports = (req, res) => {
  // The URL we will scrape from - in our example Anchorman 2.

  url = 'http://services.imt-atlantique.fr/rak/';

  // The structure of our request call
  // The first parameter is our URL
  // The callback function takes 3 parameters, an error, response status code and the html

  request(url, function(error, response, html){

      // First we'll check to make sure no errors occurred when making the request

      if(!error){
          // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

          var $ = cheerio.load(html);
        //to do 
      }
  })
};
