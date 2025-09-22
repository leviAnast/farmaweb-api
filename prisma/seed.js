const argon = require('argon2');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const adminPassword = await argon.hash("admin123");
  await prisma.admin.upsert({
    where: { email: "admin@farmaweb.com" },
    update: {},
    create: {
      nome: "Administrador",
      email: "admin@farmaweb.com",
      senha: adminPassword
    },
  });

  // const categoria = await prisma.categoria.upsert({
  //   where: { nome: "Medicamentos" },
  //   update: {},
  //   create: { nome: "Medicamentos" },
  // });

  // const clientePassword = await argon.hash("123456");
  // await prisma.cliente.upsert({
  //   where: { email: "teste@farmaweb.com" },
  //   update: {},
  //   create: {
  //     nome: "Usuário Teste",
  //     email: "teste@farmaweb.com",
  //     senha: clientePassword,
  //     telefone: "999999999",
  //     endereco: {
  //       create: {
  //         rua: "Rua Teste",
  //         numero: "123",
  //         bairro: "Centro",
  //         cidade: "Fortaleza",
  //         estado: "CE",
  //         cep: "60000000",
  //       },
  //     },
  //   },
  // });

  // await prisma.produto.upsert({
  //   where: { nome: "Dipirona 500mg" },
  //   update: {},
  //   create: {
  //     nome: "Dipirona 500mg",
  //     descricao: "Medicamento para dor e febre",
  //     preco: 12.90,
  //     qtd_estoque: 100,
  //     categoria_id: categoria.id
  //   },
  // });

}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
