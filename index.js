const express = require('express');
const mustacheExpress = require('mustache-express');
const data = require('./data.js')
const app = express();


app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use(express.static('public'));

app.get('/', function(req, res){
  res.render('home', data)
});

app.get('/:user', function(req, res){
  res.render('user', req.params.username)
})



app.listen(3001, function(){
  console.log('Successfully started the application');
})
