const ical = require('ical');
function formatTimeHHMMA(d) {
    function z(n){return (n<10?'0':'')+n}
    var h = d.getHours()
    return h + ':' + z(d.getMinutes())
  }
function getDate(edtdate){
    var today;
    if (edtdate == "today") today = new Date()
    else today = new Date(edtdate)
    var dd = today.getDate()
    var mm = today.getMonth()+1 //January is 0!
    var yyyy = today.getFullYear()
    if(dd<10) dd = '0'+dd
    if(mm<10) mm = '0'+mm
    return yyyy + '-' + mm + '-' + dd
}
module.exports = (id, edtdate, callback) => {
    let date = getDate(edtdate)
    let text = ""
    const url = "http://edt.telecom-bretagne.eu/jsp/custom/modules/plannings/anonymous_cal.jsp?resources="+id+"&projectId=3&calType=ical&firstDate="+date+"&lastDate="+date
    ical.fromURL(url, {}, function (err, data) {
        var listH = []
        for (let k in data) listH.push([k, new Date(data[k].start).getTime()])
        listH.sort((ele1,ele2) => {
            return - (ele2[1] - ele1[1])
        })
        console.log(listH)
        listH.forEach(e => {
            var ev = data[e[0]]
            if (ev.type == 'VEVENT') {
                var subtext = `- ${ev.summary.trim()} | ${ev.location} | ${date} | ${formatTimeHHMMA(ev.start)} - ${formatTimeHHMMA(ev.end)}  \n \n`
                text = text + subtext.replace("|  |", "|")
            }
        })
        callback(text)
    })
}
