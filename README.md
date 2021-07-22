# open_services_api 

   * url: https://open-services-api.herokuapp.com/

La partie API du projet open services. Il sera developper en node js , et on utilisera CI et CD pour la partie Devops sur Heroku.TypeScript est utilisé , car la programmation typée est la meilleure des programmations.

Voici les differents services offerts par l'Api:

# Users
   
   Ici ça concerne la gestion des utilisateurs:
   
   -> (GET) **/users/** : Permet de lister tout les utilisateurs de la base.

   -> (GET) **/users/_id** : Permet d'obtenir toute les informations concernant un utilisateur par rapport à son id.

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


                //Domaine d'activité (Domaine d'activité principal , exemple: Informatique decisionnelle , reparation des voitures , genie logiciel)
                 activity_domain: {type:String, required:true , maxLength: 50}
            
                //Un titre donné au CV
                title: {type:String, required:true , maxLength: 50}
                
                // Ses différentes compétences        
                jobs: [{title: String , description: String , image: String}],
                
            //Tout ce qui est extra dans le Cv
                extra:[{title: String , description: String , location: String , image: String}],
            
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


 # Publications
        
 Ce service s'occupe de la gestion des publications des offres.

   -> (GET) **/publications/all** : Permet de lister toutes les publications de la plateforme.

   <----------------------------------- Être connecté au préalable ---------------------------------------------->

   -> (GET) **/publications/** : Permet d'obtenir toute les publications de l'utilisateur courant.

   -> (GET) **/publications/id_pub** : Permet d'obtenir un detail sur une publication de l'utilisateur courant.

   -> (POST) **/publications/** : Permet à l'utilisateur courant de creer une publication

   -> (DELETE) **/publications/id_pub**: Suppression d'une publication de l'utilisateur courant
        
   -> (PUT) **/publications/id_pub** : Mise à jour d'une publication de l'utilisateur courant

    Schema: 
           
            {
    

                    //Les likes de la publication
                    likes: {type: Number, default:0},

                    //Il peut décider de joindre une ou plusieurs media sur la publication
                    medias: [ {type_media: { type: String , enum: ["audio" , "video" , "ur"] }, url: String}],

                    // Les commentaires sur la publication
                    comments: [{ user_who_comment: {type: Schema.Types.ObjectId, rel:'User'}, text: String }],
                    
                    // La description de la tâche à faire
                    task_description: {
                        
                        //Cette difficulté est fixé par les administrateurs
                        difficulty: {type: String, enum: ["low" , "medium" , "high"]},

                        //La priorité , est ce que le servie est urgent ? priorité 1 , etc..
                        priority: {type: Number , enum: [0 , 1 , 2]},   
                        
                        //Description de la tâche à faire
                        description: {type: String, maxLength: 250},

                        //Chaque contrat a une valeur estimé en  point , en fonction de la diffulté.
                        //Et l'accomplissement d'un tâche ajoute des points à l'utilisateur.
                        //Le soin sera laissé aux administrateur de noter.
                        points: {type: Number , default: 0},
                
                        //Salaire de base pour le job ,  proposé sur la plubication
                        base_amount: {type: Number, default: 0},

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

             }


# Search 

  Ici c'est le service recherche , on aura deux types de recherche, la recherche full avec facette et l'autocompletion.

   -> (POST) **/search/faceted** :Recherche en plein texte avec regoupement sur plusieurs facettes.
      
        params: "query" : le mot ou groupe de mots à rechercher

   -> (POST) **/search/autocomplete** : Recherche pour autocompletion lors de la saisie

        params: "query" : le mot ou groupe de mots à rechercher

# Contrat
  
   Ici c'est le service qui va s'occuper de la gestion des contrats.





         
           

        


