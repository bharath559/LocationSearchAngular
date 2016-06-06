
var googleAPIKey = "AIzaSyCqykw3PCrky_M5n6YQ8qZhGiFlTiHy40c";
var express = require("express");
var path = require("path");
var https = require('https');
var bodyParser = require("body-parser");
var app = express();
app.use(express.static(__dirname+"/public"));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(bodyParser.json());

var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });

app.get("/places/:lat/:long", function(req, res) {
    
	var googleAPIUrl = "/maps/api/place/nearbysearch/json?location=";
	googleAPIUrl+=req.params.lat+","+req.params.long+"&radius=500&key="+googleAPIKey;

	var options = {
	  host: 'maps.googleapis.com',
	  path: googleAPIUrl
	};

	https.request(options, function(response){
		var result = '';
		response.on('data', function(chunk) {
		      result += chunk;
		   });
		
		  response.on('end', function() {
		        var parsed = JSON.parse(result);
				res.send(parsed);
		   });
		
	}).end();
});

app.get("/places/:lat/:long", function(req, res) {
    
	var googleAPIUrl = "/maps/api/place/nearbysearch/json?location=";
	googleAPIUrl+=req.params.lat+","+req.params.long+"&radius=500&key="+googleAPIKey;

	var options = {
	  host: 'maps.googleapis.com',
	  path: googleAPIUrl
	};

	https.request(options, function(response){
		
		var result = '';
		response.on('data', function(chunk) {
		      result += chunk;
		   });
		
		  response.on('end', function() {
		        var parsed = JSON.parse(result);
				res.send(parsed);
		   });
	}).end();
});

app.get("/places/:lat/:long", function(req, res) {
    
	
	var googleAPIUrl = "/maps/api/place/nearbysearch/json?location=";
	googleAPIUrl+=req.params.lat+","+req.params.long+"&radius=500&key="+googleAPIKey;
	var options = {
	  host: 'maps.googleapis.com',
	  path: googleAPIUrl
	};

	https.request(options, function(response){
		var result = '';
		response.on('data', function(chunk) {
		      result += chunk;
		   });
		
		  response.on('end', function() {
		        var parsed = JSON.parse(result);
				res.send(parsed);
		   });
		
	}).end();
});

app.get("/placeDetail/:placeId", function(req, res) {
   
	var googleAPIUrl = "/maps/api/place/details/json?placeid=";
	googleAPIUrl+=req.params.placeId+"&key="+googleAPIKey;

	var options = {
	  host: 'maps.googleapis.com',
	  path: googleAPIUrl
	};
	
	https.request(options, function(response){
		var result = '';
		response.on('data', function(chunk) {
		      result += chunk;
		   });
		
		  response.on('end', function() {
		        var parsed = JSON.parse(result);
				res.send(parsed);
		   });
	}).end();	
});


function handleErrorler(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

