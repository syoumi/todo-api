const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/toDoApp', (error, db) => {
    if (error) {
        return console.log(`Unable to connect to MONGODB server : ${error}`);
    }
    console.log('Connected to Mongodb Server ...');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectId("5971c1e873432425c5cf1a54")
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //    console.log(result); 
    // });

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectId("5971bec073432425c5cf19c3")
    }, {
        $set: {
            name: 'Syoumi'
        },
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });

    
    // db.close();
});