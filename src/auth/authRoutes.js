const express = require('express');
const router = express.Router();
const authController = require('../auth/authController');
const { authenticate, authorizeRoles } = require('../auth/authMiddleware');


router.post('/cadastro-cliente', authController.cadastroCliente);
router.post('/login', authController.login);
router.post('/logout', authenticate, authController.logout);
router.post('/refresh', authController.refresh);

router.post('/cadastro-vendedor', authenticate, authorizeRoles('admin'), authController.cadastroVendedor);

module.exports = router;
