const User = require('../db/models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const decode_token = require("../midllewares/decode_token");

exports.login = async (req , res , next) => {

    try {

        let user = await User.findOne({email: req.body.email});

        if (!user) {
            return res.status(401).json({error: "User not found!"});
        }

        let valid = await bcrypt.compare(req.body.mdp, user.mdp);

        if (!valid) {
            return res.status(401).json({error: "Mdp is incorrect"});
        }

        res.status(200).json({
            userId: user._id,
            token: jwt.sign(
                {
                    userId: user._id,
                    type_user: user.type_user,
                    category: user.category,
                 },
                process.env.JWT_TOKEN_SECRET,
                {expiresIn: '24h'}
            )
        });

    }catch (e){

        res.status(500).json({error: e})

    }

}


exports.signup = async (req , res , next ) => {

    try{

        let hash_mdp = await bcrypt.hash(req.body.mdp, 10);


            const user = new User({
                type_user: req.body.type_user,
                category: req.body.category,
                email: req.body.email,
                mdp: hash_mdp,
                phone_number: req.body.phone_number,
                address: req.body.address
            });

            await user.save();

            res.status(201).json({message: "Successful created user!!"})

        } catch (e){

        res.status(400).json({error: e});

    }
}


exports.getAllUsers = async  (req , res ,next) => {

    try{

         let users = await User.find({});
         res.status(200).json(users);

    }catch (e) {

        res.status(401).json({error: e});

    }


}


exports.getAllAboutUser = async (req , res ,next) => {

    const token = decode_token(req);

    let user = await User.findOne({_id: token.userId});

    return res.status(200).json({user});

}

exports.deleteUser  = async  (req , res , next) => {

    try{

        await  User.findOneAndDelete({_id: req.params._id});

    }catch (e) {

        res.status(401).json({error: e});

    }

};
