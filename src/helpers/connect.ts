import { connect } from 'mongoose'

import {MongoClient} from "mongodb"


//Connection à la base de donnée par mongoose pour la manipulation des modèles
let connect_db_model = async () => {

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


//Connection à la base de donnée par mongoose pour la 

let connect_db_search = async () =>  {}


export default {connect_db_model , connect_db_search}
