import { Schema , model } from "mongoose"

let contractSchema = new Schema({

    //Utilisateur a propsé l''offre
    requester: {type: Schema.Types.ObjectId , ref: 'User'},

    //Utilisateur qui a accepté l'offre
    provider: {type: Schema.Types.ObjectId , ref: 'User'},
    
    //Publication concernée par ce contrat
    publication: {type: Schema.Types.ObjectId , ref:'Publication'},
    
    //Etat des accord des parties prenantes et du projet
    agree_state: {
 
        requester: {
    
                state:{type:Boolean, default: false } , 

                date: {type: Date}
          }, 

          provider: {

                state:{type:Boolean, default: false } , 

                date: {type: Date}
          }, 

          project: {
            
            type: String,
        
            enum: ["achieve" , "on working", "not started"],
    
            default: "not started"
          
        }
    
    },

    //les closes du contrat
    close: {type: String , required: true},
});

export default model('Contract', contractSchema);
