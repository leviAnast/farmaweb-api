const prisma = require('../config/prismaClient');
const jwt = require('../config/jwtConfig');
const argon = require('argon2');

function sanitizeUser(user) {
  if (!user) return null;
  const { senha, hashedRefreshToken, ...safe } = user;
  return safe;
}

class AuthService {
  async cadastroCliente({ nome, email, password, telefone, endereco }) {
    if (!nome || !email || !password || !endereco) {
      throw new Error('Campos obrigatórios: nome, email, password e endereco');
    }
    const { rua, numero, bairro, cidade, estado, cep } = endereco || {};
    if (!rua || !numero || !bairro || !cidade || !estado || !cep) {
      throw new Error('Endereço incompleto: rua, numero, bairro, cidade, estado, cep são obrigatórios');
    }

    const hashedPassword = await argon.hash(password);

    try {
      const novoEndereco = await prisma.endereco.create({
        data: {
          rua,
          numero,
          complemento: endereco.complemento || null,
          bairro,
          cidade,
          estado,
          cep,
        },
      });

      const cliente = await prisma.cliente.create({
        data: {
          nome,
          email,
          senha: hashedPassword,
          telefone: telefone || null,
          endereco_id: novoEndereco.id,
          role: 'cliente',
        },
      });

      const accessToken = jwt.generateAccessToken({ id: cliente.id, role: 'cliente' });
      const refreshToken = jwt.generateRefreshToken({ id: cliente.id, role: 'cliente' });

      await prisma.cliente.update({
        where: { id: cliente.id },
        data: { hashedRefreshToken: await argon.hash(refreshToken) },
      });

      return { accessToken, refreshToken, user: sanitizeUser(cliente) };
    } catch (err) {
      if (err.code === 'P2002' && err.meta?.target?.includes('email')) {
        err.message = 'E-mail já cadastrado';
      }
      throw err;
    }
  }

  async cadastroVendedor({ nome, email, password, telefone }, adminUser) {
    if (!adminUser || adminUser.role !== 'admin') {
      throw new Error('Acesso negado');
    }
    if (!nome || !email || !password) {
      throw new Error('Campos obrigatórios: nome, email, password');
    }

    const hashedPassword = await argon.hash(password);

    try {
      const vendedor = await prisma.vendedor.create({
        data: {
          nome,
          email,
          senha: hashedPassword,
          telefone: telefone || null,
          role: 'vendedor',
        },
      });

      const accessToken = jwt.generateAccessToken({ id: vendedor.id, role: 'vendedor' });
      const refreshToken = jwt.generateRefreshToken({ id: vendedor.id, role: 'vendedor' });

      await prisma.vendedor.update({
        where: { id: vendedor.id },
        data: { hashedRefreshToken: await argon.hash(refreshToken) },
      });

      return { accessToken, refreshToken, user: sanitizeUser(vendedor) };
    } catch (err) {
      if (err.code === 'P2002' && err.meta?.target?.includes('email')) {
        err.message = 'E-mail já cadastrado';
      }
      throw err;
    }
  }

  async login({ email, password }) {
    if (!email || !password) {
      throw new Error('Informe email e password');
    }

    let user = await prisma.cliente.findUnique({ where: { email } });
    let role = 'cliente';

    if (!user) {
      user = await prisma.vendedor.findUnique({ where: { email } });
      if (user) role = 'vendedor';
    }

    if (!user) {
      user = await prisma.admin.findUnique({ where: { email } });
      if (user) role = 'admin';
    }

    if (!user) throw new Error('Email ou senha inválidos');

    const passwordValid = await argon.verify(user.senha, password);
    if (!passwordValid) throw new Error('Email ou senha inválidos');

    const accessToken = jwt.generateAccessToken({ id: user.id, role });
    const refreshToken = jwt.generateRefreshToken({ id: user.id, role });

    await this.updateRefreshToken(user.id, refreshToken, role);

    return { accessToken, refreshToken, user: sanitizeUser(user) };
  }

  async logout(userId, role) {
    const modelMap = { cliente: prisma.cliente, vendedor: prisma.vendedor, admin: prisma.admin };
    const model = modelMap[role];
    if (!model) throw new Error('Role inválida');

    await model.update({
      where: { id: userId },
      data: { hashedRefreshToken: null },
    });
    return { loggedOut: true };
  }

  async getNewTokens(userId, refreshToken, role) {
    if (!userId || !refreshToken || !role) {
      throw new Error('Informe userId, refreshToken e role');
    }

    const modelMap = { cliente: prisma.cliente, vendedor: prisma.vendedor, admin: prisma.admin };
    const model = modelMap[role];
    if (!model) throw new Error('Role inválida');

    const user = await model.findUnique({ where: { id: userId } });
    if (!user || !user.hashedRefreshToken) throw new Error('Acesso negado');

    try {
      jwt.verifyRefreshToken(refreshToken); 
    } catch {
      throw new Error('Refresh token inválido ou expirado');
    }

    const match = await argon.verify(user.hashedRefreshToken, refreshToken);
    if (!match) throw new Error('Acesso negado');

    const accessToken = jwt.generateAccessToken({ id: user.id, role });
    const newRefreshToken = jwt.generateRefreshToken({ id: user.id, role });

    await this.updateRefreshToken(user.id, newRefreshToken, role);

    return { accessToken, refreshToken: newRefreshToken, user: sanitizeUser(user) };
  }

  async updateRefreshToken(userId, refreshToken, role) {
    const hashed = await argon.hash(refreshToken);
    const modelMap = { cliente: prisma.cliente, vendedor: prisma.vendedor, admin: prisma.admin };
    const model = modelMap[role];
    if (!model) throw new Error('Role inválida');

    await model.update({
      where: { id: userId },
      data: { hashedRefreshToken: hashed },
    });
  }
}

module.exports = new AuthService();
