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
        }
       
    },
    
    
    //Dans le cas d'une personne physique
    person: {

      first_name: { type: String, required:false , maxLength: 20 },    
      second_name: {type: String , required: false },
      birthday: {type: Date , require:true}
      
    },
    
    //L'adresse de la personne ou de la structure
    address: {
        
        country: {type:String , require: true} ,
        
        region: {type: String, require: true},
        
        city: {type:String, require: true}, 
        
        quarter: {type:String, require: true},
        
        bp: {type: Number} 
    },


    
    //Dans le cas d'une personne morale
    entreprise: {
        // Le nom de l'entreprise
        name: {type: String , maxLength: 20}, 

        creation_date: {type: Date , required:true}
    },
    
    
    //Le CV
    cv: {
       
         //Sa biographie
         bio: String,
       
        //Un titre donné au CV
        title: String ,
        
        // Ses différentes compétences
        
        jobs: [{title: String , description: String, }],
        
       //Tout ce qui est extra dans le Cv
        extra:[{title: String , description: String}],
       
     },
    
     //Date d'enregistrement dans la plateforme
     register_date:{ type: Date, default: Date.now() },
    
     //Mot de passe , il est unique
     mdp: {type: String, require: true , unique: true},
    
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

    //Les differrentes offres publiées , dans le cas d'un utilisateur requester , uniquement
    publications: [{type: Schema.Types.ObjectId , ref:'Publication'}] 

});


export default model('User', userSchema);