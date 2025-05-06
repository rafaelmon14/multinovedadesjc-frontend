"use client";

import { useCart } from "../../context/CartContext";
import { useState } from "react";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const [formData, setFormData] = useState({ name: "", email: "", address: "" });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Pedido:", { ...formData, cart });
    setOrderPlaced(true);
    clearCart();
  };

  const getItemPrice = (item) => {
    if (item.quantity >= 6) return item.precio6 || item.Precio;
    if (item.quantity >= 3) return item.precio3 || item.Precio;
    return item.Precio;
  };

  const subtotal = cart.reduce((acc, item) => acc + getItemPrice(item) * item.quantity, 0);

  if (orderPlaced) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <h1 className="text-2xl font-bold mb-4">¡Gracias por tu compra!</h1>
        <p className="text-gray-600 mb-6 text-center">
          Tu pedido ha sido recibido. Para completar la compra, realiza la transferencia a la siguiente cuenta:
        </p>

        <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-md mb-6">
          <p className="font-semibold">Banco: <span className="font-normal">BANCO DE EJEMPLO</span></p>
          <p className="font-semibold">Número de cuenta: <span className="font-normal">1234567890</span></p>
          <p className="font-semibold">Titular: <span className="font-normal">Nombre de la Empresa</span></p>
          <p className="font-semibold">RUC/Cédula: <span className="font-normal">9999999999</span></p>
          <p className="font-semibold">Correo para envío de comprobante: <span className="font-normal">ventas@tuempresa.com</span></p>
        </div>

        <p className="text-center text-gray-700">
          Una vez realizada la transferencia, por favor envía el comprobante al correo electrónico indicado
          para procesar tu pedido. ¡Muchas gracias!
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Tu carrito está vacío.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Nombre</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border rounded p-2 mt-1"
              />
            </div>

            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border rounded p-2 mt-1"
              />
            </div>

            <div>
              <label className="block text-gray-700">Dirección de envío</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full border rounded p-2 mt-1"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 rounded"
            >
              Confirmar pedido
            </button>
          </form>

          {/* Resumen del pedido */}
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Resumen de tu pedido</h2>
            <ul className="divide-y divide-gray-300 mb-4">
              {cart.map((item) => {
                const unitPrice = getItemPrice(item);
                const subtotalProduct = unitPrice * item.quantity;

                return (
                  <li key={item.id} className="py-2 flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.Titulo}</p>
                      <p className="text-sm text-gray-600">{item.quantity} x ${unitPrice.toFixed(2)}</p>
                    </div>
                    <div className="font-semibold">${subtotalProduct.toFixed(2)}</div>
                  </li>
                );
              })}
            </ul>

            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
