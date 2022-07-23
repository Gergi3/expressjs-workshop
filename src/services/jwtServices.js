const jwt = require('jsonwebtoken');
const secret = '7Jd3RSFB*6TyDS185g#3vm&NpfdPbWE#qv5Bp8qnp8^5%7%w0II@WwVTHVwFy1z908K5msfYVWs@30HOs3Ud^hy3K0b#L7$!uWq7pODl8d7rm&$t3D88d2wtGu2bMiwf5lcS6oF^uw*N24^!UW@*3Q';

exports.signToken = (data) => {
    const payload = data;
    const options = {
        expiresIn: '2d',
    }

    const promise = new Promise((resolve, reject) => {
        jwt.sign(payload, secret, options, (err, token) => {
            if (err) {
                return reject(err);
            }
            resolve(token);
        });
    });
    
    return promise;
} 

exports.verifyToken = (token) =>{
    const promise = new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                return reject(err);
            }
            resolve(decoded);
        });
    });

    return promise;
} 