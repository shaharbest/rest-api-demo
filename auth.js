const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];

    try {
        req.user = jwt.verify(token, '123');
        next();
    }
    catch (error) {
        res.send('bad');
    }
}

module.exports = auth;