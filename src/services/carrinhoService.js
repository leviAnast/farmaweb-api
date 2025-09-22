const prisma = require('../config/prismaClient.js');

class CarrinhoService {
  async createCarrinho(data) {
    return prisma.carrinho.create({
      data: {
        data_criacao: data.data_criacao || new Date(),
        usuario: {
          connect: { id: Number(data.usuario_id) },
        },
      },
    });
  }

  async getCarrinhoById(id) {
    return prisma.carrinho.findUnique({
      where: { id: Number(id) },
      include: {
        itenscarrinho: {
          include: {
            produto: true, 
          },
        },
        usuario: true,
      },
    });
  }

  async getCarrinhosByUsuario(usuario_id) {
    return prisma.carrinho.findMany({
      where: { usuario_id: Number(usuario_id) },
      include: {
        itenscarrinho: {
          include: { produto: true },
        },
        usuario: true,
      },
    });
  }

  async deleteCarrinho(id) {
    return prisma.carrinho.delete({
      where: { id: Number(id) },
    });
  }
}

module.exports = new CarrinhoService();
