const carrinhoService = require('../services/carrinhoService');

class CarrinhoController {
  async createCarrinho(req, res) {
    try {
      const carrinho = await carrinhoService.createCarrinho(req.body);
      res.status(201).json(carrinho);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao criar carrinho" });
    }
  }

  async getCarrinhoById(req, res) {
    try {
      const { id } = req.params;
      const carrinho = await carrinhoService.getCarrinhoById(id);
      res.json(carrinho);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao buscar carrinho" });
    }
  }

  async getCarrinhosByUsuario(req, res) {
    try {
      const { usuario_id } = req.params;
      const carrinhos = await carrinhoService.getCarrinhosByUsuario(usuario_id);
      res.json(carrinhos);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao buscar carrinhos do usuário" });
    }
  }

  async addItem(req, res) {
    try {
      const { id } = req.params; 
      const { produto_id, quantidade } = req.body;
      const item = await carrinhoService.addItem(id, produto_id, quantidade);
      res.json(item);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao adicionar item no carrinho" });
    }
  }

  async updateItem(req, res) {
    try {
      const { id } = req.params;
      const { produto_id, quantidade } = req.body;
      const item = await carrinhoService.updateItem(id, produto_id, quantidade);
      res.json(item);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao atualizar item no carrinho" });
    }
  }

  async removeItem(req, res) {
    try {
      const { id, produto_id } = req.params;
      await carrinhoService.removeItem(id, produto_id);
      res.status(204).send();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao remover item do carrinho" });
    }
  }

  async deleteCarrinho(req, res) {
    try {
      const { id } = req.params;
      await carrinhoService.deleteCarrinho(id);
      res.status(204).send();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao excluir carrinho" });
    }
  }

  async finalizarCarrinho(req, res) {
    try {
      const { id } = req.params;
      const carrinho = await carrinhoService.finalizarCarrinho(id);
      res.json(carrinho);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao finalizar carrinho" });
    }
  }
}

module.exports = new CarrinhoController();
