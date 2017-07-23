const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var pass = 'my_password';

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(pass, salt, (error, hashval) => {
        console.log(hashval);
    });
});

var testHash = '$2a$10$mvwm9fOiKyU2CBH0YeJIw.M0XaoH/HCEuiqzbSA0B/OnfokE3fbPq';

bcrypt.compare(pass, testHash, (err, result) => {
    console.log(result);
});

// var data = {
//     id: 1
// };

// var token = jwt.sign(data, '123secret');

// console.log(token);

// var decoded = jwt.verify(token, '123secret');

// console.log(decoded);

// var message = 'I am El Mahdi';

// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);


