"use client";

import { useCart } from "../context/CartContext";
import { getProducts } from "../services/strapiApi";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://2e4a-190-12-13-23.ngrok-free.app";

const ProductCard = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts();
        const text = await data.text();
        console.log('Respuesta recibida:', text)
        setProducts(data?.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="columns-2 sm:columns-2 lg:columns-3 gap-4 p-2">
      {products.map((product) => {
        const imagenUrl = product.Imagenes?.[0]?.url
          ? `${API_URL}${product.Imagenes[0].url}`
          : null;

        return (
          <div key={product.id} className="mb-4 break-inside-avoid">
            {imagenUrl && (
              <img
                src={imagenUrl}
                alt={product.Titulo}
                className="h-auto max-w-full bg-gray-300 px-4 rounded-xl"
              />
            )}
            <div className="flex justify-between mt-2">
              <div>
                <h2 className="font-semibold text-[#333333]">
                  {product.Titulo}
                </h2>
              </div>
              <div>
                <p className="text-[18px] text-[#888888]">${product.Precio}</p>
              </div>
            </div>
            <p className="text-[12px] text-yellow-600">{product.PrecioOferta}</p>

            <button
              onClick={() => addToCart(product)}
              className="bg-black text-yellow-500 font-bold w-full rounded-2xl p-1 uppercase text-[10px] cursor-pointer"
            >
              Comprar
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ProductCard;
