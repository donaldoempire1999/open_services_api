import Contract from "../models/contract";
import Publication from "../models/publication"
import decode_token from '../helpers/decode_token';
import { Request , Response } from "express";
import { Types } from "mongoose"



//Supprimer un contrat
let delete_contract = async (req:Request, res:Response , next:Function) => {

    try{
       
       // Ce n'est que le requester qui peut supprimer le contrat
       await Contract.findOneAndDelete({_id: req.params.id_contr , requester: decode_token(req).user_id});

       // On supprime la publication correspondante
       await Publication.findOneAndDelete({contract_for_publication: Types.ObjectId(req.params.id_contr)});

       res.status(200).json({message: "Successful delete contract and  respect contract!!"});

    }catch (e) {

        res.status(400).json({error: e});

    }
}



//Obtenir un contrat de l'utilisateur courant
let get_contract = async (req:Request, res:Response , next:Function) => {

    try {
         
        let contract = await Contract.findOne({_id: req.params.id_contr});
       
        res.status(200).json(contract)      

    } catch (e) {
  
      res.status(400).json({error: e});
  
  }

}





//Obtenir tout les contrats de l'utilisateur courant
let get_contracts = async (req:Request, res:Response , next:Function) => {

    try {
        
        let current_user_id = Types.ObjectId(decode_token(req).user_id);
                
        let results = await Contract.aggregate().match({

            $or: [

                {requester: current_user_id},
                
                {provider:   current_user_id}
            
              ]

        });

        res.status(200).json(results);
      

    } catch (e) {
  
      res.status(400).json({error: e});
  
  }

}



// Mise à jour d'un contrat
let update_contract = async (req:Request, res:Response , next:Function) => {

    try {

        await Contract.updateOne({_id:req.params.id_contr,requester: decode_token(req).user_id} , req.body);

        res.status(200).json({message: "Successfull update the contract"});
    
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