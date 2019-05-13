const ical = require('ical');
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
module.exports = (id, callback) => {
    // get date(today)
    var today = new Date()
    var dd = today.getDate()
    var mm = today.getMonth()+1 //January is 0!
    var yyyy = today.getFullYear()
    if(dd<10) dd = '0'+dd
    if(mm<10) mm = '0'+mm
    today = yyyy + '-' + mm + '-' + dd
    let text = ""
    const url = "http://edt.telecom-bretagne.eu/jsp/custom/modules/plannings/anonymous_cal.jsp?resources="+id+"&projectId=3&calType=ical&firstDate="+today+"&lastDate="+today
    ical.fromURL(url, {}, function (err, data) {
        for (let k in data) {
            if (data.hasOwnProperty(k)) {
                var ev = data[k];
                if (data[k].type == 'VEVENT') {
                    text = text + `- ${ev.summary} | ${ev.location} | ${ev.start.getDate()} of ${months[ev.start.getMonth()]} | ${ev.start.toLocaleTimeString()} \n \n`
    
                }
            }
        }
        callback(text)
    })
}