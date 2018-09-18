
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

    //When user closed browser(disconnected from the server) will show the message
    socket.on('disconnect',()=>{
        console.log('User was disconnected')
    })
});

//listen to the port under process.env
server.listen(port,()=>{
    console.log(`Server is up on port ${port}`);
})





