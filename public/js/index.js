
//we moved javascript file from index.html to here for more clear code

var socket = io();

// socket.on('connect',()=>{  //we want to use traditional function since it will fail in mobile, safari or mozilla
socket.on('connect',function () { 
    console.log('Connected to server')

    //Create 'createMessage' event and send to server
    // socket.emit('createMessage',{   //we used io.emit('createMessage) instead
    //     from:'myemail@example.com',
    //     text:'testing newMessage event'
    // })
});//socket.on('connect')

socket.on('disconnect',function () {
    console.log('Disconnected from server')
});

//listen 'newMessage' event from server side
socket.on('newMessage', function(message){
    console.log('newMessage', message);
});

