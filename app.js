'use strict';
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const manager = require('./libs/manager.js');
const email_manager = require('./libs/email_manager.js');
const verifyWebhook = require('./libs/verify-webhook');
const messageWebhook = require('./libs/message-webhook');
// Imports dependencies and set up http server
const
  request = require('request'),
  express = require('express'),
  body_parser = require('body-parser'),
  app = express().use(body_parser.json()); // creates express http server

////////////////////////////////////////////////////
//comment
///////////////////////////////////////////////////
let ir = manager.isResident("Youssef", "DOUBLI", "5895654698") ;
ir.then((data) => console.log(data)) ;
/////////////////////////////////////////////////
// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));
//console.log("pfffffffffffff");
// Accepts POST requests at /webhook endpoint
app.post('/webhook', messageWebhook);

// Accepts GET requests at the /webhook endpoint
app.get('/webhook', verifyWebhook);
app.get('/user/:userId/:uuid', (req,res) => console.log(req.params));
