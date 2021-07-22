import { Schema, model } from 'mongoose';


let userSchema:Schema = new Schema({

     //La categorie de l'utilisateur
     category: {
      
        //Son type , si c'est une personne physique ou une personne morale
        type_user: {
            type: String , 
            enum: ["physic" , "moral"],
            default: "physic"
        },
      
        //Son rôle dans l'application
        role: {    
            type: String,
            enum: ["provider", "requester", "admin"],
            required: true ,
            default: "requester"
        },
       
    },
    
    
    //Dans le cas d'une personne physique
    person: {

      first_name: { type: String, maxLength: 155 },    
      second_name: {type: String, maxLength: 155},
      birthday: {type: Date}
      
    },
    
    //L'adresse de la personne ou de la structure
    address: {
        
        country: {type:String , required: true} ,
        
        region: {type: String, required: true},
        
        city: {type:String, required: true}, 
        
        quarter: {type:String, required: true},
        
        bp: {type: Number},
    
    },


    
    //Dans le cas d'une personne morale
    entreprise: {
        // Le nom de l'entreprise
        name: {type: String , maxLength: 155}, 

        creation_date: {type: Date}
    },
    
    
    //Le CV
    cv: {
       
         //Sa biographie
         bio: String,
       
        //Un titre donné au CV
        title: String ,

         //Domaine d'activité
         activity_domain: String,
        
        // Ses différentes compétences
        
        jobs: [{title: String , description: String, }],
        
       //Tout ce qui est extra dans le CV
        extra:[{title: String , description: String , location: String, image:String}],

       
     },
    
     //Date d'enregistrement dans la plateforme
     register_date:{ type: Date, default: Date.now() },
    
     //Mot de passe , il est unique
     mdp: {type: String, required: true , unique: true},
    
    //Image de profil
     image_url: {type: String} ,
    
    //Email
     email: {type: String ,required: false, unique: true},
    
   //Numero de téléphone
     phone_number: {type: String , required: true, unique: true}, 

    //Status ,connecté ou
     status: {
        type: String, 
        enum: ["online" , "offline"], 
        default: "offline"
    }, 


    //Les différents contrats signé dans le cas d'un provider/requester
    contracts: [{type: Schema.Types.ObjectId , ref: 'Contract'}],


});


export default model('User', userSchema);