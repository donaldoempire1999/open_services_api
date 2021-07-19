# open_services_api 

   * url: https://open-services-api.herokuapp.com/

La partie API du projet open services. Il sera developper en node js , et on utilisera CI et CD pour la partie Devops sur Heroku.TypeScript est utilisé , car la programmation typée est la meilleure des programmations.

Voici les differents services offerts par l'Api:

# Users
   
   Ici ça concerne la gestion des utilisateurs:
   
   -> (GET) **/users/** : Permet de lister tout les utilisateurs de la base

   -> (GET) **/users/_id** : Permet d'obtenir toute les informations concernant un utilisateur par rapport à son id

   -> (POST) **/users/login** : Pour la connection, une token est renvoyé lorsque la connexion a été bien établie , params: **phone_number , mdp**

   -> (DELETE) **/users/_id**: Suppression d'un utilisateur
   
   -> (POST) **/users/signup** : Ici c'est pour l'inscription d'un utilisateur.NB: Seules les attributs required sont d'obligés d'être entré pendant l'inscription, le reste peut être effecturer après sous forme d'update.

        *Params:

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

                    first_name: { type: String, maxLength: 20 },    
                    second_name: {type: String},
                    birthday: {type: Date}
            
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

                creation_date: {type: Date}
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
            
            //Mot de passe , il est unique
            mdp: {type: String, require: true , unique: true},
            
            //Image de profil
            image_url: {type: String} ,
            
            //Email
            email: {type: String ,required: false, unique: true},
            
            //Numero de téléphone
            phone_number: {type: String , required: true, unique: true}, 




 -> (PUT) **/users/_id** : Update d'un utilisateur. Même format que /users/signup , à la difference de l'ID passé en url.



         
           

        


