import { Router } from 'express';

import auth from '../midllewares/auth'

import publicationsCtrl from '../controllers/publications'

const router  = Router(); //Routeur

//Lister toutes les publications
router.get('/all' ,  publicationsCtrl.get_publications);


/******  Il Faut être connecté pour pouvoir accomplir ces fonctionnalitées ********/


//Lister les publications de l'utilisateur courant
router.get('/' , auth,   publicationsCtrl.get_publications_for_current_user);

//Afficher une publication particulière
router.get('/:id_pub' , auth,   publicationsCtrl.get_publication_for_current_user);

//Afficher une publication particulière pour un id
router.get('/get/:id_pub' , auth,   publicationsCtrl.get_publication_by_id);



//Creer une publication
router.post('/' , auth,  publicationsCtrl.create_publication);

//Supprimer une publication
router.delete('/:id_pub' , auth,  publicationsCtrl.delete_publication);

//Mise à jour d'une publication
router.put('/:id_pub', auth,  publicationsCtrl.update_publication);


export {router as publicationsRouter};
