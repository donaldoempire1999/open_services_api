import { connect } from 'mongoose'

import {MongoClient} from "mongodb"


//Connection à la base de donnée par mongoose pour la manipulation des modèles
export const connect_db_model = async () => {

    try{

        await connect(process.env.URI || "", {
           
            useUnifiedTopology: true ,
           
            useNewUrlParser: true
        });

        console.log("Successfull connected to the mongo atlas for mdoleing queries ! ");

    }catch (e){

        console.log({error: e});
    }

}


//Connection à la base de donnée pour les requêtes

export const connect_db_search = async () => {

    let client: MongoClient = new MongoClient("mongodb+srv://donaldo2019:donaldo2019@cluster0.q01lg.mongodb.net/open-services?retryWrites=true");
  
    await client.connect();
    
    return client;
  
  }
  