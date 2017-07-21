var express = require('express');
var bodyParser = require('body-parser');

const {ObjectId} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    // console.log(req.body);
    var thistodo = new Todo({
        text: req.body.text
    });

    thistodo.save().then((result) => {
        console.log(`Todo added: ${thistodo}.`);
        res.status(200).send('Your todo has been added');
    }, (error) => {
        console.log(error);
        res.status(400).send('Your todo could not be added!');
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((result) => {
        res.send({
            count: result.length ,
            result // returning array of all todos
        });
    }, (error) => {
        res.status(400).send(error);
    });
});

app.get('/todos/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) { return res.status(400).send('Your Id is not valid.')}
    Todo.findById(req.params.id).then((todo) => {
        if (!todo) { return res.status(404).send('No todo found.'); }
        res.send(JSON.stringify(todo));
    }).catch((e) => {
        console.log('Error : ' , e);
    });
});

app.listen(9000, () => {
    console.log(`Listening on port ${9000}`);
});