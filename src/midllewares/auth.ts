import decode_token from './decode_token'

import { Request, Response } from 'express';

export default (req:Request , res:Response , next: Function) => {

    try{

        const token = decode_token(req);

        const userId = token.userId;

        if(req.body.userId && req.body.userId !== userId){
            throw "Invalid user ID";
        }else {
            next();
        }

    }catch (e) {

        res.status(401).json({
            error: e
        });

    }

}
