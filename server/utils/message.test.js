
var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage',()=>{
    it('should generate the correct message object',()=>{
        //store res in variable
        var from ='Jen';
        var text = 'Some message';
        var message = generateMessage(from,text); //require from generator
        //assert createdAt is number
        expect(typeof message.createdAt).toBe('number');
        //assert from match
        //assert text match
        expect(message).toMatchObject({from,text})
        
    })
});

//Don't forget to add generateLocationMessage at the top, from message.js
describe('generateLocationMessage',()=>{
    it('should generate correct location object',()=>{
        var from ='Tom';
        var latitude = 11;
        var longitude = 22;
        var url = 'https://www.google.com/maps?q=11,22'
        var message = generateLocationMessage(from, latitude, longitude); //require from generator
        
        expect(typeof message.createdAt).toBe('number');
        //assert from match
        //assert url match
        expect(message).toMatchObject({from,url})

    });
});