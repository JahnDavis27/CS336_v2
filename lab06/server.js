/*server.js is the server to use HTTP methods for lab06.
 *Name: Jahn Davis
 *Date: October 14th, 2016
 *Lab06 for CS336
 */

 /*Questions

  ****************Exercise 6.1************************
  *Used all curl methods succesfully
  *	curl http://localhost:3000/request for the GET method
  * curl --head http://localhost:3000/request for the HEAD method
  *	curl -X PUT http://localhost:3000/request -d '{"Jahn": 100}' -H 'Content-Type: application/json' for the PUT method
  *	curl -X POST http://localhost:3000/request -d '{"Jahn": 100}' -H 'Content-Type: application/json' for the POST method
  *	curl -X DELETE http://localhost:3000/request -d '{"Jahn": 100}' -H 'Content-Type: application/json' for the DELETE method
 *
  *GET and ALL can be used in the browser. GET is what posts to the browset, and ALL serves a GONE status code error if a
  *	route was unspecified. Unless a form is added, the browser cannot go any farther than that, due to risking the loss of data.

  *404 Not Found is the appropriate HTTP response code for pages that aren't defined by an Express route. 


  *****************Exercise 6.2*************************
  *Forms support the GET and POST methods.

  *server.js receives the data as a list of 3 key/value items in the HTTP request. 
  *The 'name' attributes assigned with the three input types handle this. JavaScript/Express uses a module called body-parser to
  *		parse the req.body information that is sent to the server, using a '{"argument":"value"}' format.
  *********************************************************************************************************************************/


//Express setup
var express = require('express');
//var path = require('path');
var app = express();

// Set up http-status-codes and body-parser for server
var http_status = require('http-status-codes');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Use public directory
app.use(express.static('public'));

//HTTP get method
app.get('/request', function (req, res) {
  res.send('GET works!');
});

//HTTP head method
app.head('/request', function (req, res){
	res.send('HEAD works!')
});

//HTTP post method
app.post('/request', function (req, res) {
  res.send('POST works!'  + req.body.Jahn);
});

//HTTP post method v2
app.post('/forms', function (req, res) {
  res.send('Hello, jrd58!<br>Name: '  + req.body.user_name + '<br>Email: ' + req.body.user_mail + '<br>Posted message: ' + req.body.user_message);
});

//HTTP put method
app.put('/request', function (req, res) {
  res.send('PUT works!' + req.body.Jahn);
});

//HTTP delete method
app.delete('/request', function (req, res) {
  res.send('DELETE works!');
});

app.all('*', function(req, res) {
	res.sendStatus(http_status.GONE);
});

app.listen(3000, function(){
	console.log('Lab 6 is listening on port 3000!')
});
