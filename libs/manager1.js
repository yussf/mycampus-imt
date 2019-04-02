const { Client } = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

module.exports = {
  isResident:function(fname,lname,fb_id) {
      client.connect();
      client.query('SELECT fb_id, fname, lname FROM users', (err, res) => {
              console.log(res);
              client.end();
            });
          });
       }
};
