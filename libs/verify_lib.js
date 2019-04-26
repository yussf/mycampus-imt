module.exports = (req, response) => {
  const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
  const { Client } = require('pg');
  const facebook = require('./facebook.js');
  const manager = require('./manager.js');
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });
  client.connect();
  const
    request = require('request'),
    express = require('express');
  console.log(req.params) ;
  let userId = req.params.userId ;
  let uuid = req.params.uuid;
  client.query("SELECT uuid, imt_address FROM verification WHERE fb_id='"+userId+"'", (err, res) => {
    if (err) throw err;
    let row = res.rows[0] ;
    console.log(row.uuid);
    if (row.uuid == uuid){
          let imt_address = row.imt_address ;
          manager.fetchName(imt_address)
          .then((row) =>{
            let first_name = row.first_name ;
            let last_name = row.last_name ;
            let args = [userId,first_name,last_name,imt_address,"active"] ;
            console.log(args);
            client.query("INSERT INTO users(fb_id,first_name,last_name,email,status) VALUES($1,$2,$3,$4,$5)", args, (err, res) => {
                if (err) throw err;
                client.query("DELETE FROM verification WHERE fb_id='"+userId+"'") ;
                console.log("User added.");
                facebook.callSendAPI(userId, {"text":"Your account is now verified. Ask me!"});
                response.redirect("https://www.facebook.com") ;
            });
          }) ;
    }
  });
};
