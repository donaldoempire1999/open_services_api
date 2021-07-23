import { connect } from 'mongoose'

//Connection à la base de donnée par mongoose pour la manipulation des modèles
export const connect_db = async () => {

    try{

        await connect(process.env.URI || "", {
           
            useUnifiedTopology: true ,
           
            useNewUrlParser: true
        });

        console.log("Successfull connected to the mongo atlas ! ");

    }catch (e){

        console.log({error: e});
    }

}