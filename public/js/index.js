
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

//Message
//listen 'newMessage' event from server side
socket.on('newMessage', function(message){
    console.log('newMessage', message);
    var formattedTime = moment(message.createdAt).format('h:mm a');//using moment format
    var template = jQuery('#message-template').html();//selected by id
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime //above formattedTime
    });
    jQuery('#messages').append(html);
    //*We use in mustache.js and template instead of code below
    // var formattedTime = moment(message.createdAt).format('h:mm a');//using moment format

    // //using jQuery here
    // var li = jQuery('<li></li>');
    // li.text(`${message.from} ${formattedTime}: ${message.text}`);

    // jQuery('#messages').append(li);
});

//Location
//listen 'newLocationMessage' event
socket.on('newLocationMessage', function(message){
    
    var formattedTime = moment(message.createdAt).format('h:mm a');//using moment format
    var template = jQuery('#location-message-template').html()//selected by id
    var html = Mustache.render(template,{
        from: message.from,
        url: message.url,
        createdAt : formattedTime,
    });
    //*We use in mustache.js and template instead of code below
    // var formattedTime = moment(message.createdAt).format('h:mm a');
    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target="_blank">My current location</a>');//_blank will open a new broswer tab
    // li.text(`${message.from}${formattedTime}: `);
    // a.attr('href', message.url);// set the value to url
    // li.append(a);
    jQuery('#messages').append(html);
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

var messageTextbox = jQuery('[name=message]')

socket.emit('createMessage',{
        from: 'User',
        text: messageTextbox.val()
    }, function(){
        messageTextbox.val('')
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function(){
    //if there is no geolocation available
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browse.')
    }
    //disable send location while sending location... is occurring , and able again after
    locationButton.attr('disabled', 'disabled').text('Sending location...');//it will disbled when send location

    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text('Send location');//after send location, it will disabled and able again  
        // console.log(position); ,to check position properties
        socket.emit('createLocationMessage',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function(){
        locationButton.removeAttr('disabled').text('Send location');//after send location, it will disabled and able again  
        alert('Unable to fetch location')
    });
});

    