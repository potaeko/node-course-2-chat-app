
const path = require('path');

//we want to keep clean for OS compatible by using path
const publicPath = path.join(__dirname, '../public') //https://nodejs.org/api/path.html#path_path_join_paths

// console.log(__dirname+ '/../public'); The-complete-nodejs-developer-course-2/node-chat-app/server/../public
// console.log(publicPath) The-complete-nodejs-developer-course-2/node-chat-app/public

const {generateMessage, generateLocationMessage} = require('./utils/message');
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

    //Exercise
    //socket.emit from:Admin, text:Welcome to the chat app
    socket.emit('newMessage', generateMessage('Admin',' Welcome to the chat app'));
    //we passed in generateMessage
    // { 
    //     from: 'Admin',
    //     text: 'Welcome to the chat app',
    //     createdAt: new Date().getTime()
    // });

    //socket.broadcase.emit from:Admin, text:New user joined
    socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'))
    //we passed in generateMessage
    // {
    //     from: 'Admin',
    //     text: 'New user joined',
    //     createdAt: new Date().getTime()
    // });

    //Create 'newMessage' event and send to client side

    //CASE 1: emit to single connection
    //socket.emit,
    // socket.emit('newMessage', { 
    //     from:'newJob@example.com',
    //     text:'You are hired!',
    //     createdAt:234
    // })

    //CASE 2: emit to all connection
    //io.emit,
    //***listen to 'createMessage' event from client side
    socket.on('createMessage', (message, callback)=>{
        console.log('createMessage from client',message);  
    io.emit('newMessage',generateMessage(message.from, message.text));
    //we passed in generateMessage
    // {
    //         from: message.from,
    //         text: message.text,
    //         createdAt: new Date().getTime()
    // });
    callback();
});
    
    //CASE 3: emit to all except myself
    //socket.broadcast.emit
    // socket.on('createMessage', (message)=>{
    //     console.log('createMessage from client',message); 
    // socket.broadcast.emit('newMessage',{
    //     from: message.from,
    //     text: message.text,
    //     createdAt: new Date().getTime()
    //     });
    // });

    //listeb to createLocationMessage
    socket.on('createLocationMessage',(coords)=>{
        //To show latitude and longitude in plain text
        // io.emit('newMessage', generateMessage('Admin', `${coords.latitude}, ${coords.longitude}`))

        //To show map result from longitude and latitude
        //we added genereateLocationMessage at the top from utils/message
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
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





