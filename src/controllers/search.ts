import { Request , Response } from "express";

import { aggregate_for_autocompletion , aggregate_for_search , get_results } from "../helpers/aggregrate"

import { connect_db_search } from "../helpers/connect"


let search_faceted = async (req:Request , res:Response , next: Function) => {

  let instance = await connect_db_search(); //Obtention d'une instance de connexion
  
  try {    

        const collection = req.body.collection; // Le nom de la collection 

        const query_string = req.body.query_string; // Le nom de la  query_string

        if(!collection){

          return res.status(400).json({error: "Entrez le nom de la collection sur laquelle vous souhaitez faire la recherche"}); 
        
        }

        if(collection != "users" && collection != "publications"){

          return res.status(400).json({error: "Cette collection n'existe pas"});
        
        }
      
        //construction du pipeline
        let aggr = aggregate_for_search(collection , query_string);

        //Resultats
        let results = await get_results(instance , collection , aggr);

        res.status(200).json(results);
  
    } catch (e) {
    
        res.status(400).json(e);
    
  }finally{
     
      await instance.close();
  }
}



let autocomplete_search = async (req:Request , res:Response , next: Function) => {

  
  let instance = await connect_db_search(); //Instance de connexion

  try {
   
   
        const collection = req.body.collection; // Le nom de la collection 

        const query_string = req.body.query_string; // Le nom de la  query_string

        if(!collection){

          return res.status(400).json({error: "Entrez le nom de la collection sur laquelle vous souhaitez faire l'autocompletion"}); 
        }

        if(collection != "users" && collection != "publications"){

          return res.status(400).json({error: "Cette collection n'existe pas"});
        
        }


          //construction du pipeline
          let aggr =  aggregate_for_autocompletion(collection , query_string);

          //Resultats
          let results = await get_results(instance , collection , aggr);

          //Fonction pour obtenir le resultat
          res.status(200).json(results);
 
    } catch (e) {
    
        res.status(400).json(e);
    
  }finally{
     
      await instance.close();
  }

    
  }


export default {search_faceted , autocomplete_search}
