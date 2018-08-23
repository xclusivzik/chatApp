'use strict'
const path =require('path');
const http = require('http');
const express= require('express');
const socketIO = require('socket.io');



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


	//for greeting the user
	socket.emit('newMessage',{
		from:'Admin',
		text: 'Welcome to the chat App',
		createAt: new Date(). getTime()  
	});

	socket.broadcast.emit('newMessage',{
		from: 'Admin',
		text: 'New user joined',
		createAt: new Date(). getTime()  
	});

	
socket.on('createMessage',(message) =>{
	console.log('createMessage', message);
	io.emit('newMessage', {
		from: message.from,
		text: message.text,
		createAt: new Date(). getTime()  

	});
	// socket.broadcast.emit('newMessage',{

	// 	from: message.from,
	// 	text: message.text,
	// 	createAt: new Date(). getTime()  

	// });


});
	socket.on('disconnet', () => {
		console.log('User disconnected');
	});
});

server.listen(port, () =>{
	console.log('server is up on ${port}');
});
