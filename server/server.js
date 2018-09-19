
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
io.on('connection',(socket)=>{
    console.log('New user connected');
    
    //**Example Email event
    //creating 'newEmail', new email event to notify client from server side
    // socket.emit('newEmail',{
    //     from: 'mike@example.com',
    //     text: 'Hey, what is going on',
    //     createAt: 123
    // });
    //creating 'creteEmail', new email event  from client side
    // socket.on('createEmail', (newEmail)=>{
    //     console.log('createEmail', newEmail);
    // })
    //================End of Example==========

    //Chat App
    //Create 'newMessage' event and send to client side
    socket.emit('newMessage', {
        from:'newJob@example.com',
        text:'You are hired!',
        createdAt:234
    })
    //listen to 'createMessage' event from client side
    socket.on('createMessage', (newMessage)=>{
        console.log('crateMessage from client',newMessage)
    })



    //When user closed browser(disconnected from the server) will show the message
    socket.on('disconnect',()=>{
        console.log('User was disconnected')
    })
});//io.on 

//listen to the port under process.env
server.listen(port,()=>{
    console.log(`Server is up on port ${port}`);
})





