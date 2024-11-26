import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({ producto_id: "", nombre_producto: "", precio: "" });

  const url_temp = "https://ominous-giggle-5g497wjr9g79f7644-5000.app.github.dev/api"; //CAMBIAR CADA USUARIO
  ;
  const fetchProductos = async () => {
    const res = await axios.get(url_temp+"/productos");
    setProductos(res.data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const addProducto = async (e) => {
    e.preventDefault();
    await axios.post(url_temp+"/productos", form);
    fetchProductos();
    setForm({ producto_id: "", nombre_producto: "", precio: "" });
  };

  const updateProducto = async (id) => {
    const producto = productos.find((p) => p.producto_id === id);
    await axios.put(url_temp + `/${id}`, producto);
    fetchProductos();
  };

  const deleteProducto = async (id) => {
    await axios.delete(url_temp+`/productos/${id}`);
    fetchProductos();
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white p-6 rounded shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Catálogo de Productos</h1>
        <form onSubmit={addProducto} className="space-y-4">
          <input
            type="text"
            name="producto_id"
            placeholder="ID del Producto"
            value={form.producto_id}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            name="nombre_producto"
            placeholder="Nombre del Producto"
            value={form.nombre_producto}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="number"
            name="precio"
            placeholder="Precio"
            value={form.precio}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
            Agregar Producto
          </button>
        </form>

        <h2 className="text-xl font-bold mt-6 mb-2">Lista de Productos</h2>
        <ul className="space-y-2">
          {productos.map((producto) => (
            <li key={producto.producto_id} className="p-4 border rounded flex justify-between">
              <div>
                <p className="font-bold">{producto.nombre_producto}</p>
                <p>Precio: ${producto.precio}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => updateProducto(producto.producto_id)}
                  className="bg-yellow-500 text-white px-4 py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => deleteProducto(producto.producto_id)}
                  className="bg-red-500 text-white px-4 py-1 rounded"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;