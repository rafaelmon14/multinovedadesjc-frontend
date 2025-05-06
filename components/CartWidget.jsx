// src/components/CartWidget.jsx
import { useCart } from "../context/CartContext";
import Link from "next/link";

export function CartWidget() {
  const { cart } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + item.cantidad, 0);

  return (
    <div className="fixed top-4 right-4 bg-white p-3 shadow-lg rounded-full z-50">
      <Link href="/cart">
        <div className="flex items-center gap-2 cursor-pointer">
          <span>🛒</span>
          <span>{totalItems}</span>
        </div>
      </Link>
    </div>
  );
}
