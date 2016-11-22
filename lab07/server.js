/*server.js for lab07 html pages
 *Name: Jahn Davis
 *Date: October 20th, 2016
 *CS336
 *************************************************/

 //Set up Express
 const express = require("express");
 const app = express();

 //Set up body parser for the GET
 const body_parser = require ("body-parser");
 app.use(body_parser.json());
 app.use(body_parser.urlencoded({extended: true}));

 //Set const variables
 const HOST = "localhost";
 const PORT = 3000;

 //Use public directory
 app.use(express.static('public'));

 //GET method
 app.get("/", function(req, res){
 	res.send("Welcome to Lab07!");
 });

 //JSON GET method
 app.get("/hello", function(req, res){
 	res.send({"message" : "Welcome, " + req.query.name + "!"});
 });

 //Listening on PORT and HOST
 app.listen(PORT, HOST, () => {
 	console.log("Lab07 is listening on " + HOST + ":" + PORT + "...")
 });