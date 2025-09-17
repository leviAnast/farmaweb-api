const prisma = require('../config/prismaClient');

class CategoriasService {
  async getAllCategorias() {
    return await prisma.categoria.findMany({
      include: { produtos: true } 
    });
  }

  async getCategoriaById(id) {
    return await prisma.categoria.findUnique({
      where: { id: Number(id) },
      include: { produtos: true } 
    });
  }

  async createCategoria(data) {
    return await prisma.categoria.create({
      data: {
        nome: data.nome
      }
    });
  }

  async updateCategoria(id, data) {
    try {
      return await prisma.categoria.update({
        where: { id: Number(id) },
        data: {
          nome: data.nome
        }
      });
    } catch (error) {
      if (error.code === 'P2025') {
        // Prisma error: record not found
        return null;
      }
      throw error;
    }
  }

  async deleteCategoria(id) {
    try {
      await prisma.categoria.delete({
        where: { id: Number(id) }
      });
      return true;
    } catch (error) {
      if (error.code === 'P2025') {
        return false;
      }
      throw error;
    }
  }
}

module.exports = new CategoriasService();
