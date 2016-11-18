/*Server for Lab 5
 *Name: Jahn Davis
 *Course: CS-336
 *Lab 5
 *Date: October 7th, 2016
 *Professor: Keith Vander Linden
 *********************************************************/
 
//Express setup
var express = require('express');
var app = express();

//Message sent to browser
app.get('/', function (req, res) {
  res.send('Welcome to Lab 5. I hope you enjoy your stay.');
});

//Logs to console when using this server
app.listen(3000, function() {
console.log('Listening on port 3000!')
})

//
app.use(express.static('public'));