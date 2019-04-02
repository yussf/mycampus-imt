const { Client } = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});
client.connect();
module.exports = {
  isResident:function(fname,lname,fb_id) {
      return new Promise(function(resolve) {
            client.query('SELECT fb_id, fname, lname FROM users', (err, res) => {
              console.log(fname);
              console.log(lname);
              console.log(res.rows);
              let echo = false ;
              for (let row of res.rows) {
                let o = JSON.parse(JSON.stringify(row)) ;
                if (o.fname.toLowerCase()==fname.toLowerCase() &
                            o.lname.toLowerCase()==lname.toLowerCase()){
                  echo = true ;
                }
              }
              resolve(echo);
            });
          });
       }
};
