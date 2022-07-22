const User = require('../models/User');
const bcrypt = require('bcrypt');

const saltRounds = 10;

exports.register = async (username, password, repassword) => {
    const users = await User.find({username});

    if (users.length > 0) {
        throw new Error('User with same username found');
    }

    if (password == '') {
        throw new Error('Password cant be empty')
    }

    if (password != repassword) {
        throw new Error('Password should match Re-Password');
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await User.create({
        username,
        password: hashedPassword
    });

    return user;
}
