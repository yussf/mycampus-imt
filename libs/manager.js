const { Client } = require('pg');
const uuidv1 = require('uuid/v1');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});
client.connect();
module.exports = {
  isResident:function(fname,lname,fb_id) {
      return new Promise(function(resolve) {
            client.query('SELECT fb_id, first_name, last_name FROM users', (err, res) => {
              if (err) throw err;
              let echo = false ;
              if (res != undefined){
                console.log(res.rows);
                for (let row of res.rows) {
                  let o = JSON.parse(JSON.stringify(row)) ;
                  if (o.fname.toLowerCase()==fname.toLowerCase() &
                              o.lname.toLowerCase()==lname.toLowerCase()){
                    echo = true ;
                  }
                }
              }
              resolve(echo);
            });
          });
       },
  newUser:function(fb_id){
    let uuid = uuidv1() ;
    return new Promise(function(resolve) {
          client.query("INSERT INTO verification (fb_id, guid,timestamp)"+
                "VALUES ('"+fb_id+"','"+uuid+"','"+Date.now()+"')", (err, res) => {
                  if (err) throw err;
                  resolve(echo);
          });
        });

  }
};
