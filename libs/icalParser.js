const ical = require('ical');
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const url = "http://edt.telecom-bretagne.eu/jsp/custom/modules/plannings/anonymous_cal.jsp?resources=10374&projectId=3&calType=ical&firstDate=2019-05-13&lastDate=2019-05-19"
ical.fromURL(url, {}, function (err, data) {
    for (let k in data) {
        if (data.hasOwnProperty(k)) {
            var ev = data[k];
            if (data[k].type == 'VEVENT') {
                console.log(`${ev.summary} is in ${ev.location} on the ${ev.start.getDate()} of ${months[ev.start.getMonth()]} at ${ev.start.toLocaleTimeString('en-GB')}`);
 
            }
        }
    }
})