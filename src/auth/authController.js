const authService = require('./authService');

class AuthController {
  async cadastroCliente(req, res) {
    try {
      const result = await authService.cadastroCliente(req.body);
      res.json(result);
    } catch (err) {
      const status = err.code === 'P2002' ? 409 : 400;
      res.status(status).json({ error: err.message });
    }
  }

  async cadastroVendedor(req, res) {
    try {
      const result = await authService.cadastroVendedor(req.body, req.user);
      res.json(result);
    } catch (err) {
      const status = err.code === 'P2002' ? 409 : 400;
      res.status(status).json({ error: err.message });
    }
  }

  async login(req, res) {
    try {
      const result = await authService.login(req.body);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async logout(req, res) {
    try {
      const result = await authService.logout(req.user.id, req.user.role);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async refresh(req, res) {
    try {
      const { userId, refreshToken, role } = req.body;
      const result = await authService.getNewTokens(userId, refreshToken, role);
      res.json(result);
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  }
}

module.exports = new AuthController();
