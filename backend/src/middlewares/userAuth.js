const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

exports.userAuth = (req, res, next) => {
    try {
        const token = getTokenFromHeaders(req);
        if (!token) {
            return sendUnauthorized(res);
        }
        jwt.verify(token, secret, (err, decoded) => {
            if (err || !decoded) {
                return sendUnauthorized(res);
            }
            
            req.data = decoded;
            next();
        });
    } catch (err) {
        return res.status(400).send({ res: 'Some Error Occurred' });
    }
};

function getTokenFromHeaders(req) {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (token && token.includes('Bearer ')) {
        token = token.slice(7);
    }
    return token;
}

function sendUnauthorized(res) {
    return res.status(401).send({ res: 'Please log in with email and password' });
}
