import { Schema , model } from "mongoose"

let contractSchema = new Schema({

    //Publication concernée pour ce contrat
    publication: {type: Schema.Types.ObjectId , ref:'Publication'},
    
    //Etat du contrat
    state: {
        type: String,
        enum: ["achieve" , "on_working", "not_started"]
    },

    //les closes du contrat
    close: {type: String , require: true},
});

export default model('Contract', contractSchema);
