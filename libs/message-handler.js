require('dotenv').config()
const manager = require('./manager.js')
const scrapper = require('./scrapper.js')
const icalParser = require('./icalParser')
const carpool = require('./atlantic_express')
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
          text = "You have "+packages.length+" package(s) waiting for you. Do you want more info?"
        }
        res.send({"fulfillmentText": text})
      })
      
      break;
    case "WhatDidIReceive - yes":
      manager.getUserPackages(sender_psid, (text) => res.send({"fulfillmentText": text}))
      break;
    case "menuLunch":
      scrapper.getMenu(0, 'rampe', (menu) =>{
        let text = ""
        for (line in menu){
          text = text + "- " + menu[line] + "\n"
        }
        res.send({"fulfillmentText": text})
      })
      break;
    case "menuDinner":
      scrapper.getMenu(1, 'rampe', (menu) => {
        let text = ""
        for (line in menu){
          text = text + "- " + menu[line] + "\n"
        }
        res.send({"fulfillmentText": text})
      })
      break;
    case "menuCafeteria":
      scrapper.getMenu(0, 'cafeteria', (menu) =>{
        let text = "Salades : \n"
        for (line in menu){
          text = text + "- " + menu[line] + "\n"
        }
        scrapper.getMenu(1, 'cafeteria', (menu) =>{
          text = text + "Sandwichs : \n"
          for (line in menu){
            text = text + "- " + menu[line] + "\n"
          }
          res.send({"fulfillmentText": text})
        })
      })
      break;
    case "edtToday":
      manager.getEDTidFromPSID(sender_psid, edt_id => {
        icalParser(edt_id, "today", text => res.send({"fulfillmentText": text}))
      })
      break;
    case "edtDate":
      let date = req.body.queryResult.parameters.date
      manager.getEDTidFromPSID(sender_psid, edt_id => {
        icalParser(edt_id, date, text => res.send({"fulfillmentText": text}))
      })
      break;
    case 'covoiturage':
        var destination = req.body.queryResult.parameters.destination
        var departure = req.body.queryResult.parameters.departure
        carpool.getJourneys(departure, destination, data => {
          var text = "Sorry. There's no result for your destination"
          if (data.length == 1) text = "There's 1 person heading to your destination. Would you like to know more?"
          if (data.length > 1) text = "There's "+data.length+" people heading to your destination. Would do you like more details?"
          res.send({"fulfillmentText": text})
        })
      break;
    case "covoiturage - yes":
        var originalContext = req.body.queryResult.outputContexts[0].parameters
        var destination = originalContext.destination
        var departure = originalContext.departure
        carpool.getJourneys(departure, destination, data => {
          var text = ""
          console.log(data);
          if (data.length == 0) text = "Sorry. There's no result for your destination"
          else{
            for (i in data){
                journey = data[i]
                text = text + '\n' + `${journey.driver} is heading to ${journey.destination} on ${journey.date} at ${journey.heure}. \n ${journey.places_restantes} place(s) left.`
            }
          }
          res.send({"fulfillmentText": text})
        })
      break;
    default: res.send({}) ;

  }
}
}
