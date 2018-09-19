
const path = require('path');

//we want to keep clean for OS compatible by using path
const publicPath = path.join(__dirname, '../public') //https://nodejs.org/api/path.html#path_path_join_paths

// console.log(__dirname+ '/../public'); The-complete-nodejs-developer-course-2/node-chat-app/server/../public
// console.log(publicPath) The-complete-nodejs-developer-course-2/node-chat-app/public

const port = process.env.PORT || 3000;
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


var app = express() //web server
var server = http.createServer(app)
var io = socketIO(server);

app.use(express.static(publicPath));

//listen to specific event
// We need to listen to events within the io.on('connection') event on the server 
// in order to access the socket object
io.on('connection',(socket)=>{
    console.log('New user connected');
    
    //Chat App

    //Create 'newMessage' event and send to client side
    //socket.emit,emit to single connection
    // socket.emit('newMessage', { 
    //     from:'newJob@example.com',
    //     text:'You are hired!',
    //     createdAt:234
    // })

    //listen to 'createMessage' event from client side
    socket.on('createMessage', (message)=>{
        console.log('createMessage from client',message); 
    //io.emit, emit to all connection
    //We used io.emit('newMessage') instead of socket.emit('newMessage'
    io.emit('newMessage',{
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
    });



    //When user closed browser(disconnected from the server) will show the message
    socket.on('disconnect',()=>{
        console.log('User was disconnected')
    })
});//io.on 

//listen to the port under process.env
server.listen(port,()=>{
    console.log(`Server is up on port ${port}`);
})





