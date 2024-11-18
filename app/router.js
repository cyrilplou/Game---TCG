import {Router} from 'express';
export const router = Router();
// J'importe mes controllers.
import mainController  from './controllers/mainControllers.js';
import launchgameController  from './controllers/launchgameController.js';

// Pages statiques
router.get('/', mainController.renderHome);
router.get('/lore', mainController.renderLorePage)
router.get('/plateau', mainController.renderPlateauPage)
router.get('/citees', mainController.renderCiteePage)

// Pages modification cartes
router.get('/cartes', mainController.renderCardsPage)
router.get('/cartes/name', mainController.renderCardsFilter)
router.get('/cartes/:id', mainController.renderCardsEdit)
// Pour une carte
router.post('/', mainController.addOneCard)
router.post('/cartes/edit/:id', mainController.editOneCard)
router.get('/delete/:id', mainController.DeleteOneCard)

// Pages du jeu

router.get('/start', launchgameController.renderStartPage)
router.get('/startHand',launchgameController.startGame)
router.get('/pick', launchgameController.pickCard)