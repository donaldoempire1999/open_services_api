import { Router } from 'express';

import auth from '../midllewares/auth'

import contractsCtrl from '../controllers/contract'

const router  = Router(); //Routeur

//Lister tout les contrats de l'application
router.get('/all');


/******  Il Faut être connecté pour pouvoir accomplir ces fonctionnalitées ********/


//Lister les constrats de l'utilisateur courant
router.get('/' , auth, contractsCtrl.get_contracts);

//Afficher une publication particulière
router.get('/:id_contr' , auth ,  contractsCtrl.get_contract);

//Supprimer une publication
router.delete('/:id_contr' , auth , contractsCtrl.delete_contract);

//Mise à jour d'une publication
router.put('/:id_pub', auth);


export {router as contractsRouter};
