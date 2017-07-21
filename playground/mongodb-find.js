const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/toDoApp', (error, db) => {
    if (error) {
        return console.log(`Unable to connect to MONGODB server : ${error}`);
    }
    console.log('Connected to Mongodb Server ...');

    // db.collection('Todos').find({
    //     _id: new ObjectID("5971b93c720e071a644d4a15")
    // }).toArray().then((docs) => {
    //     console.log('Data fetched ...');
    //     console.log(JSON.stringify(docs, undefined, 3));
    // }, (error) => {
    //     if (error) {
    //         console.log('Error while fetching data');
    //         console.log(error);
    //     }
    // });

    // db.collection('Todos').find({}).count().then((count) => {
    //     console.log(`${count} row(s) detected.`);
    // }, (error) => {
    //     if (error) {
    //         console.log('Error while fetching data');
    //         console.log(error);
    //     }
    // });

    db.collection('Users').find({name: 'ElMahdi'}).count().then((count) => {
        if (count !== 0) {
            db.collection('Users').find({name: 'El Mahdi'}).toArray().then((docs) => {
                console.log(docs[0]);
            }, (error) => {
                console.log(error);
            });
        } else {
            console.log('No rows match your filter.');
        }
    }, (error) => {
        if (error) {
            console.log('Error while fetching data');
            console.log(error);
        }
    });

    
    // db.close();
});