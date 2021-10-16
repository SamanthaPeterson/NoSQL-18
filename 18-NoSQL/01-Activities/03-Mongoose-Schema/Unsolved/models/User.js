const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  // Add these four attributes to your schema: username, password, email, userCreated
  // YOUR CODE HERE
  username: {
    type: String,
    required: "Username is Required",
    trim: true
  }
  password: {
    type: String,
    required: "Password is Required",
    trim: true,
    validate: [({length}) => length >= 6, 'password']
  }
  email: {
    type: String,
    required: "Username is Required",
    trim: true
  }
  userCreated: {
    type: String,
    required: "Username is Required",
    trim: true
  }
});

const User = model('User', UserSchema);

module.exports = User;
