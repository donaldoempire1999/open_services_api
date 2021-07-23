import jwt from 'jsonwebtoken';

import { Request } from 'express';


export default function decode_token(req:Request):jwt.JwtPayload | string  {
   
    
    //Ici on suppose que req peut ne pas contenir l'objet headers ou authorozation
    const token = req.headers?.authorization?.split(' ')[1];

    if(!token){

        throw new Error("Authentification failed!, you must be connect to achieve this");
    }

    return jwt.verify(token , process.env.JWT_TOKEN_SECRET || " ");

}
