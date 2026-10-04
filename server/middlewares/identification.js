const jwt = require('jsonwebtoken');

// export identification function
exports.identifier = (req, res) => {
    if (req.headers.client === 'not-browser') {
        token = req.headers.authorization;
    } else {
        token = req.cookies['Authorization']
    }
}