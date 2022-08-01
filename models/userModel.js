const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');

/* Properties
    1) email (required, unique, must look like an email)
    2) name (required, min 3 chars)
    2) password (required, min 8, max 32)
    3) passwordConfirmation (required, not stored, but mandatory to create a new instance, must match password)
    4) passwordLastChangedAt (nullable, to confirm tokens are still valid)
*/

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'You need an email to create an account!'],
        unique: true,
        validate: {
            validator: validator.isEmail,
            // message: props => {
            //     return `${props.value} is not a valid Email`
            // }, or simply
            message: '{VALUE} is not a valid Email'
        }
    },
    name: {
        type: String,
        required: [true, 'You need to provide a name to create an account!'],
        minlength: [3, 'Name must be 3 characters or longer']
    },
    password: {
        type: String,
        required: [true, 'You need a password to create an account!'],
        minlength: [8, 'Password must be at least 8 characters'],
        maxlength: [32, 'Password can be at most 32 characters'],
        // Don't show this field in 'find' queries
        select: false
    },
    passwordConfirmation: {
        type: String,
        required: [true, 'You must confirm your password to create an account'],
        validate: {
            validator: function(value) {
                // this refers to the document because schema validators are pre 'save' middleware
                return this.password === value
            },
            message: 'Passwords don\'t match. Please try again.'
        }
    },
    passwordLastChangedAt: Date
});

/* Document Middleware ('this' refers to the current document) */

userSchema.pre('save', async function(next) {
    // Only encrypt the password if it has been modified (to not encrypt the existing hash)
    if (!this.isModified('password')) return next();

    const saltRounds = parseInt(process.env.PASSWORD_SALT_ROUNDS) || 12
    const encrypted = await bcrypt.hash(this.password, saltRounds);

    this.password = encrypted;
    this.passwordConfirmation = undefined;

    next();
});


const User = mongoose.model('User', userSchema);

module.exports = User;
