//we want to check the string ,not getting empty space
var isRealString = (str) =>{
    return typeof str ==='string'&& str.trim().length>0;// type to be string and trim space in front and back
};

module.exports = {isRealString}; //isRealString:isRealString