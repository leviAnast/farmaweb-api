const express = require('express');
const app = express();
const clientesRoutes = require('./routes/clientesRoutes');
const vendedoresRoutes = require('./routes/vendedoresRoutes');

app.use(express.json());

app.use('/clientes', clientesRoutes);
app.use('/vendedores', vendedoresRoutes);


const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Servidor rodando em:  http://localhost:${PORT}`));
