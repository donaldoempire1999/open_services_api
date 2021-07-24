import Publication from "../models/publication";
import Contract from "../models/contract"
import decode_token from '../helpers/decode_token';
import {Request , Response} from "express";
import {Types} from "mongoose"



// Creer une publication
let create_publication = async (req:Request, res:Response , next:Function) => {

    try {
   
        //On l'ajoute dans l'objet body request
        req.body["author"] = decode_token(req).user_id;


         //Creation de l'object contrat
         let contract = new Contract();
         contract.requester = req.body.author;
        
 
        //Creattion de l'objet publication
        let publication =  new Publication(req.body);
     
     
        //Liason de la publication avec son contrat
        publication.contract_for_publication = contract._id;

        //Liason du contrat avec sa publication
        contract.publication = publication._id

        //On verifie si l'objet publication respecte le schema
        await publication.validate();

    
        //On verifie si l'objet contrat respecte le schema
        await contract.validate();

         //Sauvegarde de la publication
         await publication.save();

        //Sauvegarde du contrat par defaut
        await contract.save();

        //OK
        res.status(200).json({message: "Successful create publication and contract for this publication!"});


    } catch (e) {
    
        res.status(400).json(e);
    
    }


}


//Supprimer une publication
let delete_publication = async (req:Request, res:Response , next:Function) => {

    try{
         // On supprime la publication correspondante
         await Publication.findByIdAndRemove({_id: req.params.id_pub , author: decode_token(req).user_id});

         // On supprime le contrat correspond
         await Contract.findOneAndDelete({publication: Types.ObjectId(req.params.id_pub)});

         res.status(200).json({message: "Successful delete publication and  respect contract!!"});

    }catch (e) {

        res.status(400).json({error: e});

    }
}



//Obtenir toutes les publications
let get_publications = async (req:Request, res:Response , next:Function) => {

    try {

        const publications =  await Publication.find({});
      
        res.status(200).json({publications})

    } catch (e) {
  
      res.status(400).json({error: e});
  
  }

}



//Obtenir toutes les publications de l'utilisateur courant
let get_publications_for_current_user = async (req:Request, res:Response , next:Function) => {

    try {
         
         const publications =  await Publication.find({author: decode_token(req).user_id});
      
         res.status(200).json({publications})

    } catch (e) {
  
      res.status(400).json({error: e});
  
  }

}



//Obtenir une publication particulière de l'utilisateur courant
let get_publication_for_current_user = async (req:Request, res:Response , next:Function) => {


    try {
        
         const publications =  await Publication.find({ _id: req.params.id_pub, author: decode_token(req).user_id});
     
         res.status(200).json({publications})

      } catch (e) {
 
        res.status(400).json({e});
 
    }

}




//Mise à jour d'une publication
let update_publication = async (req:Request, res:Response , next:Function) => {

    try {

          await Publication.updateOne({_id: req.params.id_pub , author: decode_token(req).id_user} , req.body);
        
          res.status(200).json({message: "Successfull update user"})

     } catch (e) {

          res.status(400).json({error: e});
        
    }
}


export default {
    
                create_publication,
                delete_publication, 
                update_publication, 
                get_publications, 
                get_publications_for_current_user, 
                get_publication_for_current_user
                    
            }