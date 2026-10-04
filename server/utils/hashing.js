// import hash object from bcryptjs
const {hash} = require('bcryptjs');

// export the salting function that returns the hashes to be stored in the database
exports.doHash = (value, saltValue) => {
    const result = hash(value, saltValue);
    return result;
}