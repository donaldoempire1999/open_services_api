const jwt = require("jsonwebtoken");

let decode_token = function(req) {

    const token = req.headers.authorization.split(' ')[1];

    if(!token){

        throw new Error("Authentification failed!");

    }

    const decodeToken = jwt.verify(token , process.env.JWT_TOKEN_SECRET);

    return decodeToken;

}

module.exports = decode_token;
