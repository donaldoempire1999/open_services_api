const decode_token = require('./decode_token')

module.exports = (req , res , next) => {

    try{

        const token = decode_token(req);

        const userId = token.userId;

        if(req.body.userId && req.body.userId !== userId){
            throw "Invalid user ID";
        }else {
            next();
        }

    }catch (e) {

        console.log(e);

        res.status(401).json({
            error: e
        });

    }

}
