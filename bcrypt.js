const bcrypt = require("bcrypt");

const passwordHash = async (password) => {
    const saltRounds = 10;
    const myPlaintestPassword = password;

    return await bcrypt.hash(myPlaintestPassword, saltRounds);
};

const compareHash = async (passwordPlain, hash) => {
    return await bcrypt.compare(passwordPlain, hash);
};

module.exports = { passwordHash, compareHash };
