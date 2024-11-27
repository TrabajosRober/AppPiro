// routes/salesRoutes.js
const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');

router.post('/', salesController.createSale);
router.get('/', salesController.getSales);
router.delete('/:id', salesController.deleteSale); // Ruta para eliminar una venta por ID

module.exports = router;
