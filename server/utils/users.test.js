
const expect = require('expect');

const {Users} = require('./users');

describe('Users', ()=>{

//initalize data seed
beforeEach(()=>{
    users = new Users();
    users.users = [{
        id:'1',
        name: 'Mike',
        room: 'Node Course'
    },{
        id:'2',
        name: 'Jen',
        room: 'React Course'
    },
    {
        id:'3',
        name: 'Julie',
        room: 'Node Course'
    }]
});
    //Customize test with data
    //Testing addUser funcitno
    it('should add new user',()=>{
        //we call class Users from users.js
        var users = new Users(); 
        //We give user object
        var user = {
            id: '123',
            name: 'Tom',
            room: 'The Office'
        };
        //We call 'addUser' function from class Users and push user above in users array in users.js
        var resUser = users.addUser(user.id, user.name, user.room)
        //The first users refer to users in users.test.js, the second users refer to this.users in users.js
        //and equal to user object above.
        expect(users.users).toEqual([user]);
    });

    //Testing removeUser function with the correct id
    it('should remove a user',()=>{
        var userId = '1';
         //users is the seeds above and call removeUser() in users.js
        var user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    //Testing removeUser function with the wrong
    it('should not remove user',()=>{
        var userId = '4';
         //user = users is the seeds above and call removeUser() in users.js
        var user = users.removeUser(userId);
        //The user that we called by id should not exist, undefined
        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3);
    });

    //Testing getUser function with the correct id
    it('should find user',()=>{
        //user.id match in seeds above
        var userId = '2';
        //users is the seeds above and call getUser() in users.js
        var user = users.getUser(userId);
        //To match user id from .getUser response with given number '2'
        expect(user.id).toBe(userId);
    });

    //Testing getUser function with the wrong id
    it('should not find user', ()=>{
        var userId = '4';
        //user = users is the seeds above and call getUser() in users.js
        var user = users.getUser(userId);
        ////The user that we called by id should not exist, undefined
        expect(user).toBeFalsy();

    });

    //Testing the getUserList function with the 'Node course' room
    it('should return names for Node course', ()=>{
        //userList = users is the seeds above and call getUser() in users.js with a room name above 
        var userList = users.getUserList('Node Course')
        expect(userList).toEqual(['Mike','Julie']);
    });

    //Testing the getUserList function with the 'React course' room
    it('should return names for React course', ()=>{
        //userList = users is the seeds above and call getUser() in users.js with a room name above 
        var userList = users.getUserList('React Course')
        expect(userList).toEqual(['Jen']);
    });
});
