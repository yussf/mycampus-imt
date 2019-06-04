const cheerio = require('cheerio')
const request = require('request')
const url = 'https://atlantic-express.codev.resel.fr/index.php?page=offres'

function clean(str){
    var res = str.split("\n").join('')
    res = res.split("'").join('')
    res = res.trim()
    return res
}

module.exports = {
  getJourneys:function(dest, callback){
    request(url, function(error, response, html){
        if (error) throw error
        var $ = cheerio.load(html)
        let content = $('.contenu_content')
        var dump = Array()
        content.children().each((i,e) => {
            data = $(e).find(".col-75")
            if (clean( $(data[2]).text()).toLowerCase() == clean(dest).toLowerCase()){
              var trajet = 
                      {   "driver" : clean($(data[0]).text()),
                          "depart" : clean($(data[1]).text()).toLowerCase(),
                          "destination" :clean( $(data[2]).text()).toLowerCase(),
                          "date" : clean($(data[3]).text()),
                          "heure" : clean($(data[4]).text()),
                          "places_restantes" : parseInt($(data[5]).text(), 10) - parseInt($(data[6]).text(), 10),
                          "allez_retour" : clean($(data[7]).text())
                      }
              dump.push(trajet)
            }
        })
        callback(dump)
    })
  }
}
