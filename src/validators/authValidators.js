const validator = require('validator').default;
const { match } = require('./validatorUtils');
const User = require('../models/User');

exports.validateRegister = async (username = '', password = '', repassword = '') => {
    const userErrMessages = await isValidUsername(username);
    const passwordErrMessages = isValidPassword(password, repassword);

    const errorMessages = userErrMessages.concat(passwordErrMessages);
    if (errorMessages.length > 0) {
        throw {
            messages: errorMessages,
            status: 400
        };
    }
}

async function isValidUsername(username) {
    const messages = [];
    
    const isEmpty = username.length == 0;
    if (isEmpty) {
        return ['Username should not be empty'];
    }

    const isEmail = validator.isEmail(username)
    const isEnglishOrDigits = username.match(/^[A-z0-9]+$/);
    const isGTEFive = username.length >= 5;
    const isAlreadyRegistered = await User.findOne({username});

    match(isAlreadyRegistered, 'User with same username found', messages);
    match(isEmail, 'Username should be a valid email', messages);
    match(isEnglishOrDigits, 'Username should consist only of English letters and digits', messages);
    match(isGTEFive, 'Username should be greater than five characters', messages);

    return messages;
}

function isValidPassword(password, repassword) {
    const messages = [];

    const isEmpty = password.length == 0;
    if (isEmpty) {
        return ['Password should not be empty'];
    }

    const isEnglishOrDigits = password.match(/^[A-z0-9]+$/);
    const isGTEEight = password.length > 8;
    const passwordsMatch = password == repassword;
        
    match(!isEmpty, 'Password should not be empty', messages);
    match(isEnglishOrDigits, 'Password should consist only of English letters and digits', messages);
    match(isGTEEight, 'Password should be greater than eight characters', messages);
    match(passwordsMatch, 'Passwords and Re-password should match', messages)

    return messages;
}
