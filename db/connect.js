const mongoose = require('mongoose');

let connect_db =  async () => {

    console.log(process.env.URI);

    try{

        await mongoose.connect(process.env.URI , {
            useUnifiedTopology: true ,
            useNewUrlParser: true
        });

    }catch (e){

        console.log({error: e});
    }

}

module.exports = connect_db;
