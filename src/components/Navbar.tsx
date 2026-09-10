import { Link } from "react-router-dom";
import { useShoppingCart } from "../context/CartContext";

export function Navbar() {  
const {openCart,cartQuantity}=useShoppingCart()
  return (
    <nav className="sticky z-50 top-0 flex items-center justify-between px-6 h-15  bg-gray-900 shadow-sm">
      <ul className="flex gap-6 items-center text-primary">
        <li className="li-item">
          <Link to="/">Home</Link>
        </li>
        <li className="li-item">
          <Link to="/Store">Store</Link>
        </li>
      </ul>
      {cartQuantity > 0 && (
        <button
          className="pt-2 relative flex h-12 w-12 items-center justify-center rounded-full 
             text-primary transition-colors duration-200 
             hover:bg-primary hover:text-white"
          onClick={openCart}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="20" r="1" />
            <circle cx="20" cy="20" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          <span className="absolute -right-0.5 top-1 w-4 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-base">
            {cartQuantity}
          </span>
        </button>
      )}
    </nav>
  );
}
