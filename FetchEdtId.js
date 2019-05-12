function getID(query, callback){
    const request = require('request')
    const zlib = require('zlib')
    const param = '7|0|7|https://edt.telecom-bretagne.eu/direct/gwtdirectplanning/|D6B9DA98EB1E5E3397BA6D6581349354|com.adesoft.gwt.directplan.client.rpc.DirectPlanningServiceProxy|method12searchResource|J|java.lang.String/2004016611|[1]{"StringField""NAME""""'+query+'""false""true""true""true""2147483647""false""CONTAINS""false""false""0"|1|2|3|4|2|5|6|Wqq6SNv|7|'
    const url = 'https://edt.telecom-bretagne.eu/direct/gwtdirectplanning/DirectPlanningServiceProxy'
    header = {
        'Host': 'edt.telecom-bretagne.eu',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0',
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'Referer': 'https://edt.telecom-bretagne.eu/direct/index.jsp',
        'Content-Type': 'text/x-gwt-rpc; charset=utf-8',
        'X-GWT-Permutation': '998F3A96BC1BF26680D814D889153318',
        'X-GWT-Module-Base': 'https://edt.telecom-bretagne.eu/direct/gwtdirectplanning/',
        'Content-Length': (338+query.length)+'',
        'Connection': 'keep-alive',
        'Cookie': 'JSESSIONID=0DE443AF086D68F6B6A867CDD483C533; Direct%20Planning%20Tree=%7B%22state%22%3A%7B%22sortField%22%3A%22s%3ANAME%22%2C%20%22sortDir%22%3A%22s%3AASC%22%2C%20%22expanded%22%3A%5B%22s%3A-1%22%2C%22s%3A7545%22%2C%22s%3A9642%22%5D%7D%7D'
    }
    var options = {
        headers: header,
        method : 'POST',
        url:     url,
        body:    param
    }
    var data = ""
    request(options, function(error, response, body){
    })
    .pipe(zlib.createGunzip()).on('data', function(chunk) {
        data = data + chunk;
    })
    .on('end', function(){
        var list = data.split('\"')
        var id = list[list.length-19]
        var id = id.substring(0,id.length-1)
        callback(id)
        })
}
getID("bouhaddou", (id) => {
    console.log(id)
})
