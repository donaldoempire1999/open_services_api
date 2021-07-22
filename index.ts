import express, { Request ,Response } from 'express';

import { usersRouter } from './src/routes/users'

import { publicationsRouter } from './src/routes/publications'

import {searchRouter} from "./src/routes/search"


import dotenv from 'dotenv';

dotenv.config({path: __dirname + '/.env'})

import {connect_db_model} from './src/helpers/connect';


//Application express
export const app = express();

//Port
const port:number|string = process.env.PORT || 3000;

app.listen(port , () => { 

     console.log(`Your are listenning on port ${port}`)

     //Connection to mongo Atlas pour model
     connect_db_model();

    
});

app.use((req: Request, res:Response, next:Function) => {
   
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Parse request body
app.use(express.json());

//Encode req body 
app.use(express.urlencoded({extended: true}));

//Handke get
app.get('/' , (req, res) => {

    res.send({
        title: "Bienvenue sur open-service-api" , 
    });

});

app.use('/users' , usersRouter);

app.use('/publications' , publicationsRouter);

app.use('/search' , searchRouter);



app.use((req ,res ) => {

    res.status(404).json({
        title: "Not Found",
        message: "The service is not found"
    });

});