const produtoService = require('../services/produtoService.js');

class ProdutoController {
  async getAllProdutos(req, res) {
    try {
      const produtos = await produtoService.getAllProdutos();
      res.json(produtos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getProdutoById(req, res) {
    try {
      const produto = await produtoService.getProdutoById(req.params.id);
      if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });
      res.json(produto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createProduto(req, res) {
    try {
      const produto = await produtoService.createProduto(req.body);
      res.status(201).json(produto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateProduto(req, res) {
    try {
      const produto = await produtoService.updateProduto(req.params.id, req.body);
      res.json(produto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteProduto(req, res) {
    try {
      await produtoService.deleteProduto(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ProdutoController();