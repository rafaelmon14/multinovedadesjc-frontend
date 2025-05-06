'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';
import MiniCart from "../components/MiniCart";
import CartButton from "../components/CartButton";

const NavBar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(2);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navLinks = [
    { name: 'Todo', path: '/' },
    { name: 'Fiestas', path: '/categoria/fiestas' },
    { name: 'Maquillaje', path: '/categoria/maquillaje' },
    { name: 'Joyeria', path: '/categoria/esmaltes' },
    // { name: 'Juguetes', path: '/404' },
  ];

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center relative">
      {/* Logo */}
      <Link href="/" className="text-xl font-bold text-black">
        MultinovedadesJ&C
      </Link>

      {/* Desktop Links */}
      <ul className="hidden md:flex space-x-6 text-gray-700 font-bold">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              href={link.path}
              className={`hover:text-yellow-500 ${pathname === link.path ? 'text-yellow-500' : ''}`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Cart + Hamburger */}
      <div className="flex items-center space-x-4">
        {/* Cart */}
        {/* <div className="relative cursor-pointer">
          <ShoppingCart className="w-6 h-6 text-gray-700" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </div> */}
        <div>
          {/* Botón de carrito */}
      <CartButton onClick={() => setIsCartOpen(true)} />

{/* MiniCart */}
<MiniCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <X className="w-6 h-6 text-black" />
          ) : (
            <Menu className="w-6 h-6 text-yellow-500" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center py-4 space-y-4 md:hidden z-50">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              onClick={() => setIsOpen(false)}
              className={`hover:text-yellow-500 ${pathname === link.path ? 'text-yellow-500' : 'text-black'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
