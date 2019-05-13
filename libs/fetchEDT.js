function fetch(query, callback){
        const request = require('request')
        const param = '7|0|7|https://edt.telecom-bretagne.eu/direct/gwtdirectplanning/|D6B9DA98EB1E5E3397BA6D6581349354|com.adesoft.gwt.directplan.client.rpc.DirectPlanningServiceProxy|method12searchResource|J|java.lang.String/2004016611|[1]{"StringField""NAME""""'+query+'""false""true""true""true""2147483647""false""CONTAINS""false""false""0"|1|2|3|4|2|5|6|WqulbLy|7|'
        const url = 'https://edt.telecom-bretagne.eu/direct/gwtdirectplanning/DirectPlanningServiceProxy'
        header = {
            'Host': 'edt.telecom-bretagne.eu',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0',
            'Accept': '*/*',
            'Accept-Language': 'en-US,en;q=0.5',
            'Referer': 'https://edt.telecom-bretagne.eu/direct/index.jsp',
            'Content-Type': 'text/x-gwt-rpc; charset=utf-8',
            'X-GWT-Permutation': '998F3A96BC1BF26680D814D889153318',
            'X-GWT-Module-Base': 'https://edt.telecom-bretagne.eu/direct/gwtdirectplanning/',
            'Content-Length': (338+query.length)+'',
            'Connection': 'keep-alive',
            'Cookie': ' JSESSIONID=026181C6D95FA320ACF82CB2FE934215; Direct%20Planning%20Tree=%7B%22state%22%3A%7B%22sortField%22%3A%22s%3ANAME%22%2C%20%22sortDir%22%3A%22s%3AASC%22%7D%7D'
        }
        var options = {
            headers: header,
            method : 'POST',
            url:     url,
            body:    param
        }
        request(options, function(error, response, body){
            if (body) {
                var list = body.split('\"')
                var id = list[list.length-19]
                if (id != undefined){
                    id = id.substring(0,id.length-1)
                }else{
                    id = -200
                }
                callback(id)
            }
                
        })
        
}
const fs = require('fs')
let students = JSON.parse(fs.readFileSync('students.json'))
let i = 0
let j = 0
let k = 0
students.forEach(student => {
    let name = student.last_name + " " + student.first_name
    fetch(name, id => {
        if (id == -200) i++
        if (id == -100) j++
        if (id != -100 && id != -200) k++
        //console.log(name + "==>" + id)
        console.log(i + " || " + j + " || " + k)
    })
});

//fetch('DOUBLI', id => console.log(id))