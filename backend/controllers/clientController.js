const Client = require('../models/Client'); // Asegúrate de que este sea el modelo correcto

// El controlador debe crear clientes, no productos
exports.createClient = async (req, res) => {
    console.log("Solicitud de creación de cliente recibida:", req.body);
    try {
        const { name, email } = req.body;
        if (!name || !email) {
            return res.status(400).json({ error: 'El nombre y el correo electrónico son obligatorios' });
        }
        const client = new Client(req.body);
        await client.save();
        res.status(201).json(client);
    } catch (error) {
        console.error('Error al crear el cliente:', error);
        res.status(500).json({ error: 'Error al crear el cliente' });
    }
};

exports.getClients = async (req, res) => {
    try {
        const clients = await Client.find();
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener clientes' });
    }
};

// Controlador para actualizar el cliente
exports.updateClient = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedClient = await Client.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedClient) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        res.json(updatedClient);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el cliente' });
    }
};

// Controlador para eliminar un cliente
exports.deleteClient = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedClient = await Client.findByIdAndDelete(id);
        if (!deletedClient) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        res.json({ message: 'Cliente eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el cliente' });
    }
};