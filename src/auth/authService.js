const prisma = require('../config/prismaClient');
const jwt = require('../config/jwtConfig');
const argon = require('argon2');

class AuthService {

  async cadastroCliente({ name, email, password, telefone, endereco }) {
    const hashedPassword = await argon.hash(password);
    const novoEndereco = await prisma.endereco.create({ data: endereco });

    const cliente = await prisma.cliente.create({
      data: {
        nome: name,
        email,
        senha: hashedPassword,
        telefone,
        endereco_id: novoEndereco.id
      }
    });

    const accessToken = jwt.generateAccessToken({ id: cliente.id, role: 'cliente' });
    const refreshToken = jwt.generateRefreshToken({ id: cliente.id, role: 'cliente' });

    await prisma.cliente.update({
      where: { id: cliente.id },
      data: { hashedRefreshToken: await argon.hash(refreshToken) }
    });

    return { accessToken, refreshToken, user: cliente };
  }

  async cadastroVendedor({ name, email, password, telefone }, adminUser) {
    if (adminUser.role !== 'admin') throw new Error('Acesso negado');

    const hashedPassword = await argon.hash(password);
    const vendedor = await prisma.vendedor.create({
      data: { nome: name, email, senha: hashedPassword, telefone }
    });

    const accessToken = jwt.generateAccessToken({ id: vendedor.id, role: 'vendedor' });
    const refreshToken = jwt.generateRefreshToken({ id: vendedor.id, role: 'vendedor' });

    await prisma.vendedor.update({
      where: { id: vendedor.id },
      data: { hashedRefreshToken: await argon.hash(refreshToken) }
    });

    return { accessToken, refreshToken, user: vendedor };
  }

  async login({ email, password, role }) {
    let user;
    if (role === 'cliente') user = await prisma.cliente.findUnique({ where: { email } });
    if (role === 'vendedor') user = await prisma.vendedor.findUnique({ where: { email } });
    if (role === 'admin') user = await prisma.admin.findUnique({ where: { email } });

    if (!user) throw new Error('Acesso negado');

    const passwordValid = await argon.verify(user.senha, password);
    if (!passwordValid) throw new Error('Acesso negado');

    const accessToken = jwt.generateAccessToken({ id: user.id, role });
    const refreshToken = jwt.generateRefreshToken({ id: user.id, role });

    await this.updateRefreshToken(user.id, refreshToken, role);

    return { accessToken, refreshToken, user };
  }

  async logout(userId, role) {
    const modelMap = { cliente: prisma.cliente, vendedor: prisma.vendedor, admin: prisma.admin };
    await modelMap[role].updateMany({
      where: { id: userId, hashedRefreshToken: { not: null } },
      data: { hashedRefreshToken: null }
    });
    return { loggedOut: true };
  }

  async getNewTokens(userId, refreshToken, role) {
    const modelMap = { cliente: prisma.cliente, vendedor: prisma.vendedor, admin: prisma.admin };
    const user = await modelMap[role].findUnique({ where: { id: userId } });
    if (!user || !user.hashedRefreshToken) throw new Error('Acesso negado');

    const match = await argon.verify(user.hashedRefreshToken, refreshToken);
    if (!match) throw new Error('Acesso negado');

    const accessToken = jwt.generateAccessToken({ id: user.id, role });
    const newRefreshToken = jwt.generateRefreshToken({ id: user.id, role });

    await this.updateRefreshToken(user.id, newRefreshToken, role);

    return { accessToken, refreshToken: newRefreshToken, user };
  }

  async updateRefreshToken(userId, refreshToken, role) {
    const hashed = await argon.hash(refreshToken);
    const modelMap = { cliente: prisma.cliente, vendedor: prisma.vendedor, admin: prisma.admin };
    await modelMap[role].update({ where: { id: userId }, data: { hashedRefreshToken: hashed } });
  }
}

module.exports = new AuthService();
