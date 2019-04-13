const facebook = require('./facebook.js');
const manager = require('./manager.js');

module.exports = (req, res) => {

  let facebook_req = req.body.originalDetectIntentRequest ;
  let sender_psid = facebook_req.payload.data.sender.id ;
  let msg_text = req.body.queryResult.queryText ;
  let intent = req.body.queryResult.intent.name ;
  let res_msgs = req.body.queryResult.fulfillmentMessages[0].text.text;
  console.log(res_msgs);
  console.log(intent);
  switch (intent) {
    case "smalltalk.greetings.hello":
          manager.isResident(sender_psid);
          .then((data) => {
                console.log(data);
                console.log(sender_psid);
                if (data == true){
                  response = {} ;
                }else{
                  response = {} ;
                }

                res.setHeader('Content-Type','applicaiton/json');
                res.send(response);

            })
            .catch((err) => console.log(err)) ;
      break;
    default:

  }

};
