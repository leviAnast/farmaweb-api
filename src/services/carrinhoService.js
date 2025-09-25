const prisma = require('../config/prismaClient.js');

class CarrinhoService {
  async createCarrinho(data) {
    return prisma.carrinho.create({
      data: {
        data_criacao: data.data_criacao || new Date(),
        usuario: { connect: { id: Number(data.usuario_id) } },
      },
    });
  }

  async getCarrinhoById(id) {
    return prisma.carrinho.findUnique({
      where: { id: Number(id) },
      include: {
        itenscarrinho: { include: { produto: true } },
        usuario: true,
      },
    });
  }

  async getCarrinhosByUsuario(usuario_id) {
    return prisma.carrinho.findMany({
      where: { usuario_id: Number(usuario_id) },
      include: {
        itenscarrinho: { include: { produto: true } },
        usuario: true,
      },
    });
  }

  async addItem(carrinhoId, produtoId, quantidade) {
    const itemExistente = await prisma.itensCarrinho.findFirst({
      where: {
        carrinho_id: Number(carrinhoId),
        produto_id: Number(produtoId),
      },
    });

    if (itemExistente) {
      return prisma.itensCarrinho.update({
        where: { id: itemExistente.id },
        data: { quantidade: itemExistente.quantidade + quantidade },
      });
    } else {
      return prisma.itensCarrinho.create({
        data: {
          carrinho_id: Number(carrinhoId),
          produto_id: Number(produtoId),
          quantidade,
        },
      });
    }
  }

  async updateItem(carrinhoId, produtoId, quantidade) {
    return prisma.itensCarrinho.updateMany({
      where: {
        carrinho_id: Number(carrinhoId),
        produto_id: Number(produtoId),
      },
      data: { quantidade },
    });
  }

  async removeItem(carrinhoId, produtoId) {
    return prisma.itensCarrinho.deleteMany({
      where: {
        carrinho_id: Number(carrinhoId),
        produto_id: Number(produtoId),
      },
    });
  }

  async deleteCarrinho(id) {
    return prisma.carrinho.delete({
      where: { id: Number(id) },
    });
  }

  async finalizarCarrinho(id) {
    return prisma.carrinho.update({
      where: { id: Number(id) },
      data: { finalizado: true },
      include: {
        itenscarrinho: { include: { produto: true } },
      },
    });
  }
}

module.exports = new CarrinhoService();
