const Sale = require('../models/Sale');
const Product = require('../models/Product');
const Client = require('../models/Client'); // Asegúrate de importar el modelo de cliente

// Crear una venta
exports.createSale = async (req, res) => {
    try {
        const { clientId, cart } = req.body;

        // Validar que el carrito no esté vacío y que sea un arreglo
        if (!Array.isArray(cart) || cart.length === 0) {
            return res.status(400).json({ message: "El carrito está vacío o no es un arreglo válido." });
        }

        // Validar cliente
        const clientExists = await Client.findById(clientId);
        if (!clientExists) {
            return res.status(404).json({ message: "El cliente no existe." });
        }

        // Validar productos en el carrito
        for (let item of cart) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(404).json({ message: `El producto con ID ${item.productId} no existe.` });
            }

            if (item.quantity > product.stock) {
                return res.status(400).json({
                    message: `El stock del producto ${product.name} es insuficiente (Disponible: ${product.stock}).`
                });
            }

            // Actualizar el stock del producto
            //product.stock -= item.quantity;
            //await product.save();

            // Calcular el precio total del item con el descuento
            const discountedPrice = product.price - (product.price * (item.discount || 0)) / 100;
            item.totalPrice = discountedPrice * item.quantity;  // Calcular el total para este producto con descuento
        }

        // Calcular el total de la venta considerando los descuentos de cada producto
        const totalAmount = cart.reduce((acc, item) => acc + item.totalPrice, 0);

        // Crear una nueva venta
        const sale = new Sale({
            items: cart,
            clientId,
            totalAmount,
            date: new Date(),
        });

        console.log("Creando venta con los siguientes datos:", {
            items: cart,
            clientId,
            totalAmount,
            date: new Date(),
        });

        // Intentar guardar la venta
        await sale.save();
        res.status(201).json(sale);  // Venta creada con éxito
    } catch (error) {
        console.error("Error al procesar la venta:", error.message);
        res.status(500).json({ message: "Error interno al procesar la venta", error: error.message });
    }
};


// Obtener todas las ventas
exports.getSales = async (req, res) => {
    try {
        const sales = await Sale.find()
            .populate('clientId', 'name')  // Popula el nombre del cliente
            .exec();

        console.log(sales); // Para depurar y ver las ventas obtenidas
        
        res.status(200).json(sales);
    } catch (error) {
        console.error("Error al obtener las ventas:", error);
        res.status(500).json({ message: 'Error al obtener las ventas', error });
    }
};

// Eliminar una venta
exports.deleteSale = async (req, res) => {
    try {
        const { id } = req.params;
        await Sale.findByIdAndDelete(id); // Elimina la venta por ID
        res.status(200).json({ message: 'Venta eliminada con éxito' });
    } catch (error) {
        console.error("Error al eliminar la venta:", error);
        res.status(500).json({ message: 'Error al eliminar la venta', error });
    }
};
