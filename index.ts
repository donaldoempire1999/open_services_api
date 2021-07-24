import express, { Request ,Response } from 'express';

import { usersRouter } from './src/routes/users';

import { publicationsRouter } from './src/routes/publications';

import {searchRouter} from "./src/routes/search";

import {contractsRouter} from "./src/routes/contracts";

import dotenv from 'dotenv';

dotenv.config({path: __dirname + '/.env'});

import {connect_db} from './src/helpers/connect';


//Application express
export const app = express();

//Port
const port:number|string = process.env.PORT || 3000;

app.listen(port , () => { 

     console.log(`Your are listenning on port ${port}`);

     //Connection to mongo Atlas
     connect_db();

    
});



app.use((req: Request, res:Response, next:Function) => {
   
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

//Parse request body
app.use(express.json());

//Encode req body 
app.use(express.urlencoded({extended: true}));

//Handle get
app.get('/' , (req, res) => {

    res.send({
        title: "Bienvenue sur open-service-api",
        activity: "In dev", 
        author:'DonaldoEmpire1999' 
    });

});

//Route for users
app.use('/users' , usersRouter);

// Route for publications
app.use('/publications' , publicationsRouter);

// Route for search
app.use('/search' , searchRouter);

// Route for contracts
app.use('/contracts', contractsRouter);

//Route for any routes found
app.use((req ,res ) => {

    res.status(404).json({
        title: "Not Found",
        message: "The service is not found , check well your url"
    });

});