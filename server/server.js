
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
const {isRealString} = require('./utils/validation.js');
const {Users} = require('./utils/users');


var app = express() //web server
var server = http.createServer(app)
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

//listen to specific event
// We need to listen to events within the io.on('connection') event on the server 
// in order to access the socket object
io.on('connection',(socket)=>{
    console.log('New user connected');

    //Chat App

    //**listen to join event */
    socket.on('join', (params, callback)=>{
        if(!isRealString(params.name) || !isRealString(params.room)){ //if one of name or room is not a real string
            return callback('Name and Room name are required.'); //return, to stop code running
        }

        socket.join(params.room);
        //remove user from previous room and add to new room
        users.removeUser(socket.id);
        //addUser(id, name ,room)
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        // socket.leave('room name')

        //How to 
        //io.emit->io.to('room name').emit
        //socket.broadcast.emit->socket.broadcast.to('room name').emit ,broadcast to specific room
        //socket.emit
        
        //To one user
        //socket.emit from:Admin, text:Welcome to the chat app
        socket.emit('newMessage', generateMessage('Admin',' Welcome to the chat app'));
        //we passed in generateMessage
        // { 
        //     from: 'Admin',
        //     text: 'Welcome to the chat app',
        //     createdAt: new Date().getTime()
        // });

        //To everyone except the current user
        //socket.broadcase.emit from:Admin, text:New user joined
        socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined`))
        //we passed in generateMessage
        // {
        //     from: 'Admin',
        //     text: 'New user joined',
        //     createdAt: new Date().getTime()
        // });
        callback();
    });

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
        // console.log('createMessage from client',message); 
        var user = users.getUser(socket.id);
        //if the user is exist and the message is string, not empty space
        if(user&&isRealString(message.text)){
            io.to(user.room).emit('newMessage',generateMessage(user.name, message.text));
        } 
    // io.emit('newMessage',generateMessage(message.from, message.text)); ,we moved into if() above and modified

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
    //     io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude)) //we modified this line and moved into if(user) below
    // });

    var user = users.getUser(socket.id);
    //if the user is exist
    if(user){
        io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude))
    } 
});



    //When user closed browser(disconnected from the server) will show the message
    socket.on('disconnect',()=>{
        console.log('User was disconnected')
        //user is the return from removeUsers function
        var user = users.removeUser(socket.id);

        if(user){
            //update list
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            //tell everyone that the user leave
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
        }
    })
});//io.on 

//listen to the port under process.env
server.listen(port,()=>{
    console.log(`Server is up on port ${port}`);
})





