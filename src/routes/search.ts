import { Router } from 'express';

import searchCtrl from '../controllers/search'

const router  = Router(); //Routeur

//Recherche en plein texte fulll
router.post('/full' ,  searchCtrl.simple_search);

//Autocompletion
router.post('/autocomplete', searchCtrl.autocomplete_search);

// Recherche en facette
router.post('/faceted' , searchCtrl.search_faceted);

export {router as searchRouter};
