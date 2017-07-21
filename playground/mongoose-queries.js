const {ObjectId} = require('mongodb');

var {mongoose} = require('./../server/db/mongoose');
var {Todo} = require('./../server/models/todo');
var {User} = require('./../server/models/user');

var id = '5971d2d4554956457001a932';

if (!ObjectId.isValid(id)) {return console.log('The Id you entered is not valid!');}

User.findById(id).then((user) => {
    if (!user) {
        return console.log('No user found.');
    }
    console.log('User found: ' , user);
}).catch((e) => {
    console.log('Error : ' , e);
});

// if (!ObjectId.isValid(id)) {
//     return console.log('Id is not valid!');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('todos : ' , todos);
// }).catch((e) => {
//     console.log(JSON.stringify(e, undefined, 3));
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('todo : ' , todo);
// }).catch((e) => {
//     console.log(JSON.stringify(e, undefined, 3));
// });

// Todo.findById(id).then((todo) => {
//     console.log('by id : ' , todo);
// }).catch((e) => {
//     console.log(JSON.stringify(e, undefined, 3));
// });