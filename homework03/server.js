/*Name: Jahn Davis
 *Course: CS-336
 *Homework 3
 *Date: November 18th, 2016
 *Professor: Keith Vander Linden
 *******************************************************/

/******************************MODULE AND LIST SETUP****************************************/
var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var db;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

/****************************************MAIN CODE*******************************************************/
//Taken from Facebook React tutorial
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

//Gets the list of people
app.get('/api/people', function (req,res) {
	db.collection("people").find({}).toArray(function(err, docs) {
		assert.equal(err, null);
		res.json(docs);
	});
});

app.post('/api/people', function(req, res) {
    var newPerson = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        idnumber: req.body.idnumber,
        startdate: req.body.startdate,
    };
    db.collection("people").insertOne(newPerson, function(err, result) {
        assert.equal(err, null);
        res.json(result);
    });
});

/*************************GET methods****************************/
app.get('/people', function(req, res) {
    console.log('Displaying employees on the web page...')
    db.collection("people").find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        res.json(docs);
    })
});

// Write out the full record of the employee with the given ID if /person/:ID URL is found
app.get('/person/:ID', function(req, res) {
    var loginID = req.params.ID;
    db.collection("people").find().toArray(function(err, docs) {
        for (object of docs) {
            if (object["idnumber"] == loginID) {
                res.json(object);
            }
        }
    });
});

//returns a person's full name based on loginID
app.get('/person/:ID/name', function(req, res) {
    var loginID = req.params.ID;
    db.collection("people").find().toArray(function(err, docs) {
        for (object of docs) {
            if (object["idnumber"] == loginID) {
                var temp = object["firstname"] + " " + object["lastname"];
                res.json(temp);
            }
        }
    });
});


//returns a person's tenure based on loginID
app.get('/person/:id/years', function(req, res){
	var loginID = req.params.id;
    db.collection("people").find().toArray(function(err, docs) {
        for (object of docs) {
            if (object["idnumber"] == loginID) {
                var years = getYears(object["startdate"]);
                res.json(years);
            }
        }
    });
});

/****************PUT, POST, and DELETE methods**************/
// Get new Employee information from AJAX form data
app.post('/people', function(req, res) {
    // Create a newPerson
    var newPerson = {
        firstname: req.body.user_first_name,
        lastname: req.body.user_last_name,
        loginID: req.body.user_id_number,
        startDate: req.body.user_start_Date,
    };

    // Add the newPerson to the people collection in the database
    db.collection("people").insertOne(newPerson, function(err, result) {
        assert.equal(err, null);
    });
    // Create a JSON object for the result data that is sent back
    result = {"first" : req.body.user_first_name, "last" : req.body.user_last_name};
    //Return the JSON object result data to web page
    res.json(JSON.stringify(result));
});

app.post('/person/:id', function(req, res) {
    // Get the ID Number entered by the user using req.body
    var loginID = req.body.id_number;
    // Find the person based on the sent ID number
    db.collection("people").find().toArray(function(err, docs) {
        for (object of docs) {
            if (object["idnumber"] == loginID) {
                result = {"first": object["firstname"], "last": object["lastname"], "ID": object["idnumber"], 
                                "years": getYears(object["startdate"])};
                res.json(JSON.stringify(result));
                return;
            }
        }
    });
});

//PUT method to update Employee info
app.put('/person/:ID', function(req, res) {
    var loginID = req.params.id;
    db.collection("people").updateOne({idnumber: loginID}, { $set: {firstname: req.body.firstname, lastname: req.body.lastname,
            idnumber: req.body.idnumber, startDate: req.body.startdate}});

    res.json('Successfully updated employee with ID: ' + loginID);
});

// Delete a particular Person record from the employee_list data
app.delete('/person/:ID', function(req, res) {
    var loginID = req.params.id;
    db.collection("people").deleteOne({idnumber: loginID});
    res.json('Successfully removed employee with ID ' + loginID);
});

var getYears = function(startDate) {
    var today = new Date();
    var birthDate = new Date(startDate);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

/********************Error handling***********************/
app.all('*', function(req, res) {
    console.log("Incorrect URL or ID not found.")
    res.sendStatus(404);
});

/********************Methods for use*******************************/
app.listen(3000, function () {
  console.log('App listening on port 3000!');
});

// Connect to the MongoDB with a user and a password
var PASSWORD = 'bjarne';
MongoClient.connect('mongodb://cs336:' + PASSWORD + '@ds159507.mlab.com:59507/cs336', function (err, dbConnection) {
	if (err) { throw err; }
	db = dbConnection;
});

