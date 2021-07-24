import { Request , Response } from "express";

import User from "../models/user"

import Publication from "../models/publication"


let search_faceted = async (req:Request , res:Response , next: Function) => {
  
  try {    


        const collection = req.body.collection; // Le nom de la collection 

        const query_string = req.body.query_string; // Le nom de la  query_string

        let results; // Variable qui va garder le resultat

        if(!collection){

          return res.status(400).json({error: "Entrez le nom de la collection sur laquelle vous souhaitez faire la recherche"}); 
        
        }

        if(collection != "users" && collection != "publications"){

          return res.status(400).json({error: "Cette collection n'existe pas"});
        
        }

       
        if(collection === "users"){

            results = await User.aggregate().search({

              index: "users_index",              
              text: {
                query: query_string,
                path: {
                  wildcard: "*"
                }
              }

            
            }).project({mdp: 0 , status: 0 , register_date: 0 , contracts: 0 , "cv.extra": 0, category: 0})

        
        
        } 
        
        
        if (collection === "publications"){

           results = await Publication.aggregate().search({

              index: "publications_index",
              
              text: {
               
                query: query_string,
               
                path: {
               
                  wildcard: "*"
                }
              
              }
        
            }).project({comments: 0 , followers: 0});
        
          }
  
        res.status(200).json(results);
  
    } catch (e) {
    
        res.status(400).json(e);
    
  }
}



let autocomplete_search = async (req:Request , res:Response , next: Function) => {

  try {
   
   
        const collection = req.body.collection; // Le nom de la collection 

        const query_string = req.body.query_string; // Le nom de la  query_string


        if(!collection){

          return res.status(400).json({error: "Entrez le nom de la collection sur laquelle vous souhaitez faire l'autocompletion"}); 
        }

        if(collection != "users" && collection != "publications"){

          return res.status(400).json({error: "Cette collection n'existe pas"});
        
        }

        let results; //Pour garder le resultat de la recherche

        if (collection === "users"){

          
          results = await User.aggregate().search({

            index: "users_index",              
            autocomplete: {
              path: "cv.main_activity",
              query: query_string
            }

          }).project({"cv.main_activity": 1 , _id: 0});
        
      
        }


        if (collection === "publications"){

          results = await Publication.aggregate().search({

            index: "publications_index",              
            autocomplete: {
              path: "task_description.title",
              query: query_string
            }

          }).project({ "task_description.title": 1 , _id: 0});
        
        
        }

          res.status(200).json(results);
 
    } catch (e) {
    
        res.status(400).json(e);
    
  }finally{
     
    
    
  }

    
  }


export default {search_faceted , autocomplete_search}
