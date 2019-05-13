const cheerio = require('cheerio')
const request = require('request')
//const url = 'http://services.imt-atlantique.fr/rak/'
const url = 'http://services.imt-atlantique.fr/rak/#menu_cafeteria'
module.exports = {
  getMenu:function(id, callback){
    request(url, function(error, response, html){
      if (error) throw error
      var $ = cheerio.load(html)
      let con = $("#menu_rampe table")
      console.log(con.length)
      let table = con.get(id)
      let menu = {}
      $(table).find('font, strong').remove()
      $(table).find('a').toArray().forEach((e,i) =>{
        if ($(e).text().indexOf("\n") < 0) menu[i] = $(e).text()
      })
      callback(menu)
    }) 
  }
}

