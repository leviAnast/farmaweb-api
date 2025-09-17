const categoriasService = require('../services/categoriaService');

class CategoriasController {
  async getAll(req, res) {
    try {
      const categorias = await categoriasService.getAllCategorias();
      res.json(categorias);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
    async getById(req, res) {       
    try {
        const categoria = await categoriasService.getCategoriaById(req.params.id);
        if (!categoria) return res.status(404).json({ message: "Categoria não encontrada" });
        res.json(categoria);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }       
    }
    async create(req, res) {
    try {
        const categoria = await categoriasService.createCategoria(req.body);
        res.status(201).json(categoria);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }       
    }
    async update(req, res) {
    try {
        const categoria = await categoriasService.updateCategoria(req.params.id, req.body);
        res.json(categoria);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }       
    }
    async delete(req, res) {
    try {
        await categoriasService.deleteCategoria(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }       
    }
}

module.exports = new CategoriasController();    
