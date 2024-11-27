const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController'); // Asegúrate de que apunta a clientController

router.post('/', clientController.createClient); // Asegúrate de que estás llamando al método correcto aquí
router.get('/', clientController.getClients);
router.put('/:id', clientController.updateClient);
router.delete('/:id', clientController.deleteClient);

module.exports = router;
