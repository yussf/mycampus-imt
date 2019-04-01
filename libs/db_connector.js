const { Client } = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

module.exports = {
   query:function(query,call){
     return new Promise(function(resolve) {
           client.connect();
           client.query(query, call);
           client.end();
         });
   }
};
