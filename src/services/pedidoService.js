const prisma = require('../config/prismaClient.js');

class PedidoService {
  async createPedido(data) {
    const { usuario_id, endereco_entrega_id, itens, forma_pagamento } = data;

    return prisma.pedido.create({
      data: {
        usuario_id: Number(usuario_id),
        endereco_entrega_id: Number(endereco_entrega_id),
        status: "em processamento",
        total: itens.reduce(
          (soma, it) => soma + it.quantidade * it.preco_unitario,
          0
        ),
        forma_pagamento,
        itenspedido: {
          create: itens.map((it) => ({
            produto_id: Number(it.produto_id),
            quantidade: it.quantidade,
            preco_unitario: it.preco_unitario,
          })),
        },
      },
      include: {
        itenspedido: {
          include: { produto: true },
        },
        endereco: true,
      },
    });
  }

  async getPedidoById(id) {
    return prisma.pedido.findUnique({
      where: { id: Number(id) },
      include: {
        itenspedido: {
          include: { produto: true },
        },
        endereco: true,
      },
    });
  }

  async getPedidosByUsuario(usuario_id) {
    return prisma.pedido.findMany({
      where: { usuario_id: Number(usuario_id) },
      include: {
        itenspedido: {
          include: { produto: true },
        },
        endereco: true,
      },
      orderBy: { data_pedido: "desc" },
    });
  }

  async updatePedido(id, data) {
    return prisma.pedido.update({
      where: { id: Number(id) },
      data,
      include: {
        itenspedido: {
          include: { produto: true },
        },
        endereco: true,
      },
    });
  }

  async deletePedido(id) {
    return prisma.pedido.delete({
      where: { id: Number(id) },
    });
  }

  async cancelarPedido(id) {
    return prisma.pedido.update({
      where: { id: Number(id) },
      data: { status: "cancelado" },
      include: {
        itenspedido: { include: { produto: true } },
        endereco: true,
      },
    });
  }
}

module.exports = new PedidoService();
