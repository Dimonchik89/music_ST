const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    if(req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization.split(" ")[1]
        if(!token) {
            return res.status(401).json({ message: "Not authorized"})
        }
        const decode = jwt.verify(token, process.env.TOKEN_KEY)
        return req.user = decode;
        next()
    } catch(e) {
        return res.status(401).json({ message: "Not authorized"})
    }
}

module.exports = { authMiddleware }