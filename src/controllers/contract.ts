import Contract from "../models/publication";
import decode_token from '../helpers/decode_token';
import {Request , Response} from "express";



// Creer un conatrat
let create_contract = async (req:Request, res:Response , next:Function) => {

    try {
   
       


    } catch (e) {
    
        res.status(400).json(e);
    
    }


}


//Supprimer un contrat
let delete_contract = async (req:Request, res:Response , next:Function) => {

    try{
       

    }catch (e) {

        res.status(400).json({error: e});

    }
}



//Obtenir toutes les contrats de l'utilisateur courant
let get_contract = async (req:Request, res:Response , next:Function) => {

    try {
         
      

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
                create_contract,
                delete_contract,
                update_contract
            }