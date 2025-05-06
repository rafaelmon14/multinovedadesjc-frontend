"use client";
// src/pages/cart.jsx
import { useCart } from "../../context/CartContext";
                     
export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, total } = useCart();

  if (cart.length === 0) {
    return <div className="p-8">Tu carrito está vacío 🛒</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Tu Carrito 🛍️</h1>
      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border-b pb-2"
          >
            <div>
              <h2 className="text-lg">{item.titulo}</h2>
              <p>${item.precio.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                value={item.cantidad}
                onChange={(e) =>
                  updateQuantity(item.id, parseInt(e.target.value))
                }
                className="w-16 border rounded px-2"
              />
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500"
              >
                ❌
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-xl">Total: ${total.toFixed(2)}</h2>

        <div className="flex gap-4 mt-4">
          <button
            onClick={clearCart}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Vaciar carrito
          </button>
          <button
            onClick={() => alert("Aquí podríamos hacer un checkout 🤩")}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Ir a pagar
          </button>
        </div>
      </div>
    </div>
  );
}
