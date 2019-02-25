const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();
const mongoose = require('mongoose');
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

mongoose.connect("mongodb://localhost:27017/tasksDB", {useNewUrlParser:true});

const goalSchema = new mongoose.Schema ({
  goalName: String,
  daysNeeded: Number,
  dateCreated: Date,
  completed: Boolean
})

const Goal = mongoose.model("Goal", goalSchema);

app.listen(port, function(req, res){
  console.log("Listening on port 3000");
})

app.get('/', function(req, res){
  res.redirect('/goals');
})

app.get('/goals', function(req, res){
  Goal.find(function(err, goals){
    if(!err){
      res.render('goals', {
        goals: goals,
        todaysDate: new Date()
      });
    }
  });
})

app.post('/delete', function(req, res){
  console.log(req.body.goalName);
  Goal.deleteOne({
    goalName: req.body.goalName
  }, function(err){
    if(!err){
      res.redirect('/goals');
    } else {
      console.log('Could not delete.');
    }
  })
})

app.post('/goals', function(req, res){
  let goalName = req.body.goalName;
  let daysNeeded = req.body.daysNeeded;
  let currentDate = new Date();

  const goal = new Goal({
    goalName: goalName,
    daysNeeded: daysNeeded,
    dateCreated: currentDate,
    completed: false
  });

  goal.save();
  res.redirect('/goals');
})
