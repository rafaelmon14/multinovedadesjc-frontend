"use client";

import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function MiniCart({ isOpen, onClose }) {
  const { cart, removeFromCart, clearCart } = useCart();

  const subtotal = cart.reduce((acc, item) => acc + item.Precio * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Fondo oscuro */}
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          
          {/* Panel de carrito */}
          <motion.div
            className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg z-50 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ type: "tween" }}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">Tu carrito</h2>
              <button onClick={onClose}>
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Productos en el carrito */}
            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <p className="text-gray-500">Tu carrito está vacío</p>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold">{item.Titulo}</h3>
                      <p className="text-gray-500 text-sm">${item.Precio} x {item.quantity}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 text-sm"
                    >
                      Eliminar
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t">
              <div className="flex justify-between mb-4">
                <span>Subtotal:</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <button
                onClick={clearCart}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded mb-2"
              >
                Vaciar carrito
              </button>
              <button
                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
              >
                Ir a pagar
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
