module.exports = (req, response) => {
  const { Client } = require('pg');
  const facebook = require('./facebook.js');
  const manager = require('./manager.js');
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });
  client.connect();
  console.log(req.params) ;
  let userId = req.params.userId ;
  let uuid = req.params.uuid;
  client.query("SELECT uuid, imt_address FROM verification WHERE fb_id='"+userId+"'", (err, res) => {
    if (err) throw err;
    let row = res.rows[0] ;
    console.log(row.uuid);
    if (row.uuid == uuid){
          let imt_address = row.imt_address ;
          let args = [userId,imt_address,"active"] ;
            console.log(args);
            client.query("INSERT INTO users(fb_id,email,status) VALUES($1,$2,$3)", args, (err, res) => {
                if (err) throw err;
                client.query("DELETE FROM verification WHERE fb_id='"+userId+"'") ;
                console.log("User added.");
                facebook.callSendAPI(userId, {"text":"Your account is now verified. Ask me!"});
                response.redirect("https://www.facebook.com") ;
            });
    }
  });
};
