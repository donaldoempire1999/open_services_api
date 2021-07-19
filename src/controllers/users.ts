import bcrypt from 'bcrypt'

import jwt from "jsonwebtoken"

import { Request , Response} from 'express'

import User from "../db/models/user";


let login = async (req:Request , res:Response , next:Function) => {

    try {
                        
                let user = await User.findOne({numero_tel: req.body.numero_tel});
            
                if (!user) {
                    return res.status(404).json({error: "User not found!"});
                }

                let valid = await bcrypt.compare(req.body.mdp, user.mdp);

                if (!valid) {
                    return res.status(404).json({error: "Mdp is incorrect"});
                }

                res.status(200).json({
                    userId: user._id,
                    token: jwt.sign(
                        {userId: user._id},
                        process.env.JWT_TOKEN_SECRET||"",
                        {expiresIn: '24h'}
                    )
                });

    }catch (e){ 
        
        res.status(404).json({error: e});
      
    }

}


let signup = async (req:Request , res:Response , next:Function ) =>  {

    try{

            let hash_mdp = await bcrypt.hash(req.body.mdp, 10);

            const user = new User({
                category: req.body.category,
                person: req.body.person,
                address: req.body.address,
                entreprise: req.body.entreprise,
                mdp: hash_mdp,
                cv: req.body.cv,
                image_url: req.body.image_url, 
                phone_number: req.body.phone_number,
                email: req.body.email
                
            });

            await user.save();

            res.status(200).json({message: "Successful created user!!"});

        } catch (e){

            //Bad request
            res.status(400).json({error: e.toString()});

    }
}


let get_users = async (req:Request , res:Response , next:Function) => {

    try{

         let users = await User.find({}).select({mdp: 0});
         
         res.status(200).json(users);

    }catch (e) {

        res.status(400).json({error: e});

    }

}


let get_user = async (req:Request , res:Response , next:Function) =>  {

    try {

            let user = await User.findOne({_id: req.params._id}).select({mdp:0});

            return res.status(200).json({user});
    

    } catch (e) {

            console.log(e);
            
            return res.status(400).json({error: e});

    }


}

let delete_user  = async  (req:Request , res:Response , next:Function) => {

    try{

        await  User.findOneAndDelete({_id: req.params._id});

        res.status(200).json({message: "Successful delete user!"});


    }catch (e) {

        res.status(400).json({error: e});

    }

};

export default {login , signup , get_user , get_users, delete_user}