const User = require('../models/User');
const bcrypt = require('bcrypt');
const { saltRounds } = require('../constants');
const jwtServices = require('./jwtServices');
const validators = require('../validators/authValidators');

exports.register = async ({username, password, repassword}) => {
    const users = await User.find({username});
    
    await validators.validateRegister(username, password, repassword);

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = User.create({
        username,
        password: hashedPassword
    });

    return user;
}

exports.login = async (username, password) => {
    const user = await User.findOne({username});
    
    if (!user) {
        throw new Error('Invalid username or password');
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new Error('Invalid username or password')
    }

    return jwtServices.signToken({ 
        _id: user._id,
        username
    });
}

exports.isLogged = (token) => jwtServices.verifyToken(token);
