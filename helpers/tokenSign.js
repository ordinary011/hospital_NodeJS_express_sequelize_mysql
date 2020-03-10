const jwt = require('jsonwebtoken');
const {secret} = require('../constants/tokenSecret');

module.exports = data => jwt.sign(data, secret, { expiresIn: '1d' });
