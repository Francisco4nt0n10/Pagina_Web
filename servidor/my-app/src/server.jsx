const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors({
    origin: '*', // Cambiar al dominio del cliente en producción
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
  }));

app.use(express.json());
 

let productos = []; // Datos en memoria

// Obtener todos los productos
app.get('/api/productos', (req, res) => {
  res.json(productos);
});

// Crear un nuevo producto
app.post('/api/productos', (req, res) => {
  const { producto_id, nombre_producto, precio } = req.body;
  productos.push({ producto_id, nombre_producto, precio });
  res.status(201).json({ message: 'Producto creado correctamente.' });
});

// Actualizar un producto
app.put('/api/productos/:producto_id', (req, res) => {
  const { producto_id } = req.params;
  const { nombre_producto, precio } = req.body;

  const producto = productos.find((p) => p.producto_id === producto_id);
  if (producto) {
    producto.nombre_producto = nombre_producto;
    producto.precio = precio;
    res.json({ message: 'Producto actualizado correctamente.' });
  } else {
    res.status(404).json({ message: 'Producto no encontrado.' });
  }
});

// Eliminar un producto
app.delete('/api/productos/:producto_id', (req, res) => {
  const { producto_id } = req.params;
  productos = productos.filter((p) => p.producto_id !== producto_id);
  res.json({ message: 'Producto eliminado correctamente.' });
});

// Iniciar el servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});