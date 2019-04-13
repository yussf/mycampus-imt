const manager = require('./manager.js');
module.exports = (req, res) => {
  let facebook_req = req.body.originalDetectIntentRequest ;
  let sender_psid = facebook_req.payload.data.sender.id ;
  let intent = req.body.queryResult.intent.displayName ;
  console.log(intent);
  switch (intent) {
    case "smalltalk.greetings.hello":
          console.log(intent);
          manager.isIdActive(sender_psid)
          .then((data) => {
                if (!(data)){
                  res.send({
                    "fulfillmentText": "Hello there! This is your first time talking to me. Please give me your @imt-atlantique.net address to verify your account. Thanks for your trust!"
                  });
                }else {
                  res.send({}) ;
                }

            })
            .catch((err) => console.log(err)) ;
      break;
    case "takeMyEmail" :
      let email = req.body.queryResult.parameters.email ;
      manager.isIdActive(sender_psid)
      .then((data) => {
        if (data){
          res.send({
            "fulfillmentText": "Your email is already verified. Go ahead and ask me!"
          });
        }else {
          if (email.indexOf("@imt-atlantique.net") > 1){
              manager.newUser(sender_psid,email);
              response = {
                "fulfillmentText": "I have sent you an email to "+email+" to verify your account. Check it out."
              } ;
              res.send(response);
        }else {
          res.send({
            "fulfillmentText": "The address that you entered is not an @imt-atlantique address. Please try a valid one."
          }) ;
        }
        }
      })
      .catch((err) => console.log(err)) ;
      break;
    default: res.send({}) ;

  }

};
