'use strict';
const https = require('https');

module.exports ={
    //sendOtp
    sendOtp: (req, res) => {
        let TELEGRAM_BOT_TOKEN= '6330354817:AAFjWg0R3iyja8iet8h0qwSGmHS6jPlnrEA'
            ,telegramId=req.params.chatIdTele
            ,message=req.params.phoneNumber
            ,url_req_tlbot="https://api.telegram.org/bot" + TELEGRAM_BOT_TOKEN + "/sendMessage?chat_id=" + telegramId + "&text=" + message + "&parse_mode=html"
        console.log('telegramId:'+ telegramId);
        console.log('phoneNumber:'+ message);
        https.get(url_req_tlbot, (resp) => {
          let data = '';

          // A chunk of data has been received.
          resp.on('data', (chunk) => {
            data += chunk;
          });

          // The whole response has been received. Print out the result.
          resp.on('end', () => {
            console.log(JSON.parse(data).explanation);
          });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    },
}

/*
const https = require('https');

https.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', (resp) => {
  let data = '';

  // A chunk of data has been received.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(JSON.parse(data).explanation);
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});

*/