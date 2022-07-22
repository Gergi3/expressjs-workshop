const jwt = require('jsonwebtoken');
const secret = '7Jd3RSFB*6TyDS185g#3vm&NpfdPbWE#qv5Bp8qnp8^5%7%w0II@WwVTHVwFy1z908K5msfYVWs@30HOs3Ud^hy3K0b#L7$!uWq7pODl8d7rm&$t3D88d2wtGu2bMiwf5lcS6oF^uw*N24^!UW@*3Q';

exports.signToken = (data) => {
    const payload = data;
    const options = {
        expiresIn: '2d',
    }
    const token = jwt.sign(payload, secret, options);
    return token;
} 

exports.verifyToken = (token, callback) =>{
    const callback = (err, decoded) => {
        if (err) {
            return false;
        }
        return decoded;
    }

    return jwt.verify(token, secret, callback);
} 