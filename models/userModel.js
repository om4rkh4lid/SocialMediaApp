const mongoose = require('mongoose');

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
        // TODO: validate that it looks like an email
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
        maxlength: [32, 'Password can be at most 32 characters']
    },
    passwordConfirmation: {
        type: String,
        required: [true, 'You must confirm your password to create an account'],
        // TODO: validate that it matches password
    },
    passwordLastChangedAt: Date
});

const User = mongoose.model('User', userSchema);

module.exports = User;

