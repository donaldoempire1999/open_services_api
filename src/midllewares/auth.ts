import decode_token from './decode_token'

import { Request, Response } from 'express';

export default (req:Request , res:Response , next: Function) => {

    try{

        const token = decode_token(req);

        const user_id = token.user_id;

        if(req.body.user_id && req.body.user_id !== user_id){
            throw "Invalid user ID";
        }else {
            next();
        }

    }catch (e) {

        res.status(401).json({
            error: e.toString()
        });

    }

}
