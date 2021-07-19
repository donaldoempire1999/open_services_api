import bcrypt from 'bcrypt'

import jwt from "jsonwebtoken"

import { Request , Response} from 'express'

import User from "../db/models/user";


let login = async (req:Request , res:Response , next:Function) => {

    try {

                if(!req.body.phone_number || req.body.phone_number.length === 0){
                    throw new Error("Please enter the phone number")
                }
                        
                let user = await User.findOne({phone_number: req.body.phone_number});
    
                if (!user) {
                    throw new Error("User with this phone number not found!");
                }

                if(!req.body.mdp || req.body.mdp.length === 0){
                    throw new Error ("Please enter a mdp for this number phone!");
                }

                let valid = await bcrypt.compare(req.body.mdp, user.mdp);

                if (!valid) {
                    throw new Error("Mdp is incorrect");
                }

                res.status(200).json({
                    userId: user._id,
                    token: jwt.sign(
                        {user_id: user._id},
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
        
            if(!req.body.mdp){
            
                return res.status(400).json({error: "Please enter a password"});
            }

            if(req.body.mdp < 10) {

              return res.status(400).json({error: "Please enter a password big than 10"});

            }

            if (req.body.mdp > 30){

                return res.status(400).json({error: "Please enter a password less than 30"});

            }

            const user = new User(req.body);

            await user.validate();
            
            let hash_mdp = await bcrypt.hash(req.body.mdp, 10); // Ici on hashe le mdp
            
            user.mdp = hash_mdp;

            await user.save();

            res.status(200).json({message: "Successful created user!!"});

        } catch (e){

            //Bad request
            res.status(400).json(e);

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
            
            return res.status(400).json({error: e});

    }


}

let delete_user  = async (req:Request , res:Response , next:Function) => {

    try{

        await User.findByIdAndDelete({_id: req.params._id});

        res.status(200).json({message: "Successful delete user!"});


    }catch (e) {

        res.status(400).json({error: e});

    }

};


let update_user = async (req:Request , res:Response , next:Function) => {

    try {

        const id_user = req.params._id;

        await User.updateOne({_id: id_user} , req.body);
        
         res.status(200).json({message: "Successfull update user"})

    } catch (e) {

        res.status(400).json({error: e});
        
    }

}

export default {login , signup , get_user , get_users, delete_user,update_user}