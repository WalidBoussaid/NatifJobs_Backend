//import
require("dotenv").config();

// import jwtoken
const jwt = require("jsonwebtoken");
const option = {
    expiresIn: "24h",
};
const JWT_SECRET = process.env.TOKEN_SECRET;

const generetaTokenJWT = (loginId, userId ) => {
    return jwt.sign(
        {
            loginId: loginId,
            userId: userId
        },
        JWT_SECRET,
        option
    );
};
module.exports = {
    generetaTokenJWT,
    option,
    JWT_SECRET,
};
