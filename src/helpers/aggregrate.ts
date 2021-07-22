import { MongoClient } from "mongodb";


export const aggregate_for_search = (collection:string , query_string:string) => {

    let aggregate = [];

    let get_index_name = () => collection === "users" ? "users_index": "publications_index";

    const index_name = get_index_name();
    
    aggregate[0] = 
       
         {
           "$search": {
             "index": index_name,
             "text": {
               "query": `${query_string}`,
               "path": {
                 "wildcard": "*"
               }
             }
           }
         };
    
   if(index_name === "users_index"){

        //Users index

        //Phases d'aggregrations
       
        aggregate[1] = {"$project":  {"mdp": 0 , "status": 0 , "register_date": 0 , 'contracts': 0 , "cv.extra": 0, "category": 0}};
 
   }else{

     // Publications index
      aggregate[1] =  {"$project":  {"comments": 0 , "followers": 0}};
   
   }
 
   return aggregate;
   
   
 }



 export const aggregate_for_autocompletion = (collection:string , query_string:string) => {


    let aggregate = [];

    let get_index_name = () => collection === "users" ? "users_index": "publications_index";

    const index_name = get_index_name();
    
    if(index_name === "users_index"){

        aggregate[0] = 
       
                {
                    "$search": {
                    "index": index_name,
                    "autocomplete": {
                        "path": "cv.main_activity",
                        "query": `${query_string}`
                    }
                    }
                };
    
       
        aggregate[1] = {"$project":  {"cv.main_activity":1 , "_id":0 }};
 
   }else{

     // Publications index


     // Pipeline aggregration

     aggregate[0] = 
     
          {
            "$search": {
            
              "index": index_name,
              "autocomplete": {
                "path": "task_description.title",
                "query": `${query_string}`
            
              }
            }
        };


      aggregate[1] =  {"$project":  {"task_description.title": 1 , "_id": 0}};
   
   }
 
   return aggregate;  
}




 export const get_results = async (instance:MongoClient,  collection:string , aggregrate:Array<Object>) => {


    return await instance.db("open-services").collection(collection).aggregate(aggregrate).toArray();

  
} 
  