const express = require('express');
const app = express();
const clientesRoutes = require('./routes/clientesRoutes');
const vendedoresRoutes = require('./routes/vendedoresRoutes');
<<<<<<< HEAD
const enderecoRoutes = require('./routes/enderecoRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
=======
const categoriasRoutes = require('./routes/categoriasRoutes');
>>>>>>> f9d71e628e226e099fe3f41d0b8b059aa9051edb

app.use(express.json());

app.use('/clientes', clientesRoutes);
app.use('/vendedores', vendedoresRoutes);
app.use('/enderecos', enderecoRoutes);
app.use('/produtos', produtoRoutes);
app.use('/categorias', categoriasRoutes);


const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Servidor rodando em:  http://localhost:${PORT}`));
