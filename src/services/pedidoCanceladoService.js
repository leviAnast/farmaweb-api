const prisma = require('../config/prismaClient.js');

class PedidoCanceladoService {
  async criarPedidoCancelado(data) {
    return prisma.pedidoCancelado.create({
      data: {
        motivo: data.motivo,
        data_cancelamento: new Date(),
        pedido: { connect: { id: Number(data.pedido_id) } },
      },
      include: {
        pedido: {
          include: {
            itenspedido: {
              include: {
                produto: {
                  select: {
                    id: true,
                    nome: true,
                    preco: true,
                    imagemPrincipal: true,
                  },
                },
              },
            },
            usuario: true,
            endereco: true,
          },
        },
      },
    });
  }

  async getPedidoCanceladoById(id) {
    return prisma.pedidoCancelado.findUnique({
      where: { id: Number(id) },
      include: {
        pedido: {
          include: {
            itenspedido: {
              include: {
                produto: {
                  select: {
                    id: true,
                    nome: true,
                    preco: true,
                    imagemPrincipal: true,
                  },
                },
              },
            },
            usuario: true,
            endereco: true,
          },
        },
      },
    });
  }

  async getPedidoCanceladoByPedido(pedidoId) {
    return prisma.pedidoCancelado.findMany({
      where: { pedido_id: Number(pedidoId) },
      include: {
        pedido: {
          include: {
            itenspedido: {
              include: {
                produto: {
                  select: {
                    id: true,
                    nome: true,
                    preco: true,
                    imagemPrincipal: true,
                  },
                },
              },
            },
            usuario: true,
            endereco: true,
          },
        },
      },
      orderBy: { data_cancelamento: "desc" },
    });
  }

  async atualizarPedidoCancelado(id, data) {
    return prisma.pedidoCancelado.update({
      where: { id: Number(id) },
      data: {
        motivo: data.motivo,
      },
      include: {
        pedido: {
          include: {
            itenspedido: {
              include: {
                produto: {
                  select: {
                    id: true,
                    nome: true,
                    preco: true,
                    imagemPrincipal: true,
                  },
                },
              },
            },
            usuario: true,
            endereco: true,
          },
        },
      },
    });
  }

  async deletarPedidoCancelado(id) {
    return prisma.pedidoCancelado.delete({
      where: { id: Number(id) },
    });
  }
}

module.exports = new PedidoCanceladoService();
