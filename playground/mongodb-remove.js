const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/toDoApp', (error, db) => {
    if (error) {
        return console.log(`Unable to connect to MONGODB server : ${error}`);
    }
    console.log('Connected to Mongodb Server ...');

    // delete many
    // db.collection('Todos').deleteMany({text: 'Learn Node.js'}).then((result) => {
    //     console.log(result);
    // }, (error) => {
    //     console.log(error);
    // });
    // delete one
    // db.collection('Todos').deleteOne({text: 'Something to do'}).then((result) => {
    //     console.log(result);
    // }, (error) => {
    //     console.log(error);
    // });
    // find one and delete
    db.collection('Todos').findOneAndDelete({text: 'Test'}).then((result) => {
        console.log(result);
    }, (error) => {
        console.log(error);
    });

    
    // db.close();
});