/*Name: Jahn Davis
 *Course: CS-336
 *Homework 1
 *Date: October 5th, 2016
 *Professor: Keith Vander Linden
 *******************************************************/

//Person object that stores first and last name, loginID, 
//		and start date of employment
function Person(first, last, loginID, startDate) {
    this.first = first;
    this.last = last;
    this.loginID = loginID;
    this.startDate = startDate;    
}

var express = require('express');
//var path = require('path');
var app = express();

app.use(express.static('public'));


app.get('/', function (req, res) {
  res.send('Welcome to the company employee server.');
});

//Gets the list of people
app.get('/people', function (req,res) {
	res.json(list);
	console.log('This is our employee roster.');
});

//returns a person based on loginID
app.get('/person/:loginID', function(req, res){
	var ID = req.params.loginID;
	for (i = 0; i < list.length; i++){
		if (ID == list[i].loginID){
			res.json(list[i]);
			console.log('Full employee record.')
			return;
		}
	}
	//Sends a 404 error message
	res.sendStatus(404);
});

//returns a person's full name based on loginID
app.get('/person/:loginID/name', function(req, res){
	var ID = req.params.loginID;
	for (i = 0; i < list.length; i++){
		if (ID == list[i].loginID){
			res.json(list[i].first + " " + list[i].last);
			console.log('Employee full name.')
			return;
		}
	}
	//Sends a 404 error message
	res.sendStatus(404);
});


//returns a person's tenure based on loginID
app.get('/person/:loginID/tenure', function(req, res){
	var ID = req.params.loginID;
	for (i = 0; i < list.length; i++){
		if (ID == list[i].loginID){
			var tenure = list[i].getTenure();
			res.json(list[i].first + " " + "has been an employee for" + " "+ tenure + " years.");
			console.log('Employee tenure.')
			return;
		}
	}
	//Sends a 404 error message
	res.sendStatus(404);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

//List of people to be used
var list = [];
list.push(new Person("John", "Cena", "jdc777", "03/15/1995"));
list.push(new Person("Franklin", "Johnson", "frj99", "10/31/2015"));
list.push(new Person("Bobby", "Portis", "bap55", "09/27/2005"));
list.push(new Person("James", "Little", "jsl33", "06/25/2002"));

//Calculates a person's tenure based on startDate and loginID
Person.prototype.getTenure = function(){
		var currentDate = new Date();
		var personDate = new Date(list[i].startDate);
		var years = currentDate.getFullYear() - personDate.getFullYear();
		var month = currentDate.getMonth() - personDate.getMonth();
		if (month < 0 || month === 0 && currentDate.getDate() < personDate.getDate()){
			years--;
		}
	return years;
}	

