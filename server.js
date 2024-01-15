const express = require('express');
const bodyParser = require('body-parser');
const mailgun = require('mailgun-js');


const api_key = '96dae8f88a1fa558026f95b8a5d8d6c1-28e9457d-4e3ea9d4';
const domain = 'sandbox419cf724339c40859583a2a3dbf2dac2.mailgun.org';
const mg = mailgun({apiKey: api_key, domain: domain});

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html');
  });

app.post('/', (request, response) => {
  const email = request.body.email;


const data = {
  from: 'Excited User <chelsea4777.be22@chitkara.edu.in>',
  to: email,
  subject: 'Hello',
  text: 'Testing some Mailgun awesomeness!'
};
mg.messages().send(data, (error, body) => {
    if (error) {
      console.error('Error sending email via Mailgun:', error);
    } else {
      console.log('Email sent successfully via Mailgun');
    }
    console.log(body);
    response.sendFile(__dirname+'/index.html');
  });
});

app.listen(8486, function (request, response) {
    console.log('server isrunning');
  });
