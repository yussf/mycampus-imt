const facebook = require('./facebook.js');
const manager = require('./manager.js');

module.exports = (req, res) => {
  
  let facebook_req = req.body.originalDetectIntentRequest ;
  let sender_psid = facebook_req.payload.data.sender.id ;
  let msg_text = req.body.queryResult.queryText ;


  //facebook.handleMessage(sender_psid, msg_text) ;

  if ( msg_text == "Hi"){
      let promise = manager.isResident(sender_psid);
      promise.then((data) => {
            console.log(data);
            console.log(sender_psid);
            if (data == true){
              response = {
                "fulfillmentText": "Hello "+name+"! \n What's up today?!"
              };
            }else{
              response = {
                "fulfillmentText": "Hello "+name+"! This is your first usage of MyCampus. Thank you for your trust."+
                "You only need to confirm your @imt-atlantique.net address to start using me :). \n"+
                "Please enter your email address"
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
