const jwt = require('jsonwebtoken');
const { promisify } = require('util')

const secret = '7Jd3RSFB*6TyDS185g#3vm&NpfdPbWE#qv5Bp8qnp8^5%7%w0II@WwVTHVwFy1z908K5msfYVWs@30HOs3Ud^hy3K0b#L7$!uWq7pODl8d7rm&$t3D88d2wtGu2bMiwf5lcS6oF^uw*N24^!UW@*3Q';

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