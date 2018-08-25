
const path =require('path');
const http = require('http');
const express= require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');




const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
//console.log(__dirname + '/../public');
//console.log(publicPath);

var app =express ();
var server = http.createServer(app);
var io =socketIO(server);




app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('New user connected');


	//for greeting the user from admin
	socket.emit('newMessage', generateMessage('Admin', 'Welcome to ChatApp'));

	socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined'));

	
socket.on('createMessage',(message, callback) =>{
	console.log('createMessage', message);
	//mesage from user to user
	io.emit('newMessage', generateMessage(message.from, message.text));
	callback();
	// socket.broadcast.emit('newMessage',{

	// 	from: message.from,
	// 	text: message.text,
	// 	createAt: new Date(). getTime()  

	// });


});
socket.on('createLoctionMessage',(coords) =>{
	io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
});

	socket.on('disconnet', () => {
		console.log('User disconnected');
	});
});

server.listen(port, () =>{
	console.log('server is up on ${port}');
});
