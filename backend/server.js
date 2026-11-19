const express = require('express');
const cors = require('cors'); 
const app = express();

app.use(express.json());
app.use(cors());

//para recibit los pedidos
app.post('/api/pedidos', (req, res) => {
    const { nombre, direccion, telefono, metodopago, carrito } = req.body;
    console.log("/n ¡NUEVO PEDIDO RECIBIDO EN ECOSTYLE!");
    console.log(`----------------------------------------`);
    console.log(` cliente:${nombre}`);
    console.log(`Direccion: ${direccion}`);
     console.log(`Telefono: ${telefono}`);
      console.log(`Metodo pago: ${metodopago}`);
       console.log(`Prendas compradas:`, carrito);
       console.log(`--------------------------`)

       res.json({success: true, mensaje:"Pedido registrado con exito"});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor de EcoStyle corriendo en el puerto ${PORT}`);
});