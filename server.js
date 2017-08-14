var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();

var sessionConfig = {
  secret: "secret",
  resave: false,
  saveUninitialized: true,
  name: 'mySession',
  cookie: {
    secure: false,
    httpOnly: false,
    maxAge: 9001000000000
  }
}

app.use(session(sessionConfig));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client')));
app.use(express.static(path.join(__dirname, 'bower_components')));

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

app.get('/client', function(req, res){
	res.render('chat');
})

var server = app.listen(8000,function(){
	console.log("Listening on port 8000")
});
var io = require('socket.io').listen(server);

var messages = [];
var user_names = [];
var connections = [];

io.sockets.on('connection', function(socket){
    console.log("Connection establised", socket.id);
	socket.emit('load_messages', {messages: messages});

    socket.on('new_user', function(data){
        user_names.push({name: data.name, id:socket.id});
		io.emit('user_added', {name: data.name})
        console.log("TESTNG", data);
        update_list()
	});

	function update_list(){
		io.emit('user_names', {name: user_names});
	}

	socket.on('send_message', function(data){
		console.log(data, 'line 34')
		messages.push(data.name + ": " + data.message);
        console.log("Messages thus far ", messages);
		io.emit('new_message', {name: data.name, message: data.message});
	});

    socket.on('user_clicked_home', function(data){
        socket.disconnect();
    })
	socket.on('disconnect', function() {
      for(var i = 0; i < user_names.length; i++){
      	if(user_names[i].id == socket.id){
      		console.log(user_names[i].id, 'line 51');
      		socket.broadcast.emit('user_disconnected',{name:user_names[i].name} )
      		user_names.splice(i,1);
      		update_list()
      		break;
      	}
      }
  })


})
