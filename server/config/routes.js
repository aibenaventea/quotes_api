const { Router } = require('express');
const controller = require('../controllers/authors');

const router = Router();

router.post('/authors', controller.authorsPost);
router.get('/authors', controller.authorsGet);
router.get('/authors/:id', controller.authorGet);
router.put('/authors/:id', controller.authorsPut);
router.delete('/authors/:id', controller.authorsDelete);

router.post('/quotes/:id', controller.quotesPost);
router.put('/quotes/:quoteId', controller.quotesPut);
router.delete('/quotes/:id/:quoteId', controller.quotesDelete);

module.exports = router;