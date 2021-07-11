const express = require('express');
const bodyParser = require('body-parser');

//Application express
const app = express();

//Port 
const port = process.env.PORT || 3000;

app.use(bodyParser.json())

app.get('/' , (req, res) => {

    res.send("Hello World!");

});

app.listen(port , () => console.log(`Your are listenning on port ${port}`));

module.exports = app;