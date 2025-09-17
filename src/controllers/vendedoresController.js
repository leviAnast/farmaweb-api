const vendedoresService = require('../services/vendedoresService');
class VendedoresController {
    async getAll(req, res) {
        try {
            const vendedores = await vendedoresService.getAllVendedores();
            res.json(vendedores);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const vendedor = await vendedoresService.getVendedorById(req.params.id);
            if (!vendedor)
                return res.status(404).json({ message: "Vendedor não encontrado" });   
            res.json(vendedor);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }           
    }
    async create(req, res) {
        try {
            const vendedor = await vendedoresService.createVendedor(req.body);
            res.status(201).json(vendedor);
        }       
        catch (error) {
            res.status(500).json({ error: error.message });
        }   
    }
    async update(req, res) {
        try {
            const vendedor = await vendedoresService.updateVendedor(req.params.id, req.body);
            res.json(vendedor);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async delete(req, res) {
        try {
            await vendedoresService.deleteVendedor(req.params.id);  
            res.status(204).send();
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}   
module.exports = new VendedoresController();
