import { Router } from 'express';

import auth from '../midllewares/auth'

import contractsCtrl from '../controllers/contract'

const router  = Router(); //Routeur

//Lister tout les contrats de l'application
router.get('/all');


/******  Il Faut être connecté pour pouvoir accomplir ces fonctionnalitées ********/

//Lister les constrats de l'utilisateur courant
router.get('/' , auth, contractsCtrl.get_contracts);

//Afficher un contrat parti culier
router.get('/:id_contr' , auth ,  contractsCtrl.get_contract);

//Supprimer un contrat
router.delete('/:id_contr' , auth , contractsCtrl.delete_contract);

//Mise à jour d'un contrat
router.put('/:id_contr', auth, contractsCtrl.update_contract);


export {router as contractsRouter};
