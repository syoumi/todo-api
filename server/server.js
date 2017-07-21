var express = require('express');
var bodyParser = require('body-parser');


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

app.listen(9000, () => {
    console.log(`Listening on port ${9000}`);
});