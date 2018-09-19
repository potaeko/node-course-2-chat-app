
//we moved javascript file from index.html to here for more clear code

var socket = io();

// socket.on('connect',()=>{  //we want to use traditaional function since it will fail in mobile, safari or mozilla
socket.on('connect',function () { 
    console.log('Connected to server')

    //Example Email event
    //socket.emit is create event
    // socket.emit('createEmail', {
    //     to: 'jen@example.com',
    //     text: 'Hey, this is Tom.'
    // })
    //====End of Example=======
    //Create 'createMessage' event and send to server
    socket.emit('createMessage',{
        from:'myemail@example.com',
        text:'testing newMessage event'
    })
});//socket.on('connect')

socket.on('disconnect',function () {
    console.log('Disconnected from server')
});

//Example Email event
// socket.on('newEmail', function(email){ //email is the object data from server
//     console.log('New email',email);
// });

//listen 'newMessage' event from server side
socket.on('newMessage', function(message){
    console.log('newMessage', message);
});

