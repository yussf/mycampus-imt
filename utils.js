const { Client } = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});
const db = require('./libs/db_connector.js') ;
module.exports = {
   isResident:function(fname,lname,fb_id) {
       return new Promise(function(resolve) {
         db.query('SELECT fb_id, fname, lname FROM users',(err, res) => {
                   if (err) throw err;
                   for (let row of res.rows) {
                     let o = JSON.parse(JSON.stringify(row)) ;
                     if (o.fname==fname & o.lname==lname){
                       //console.log("plopm");
                       resolve(true) ;
                     }
                   }

                 });
           });
        }
};
