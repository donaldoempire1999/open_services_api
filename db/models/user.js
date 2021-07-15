const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let UserSchema = new Schema({

    firstname: { type: String, required:true , maxLength: 20 },
   
    second_name: {type: String , required: false }, 
   
    categorie: ["provider" , "requester"],

    type: ["moral" , "physic" , "admin"],

    jobs: [{name_job: String }],

    address: String, 

    register_date:{ type: Date, default: Date.now },

    job:[String],

    bio: String , 

    mdp: String ,

    image_url: {type: String , require: true}

});