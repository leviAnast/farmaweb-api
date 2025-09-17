const enderecoService = require('../services/enderecoService.js');

class EnderecoController {
  async getAllEnderecos(req, res) {
    try {
      const enderecos = await enderecoService.getAllEnderecos();
      res.json(enderecos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getEnderecoById(req, res) {
    try {
      const endereco = await enderecoService.getEnderecoById(req.params.id);
      if (!endereco) return res.status(404).json({ message: 'Endereço não encontrado' });
      res.json(endereco);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createEndereco(req, res) {
    try {
      const endereco = await enderecoService.createEndereco(req.body);
      res.status(201).json(endereco);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateEndereco(req, res) {
    try {
      const endereco = await enderecoService.updateEndereco(req.params.id, req.body);
      res.json(endereco);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteEndereco(req, res) {
    try {
      await enderecoService.deleteEndereco(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new EnderecoController();
