const jwt = require('jsonwebtoken');
const { secret } = require('../constants');
const { promisify } = require('util')

const promiseSign = promisify(jwt.sign);
const promiseVerify = promisify(jwt.verify);

exports.signToken = (data) => {
    const payload = data;
    const options = {
        expiresIn: '2d',
    }

    return promiseSign(payload, secret, options);
} 

exports.verifyToken = (token) =>{
    return promiseVerify(token, secret);
} 