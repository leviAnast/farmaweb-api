const prisma = require('../config/prismaClient.js');

class CartaoService {
  async createCartao(data) {
    const { nome_cartao, vencimento, numero, cvv, cliente_id } = data;

    if (!nome_cartao || !vencimento || !numero || !cvv || !cliente_id) {
      throw new Error("Todos os campos são obrigatórios.");
    }

    return prisma.cartao_de_credito.create({
      data: {
        nome_cartao,
        vencimento,
        numero,
        cvv,
        cliente_id: Number(cliente_id),
      },
    });
  }

  async getCartaoById(id) {
    return prisma.cartao_de_credito.findUnique({
      where: { id: Number(id) },
      include: { cliente: true },
    });
  }

  async getCartoesByCliente(cliente_id) {
    return prisma.cartao_de_credito.findMany({
      where: { cliente_id: Number(cliente_id) },
      include: { cliente: true },
    });
  }

  async updateCartao(id, data) {
    const { nome_cartao, vencimento, numero, cvv } = data;

    return prisma.cartao_de_credito.update({
      where: { id: Number(id) },
      data: {
        nome_cartao,
        vencimento,
        numero,
        cvv,
      },
    });
  }

  async deleteCartao(id) {
    return prisma.cartao_de_credito.delete({
      where: { id: Number(id) },
    });
  }
}

module.exports = new CartaoService();
