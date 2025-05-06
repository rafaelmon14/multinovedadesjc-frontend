"use client";
import Link from 'next/link';
import { useCart } from "../context/CartContext";
import { useState, useRef, useEffect } from "react";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";

export default function CartButton() {
  const { cart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const cartRef = useRef(null);

  // Función para obtener precio según cantidad
  const getItemPrice = (item) => {
    const { quantity, Precio, Preciox3, Preciox6 } = item;
    console.log("Precios x3, x6: "+ Preciox3, Preciox6);
    if (quantity >= 3 && Preciox3 !== undefined) {
      return Preciox3;
    } 
    if (quantity >= 6 && Preciox6 !== undefined) {
      return Preciox6;

    } else {
      return Precio;
    }
  };

  
  const subtotal = cart.reduce((acc, item) => acc + getItemPrice(item) * item.quantity, 0);
  
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Cerrar carrito si clickea fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed top-14 right-6 z-50 sm:top-10" ref={cartRef}>
      {/* Botón del carrito */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative bg-black text-yellow-500 p-3 float-end rounded-full shadow-lg"
      >
        <ShoppingCart className="h-6 w-6" />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-yellow-500 text-black rounded-full text-xs w-5 h-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </button>

      {/* Contenedor del carrito */}
      <div
        className={`mt-14 w-80 sm:mt-16 bg-white rounded-lg shadow-lg p-4 transform transition-all duration-300 ease-out origin-top-right ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
      >
        <h2 className="text-lg font-semibold mb-4">Tu carrito</h2>

        {cart.length === 0 ? (
          <p className="text-gray-500">Tu carrito está vacío</p>
        ) : (
          <>
            <div className="flex flex-col gap-4 max-h-64 overflow-y-auto">
              {cart.map((item) => {
                const unitPrice = getItemPrice(item);
                const hasDiscount = (item.quantity >= 3);
                const subtotalProduct = unitPrice * item.quantity;
                return (
                  <div key={item.id} className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{item.Titulo}</h3>
                      <div className="flex items-center gap-2">
                        
                        {/* Badge con animación */}
                        {hasDiscount ? (
                          <div key={item.id} className="flex items-center justify-between">
                            <p className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full animate-fade-slide">
                              ${unitPrice.toFixed(2)} c/u
                            </p>
                        </div>
                        ): <p className="bg-yellow-100 text-xs px-2 py-0.5 rounded-full text-yellow-600 ">${unitPrice.toFixed(2)} c/u</p>}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="p-1 border rounded-full"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="font-bold">{item.quantity}</span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="p-1 border rounded-full"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                    <p className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full animate-fade-slide">
                            ${subtotalProduct.toFixed(2)} 
                          </p>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500">
                      <Trash2 size={18} />
                    </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4">
              <div className="flex justify-between font-semibold mb-2">
                <span>Subtotal:</span>
                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full underline">${subtotal.toFixed(2)}</span>
              </div>
              <button
              
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-2 font-bold rounded mb-2"
              >
                <Link href="/checkout"> Ir a pagar</Link>
              </button>
              <button
                onClick={clearCart}
                className="w-full bg-red-600 hover:bg-red-600 text-black font-bold py-2 rounded"
              >
                Vaciar carrito
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
