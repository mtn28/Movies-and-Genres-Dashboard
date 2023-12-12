const express = require('express');
const router = express.Router();
//importer os controladores [2]
const generosController = require('../controllers/generosController')

router.get('/',generosController.generos_list);

router.get('/:id',generosController.generos_detail);

router.post('/create',generosController.generos_create);

router.put('/update/:id',generosController.generos_update);

router.post('/delete', generosController.delete);

module.exports = router;
