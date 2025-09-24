const prisma = require('../config/prismaClient.js');

class ItemPedidoService {
  async addItemPedido(data) {
    return prisma.$transaction(async (tx) => {
      const produto = await tx.produto.findUnique({
        where: { id: Number(data.produto_id) },
      });

      if (!produto) {
        throw new Error('Produto não encontrado');
      }

      if (produto.qtd_estoque < data.quantidade) {
        throw new Error('Estoque insuficiente');
      }

      const itemPedido = prisma.itempedido.create({ 
        data: { quantidade: Number(data.quantidade), 
          preco_unitario: Number(data.preco_unitario), 
          pedido: { connect: { id: Number(data.pedido_id) }, }, 
          produto: { connect: { id: Number(data.produto_id) }, }, }, 
          include: { produto: true, pedido: true 

        }, 
      });

      await tx.produto.update({
        where: { id: Number(data.produto_id) },
        data: {
          qtd_estoque: produto.qtd_estoque - data.quantidade,
        },
      });

      return itemPedido;
    });
  }


  async getItemPedidoById(id) {
    return prisma.itempedido.findUnique({
      where: { id: Number(id) },
      include: { produto: true, pedido: true },
    });
  }

  async getItensByPedido(pedido_id) {
    return prisma.itempedido.findMany({
      where: {
        pedido: { id: Number(pedido_id) },
      },
      include: { produto: true, pedido: true },
    });
  }

  async updateItemPedido(id, data) {
    const item = await prisma.itempedido.findUnique({
      where: { id: Number(id) },
      include: { produto: true },
    });

    if (!item) {
      throw new Error("Item de pedido não encontrado");
    }

    const novaQuantidade = Number(data.quantidade);
    const diferenca = novaQuantidade - item.quantidade;

    if (diferenca > 0 && item.produto.qtd_estoque < diferenca) {
      throw new Error("Estoque insuficiente para aumentar a quantidade");
    }

    const itemAtualizado = await prisma.itempedido.update({
      where: { id: Number(id) },
      data: {
        quantidade: novaQuantidade,
        preco_unitario: data.preco_unitario ?? item.preco_unitario,
      },
    });

    await prisma.produto.update({
      where: { id: item.produto_id },
      data: {
        qtd_estoque: item.produto.qtd_estoque - diferenca,
      },
    });

  return itemAtualizado;
}


  async deleteItemPedido(id) {
    const item = await prisma.itempedido.findUnique({
      where: { id: Number(id) },
      include: { produto: true },
    });

    if (!item) {
      throw new Error("Item de pedido não encontrado");
    }

    await prisma.itempedido.delete({
      where: { id: Number(id) },
    });

    await prisma.produto.update({
      where: { id: item.produto_id },
      data: {
        qtd_estoque: item.produto.qtd_estoque + item.quantidade,
      },
    });

  }
}


module.exports = new ItemPedidoService();
