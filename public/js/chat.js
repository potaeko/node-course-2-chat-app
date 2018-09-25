
//we moved javascript file from index.html to here for more clear code

var socket = io();

//Scroll to bottom only if the user is close to bottom
function scrollToBottom() {
    //Selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child') //choose the last child

    //Heights Variable
    //messages
    //clientHeight is the user view
    var clientHeight = messages.prop('clientHeight');
    //scrollTop is the top unseen part
    var scrollTop = messages.prop('scrollTop');
    //scrollHeight is total height of the content.
    var scrollHeight = messages.prop('scrollHeight');
    //newMessages
    var newMessageHeight = newMessage.innerHeight(); //calculate the height of the message
    var lastMessageHeight = newMessage.prev().innerHeight(); //second last child

    //Scroll Condition
    //if scroll Top + clientHeight = scrollHeight, we want to scroll down when received the new message.
    if(scrollTop+ clientHeight + newMessageHeight + lastMessageHeight>= scrollHeight){
        //Testing
        // console.log('Should scroll');

        // Set the current vertical position of the scroll bar 
        //scrollTop value is a measurement of the distance from the element's top to its topmost visible content
        messages.scrollTop(scrollHeight)
    }
};

// socket.on('connect',()=>{  //we want to use traditional function since it will fail in mobile, safari or mozilla
socket.on('connect',function () { 
    console.log('Connected to server')
    var params = jQuery.deparam(window.location.search); //to get the object of name and room

    socket.emit('join', params, function(err){
        if (err){
            alert(err); //show alert
            window.location.href ='/';//redirect to the home page
        } else{
            console.log('No error');
        }
    })

socket.on('updateUserList', function (users){
    console.log('Users list' ,users);
    //add userslist to the page
    var ol = jQuery('<ol></ol>');

    users.forEach(function (user){
        ol.append(jQuery('<li></li>').text(user)); //set text property to user
    })

    jQuery('#users').html(ol);//add ol to 'users' id in chat.html
});

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
    scrollToBottom();//added autoscroll
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
    scrollToBottom();//added autoscroll
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

    