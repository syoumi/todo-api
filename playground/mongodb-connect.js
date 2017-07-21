const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

var inserOneTodo = (db, todo) => {
    db.collection('Todos').insertOne(todo, (err, result) => {
        if (err) {
            return console.log('Unable to insert record!');
        }
        console.log(result.ops[0]._id);
    });
};

MongoClient.connect('mongodb://localhost:27017/toDoApp', (error, db) => {
    if (error) {
        return console.log(`Unable to connect to MONGODB server : ${error}`);
    }
    console.log('Connected to Mongodb Server ...');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert object!');
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 3));
    // });

    var todo = {
        text: 'Learn Node.js',
        completed: false
    };

    // inserOneTodo(db, todo);

    db.close();
});