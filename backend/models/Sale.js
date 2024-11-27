// models/Sale.js
const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',  // Asegúrate de que esté correctamente relacionado con el modelo Client
        required: true
    },
    items: [{ 
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, 
        name: String, 
        quantity: Number, 
        totalPrice: Number 
    }],
    totalAmount: Number,
    date: Date
});

module.exports = mongoose.model('Sale', saleSchema);
