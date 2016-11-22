/*Name: Jahn Davis
 *Course: CS-336
 *Homework 3
 *Date: November 18th, 2016
 *Professor: Keith Vander Linden
 *******************************************************/

/******************************MODULE AND LIST SETUP****************************************/
var express = require('express');
var bodyParser = require('body-parser');

//MongoDB implementation
var MongoClient = require('mongodb').MongoClient
var databaseConnection;

var app = express();


//Adapted from: https://expressjs.com/en/guide/database-integration.html#mongo
//Establish a connection with the database, then store the connection in a global variable.
MongoClient.connect('mongodb://cs336:PASSWORD@ds151127.mlab.com:51127/cs336', function (err, db) {
  if (err) throw err

	databaseConnection = db;
});

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

/****************************************MAIN CODE*******************************************************/
//Taken from Facebook React tutorial
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest people.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

//Gets the list of people
app.get('/people', function (req,res) {
	var collection = databaseConnection.collection('people');

	//Grabs all the people in the collection
	collection.find({}).toArray(function(err, docs) {
		if (err) throw err;
		res.json(docs);
	});
});

//returns a person and their full record of information, based on loginID
app.get('/person/:id', function(req, res){
	var id = Number(req.params.id);
	var collection = databaseConnection.collection('people');
	
	var holder = collection.find({loginID: id});

	holder.toArray(function(err, docs) {
		if (docs.length == 0){
			res.sendStatus(404);
		}
		else{
			res.json(docs);
		}
	});
});


//returns a person's full name based on loginID
app.get('/person/:id/name', function(req, res){
	var id = Number(req.params.id);
	var collection = databaseConnection.collection('people');
	
	var holder = collection.find({loginID: id});

	holder.toArray(function(err, docs) {
		if (docs.length == 0){
			res.sendStatus(404);
		}
		else{
			res.json(docs[0].firstName + " " + docs[0].lastName);
		}
	});
});

//returns a person's tenure based on loginID
app.get('/person/:id/years', function(req, res){
	var currentDate = new Date();
	var startDate, personDate, years;
	
	var id = Number(req.params.id);
  	var collection = databaseConnection.collection('people');

  //Check if the find() call returns nothing.
  	var holder = collection.find({loginID: id});
  	holder.toArray(function(err, docs) {
    	if(docs.length == 0) {
      		//Person not found!
      		res.sendStatus(404);
		}	
		else{
		startDate = docs[0].startDate;
	 	personDate = new Date(startDate);
		var years = currentDate.getFullYear() - personDate.getFullYear();
		var month = currentDate.getMonth() - personDate.getMonth();
		if (month < 0 || month === 0 && currentDate.getDate() < personDate.getDate()){
			years--;
		}
		res.send("Length of employment: " + years.toString());
		}
	});
});

//GET method that uses the database in collaboration with the AJAX call for the second webpage
app.get('/person', function(req, res){
	var id = Number(req.query.personID);
	var collection = databaseConnection.collection('people');
	var holder = collection.find({loginID: id});

	holder.toArray(function(err, docs) {
		if (docs.length == 0){
			//Send error code 404 NOT FOUND
			res.sendStatus(404);
		}
		else{
			//Returns person
			res.json(docs);
		}
	});
});

app.post('/people', function(req, res){
	//Fetches form data
	var first = req.body.firstname;
	var last = req.body.lastname;
	var login = Number(req.body.loginID);
	var date = req.body.startDate;

	//If some data is missing...
	if(first == '' || last == '' || login == '' || date == '') {
		console.log("You're missing data! We cannot create a person.");
		//We can't create a new person! Send a conflict status code.
		res.sendStatus(409);
		return;
	}

	var newPerson = { firstname: first, lastname: last, loginID: login, startDate: date}

	var collection = databaseConnection.collection('people');

	var holder = collection.find({loginID: login});
	//Checks to ensure loginID is not already taken
	holder.toArray(function(err, docs) {
		if (docs.length > 0){
			//User already exists
			console.log("Someone with that login information already exists.");
			console.log(docs[0]);
		}
		else{
			collection.insert(newPerson);
		}
	});
});


//PUT method that updates the first name of a person
app.put('/person/:loginID/:first', function(req, res){
	var id = Number(req.params.id);
	var newName = req.params.first;

	var collection = databaseConnection.collection('people');
	var holder = collection.find({loginID: login});
	//Checks to ensure loginID is not already taken
	holder.toArray(function(err, docs) {
		if (docs.length > 0){
			res.sendStatus(404);
		}
		else{

			collection.update({loginID: id}, {$set: {firstname: newName} });
			res.sendStatus(201);
		}
	});
});

//DELETE method that removes a person from the database
app.delete('person/:id', function(req, res){
	var id = Number(req.params.id);
	var collection = databaseConnection.collection('people');
	var holder = collection.find({loginID: id});
	//Checks to ensure loginID is not already taken
	holder.toArray(function(err, docs) {
		if (docs.length > 0){
			res.sendStatus(404);
		}
		else{

			collection.remove({loginID: id});
			res.sendStatus(200);
		}
	});
});

app.listen(3000, function () {
  console.log('App listening on port 3000!');
});


