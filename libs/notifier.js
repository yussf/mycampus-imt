const facebook = require('./facebook.js')
const { Client } = require('pg')
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});
client.connect()
module.exports = function(){
    client.query("SELECT * FROM colis JOIN users ON colis.email = users.email WHERE colis.isNotified=false",
     (err,res) =>{
        facebook.callSendAPI()
    })
}
