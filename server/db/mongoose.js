var mongoose = require('mongoose');

const dbURI = process.env.MY_MONGO_DB_URI || 'mongodb://127.0.0.1:27017/TodoApp';

mongoose.Promise = global.Promise;
mongoose.connect(dbURI, {useMongoClient: true});
// use mongo client is for remove deprecation warning

module.exports = {
    mongoose
}