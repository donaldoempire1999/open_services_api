import Publication from "../db/models/publication";
import decode_token from '../midllewares/decode_token';
import {Request , Response} from "express";
import User from "../db/models/user";



// Creer une publication
let create_publication = async (req:Request, res:Response , next:Function) => {

    try {
   
        //On l'ajoute dans l'objet body request
        req.body["author"] = decode_token(req).id_user;
 
        let publication =  new Publication(req.body);

        //On verifier le schéma
        await publication.validate();
    
        //Sauvegarde de la publication
        await publication.save();

        //OK
        res.status(200).json({message: "Successful create publication!"});


    } catch (e) {
    
        res.status(400).json(e);
    
    }


}


//Supprimer une publication
let delete_publication = async (req:Request, res:Response , next:Function) => {

    try{
         // On recupère la publication à supprimer
         let publication =  await Publication.findByIdAndRemove({_id: req.params.id_pub , author: decode_token(req).user_id});

         res.status(200).json({message: "Successful delete publication!!"});

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


export default {create_publication , delete_publication , update_publication, get_publications, get_publications_for_current_user , get_publication_for_current_user}