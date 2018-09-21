
//we moved javascript file from index.html to here for more clear code

var socket = io();

// socket.on('connect',()=>{  //we want to use traditional function since it will fail in mobile, safari or mozilla
socket.on('connect',function () { 
    console.log('Connected to server')

    //Create 'createMessage' event and send to server
    //*we used io.emit('createMessage) instead, in server.js
    // socket.emit('createMessage',{   
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

    //using jQuery here
    var li = jQuery('<li></li>');
    li.text(`${message.from}:${message.text}`);

    jQuery('#messages').append(li);
});

//*Removed after using jQuery
//Acknowledge
// socket.emit('createMessage',{
//     from: 'Frank',
//     text:'Hi!'
// }, function (data){
//     console.log('Got it', data)
// });

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();

socket.emit('createMessage',{
        from: 'User',
        text: jQuery('[name=message').val()
    }, function(){
        
    });
});

    