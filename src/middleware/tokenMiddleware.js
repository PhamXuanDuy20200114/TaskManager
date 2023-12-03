const jwt = require('jsonwebtoken')
require('dotenv').config();

function verifyToken(req, res, next) {
    const token = req.headers['authorization'].split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token' });
        }
        req.decoded = decoded;
        next();
    });
}

module.exports = { verifyToken }