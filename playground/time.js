

//Jan 1st 1970 00:00:00 am
//1000 is Jan 1st 1970 00:00:01

//We want to use moment.js to apply
var moment = require('moment')

var dateSample = moment();
//http://momentjs.com/docs/#/manipulating/
//add year and subtract month
dateSample.add(100, 'years').subtract(9,'months') 

//http://momentjs.com/docs/#/displaying/
console.log(dateSample.format('MMM Do, YYYY H:mm:ss a'))
console.log(dateSample.format('h:mm a'))

//passing time value
var createdAt = 1234;
var date = moment(createdAt);
console.log(date.format('h:mm a'))

//Get timestamp
var someTimestamp = moment().valueOf();
console.log(someTimestamp)