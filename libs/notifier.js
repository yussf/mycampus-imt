const facebook = require('./facebook.js')
require('dotenv').config()
const { Client } = require('pg')
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
})
client.connect()
module.exports = function(){
    console.log("notifier has been called")
    client.query("SELECT * FROM colis FULL OUTER JOIN users ON colis.email = users.email WHERE colis.isNotified=false",
     (err,res) =>{
        res.rows.forEach(function(colis){
          let d = new Date(colis.date)
          let month = d.getMonth()+1
          let shortDate = d.getDate()+"-"+month+"-"+d.getFullYear()
          let msg = "Vous venez de recevoir un colis. \n Date : "+shortDate+" \n Par : "+colis.sender+" \n Retrait : "+colis.location+" \n Veuillez le collecter au foyer."
          if (colis.fb_id != null) facebook.callSendAPI(colis.fb_id,{"text":msg})
          // Notify by email if not registered as user (colis.fb_id == null)
          client.query("UPDATE colis SET isnotified=true WHERE email= $1",[colis.email], () => null)
        })
    })
}
