const facebook = require('./facebook.js')
const { Client } = require('pg')
require('dotenv').config()
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});
client.connect()
module.exports = function(){
    client.query("SELECT * FROM colis FULL OUTER JOIN users ON colis.email = users.email WHERE colis.isNotified=false",
     (err,res) =>{
        console.log(res.rows)
    })
}

module.exports()