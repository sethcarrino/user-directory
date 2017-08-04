const express = require('express');
const mustache = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(expressValidator());

app.use(session({
  secret: 'V4P3N4710N',
  resave: false,
  saveUninitialized: true
}));

app.use(express.static('public'));
app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('views', './views');

var url = 'mongodb://localhost:27017/robotsdb';
var db;
var allRobots;

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  db = db;
  allRobots = db.collection('users');
  app.listen(3000, function(){
    console.log('Successfully started express application!');
  })

});

app.get('/', function(req, res){
  allRobots.find({}).toArray(function(err, robots) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(robots)
    res.render('home', {
      robots: robots
    });
  });
})
app.get('/specificRobot/:username', function(req, res){
  let username = req.params.username;
  allRobots.find({"username": username}).toArray(function(err, robot) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(robot)
    res.render('robot', {
      robot: robot
    });
  });
});
app.get('/unemployed', function(req, res){
  allRobots.find({"job" : null}).toArray(function(err, unemployedRobots){
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(unemployedRobots);
    res.render('unemployed', {
      unemployedRobots: unemployedRobots
    });
  });
});
app.get('/employed', function(req, res){
  allRobots.find({"job" : {$ne: null}}).toArray(function(err, employedRobots){
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(employedRobots);
    res.render('employed', {
      employedRobots: employedRobots
    });
  });
});
