const express = require('express');

//Application express
const app = express();

//Port 
const port = 3000||process.env.PORT;

app.get('/' , (req, res) => {

    res.send('Hello word');

});

app.listen(port , () => console.log(`Your are listenning on port ${port}`));

module.exports = app;