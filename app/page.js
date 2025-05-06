import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { CartProvider } from "../context/CartContext";



export default async function HomePage() {
  

  return (
    <main className="font-mono">
      
        <Navbar/>
        <ProductCard/>
      
    </main>
  )
}
