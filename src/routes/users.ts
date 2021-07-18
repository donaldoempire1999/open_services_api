import { Router } from 'express';

import usersCtrl from '../controllers/users'

const router  = Router(); //Routeur

//S'inscrire
router.post('/signup' , usersCtrl.signup);

//Se connecter
router.post('/login' , usersCtrl.login);

//Get All Users
router.get('/' ,  usersCtrl.get_users);

//get User info
router.get('/:_id' , usersCtrl.get_user);

//Supprimer un utilisateur
router.delete('/:_id');

//Mise à jour sur les coordonnées d'un utilisateur
router.put('/:_id');

export {router as usersRouter};
