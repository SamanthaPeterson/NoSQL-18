const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: 'First Name is Required'
    },

    lastName: {
      type: String,
      trim: true,
      required: 'Last Name is Required'
    },

    password: {
      type: String,
      trim: true,
      required: 'Password is Required',
      validate: [({ length }) => length >= 6, 'Password should be longer.']
    },

    email: {
      type: String,
      unique: true,
      match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },

    userCreated: {
      type: Date,
      default: Date.now
    }
  },
  // Set the `toJSON` schema option to use virtuals
  // Set the `id` as false
  // YOUR CODE HERE
  //
  {
    toJSON: {
      virtuals: true,
    },
    id: false
  }
);

// Create a virtual property `username` that's computed from the front part of `email` before the `@` symbol.
// YOUR CODE HERE
//
// const userSchema = mongoose.Schema({
//   email: String
// });
// // Create a virtual property `domain` that's computed from `email`.
// userSchema.virtual('domain').get(function () {
//   return this.email.slice(this.email.indexOf('@') + 1);
// });
// const User = mongoose.model('User', userSchema);

// let doc = await User.create({
//   email: 'test@gmail.com'
// });
// // `domain` is now a property on User documents.
// doc.domain; // 'gmail.com'

// Create a virtual property `domain` that's computed from `email`.
UserSchema.virtual('domain').get(function () {
  return this.email.slice(this.email.indexOf('@') + 1);
});
// const User = mongoose.model('User', userSchema);

// let doc = await User.create({
//   email: 'test@gmail.com'
// });
// `domain` is now a property on User documents.
// doc.domain; // 'gmail.com'

const User = model('User', UserSchema);

module.exports = User;
