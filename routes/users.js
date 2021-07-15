const express = require('express');
const auth = require('../midllewares/auth')

let router = express.Router();

const usersControllers = require('../controllers/users');

//S'inscrire
router.post('/signup' , usersControllers.signup);

//Se connecter
router.post('/login' , usersControllers.login);

//Get All Users
router.get('/all' , auth,  usersControllers.getAllUsers);

//get User info
router.get('/' , auth,  usersControllers.getAllAboutUser);


//Supprimer un utilisateur
router.delete('/:id');

//Mise à jour sur les coordonnées d'un utilisateur
router.put('/:id')

module.exports = router;
