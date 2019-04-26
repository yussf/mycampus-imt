'use strict';
require('dotenv').config()
const messageHandler = require('./libs/message-handler.js');
const scrapper = require('./libs/scrapper.js');
const verify = require('./libs/verify_lib.js');
// Imports dependencies and set up http server
const
  express = require('express'),
  body_parser = require('body-parser'),
  app = express().use(body_parser.json()); // creates express http server
/////////////////////////////////////////////////
// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log('MyCampus is listening'));
// Accepts POST requests at /dialogflow endpoint coming from dialogflow fullfilment
app.post('/dialogflow', messageHandler);
// Accepts GET requests at the /verify .. endpoint to verify account
app.get('/verify/:userId/:uuid', verify);
// Accepts GET requests at the /scrap
app.get('/scrap', scrapper) ;

//setInterval(notifier)