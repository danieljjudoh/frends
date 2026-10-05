const jwt = require('jsonwebtoken');

// export identification function
exports.identifier = (req, res) => {
    if (req.headers.client === 'not-browser') {
        token = req.headers.authorization;
    } else {
        token = req.cookies['Authorization']
    }
    if (!token) {
        return res.status(403).json({success: false, message: "Unauthorized"});
    }
    try {
        const userToken = token.split(" ")[1];
        const jwtverified = jwt.verify(userToken, process.env.TOKEN_SECRET);
        if (jwtverified) {
            req.user = jwtverified;
            next()
        } else {
            throw new Error('error in the token')
        }
    } catch (error) {
        console.error(error);
    }
}