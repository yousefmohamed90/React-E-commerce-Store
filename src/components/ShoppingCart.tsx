import { useShoppingCart } from "../context/CartContext";
import { formatCurrency } from "../utilities/formatCurrency.ts";
import { CartItem } from "./CartItem.tsx";
import { type Product } from "../api/products.ts";
import { useLocalStorage } from "../hooks/useLocalStorage.ts";
import type { Order } from "../types/Order.ts";
import { useState } from "react";

type ShoppingCartprops = {
  products: Product[];
};

export function ShoppingCart({ products }: ShoppingCartprops) {
  const {
    isOpen,
    closeCart,
    cartItems,
    getCartTotal,
    cartQuantity,
    clearCart,
  } = useShoppingCart();
  const total = getCartTotal(products);
  const [, setOrders] = useLocalStorage<Order[]>("order", []);
  const [completeOrder, setCompleteOrder] = useState<Order | null>(null);

  const handleCheckout = () => {
    const order: Order = {
      id: crypto.randomUUID(),
      items: cartItems,
      total: total,
      date: new Date().toString(),
    };
    setOrders((prevorders) => [...prevorders, order]);
    setCompleteOrder(order);
    clearCart();
  };
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => {
            setCompleteOrder(null);
            closeCart();
          }}
        ></div>
      )}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-full sm:w-300  bg-white shadow-2xl transition-transform duration-300 ${isOpen ? "translate-x-0 overflow-y-auto" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b p-5">
          <h2 className="text-2xl font-bold text-dark">Your Cart</h2>
          <button
            onClick={() => {
              setCompleteOrder(null);
              closeCart();
            }}
            className="text-4xl text-dark hover:text-accent-500"
          >
            ×
          </button>
        </div>

        {completeOrder ? (
          <>
            <div className="w-full bg-gray-50 shadow-lg pt-5 p-2">
              <div className=" flex flex-col items-center justify-center mb-4  bg-green-200">
                <span className="text-xl font-bold p-2 text-center">
                  ✓ Order Placed Successfully
                </span>
                <span className="text-sm text-center">
                  Thank You For Your Purchase
                </span>
              </div>
              <div className="flex justify-between items-center border-b">
                <span className="order-success">Order ID: </span>
                <span className="order-success ">
                  {completeOrder.id.slice(0, 5)}
                </span>
              </div>
              <div className="flex justify-between items-center border-b">
                <span className="order-success">Date:</span>
                <span className="order-success ">
                  {completeOrder.date.slice(0, 15)}
                </span>
              </div>
              <div className="flex justify-between items-center ">
                <span className="order-success text-green-600 ">Total:</span>
                <span className="order-success text-green-600">
                  {formatCurrency(completeOrder.total)}
                </span>
              </div>
            </div>
            <div className="border-t flex items-center justify-center p-5 shadow-sm">
              <button
                onClick={() => {
                  setCompleteOrder(null);
                  closeCart();
                }}
                className="mt-4 bg-accent-500 px-6 py-3 text-white hover:bg-primary  transition-transform hover:scale-105 rounded-lg "
              >
                Start New Order
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 min-w-0 ">
              {cartItems.map((cartItem) => {
                const product = products.find(
                  (product) => product.id === cartItem.id,
                );

                if (!product) return null;

                return (
                  <CartItem key={cartItem.id} product={product} {...cartItem} />
                );
              })}
            </div>

            {cartQuantity > 0 && (
              <div className="sticky bottom-0 border-t bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-dark">
                    Total Price
                  </span>

                  <span className="text-2xl font-bold text-dark">
                    {formatCurrency(total)}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="mt-4 w-full block sm:w-1/2 sm:mx-auto rounded-lg bg-accent-500 py-3 font-semibold text-white  hover:bg-primary"
                >
                  Checkout
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
