"use client";

import { useCart } from "../../../context/CartContext";
import { getProductsByCategory } from "../../../services/strapiApi";
import NavBar from "../../../components/Navbar";
import { useEffect, useState } from "react";

export default function CategoriaPage({ params }) {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const slug = decodeURIComponent(params?.slug || "");
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:1337";

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProductsByCategory(slug);
        setProducts(data?.data || []);
      } catch (error) {
        console.error("Error fetching products by category:", error);
      }
    }

    fetchProducts();
  }, [slug]); // Dependemos del slug

  return (
    <div className="font-mono">
      <NavBar />
      <div className="columns-2 sm:columns-2 lg:columns-3 gap-4 p-2">
        {products.map((product) => {
          const imagenUrl = product.Imagenes?.[0]?.url
            ? `${API_URL}${product.Imagenes[0].url}`
            : null;

          return (
            <div key={product.id} className="mb-4 break-inside-avoid">
              {/* Mostrar imagen si existe */}
              {imagenUrl && (
                <img
                  src={imagenUrl}
                  alt={product.Titulo}
                  className="h-auto max-w-full bg-gray-300 px-4 rounded-xl"
                />
              )}
              <div className="flex justify-between mt-2">
                <div>
                  <h2 className="font-semibold text-[#333333]">{product.Titulo}</h2>
                </div>
                <div>
                  <p className="text-[18px] text-[#888888]">${product.Precio}</p>
                </div>
              </div>
              <p className="text-[12px] text-yellow-600">{product.PrecioOferta}</p>
              <div>
                {/* <p>{product.Categoria}</p> */}
              </div>
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
    </div>
  );
}
