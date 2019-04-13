const facebook = require('./facebook.js');
const manager = require('./manager.js');
module.exports = (req, res) => {
  let facebook_req = req.body.originalDetectIntentRequest ;
  let sender_psid = facebook_req.payload.data.sender.id ;
  let msg_text = req.body.queryResult.queryText ;
  let intent = req.body.queryResult.intent.displayName ;
  console.log(intent);
  switch (intent) {
    case "smalltalk.greetings.hello":
          console.log(intent);
          manager.isIdActive(sender_psid)
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
      let email = req.body.queryResult.parameters.email ;
      manager.isEmailActive(email)
      .then((data) => {
        if (data){
          res.send({
            "fulfillmentText": "Your email is already verified. Go ahead and ask me!"
          });
        }else {
          manager.newUser(sender_psid,email);
          response = {
            "fulfillmentText": "I have sent you an email to "+email+" to verify your account. Check it out."
          } ;
          res.send(response);
        }
      })
      .catch((err) => console.log(err)) ;

      break;
    default: res.send({}) ;

  }

};
