const request = require('request');
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const manager = require('./manager.js');

module.exports = {
   handleMessage:function(sender_psid, received_message) {
    let response,name,curl;
    curl = "https://graph.facebook.com/v3.2/"+sender_psid+"?fields=id%2Cname%2Cfirst_name%2Clast_name&access_token="+PAGE_ACCESS_TOKEN
    // Checks if the message contains text
    if (received_message.text) {

          request(curl, function (error, response, body) {
                let json = JSON.parse(body) ;
                //console.log(json.name);
                name = json.first_name;
                lname = json.last_name;
                //console.log(lname);
                //console.log(name);
                let res = manager.isResident(name, lname, "58095654698") ;
                res.then((data) => {
                      if (data == true){
                        response = {
                          "text": "Hello "+name+"! \n What's up today?!"
                        }
                        // Send the response message

                      }else{
                        response = {
                          "text": "Hello "+name+"! \n This is your first usage of MyCampus. Thank You for your trust. \n"+
                          "You only need to confirm your @imt-atlantique.net adress to start using me :). \n"+
                          "Please enter your email adress"
                        }
                      }
                    module.exports.callSendAPI(sender_psid, response);
                  }) ;
          });
              // Create the payload for a basic text message, which
              // will be added to the body of our request to the Send API

    }
  },
  callSendAPI:function(sender_psid, response) {
    // Construct the message body
    let request_body = {
      "recipient": {
        "id": sender_psid
      },
      "message": response
    }

    // Send the HTTP request to the Messenger Platform
    request({
      "uri": "https://graph.facebook.com/v2.6/me/messages",
      "qs": { "access_token": PAGE_ACCESS_TOKEN },
      "method": "POST",
      "json": request_body
    }, (err, res, body) => {
      if (!err) {
        console.log('message sent!')
      } else {
        console.error("Unable to send message:" + err);
      }
    });
  }
};
