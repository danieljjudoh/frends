// importing javaScript own hashing method
const { createHmac } = require('crypto');

// import hash object from bcryptjs
const {hash, compare} = require('bcryptjs');

// export the salting function that returns the hashes to be stored in the database
exports.doHash = (value, saltValue) => {
    const result = hash(value, saltValue);
    return result;
}

// export the doHashValidation function that compares users input to data on the database
exports.doHashValidation = (value, hashedValue) => {
    const result = compare(value, hashedValue);
    return result;
}

// export function that hashes the codeValue
exports.hmacProcess = (value, key) => {
    const result = createHmac('sha256', key).update(value).digest('hex');
    return result
}