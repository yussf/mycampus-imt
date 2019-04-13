const { Client } = require('pg');
const uuidv1 = require('uuid/v1');
const email_manager = require('./email_manager.js');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});
client.connect();
module.exports = {
  isResident:function(fb_id) {
      return new Promise(function(resolve) {
            client.query("SELECT first_name, last_name, status FROM users WHERE fb_id='"+fb_id+"'", (err, res) => {
              //if (err) throw err;
              let echo = false ;
              if (res != undefined){
                //console.log(res);
                console.log(res.rows);
                let row = res.rows[0] ;
                let o = JSON.parse(JSON.stringify(row)) ;
                if (o.status == "active"){
                  let echo = true
                }
              }
              resolve(echo);
            });
          });
       },
  newUser:function(fb_id,imt_address){
    let uuid = uuidv1() ;
    client.query("INSERT INTO verification (fb_id, uuid,timestamp, imt_address)"+
          "VALUES ('"+fb_id+"','"+uuid+"','"+Date.now()+"','"+imt_address+"')", (err, res) => {
            if (err) throw err;
    });
    let link = "https://mycampus-imt.herokuapp.com/verify/"+fb_id+"/"+uuid;
    let email_body = "Hello, \n Click on the link below to verify your account and use MyCampus. \n"+
                  link+"\n Thank you for your trust, \n MyCampus.";
    email_manager.sendEmail("MyCampus verification", email_body, imt_address);

  },

};
