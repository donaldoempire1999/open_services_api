import { Router } from 'express';

import searchCtrl from '../controllers/search'

const router  = Router(); //Routeur

//Recherche en plein texte fulll
router.post('/faceted' ,  searchCtrl.search_faceted);

//Autocompletion
router.post('/autocomplete', searchCtrl.autocomplete_search);

export {router as searchRouter};
