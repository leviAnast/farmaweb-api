const express = require('express');
const app = express();
const clientesRoutes = require('./routes/clientesRoutes');
const vendedoresRoutes = require('./routes/vendedoresRoutes');
const categoriasRoutes = require('./routes/categoriasRoutes');

app.use(express.json());

app.use('/clientes', clientesRoutes);
app.use('/vendedores', vendedoresRoutes);
app.use('/categorias', categoriasRoutes);


const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
