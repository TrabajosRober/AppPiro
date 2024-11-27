const Product = require('../models/Product');

// Obtener productos de una tabla específica
exports.getProducts = async (req, res) => {
    const { table } = req.params; // Extraer el nombre de la tabla de los parámetros

    try {
        const products = await Product.find({ table }); // Filtrar productos por la tabla

        if (!products.length) {
            return res.status(404).json({ message: `No se encontraron productos para la tabla: ${table}` });
        }

        res.json(products); // Enviar los productos al cliente
    } catch (err) {
        console.error("Error al obtener productos:", err);
        res.status(500).json({ message: "Error interno al obtener productos", error: err });
    }
};



exports.getProductsByTable = async (req, res) => {
    const { table } = req.query;

    try {
        if (!table) {
            return res.status(400).json({ message: "La tabla es requerida." });
        }

        const products = await Product.find({ table });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener productos.", error });
    }
};

// Crear un nuevo producto en una tabla específica
exports.createProduct = async (req, res) => {
    console.log('Solicitud recibida:', req.body);  // Verifica que la solicitud llegue
    const { table } = req.params;  // Obtiene el "table" de los parámetros
    const { name, price, stock } = req.body;  // Obtiene los datos del producto del cuerpo de la solicitud
    
    // Crea una nueva instancia del producto
    const newProduct = new Product({
        name,
        price,
        stock,
        table  // Asocia el producto con la tabla correspondiente
    });

    try {
        // Guarda el producto en la base de datos
        const savedProduct = await newProduct.save();
        res.json(savedProduct);  // Devuelve el producto guardado como respuesta
    } catch (err) {
        res.status(500).json({ message: "Error al crear producto", error: err });
    }
};

// Actualizar un producto en una tabla específica
exports.updateProduct = async (req, res) => {
    const { table, id } = req.params;  // Obtiene el "table" y "id" de los parámetros
    const { name, price, stock } = req.body;  // Obtiene los datos actualizados del cuerpo de la solicitud
    
    try {
        // Actualiza el producto con el id especificado y la tabla correspondiente
        const updatedProduct = await Product.findOneAndUpdate(
            { _id: id, table },  // Filtra por "id" y "table"
            { name, price, stock },  // Actualiza estos campos
            { new: true }  // Devuelve el producto actualizado
        );
        res.json(updatedProduct);  // Devuelve el producto actualizado como respuesta
    } catch (err) {
        res.status(500).json({ message: "Error al actualizar producto", error: err });
    }
};

// Eliminar un producto de una tabla específica
exports.deleteProduct = async (req, res) => {
    const { table, id } = req.params;  // Obtiene el "table" y "id" de los parámetros
    
    try {
        // Elimina el producto con el id especificado y la tabla correspondiente
        const deletedProduct = await Product.findOneAndDelete({ _id: id, table });
        res.json(deletedProduct);  // Devuelve el producto eliminado como respuesta
    } catch (err) {
        res.status(500).json({ message: "Error al eliminar producto", error: err });
    }
};
