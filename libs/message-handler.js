const facebook = require('./facebook.js');
module.exports = (req, res) => {

  let facebook_req = req.body.originalDetectIntentRequest ;
  let sender_psid = facebook_req.payload.sender.id ;
  let msg_text = req.body.queryResult.queryText ;
  console.log(sender_psid);
  console.log(res);

  //facebook.handleMessage(sender_psid, msg_text) ;

  if ( msg_text == "Hi"){
      let res = manager.isResident("58095654698") ;
      res.then((data) => {
            console.log(data);
            if (data == true){
              response = {
                "fulfillmentText": "Hello "+name+"! \n What's up today?!"
              }
            }else{
              response = {
                "fulfillmentText": "Hello "+name+"! This is your first usage of MyCampus. Thank you for your trust."+
                "You only need to confirm your @imt-atlantique.net address to start using me :). \n"+
                "Please enter your email address"
              } ;
            }

        }) ;

      }else if (msg_text.indexOf("@imt-atlantique.net") > 1) {
        manager.newUser(sender_psid,msg_text);
        response = {
          "fulfillmentText": "I have sent you an email to "+msg_text+" to verify your account. Check it out."
        } ;

      }

      res.setHeader('Content-Type','applicaiton/json');
      res.send(JSON.stringify(response));
};
