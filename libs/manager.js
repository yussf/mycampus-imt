const { Client } = require('pg');
const uuidv1 = require('uuid/v1');
const email_manager = require('./email_manager.js');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});
client.connect();
module.exports = {
  isIdActive:function(fb_id) {
      return new Promise(function(resolve) {
            client.query("SELECT status FROM users WHERE fb_id='"+fb_id+"'", (err, res) => {
              //console.log(res);
              if (err) throw err;
              let echo = false ;
              if (res != undefined && res.rowCount > 0){
                let row = res.rows[0] ;
                let o = JSON.parse(JSON.stringify(row)) ;
                if (o.status == "active")  echo = true ;
              }
              resolve(echo);
            });
          });
       },
   isEmailActive:function(email) {
       return new Promise(function(resolve) {
             client.query("SELECT status FROM users WHERE imt_adresse='"+email+"'", (err, res) => {
               //console.log(res);
               if (err) throw err;
               let echo = false ;
               if (res != undefined && res.rowCount > 0){
                 let row = res.rows[0] ;
                 let o = JSON.parse(JSON.stringify(row)) ;
                 if (o.status == "active")  echo = true ;
               }
               resolve(echo);
             });
           });
        },
  fetchName:function(email){
    return new Promise(function(callback){
      client.query("SELECT first_name, last_name FROM students WHERE email_address='"+email+"'", (err,res) =>{
        let row  = res.rows[0] ;
        callback(row)  ;
      });
    }) ;
  },
  newUser:function(fb_id,imt_address){
    let uuid = uuidv1() ;
    args = [fb_id,uuid,Date.now(),imt_address];
    client.query("INSERT INTO verification (fb_id, uuid, timestamp, imt_address) VALUES ($1,$2,$3,$4) "+
          "ON CONFLICT(fb_id) KEY DO UPDATE SET uuid=$2, timestamp=$3, imt_address=$4;", args, (err, res) => {
            if (err) throw err;
    });
    let link = "https://mycampus-imt.herokuapp.com/verify/"+fb_id+"/"+uuid;
    let email_body = "Hello, \n Click on the link below to verify your account and use MyCampus. \n"+
                  link+"\n Thank you for your trust, \n MyCampus.";
    email_manager.sendEmail("MyCampus verification", email_body, imt_address);

  }

};
