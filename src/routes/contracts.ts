import { Router } from 'express';

import auth from '../midllewares/auth'

import constractsCtrl from '../controllers/contract'

const router  = Router(); //Routeur

//Lister toutes les publications
router.get('/all');


/******  Il Faut être connecté pour pouvoir accomplir ces fonctionnalitées ********/


//Lister les publications de l'utilisateur courant
router.get('/' , auth);

//Afficher une publication particulière
router.get('/:id_pub' , auth);

//Creer une publication
router.post('/' , auth);

//Supprimer une publication
router.delete('/:id_pub' , auth);

//Mise à jour d'une publication
router.put('/:id_pub', auth);


export {router as contractsRouter};
