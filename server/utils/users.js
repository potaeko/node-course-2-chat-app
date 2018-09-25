
//**==========ES6 Example=============**/
//Traditional way to make
// var users =[];
// var addUser =(id, name, room)=>{
//     users.push({})
// }
// modules.export ={addUser}

//We using ES6 instead of traditional way with constructor function

// class Person {
//     constructor(name, age){ //get called by default
//         this.name = name;
//         this.age  = age;
//     }
//     getUserDescription(){
//         return `${this.name} is ${this.age} year(s) old.`
//     }
// };

// var me = new Person('Tom',31);
// console.log('this.name: ', me.name);
// console.log('this.age: ', me.age);
// var description = me.getUserDescription();
// console.log(description)

//**==================End of Constructor Example ========= */
//These are what we want to store in users array
[{
    id: '/#12312312',
    name: 'Tom',
    room: 'The Office'
}]

//We will need these functions
//addUser(id, name, room) to add user in users
//removeUser(id) to remove user and return user that we removed
//getUser(id) to return user but not remove
//getuserList(room) to match the room and return array of users that inside of the room

class Users {
    constructor (){
        this.users = []; //empty users array to store
    }
    addUser (id, name, room) { //passing 3 data in
        var user = {id, name, room};
        this.users.push(user); //push user into users 
        return user;
    }
    removeUser (id){
        //return user that was removed by matching id
        var user = this.getUser(id);
        //If the id exist in users,
        if(user){
            this.users = this.users.filter((user)=> user.id!==id); //set this.users to filter out by user that not match the id
        }

        return user;
    }
    getUser(id){
        //return user by matching id
        return this.users.filter((user) => user.id === id)[0] //return first [0] user that removed or not we will get undefined
    }
    getUserList(room){
        //we use ES6 here, so we can delete '.filter((user)=>{ return user.room===room })'; There is still return inside
        var users = this.users.filter((user)=> user.room === room); //filter will return only user.room that match room and return
        var namesArray = users.map((user)=> user.name);//after we get the users who in the room, map all the user name and return

        return namesArray;
    }
};

module.exports = {Users}; //export Users class