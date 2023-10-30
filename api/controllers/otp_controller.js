'use strict';
let express = require('express');
let app= express();

module.exports ={
    //sendOtp
    sendOtp: (req, res) => {
        let TELEGRAM_BOT_TOKEN= '6330354817:AAFjWg0R3iyja8iet8h0qwSGmHS6jPlnrEA'
            ,telegramId=req.params.chatIdTele
            ,message=req.params.phoneNumber;
        app.get('https://api.telegram.org/bot' + TELEGRAM_BOT_TOKEN + "/sendMessage?chat_id=" + telegramId + "&text=" + message + "&parse_mode=html", (req, res) => {
          res.send('Hello World!')
        })

        app.listen(3000, () => {
          console.log('Example app listening on port 3000!')
        })
    },
}

/*

const express = require('express')
const app = express()

//get request
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})


//post request
npm install body-parser

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/', (req, res) => {
    let data = req.body;
    res.send('Data Received: ' + JSON.stringify(data));
})


app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
*/