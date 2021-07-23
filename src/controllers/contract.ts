import Contract from "../models/publication";
import decode_token from '../helpers/decode_token';
import {Request , Response} from "express";



//Supprimer un contrat
let delete_contract = async (req:Request, res:Response , next:Function) => {

    try{
       

    }catch (e) {

        res.status(400).json({error: e});

    }
}



//Obtenir un contrat de l'utilisateur courant
let get_contract = async (req:Request, res:Response , next:Function) => {

    try {
         
      

    } catch (e) {
  
      res.status(400).json({error: e});
  
  }

}



//Obtenir toutes les contrats de l'utilisateur courant
let get_contracts = async (req:Request, res:Response , next:Function) => {

    try {
        
        let current_user_id = decode_token(req).user_id;

        console.log(current_user_id);
        
        
        let results = await Contract.aggregate([
          
             {
                 "$match": {

                    "$or": [

                        {
                            "requester": {current_user_id}            
                        },
                        
                        {

                            "provider":  {current_user_id}
                        }
                    
                      ]          
                }

             }


        ]);

        res.status(200).json(results);
      

    } catch (e) {
  
      res.status(400).json({error: e});
  
  }

}



// Mise à jour d'un contrat
let update_contract = async (req:Request, res:Response , next:Function) => {

    try {
        
    } catch (e) {

        res.status(400).json({error: e});
        
    }
    
}


export default {
    
                get_contract , 
                delete_contract,
                update_contract,
                get_contracts
            }