const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

const goals = [];

app.listen(port, function(req, res){
  console.log("Listening on port 3000");
})

app.get('/', function(req, res){
  res.render('home');
})

app.get('/dashboard', function(req, res){
  res.render('dashboard', {
    goals: goals,
    todaysDate: new Date()
  });
})

app.post('/dashboard', function(req, res){
  let taskName = req.body.taskName;
  let daysNeeded = req.body.daysNeeded;
  let tracker = req.body.tracker;
  let frequency = req.body.frequency;
  let currentDate = new Date();

  let goal = {
    taskName: taskName,
    daysNeeded: daysNeeded,
    trackingMethod: tracker,
    dateCreated: currentDate,
    checkInFrequency: frequency
  }

  console.log(goal);

  goals.push(goal);
  res.redirect('/dashboard');
})
