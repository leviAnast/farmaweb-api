const argon = require("argon2");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const adminPassword = await argon.hash("admin123");

  await prisma.admin.upsert({
    where: { email: "admin@farmaweb.com" },
    update: {},
    create: {
      nome: "Administrador",
      email: "admin@farmaweb.com",
      senha: adminPassword,
      role: "admin",
    },
  });

  await prisma.produto.deleteMany();
  await prisma.categoria.deleteMany();

  const categorias = [
    { id: 1, nome: "Medicamentos" },
    { id: 2, nome: "Suplementos" },
    { id: 3, nome: "Vitaminas" },
    { id: 4, nome: "Dieta e Nutrição" },
    { id: 5, nome: "Cuidados e Beleza" },
    { id: 6, nome: "Cuidados para Bebês" },
    { id: 7, nome: "Outros" },
  ];

  for (const cat of categorias) {
    await prisma.categoria.create({ data: { id: cat.id, nome: cat.nome } });
  }

  await prisma.produto.create({
    data: {
      nome: "Dipirona 500mg",
      descricao: "Medicamento para dor e febre",
      preco: 12.9,
      qtd_estoque: 100,
      categoria_id: 1,
      prescricao: false,
      imagemPrincipal: "https://via.placeholder.com/300x300.png?text=Dipirona",
      imagensGaleria: {
        create: [
          { url: "https://via.placeholder.com/300x300.png?text=Dipirona1" },
          { url: "https://via.placeholder.com/300x300.png?text=Dipirona2" },
        ],
      },
    },
  });

  await prisma.produto.create({
    data: {
      nome: "Hidratante Corporal",
      descricao: "Creme hidratante para cuidados com a pele",
      preco: 29.9,
      qtd_estoque: 50,
      categoria_id: 5,
      prescricao: false,
      imagemPrincipal: "https://via.placeholder.com/300x300.png?text=Hidratante",
    },
  });

  await prisma.produto.create({
    data: {
      nome: "Vitamina C 1g",
      descricao: "Suplemento vitamínico para imunidade",
      preco: 19.9,
      qtd_estoque: 200,
      categoria_id: 3,
      prescricao: false,
      imagemPrincipal: "https://via.placeholder.com/300x300.png?text=Vitamina+C",
    },
  });

  console.log("Seed concluído");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
