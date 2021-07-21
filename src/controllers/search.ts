import { MongoClient} from "mongodb";

import {Request , Response} from "express";

let search_faceted = async (req:Request , res:Response , next: Function) => {

    /*let client: MongoClient = new MongoClient("mongodb+srv://donaldo2019:donaldo2019@cluster0.q01lg.mongodb.net/open-services?retryWrites=true");

    try {    

         await client.connect();

         let results = await client.db("open-services").collection("users").aggregate([
            {
              '$search': {
                'index': 'users_index',
                'text': {
                  'query': `${req.body.query}`,
                  'path': {
                    'wildcard': '*'
                  }
                }
              }
            }
          ]).project({mdp: 0 , _id: 0 , status: 0}).toArray();
                 
        res.status(200).json(results);
   
      } catch (e) {
      
          res.status(400).json(e);
      
   
    }finally{
       
        client.close();
    }*/
}



let simple_search = async (req:Request , res:Response , next: Function) => {

  let client: MongoClient = new MongoClient("mongodb+srv://donaldo2019:donaldo2019@cluster0.q01lg.mongodb.net/open-services?retryWrites=true");

  try {    

       await client.connect();

       let results = await client.db("open-services").collection("users").aggregate([
          {
            '$search': {
              'index': 'users_index',
              'text': {
                'query': `${req.body.query}`,
                'path': {
                  'wildcard': '*'
                }
              }
            }
          }
        ]).project({mdp: 0 , status: 0}).toArray();
               
      res.status(200).json(results);
 
    } catch (e) {
    
        res.status(400).json(e);
    
 
  }finally{
     
      client.close();
  }
}




let autocomplete_search = async (req:Request , res:Response , next: Function) => {

  let client: MongoClient = new MongoClient("mongodb+srv://donaldo2019:donaldo2019@cluster0.q01lg.mongodb.net/open-services?retryWrites=true");

  try {    

      await client.connect();

      let results = await client.db("open-services").collection("users").aggregate([
        {
          '$search': {

            "autocomplete": {
            'index': 'users_index',
            'text': {
              'query': `${req.body.query}`,
              'path': {
                'wildcard': '*'
              }
            }
          }
          }
        }
      ]).project({mdp: 0 , _id: 0 , status: 0}).toArray();
              
    res.status(200).json(results);

 } catch (e) {
 
     res.status(400).json(e);
 
}finally{
  
   client.close();
}
  



}


export default {search_faceted , simple_search, autocomplete_search}
