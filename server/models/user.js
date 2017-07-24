const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        unique: true,
        validate: {
            validator: (value) => validator.isEmail(value),
            message: 'The email {VALUE} is not valid',

        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.toJSON = function() {
    var user = this;
    var userOBJ = user.toObject();
    return _.pick(userOBJ, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, '1,2,3 ... secret').toString();
    user.tokens.push({
        access,
        token
    });
    return user.save().then(() => { return token; });
};

UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;

    try {
        console.log('token: ' , token);
        decoded = jwt.verify(token, '1,2,3 ... secret');
    } catch (err) {
        // return new Promise((resolve, reject) => {
        //     reject();
        // });
        return Promise.reject('Token is not valid!');
    }
    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

UserSchema.statics.findByCredentials = function (email, password) {
  var User = this;

  return User.findOne({email}).then((user) => {
    if (!user) {
      return Promise.reject('User does not exist!');
    }
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          resolve(user);
        }
        else {
          reject('The password is not correct');
        }
      });
    });
  });
};

UserSchema.pre('save', function (next) {
    var user = this;

    if (user.isModified('password')){
        bcrypt.genSalt(10, (err, salt) => {
            if (err){
                return console.log('Error generating salt: ');
            }
            bcrypt.hash(user.password, salt, (error, hash) => {
                if (error){
                    return console.log('Error hashing salted password');
                }
                user.password = hash;
                next();
            });
        });
    }
    else {
        next();
    }
});

var User = mongoose.model('User', UserSchema);

module.exports = {
    User
};
