const cheerio = require('cheerio')
const request = require('request')
const url = 'http://services.imt-atlantique.fr/rak/'
module.exports = {
  getMenu:function(id, where, callback){
    request(url, function(error, response, html){
      if (error) throw error
      var $ = cheerio.load(html)
      let con = $("#menu_rampe table")
      if (where == 'cafeteria') con = $("#menu_cafeteria table")
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

