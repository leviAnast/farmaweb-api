const prisma = require('../config/prismaClient.js');

class FavoritoService {
  async addFavorito(data) {
    const existente = await prisma.favorito.findFirst({
      where: {
        usuario_id: Number(data.usuario_id),
        produto_id: Number(data.produto_id),
      },
      include: { produto: true },
    });

    if (existente) {
      return existente;
    }

    return prisma.favorito.create({
      data: {
        data_adicionado: data.data_adicionado || new Date(),
        usuario: { connect: { id: Number(data.usuario_id) } },
        produto: { connect: { id: Number(data.produto_id) } },
      },
      include: { produto: true },
    });
  }

  async getFavoritoById(id) {
    return prisma.favorito.findUnique({
      where: { id: Number(id) },
      include: { usuario: true, produto: true },
    });
  }

  async getFavoritosByUsuario(usuario_id) {
    return prisma.favorito.findMany({
      where: { usuario_id: Number(usuario_id) },
      include: { produto: true },
    });
  }

  async deleteFavorito(id) {
    return prisma.favorito.delete({
      where: { id: Number(id) },
    });
  }
}

module.exports = new FavoritoService();
