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

app.get('/:user', function(request, response) {
  let userName = request.params.user;
  for (let i = 0; i < data.users.length; i++) {
    if (data.users[i].username === userName) {
      response.render('user', data.users[i]);
    }
  }
});



app.listen(3001, function(){
  console.log('Successfully started the application');
})
