'use strict'
require('dotenv').config()
const messageHandler = require('./libs/message-handler.js')
const verify = require('./libs/verify_lib.js')
const notifier = require('./libs/notifier.js')
const min = 60000
// Imports dependencies and set up the http server
const
  express = require('express'),
  body_parser = require('body-parser'),
  app = express().use(body_parser.json()) // creates express http server
/////////////////////////////////////////////////
// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log('MyCampus is listening'))
// Accepts POST requests at /dialogflow endpoint coming from dialogflow fullfilment
app.post('/dialogflow', messageHandler)
// Accepts GET requests at the /verify .. endpoint to verify account
app.get('/verify/:userId/:uuid', verify)
//handles the ping sent from the webApp, closes connection immediately
app.post('/ping', (req,res) => res.end())
//redirect to fb page
app.get('*', (req, res) => res.redirect('https://www.facebook.com/mycampusimt'))
//repeat notifier() every n*min
setInterval(notifier, 1*min)