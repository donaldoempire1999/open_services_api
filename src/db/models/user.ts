import { Schema, model } from 'mongoose';


let UserSchema: Schema = new Schema({

    firstname: { type: String, required:false , maxLength: 20 },
   
    second_name: {type: String , required: false },

    entreprise_name: {type:String},
    
    category: {
        type: String,
        enum: ["provider", "requester", "admin"],
        required: true ,
        default: "requester"
    },

    type_user: {
        type: String , 
        enum: ["physic" , "moral"],
        default: "physic"
    },

    cv: {
        title: String ,
        jobs: [{title: String , description: String, }],
        extra:[{title: String , description: String}],
        bio: String
     },
    
     register_date:{ type: Date, default: Date.now() },
    
    mdp: String,
    
    image_url: {type: String} ,
    
    email: {type: String ,required: false, unique: true} ,
    
    phone_number: {type: String , unique: true , required: true}, 

    status: {
        type: String, 
        enum: ["online" , "offline"], 
        default: "offline"
    }

});

export default model('User', UserSchema);