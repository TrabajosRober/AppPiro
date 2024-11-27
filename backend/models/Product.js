const mongoose = require('mongoose');

// Define el esquema de los productos
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    table: { type: String, required: true }  // Este campo determina en qué "tabla" está el producto
});

// Crea un modelo de producto
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
