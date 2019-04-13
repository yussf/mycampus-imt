const facebook = require('./facebook.js');
const manager = require('./manager.js');

module.exports = (req, res) => {

  let facebook_req = req.body.originalDetectIntentRequest ;
  let sender_psid = facebook_req.payload.data.sender.id ;
  let msg_text = req.body.queryResult.queryText ;


  if ( msg_text == "Hi"){
      let promise = manager.isResident(sender_psid);
      promise.then((data) => {
            console.log(data);
            console.log(sender_psid);
            if (data == true){
              response = {
                "followupEventInput": {
                        "name": "smalltalk.greetings.hello",
                        "languageCode": "en-US",
                      }
              } ;
            }else{
              response = {
                "followupEventInput": {
                        "name": "smalltalk.greetings.hello",
                        "languageCode": "en-US",
                      }

              } ;
            }

            res.setHeader('Content-Type','applicaiton/json');
            res.send(response);

        }) ;
      promise.catch((err) => console.log(err)) ;

      }else if (msg_text.indexOf("@imt-atlantique.net") > 1) {
        manager.newUser(sender_psid,msg_text);
        response = {
          "fulfillmentText": "I have sent you an email to "+msg_text+" to verify your account. Check it out."
        } ;
        res.setHeader('Content-Type','applicaiton/json');
        res.send(response);
      }


};
