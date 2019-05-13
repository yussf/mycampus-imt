require('dotenv').config()
const manager = require('./manager.js')
const scrapper = require('./scrapper.js')
const icalParser = require('./icalParser')
module.exports = (req, res) => {
  // get original request as sent from facebook messenger
  let facebook_req = req.body.originalDetectIntentRequest
  //extract user id
  let sender_psid = facebook_req.payload.data.sender.id
  //extract intent from dialgflow's response
  let intent = req.body.queryResult.intent.displayName
  manager.isIdActive(sender_psid, (isActive) => {
    if (intent != "takeMyEmail" && !isActive ) {
      res.send({
        "fulfillmentText": "Hello there! This is your first time talking to me. Please give me your @imt-atlantique.net address to verify your account. Thanks for your trust!"
      })
    }else{
      handleIntent(intent) 
    }
  })
function handleIntent(intent){
  switch (intent) {
    //if user's intent is to say hello
    case "smalltalk.greetings.hello":
      res.send({})
      break
    // if user intent is to verify his account
    case "takeMyEmail" :
      let email = req.body.queryResult.parameters.email.toLowerCase()
      manager.isIdActive(sender_psid, (isActive) => {
        //if user aleeady verified
        if (isActive){
          res.send({ "fulfillmentText": "Your email is already verified. Go ahead and ask me!"})
        }else {
          manager.isEmailValid(email, (isValid) => {
            if (isValid){
              //call newUser to add user to DB
              manager.newUser(sender_psid,email)
              response = {"fulfillmentText": "I have sent you an email to "+email+" to verify your account. Check it out."}
              res.send(response)
            }else {
              res.send({"fulfillmentText": "The address that you entered is not an @imt-atlantique address. Please try a valid one."})
            }
          })
         
        }
      })
      
      break;
    case "WhatDidIReceive" :
      manager.getPackages(sender_psid,(packages) => {
        let text = ""
        if (packages == null || packages.length == 0){
          text = "I dont seem to find any package in your name in my database. Sorry!"
        }else{
          text = "You have "+packages.length+" package(s) waiting for you"
        }
        res.send({"fulfillmentText": text})
      })
      
      break;
    case "menuLunch":
      scrapper.getMenu(0, (menu) =>{
        let text = ""
        for (line in menu){
          text = text + "- " + menu[line] + "\n"
        }
        res.send({"fulfillmentText": text})
      })
      break;
    case "menuDinner":
      scrapper.getMenu(1, (menu) =>{
        let text = ""
        for (line in menu){
          text = text + "- " + menu[line] + "\n"
        }
        res.send({"fulfillmentText": text})
      })
      break;
    case "emploiAsk":
      manager.getEDTidFromPSID(sender_psid, edt_id => {
        icalParser(edt_id, text => res.send({"fulfillmentText": text}))
      })
      break;
    default: res.send({}) ;

  }
}
}
