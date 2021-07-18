import express from 'express';

import { usersRouter} from './routes/users'

import dotenv from 'dotenv';

dotenv.config({path: __dirname + '/.env'})

import { connect_db } from './db/connect';


//Application express
export const app = express();

//Port
const port = process.env.PORT || 3000;

app.listen(port , () => console.log(`Your are listenning on port ${port}`));



app. use(function(req, res, next) {
    res. header("Access-Control-Allow-Origin", "*");
    res. header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Parse request body
app.use(express.json());

app.use(express.urlencoded({extended: true}));


//Connection to mongo Atlas
connect_db();


//Handke get
app.get('/' , (req, res) => {

    res.send({
        title: "Bienvenue sur open-service-api" , 
    });

});

app.use('/users' , usersRouter);

app.use((req ,res ) => {

    res.status(404).json({
        title: "Not Found",
        message: "The service is not found"
    });

});