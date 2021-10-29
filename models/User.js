// Require Mongoose
const { Schema, model } = require('mongoose');

const userSchema = new Schema({

    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        // validate  the email
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
    },

    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],

    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
},
    {
        toJSON: {
            virtuals: true,
        },
        getters: true,

        id: false
    }
);


// get total count of friends
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
})

// create User model using User Schema
const User = model('User', userSchema);

// Export User module
module.exports = User;