require('dotenv').config()
const { Client } = require('pg')
const uuidv1 = require('uuid/v1')
const email_manager = require('./email_manager.js')
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true
})
client.connect()
module.exports = {
  isIdActive:function(fb_id, callback) {
    client.query("SELECT status FROM users WHERE fb_id=$1", [fb_id], (err, res) => {
      if (err) throw err
      let echo = false 
      if (res != undefined && res.rowCount > 0){
        echo = (res.rows[0].status == "active")
      }
      callback(echo)
    })
       },
  fetchName:function(email){
    return new Promise(function(callback){
      client.query("SELECT first_name, last_name FROM students WHERE email_address=$1", [email], (err,res) =>{
        let row  = res.rows[0]
        callback(row)
      })
    })
  },
  isEmailValid:function(email, callback){
    client.query("SELECT * FROM students WHERE LOWER(email_address)=LOWER($1)", [email], (err,res) => {
      if (res.rowCount == 1){
        callback(true)
      }else{
        callback(false)
      }
    })
  },
  newUser:function(fb_id,imt_address){
    let uuid = uuidv1()
    args = [fb_id,uuid,Date.now(),imt_address]
    client.query("INSERT INTO verification (fb_id, uuid, timestamp, imt_address) VALUES ($1,$2,$3,$4) "+
          "ON CONFLICT(fb_id) DO UPDATE SET uuid=$2, timestamp=$3, imt_address=$4;", args, (err, res) => {
            if (err) throw err
    })
    let link = "https://mycampus-imt.herokuapp.com/verify/"+fb_id+"/"+uuid
    let email_body = "Hello, \n Click on the link below to verify your account and use MyCampus. \n"+
                  link+"\n Thank you for your trust, \n MyCampus."
    email_manager.sendEmail("MyCampus verification", email_body, imt_address)

  },
  getPackages:function(fb_id, callback){
    client.query("SELECT * FROM colis JOIN users ON colis.email=users.email WHERE users.fb_id=$1",
     [fb_id], (err,res) => callback(res.rows))
  },
  getUserPackages:function(fb_id,callback){
    client.query("SELECT * FROM colis FULL OUTER JOIN users ON colis.email = users.email WHERE users.fb_id=$1", [fb_id],
    (err,res) =>{
      let text = ""
       res.rows.forEach(function(colis){
         let d = new Date(colis.date)
         let month = d.getMonth()+1
         let shortDate = d.getDate()+"-"+month+"-"+d.getFullYear()
        text = text + "Date : "+shortDate+" \n Par : "+colis.sender+" \n Retrait : "+colis.location+" \n --------------- \n"
       })
       callback(text)
   })
  },
  getEDTidFromPSID:function(fb_id, callback){
    client.query("SELECT edt_id FROM students JOIN users ON users.email = students.email_address WHERE users.fb_id=$1", [fb_id],
    function(err,res){
      callback(res.rows[0].edt_id)
    })
  }
}

