const facebook = require('./facebook.js')
const { Client } = require('pg')
//('dotenv').config()
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});
client.connect()
module.exports = function(){
    client.query("SELECT * FROM colis FULL OUTER JOIN users ON colis.email = users.email WHERE colis.isNotified=false",
     (err,res) =>{
        res.rows.forEach(function(colis){
          if (colis.fb_id != null) facebook.callSendAPI(colis.fb_id,{"text":"Vous avez reçu un colis le ***. Veuiller le collecter au foyer"})
          client.query("UPDATE colis SET isnotified=true WHERE email= $1",[colis.email], () => null)
          //if not : send email notification ??
        })
    })
}
