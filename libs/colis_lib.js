const { Client } = require('pg');
require('dotenv').config()

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
})

module.exports = {
   
}
