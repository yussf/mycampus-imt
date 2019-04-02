const nodemailer = require('nodemailer');
module.exports = {
  sendEmail:function(){
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
              from: '"MyCampus NO REPLY" <mycampusimt@gmail.com>',
              to: 'usfdbl@gmail.com', // Recepient email address. Multiple emails can send separated by commas
              subject: 'Welcome Email',
              text: 'This is the email sent through Gmail SMTP Server.'
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
