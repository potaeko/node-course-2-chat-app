
const  expect = require('expect');

//import isRealString
const {isRealString} = require('./validation.js')

//isRealString
describe('isRealString',()=>{
    //Should reject non-string values
    it('should reject non-string values',()=>{
        var str = 007;
        var res = isRealString(str);
        expect(res).toBe(false);
    });
   
    //Should reject string with only spaces
    it('shoudl reject string with only spaces',()=>{
        var str = '   ';
        var res = isRealString(str);
        expect(res).toBe(false);
    });
    //Should allow string with non-space characters
    it('should allow string with non-space characters',()=>{
        var str = ' TOM  ';
        var res = isRealString(str);
        expect(res).toBe(true);
    });
});
    