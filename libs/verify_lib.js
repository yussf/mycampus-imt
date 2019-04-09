module.exports = (req, res) => {
  const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
  const { Client } = require('pg');
  const facebook = require('./facebook.js');
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });
  client.connect();
  // Imports dependencies and set up http server
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
          let i = imt_address.indexOf("@") ;
          let full_name = imt_address.substring(0,i);
          i = full_name.indexOf(".") ;
          let first_name = full_name.substring(0,i);
          let last_name = full_name.substring(i+1);
          let args = [userId,first_name,last_name,imt_address,"active"] ;
          console.log(args);
          client.query("INSERT INTO users(fb_id,first_name,last_name,imt_adresse,status) VALUES($1,$2,$3,$4,$5)", args, (err, res) => {
              if (err) throw err;
              console.log("User added.");
              facebook.callSendAPI(userId,"Your account is now verified. Ask me!");
              //res.redirect("https://www.facebook.com") ;
          });
    }
  });
};
///////////////////////////////////////////
