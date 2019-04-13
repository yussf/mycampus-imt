'use strict';
const messageHandler = require('./libs/message-handler');
const scrapper = require('./libs/scrapper.js');

const verify = require('./libs/verify_lib.js');
// Imports dependencies and set up http server
const
  request = require('request'),
  express = require('express'),
  body_parser = require('body-parser'),
  app = express().use(body_parser.json()); // creates express http server

/////////////////////////////////////////////////
// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));
//console.log("pfffffffffffff");
// Accepts POST requests at /webhook endpoint
app.post('/dialogflow', messageHandler);
// Accepts GET requests at the /webhook endpoint
app.get('/verify/:userId/:uuid', verify);
app.get('/scrap', scrapper) ;