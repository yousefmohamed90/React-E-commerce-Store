import { createContext, useContext, useState, type ReactNode } from "react";
import { type Product } from "../api/products";
import { useLocalStorage } from "../hooks/useLocalStorage";
type CartProviderProps = {
  children: ReactNode;
};

export type CartItem = {
  id: number;
  quantity: number;
};
type ShoppingCartContext = {
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  clearCart: () => void;
  getItemQuantity: (id: number) => number;
  addItemToCart: (id: number) => void;
  decreaseItemQuantity: (id: number) => void;
  removeItemFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
  getCartTotal: (products: Product[]) => number;
};
const ShoppingCartContext = createContext({} as ShoppingCartContext);
export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}
export function ShoppingCartProvider({ children }: CartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("cart", []);
  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0,
  );
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const clearCart = () => setCartItems([]);
  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }
  function addItemToCart(id: number) {
    setCartItems((currentitems) => {
      const item = currentitems.find((item) => item.id === id);
      if (item == null) {
        return [...currentitems, { id, quantity: 1 }];
      } else {
        return currentitems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseItemQuantity(id: number) {
    setCartItems((currentitems) => {
      const item = currentitems.find((item) => item.id === id);
      if (item?.quantity === 1) {
        return currentitems.filter((item) => item.id !== id);
      } else {
        return currentitems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function removeItemFromCart(id: number) {
    setCartItems((currentitems) =>
      currentitems.filter((item) => item.id !== id),
    );
  }
  function getCartTotal(products: Product[]) {
    return cartItems.reduce((total, cartItem) => {
      const product = products.find((product) => product.id === cartItem.id);
      return total + (product?.price ?? 0) * cartItem.quantity;
    }, 0);
  }
  return (
    <ShoppingCartContext.Provider
      value={{
        isOpen,
        getItemQuantity,
        addItemToCart,
        decreaseItemQuantity,
        removeItemFromCart,
        cartItems,
        cartQuantity,
        openCart,
        closeCart,
        getCartTotal,
        clearCart
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
