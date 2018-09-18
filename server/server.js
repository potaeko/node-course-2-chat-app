
const path = require('path');

//we want to keep clean for OS compatible by using path
const publicPath = path.join(__dirname, '../public') //https://nodejs.org/api/path.html#path_path_join_paths

// console.log(__dirname+ '/../public'); The-complete-nodejs-developer-course-2/node-chat-app/server/../public
// console.log(publicPath) The-complete-nodejs-developer-course-2/node-chat-app/public

const port = process.env.PORT || 3000;
const express = require('express');

var app = express()

app.use(express.static(publicPath));

app.listen(port,()=>{
    console.log(`Server is up on port ${port}`);
})





