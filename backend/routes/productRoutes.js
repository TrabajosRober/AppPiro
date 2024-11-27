const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Ruta para obtener productos de una tabla específica

router.get('/:table', productController.getProducts);

// Ruta para crear un producto en una tabla específica
router.post('/:table', productController.createProduct);

// Ruta para actualizar un producto en una tabla específica
router.put('/:table/:id', productController.updateProduct);

// Ruta para eliminar un producto de una tabla específica
router.delete('/:table/:id', productController.deleteProduct);


module.exports = router;
