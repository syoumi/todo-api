const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const {ObjectId} = require('mongodb');
var PORT = process.env.PORT || 9000;

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();

app.use(bodyParser.json());

// POST /todos

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

// POST /users

app.post('/users', (req, res) => {
    var newUser = new User(_.pick(req.body, ['email', 'password']));

    newUser.save().then(() => {
        return newUser.generateAuthToken();
        // console.log('User inserted ' , newUser);
        // res.send('User added successfully!');
    }).then((token) => {
        res.header('x-auth', token).send(newUser);
    }).catch((err) => {
        console.log(err);
        res.status(400).send(err);
    });

});

//using middle ware
app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.listen(PORT, () => {
    console.log(`Listening on port ${ PORT }`);
});