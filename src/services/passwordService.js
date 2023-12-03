const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashingPassword = async (password) => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

const comparePasswords = async (password, hashingPasswordInDB) => {
    const check = await bcrypt.compare(password, hashingPasswordInDB);
    return check;
}

module.exports = { hashingPassword, comparePasswords }