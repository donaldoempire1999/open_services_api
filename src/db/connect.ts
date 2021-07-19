import { connect } from 'mongoose'

export const connect_db = async () => {

    try{

        await connect(process.env.URI || "", {
           
            useUnifiedTopology: true ,
           
            useNewUrlParser: true
        });

    }catch (e){

        console.log({error: e});
    }

}