const facebook = require('./facebook.js');
const manager = require('./manager.js');

module.exports = (req, res) => {

  let facebook_req = req.body.originalDetectIntentRequest ;
  let sender_psid = facebook_req.payload.data.sender.id ;
  let msg_text = req.body.queryResult.queryText ;
  let intent = req.body.queryResult.intent.name ;

  switch (intent) {
    case "smalltalk.greetings.hello":
          console.log(intent);
          manager.isResident(sender_psid)
          .then((data) => {
                if (data == true){
                  response = {} ;
                }else{
                  response = {} ;
                }
                res.send(response);

            })
            .catch((err) => console.log(err)) ;
      break;
    case "takeMyEmail" :
      console.log(intent);
      console.log(req.body);
      //manager.newUser(sender_psid,msg_text);
      response = {
        "fulfillmentText": "I have sent you an email to verify your account. Check it out."
      } ;
      res.send(response);
      break;
    default: res.send({}) ;

  }

};
