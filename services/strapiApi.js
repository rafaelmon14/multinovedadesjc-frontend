// /services/strapiApi.js

import axios from "axios";
import qs from "qs";

export async function fetchFromStrapi(endpoint, params = {}) {
  const queryString = qs.stringify(params, {
    encodeValuesOnly: true,
    arrayFormat: "brackets", // <--- agrega esto
  });

  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";
  const url = queryString 
  ? `${STRAPI_URL}/api/${endpoint}?${queryString}`
  : `${STRAPI_URL}/api/${endpoint}`;

  console.log("Fetching from:", url);

  const res = await fetch(url);
  if (!res.ok) {
    console.error("Error fetching from Strapi:", await res.json());
    throw new Error(`Error fetching ${endpoint}`);
  }
  return res.json();
}


// Función específica: traer productos
export const getProducts = async () => {
  return fetchFromStrapi("products", {
    populate: "*", // Para que traiga las imágenes y relaciones
  });
};

// Función específica: traer un producto por slug o id
export const getProductById = async (id) => {
  return fetchFromStrapi(`products/${id}`, {
    populate: "*",
  });
};

// Función específica: traer categorías
export const getCategories = async () => {
  return fetchFromStrapi("categories");
};

// Función específica: traer productos por categoría
export const getProductsByCategory = async (categoriaSlug) => {
  return fetchFromStrapi("products", {
    populate: "*",
    filters: {
      categorias: {
        Nombre: {
          $contains: categoriaSlug,
        },
      },
    },
  });
};

// Función específica: validar cupón
export const validateCoupon = async (couponCode) => {
  return fetchFromStrapi("coupons", {
    "filters[codigo][$eq]": couponCode,
    "filters[fecha_inicio][$lte]": new Date().toISOString(),
    "filters[fecha_fin][$gte]": new Date().toISOString(),
  });
};
