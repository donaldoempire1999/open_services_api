import { Schema, model } from 'mongoose';

// Schema qui décrit la publication d'une offre par un requester
let PublicationSchema = new Schema({
  
   //Les likes de la publication
    likes: {type: Number, default:0},

    //La priorité , est ce que le servie est urgent ? priorité 1 , etc..
    priority: {type: Number , enum: [0 , 1 , 2] }, 


    // Il peut décider de joindre une ou plusieurs media sur la publication
    medias: [ {type_media: { type: String , enum: ["audio" , "video" , "ur"] }, url: String}],

    // Les commentaires
    comments: [{
        user_who_comment: {type: Schema.Types.ObjectId, rel:'User'},
        text: String , 
        
    }],
    
    // La description de la tâche à faire
    task_description: {
        
        difficulty: {type: String, enum: ["low" , "medium" , "high"]},
        
        //Description de la tâche à ferme
        description: {type: String, maxLength: 250},

        //Chaque contrat a une valeur estimé en  point , en fonction de la diffulté.
        //Et l'accomplissement d'un tâche ajoute des points à l'utilisateur.
        //Le soin sera laissé aux administrateur de noter.
        points: Number,
   
        required: true,

        //Salaire de base pour le job ,  proposé sur la plubication
         base_amount: Number,

         //periode
         period: {
           
            //Date de debut 
            start_date: {
                 type: Date , required: true 
             }, 

             //Date de fin
             end_date:{
                 type: Date , required: true
             }
         
        }

    },
    
    //Les utilisateurs qui ont follow sa demande , donc en gros qui on accepté la demande
    followers:[{type: Schema.Types.ObjectId , ref: 'User' , required: false}],
    

    //Etat du post , ouvert ou fermé
    state: {
        type: String ,
        enum: ["closed", "open"]
    }, 


    // Le contrat proposé par rapport à cette demande
    //Relation one-one avec Contrat
    contract_for_post: {type: Schema.Types.ObjectId , ref: "Contract"}


});

export default model('Publication' , PublicationSchema);