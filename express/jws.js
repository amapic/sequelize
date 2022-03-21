const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');

// get config vars
dotenv.config();

function generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '30s' });
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    // const token = authHeader && authHeader.split(' ')[1]
    // console.log(req.headers['authorization']);
    const token = authHeader.split('=')[1]
    if (token == null || token=="") return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        console.log(err)

        if (err) return res.sendStatus(403)

        req.user = user

        next()
    })
}

module.exports = {authenticateToken,generateAccessToken}