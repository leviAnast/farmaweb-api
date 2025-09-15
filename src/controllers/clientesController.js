const clientesService = require('../services/clientesService');

class ClientesController {
  async getAll(req, res) {
    try {
      const clientes = await clientesService.getAllClientes();
      res.json(clientes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const cliente = await clientesService.getClienteById(req.params.id);
      if (!cliente) return res.status(404).json({ message: "Cliente não encontrado" });
      res.json(cliente);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const cliente = await clientesService.createCliente(req.body);
      res.status(201).json(cliente);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const cliente = await clientesService.updateCliente(req.params.id, req.body);
      res.json(cliente);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      await clientesService.deleteCliente(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ClientesController();
