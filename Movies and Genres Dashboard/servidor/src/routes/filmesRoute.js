const express = require('express');
const router = express.Router();
//importer os controladores [2]

const filmesController = require('../controllers/filmesController')

router.get('/',filmesController.filmes_list);

router.get('/:id',filmesController.filmes_detail);

router.post('/create',filmesController.filmes_create);

router.put('/update/:id',filmesController.filmes_update);

router.post('/delete', filmesController.delete);

module.exports = router;
