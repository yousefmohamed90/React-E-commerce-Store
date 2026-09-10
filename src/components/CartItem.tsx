import { useShoppingCart } from "../context/CartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { type Product } from "../api/products";
type CartItemProps = {
  product: Product;
  quantity: number;
};
export function CartItem({ product, quantity }: CartItemProps) {
  const { removeItemFromCart, addItemToCart, decreaseItemQuantity} =
    useShoppingCart();
  return (
    <div
      key={product.id}
      className="relative flex rounded-xl p-5 shadow-md w-full border-2 "
    >
      <div className="shrink-0 w-20 sm:w-24 md:w-28 ">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="pt-5 h-24 w-20 sm:h-32 sm:w-24 md:h-40 md:w-28 object-contain"
        />
      </div>
      <button
        onClick={() => removeItemFromCart(product.id)}
        className="hover:text-accent rounded-lg p-2 absolute right-0 top-0 "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.5em"
          height="1.5em"
          viewBox="0 0 24 24"
        >
          <title>delete</title>
          <path
            fill="currentColor"
            d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z"
          />
        </svg>
      </button>
      <div className="flex flex-1 flex-col min-w-0 ">
        <div className="text-center">
          <div>
            <h2 className="gradient-text-cart h-14 ">{product.title}</h2>
          </div>
          <div>
            <div className="flex items-center justify-center ">
              <button
                className="cart-btn-cart"
                onClick={() => decreaseItemQuantity(product.id)}
              >
                -
              </button>
              <p className="cart-item-sm">{quantity} items in Cart: </p>
              <button
                className="cart-btn-cart"
                onClick={() => addItemToCart(product.id)}
              >
                +
              </button>
            </div>
            <p className="price-cart ">
              Total : {formatCurrency(product.price * quantity)}
            </p>
          </div>
        </div>
          </div>
    </div>
  );
}
