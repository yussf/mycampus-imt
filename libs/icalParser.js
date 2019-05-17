const ical = require('ical');
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
function formatTimeHHMMA(d) {
    function z(n){return (n<10?'0':'')+n}
    var h = d.getHours() + 2
    return (h%12 || 12) + ':' + z(d.getMinutes()) + ' ' + (h<12? 'AM' :'PM')
  }
function getDate(edtdate){
    let date = ""
    if (edtdate == "today"){
        var today = new Date()
        var dd = today.getDate()
        var mm = today.getMonth()+1 //January is 0!
        var yyyy = today.getFullYear()
        if(dd<10) dd = '0'+dd
        if(mm<10) mm = '0'+mm
        date = yyyy + '-' + mm + '-' + dd
    }else{
        date = edtdate.replace("/","-")
    }
}
module.exports = (id, edtdate, callback) => {
    let date = getDate(edtdate)
    let text = ""
    const url = "http://edt.telecom-bretagne.eu/jsp/custom/modules/plannings/anonymous_cal.jsp?resources="+id+"&projectId=3&calType=ical&firstDate="+date+"&lastDate="+date
    ical.fromURL(url, {}, function (err, data) {
        for (let k in data) {
            if (data.hasOwnProperty(k)) {
                var ev = data[k];
                if (data[k].type == 'VEVENT') {
                    text = text + `- ${ev.summary} | ${ev.location} | ${ev.start.getDate()} of ${months[ev.start.getMonth()]} | ${formatTimeHHMMA(ev.start)} \n \n`
    
                }
            }
        }
        callback(text)
    })
}