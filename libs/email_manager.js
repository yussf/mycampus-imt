const nodemailer = require('nodemailer');
module.exports = {
  sendEmail:function(emailSubject,emailText,emailTo){
            nodemailer.createTestAccount((err, account) => {
          let transporter = nodemailer.createTransport({
              host: 'smtp.googlemail.com', // Gmail Host
              port: 465, // Port
              secure: true, // this is true as port is 465
              auth: {
                  user: 'mycampusimt', //Gmail username
                  pass: 'pass=mycampus' // Gmail password
              }
          });

          let mailOptions = {
              from: '"MyCampus" <mycampusimt@gmail.com>',
              to: emailTo, // Recepient email address. Multiple emails can send separated by commas
              subject: emailSubject,
              text: emailText
          };

          transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                  return console.log(error);
              }
              console.log('Message sent: %s', info.messageId);
          });
        });
  }
};
