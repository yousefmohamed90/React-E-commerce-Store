import { Routes, Route } from 'react-router-dom' 
import './App.css'
import { Home } from './pages/Home'
import { Store } from './pages/Store'
import {Navbar} from './components/Navbar'
import { ShoppingCartProvider } from './context/CartContext'
import { ShoppingCart } from './components/ShoppingCart'
import { useEffect,useState } from 'react'
import { getproducts, type Product } from './api/products'
function App() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
  getproducts().then(setProducts);
  }, []);
  return (
    <ShoppingCartProvider>
      <Navbar />
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home products={products} />} />
          <Route path="/store" element={<Store products={products} />} />
        
        </Routes>
        <ShoppingCart products={products} />
      </div>
    </ShoppingCartProvider>
  );
}

export default App
