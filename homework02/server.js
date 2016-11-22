/*Name: Jahn Davis
 *Course: CS-336
 *Homework 1
 *Date: October 5th, 2016
 *Professor: Keith Vander Linden
 *******************************************************/

/******************************MODULE AND LIST SETUP****************************************/
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//List of people to be used
var list = [ {firstname: 'John', lastname: 'Cena', loginID: 1, startDate: '03/15/1995'},
			{firstname: 'Franklin', lastname: 'Clinton', loginID: 2, startDate: '10/31/2013'},
			{firstname: 'Bobby', lastname: 'Portis', loginID: 3, startDate: '09/27/2005'},
			{firstname: 'James', lastname: 'Little', loginID: 4, startDate: '06/25/2002'} ];

app.get('/', function (req, res) {
  res.send('Welcome to the company employee server.');
});

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

/****************************************MAIN CODE*******************************************************/

//Gets the list of people
app.get('/people', function (req,res) {
	res.json(list);
	console.log('This is our employee roster.');
});

//returns a person based on loginID
app.get('/person/:id', function(req, res){
	var person;
	for (i = 0; i < list.length; i++){
		if (list[i].loginID == req.params.ID){
			person = list[i];
			console.log('Full employee record.')
		}
	}
	if (person == null){
		//Sends a 404 error message
		res.sendStatus(404);
	}
	else{
		//Sends person info
		res.json(person);
	}
});


//returns a person's full name based on loginID
app.get('/person/:id/name', function(req, res){
	var firstName;
	var lastName;
	for (i = 0; i < list.length; i++){
		if (list[i].loginID == req.params.id){
			firstName = list[i].firstname;
			lastName = list[i].lastname;
			console.log('Employee full name.')
		}
	}
	//Checks to see if the person exists
	if (firstName == null || lastName == null){
		//Sends a 404 error message
		res.sendStatus(404);
	}
	else {
		res.send(firstName + " " + lastName);
	}
});


//returns a person's tenure based on loginID
app.get('/person/:id/years', function(req, res){
	var currentDate = new Date();
	var startDate, personDate, years;
	//Searches through the employee's information
	for (i = 0; i < list.length; i++){
		if (list[i].loginID == req.params.id){
			startDate = list[i].startDate;
		}
	}
	//Sends a 404 error message
	if (startDate == null){
		res.sendStatus(404);
	}
	else{
	 	personDate = new Date(startDate);
		var years = currentDate.getFullYear() - personDate.getFullYear();
		var month = currentDate.getMonth() - personDate.getMonth();
		if (month < 0 || month === 0 && currentDate.getDate() < personDate.getDate()){
			years--;
	}

		res.send("Length of employment: " + years.toString());
	}
});

//GET method that uses the database in collaboration with the AJAX call for the second webpage
app.get('/person', function(req, res){
	var ID = req.query.personID;
	var person;
	for (var i=0; i < list.length; i++){
		if (list[i].loginID == ID){
			person = list[i];
		}
	}

	if (person == null){
		//Send error code 404 NOT FOUND
		res.sendStatus(404);
	}
	else{
		//Returns person
		res.send(person);
	}
});

app.post('/people', function(req, res){
	//Fetches form data
	var firstName = req.body.first;
	var lastName = req.body.last;
	var login = req.body.login;
	var date = req.body.date;

	//If some data is missing...
	if(firstName == '' || lastName == '' || login == '' || date == '') {
		console.log("You're missing data! We cannot create a person.");
		//We can't create a new person! Send a conflict status code.
		res.sendStatus(409);
		return;
	}

	//Checks to ensure loginID is not already taken
	for (var i = 0; i < list.length; i++){
		if (list[i].loginID == login){
			//User already exists
			console.log("Someone with that login information already exists.");
			console.log(list[i]);
			res.sendStatus(409);
			return;
		}
	}

	var newPerson = { firstname: firstName, lastname: lastName, loginID: login, startDate: date}
	list.push(newPerson);
	res.sendStatus(200);
});

//PUT method that updates the first name of a person
app.put('/person/:loginID/:first', function(req, res){
	var person, pos;
	var newName = req.params.first;
	for (var i = 0; i < list.length; i++){
		if (list[i].loginID == req.params.loginID){
			person = list[i];
			pos = i;
		}
	}
	//Search through database to find/update person
	if (person == null){
		//Sends a 404 NOT FOUND if person does not exist
		res.sendStatus(404);
	}
	else {
		list[pos].first = newName;
		res.sendStatus(200);
	}
});
//DELETE method that removes a person from the database
app.delete('person/:loginID', function(req, res){
	var person, pos;
	for (var i = 0; i < list.length; i++){
		if (list[i].loginID == req.params.loginID){
			person = list[i];
			pos = i;
		}
	}
	//Search through database to find/update person
	if (person == null){
		//Sends a 404 NOT FOUND if person does not exist
		res.sendStatus(404);
	}
	else {
		list.splice(pos, 1);
		res.sendStatus(200);
	}
});


app.listen(3000, function () {
  console.log('App listening on port 3000!');
});


