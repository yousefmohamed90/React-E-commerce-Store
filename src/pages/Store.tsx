import { formatCurrency } from "../utilities/formatCurrency";
import { useShoppingCart } from "../context/CartContext"; 
import { type Product  } from "../api/products";
type StoreProps={products:Product[]}
export function Store({products}:StoreProps) {
  const {getItemQuantity, addItemToCart, removeItemFromCart ,decreaseItemQuantity} = useShoppingCart();
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {products.map((product) => {
      const quantity = getItemQuantity(product.id);
          return (
            <div
              key={product.id}
              className="flex h-full flex-col rounded-2xl bg-white p-5 shadow-md w-full"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-64 w-full object-contain transition-transform duration-300"
              />
              <h2 className="gradient-text">{product.title}</h2>
              {quantity === 0 ? (
                <div className="flex flex-col items-center justify-evenly mt-auto">
                  <p className="price mt-4">{formatCurrency(product.price)}</p>
                  <button
                    className="cart-add-remove-btn"
                    onClick={() => addItemToCart(product.id)}
                  >
                    Add to Cart
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center mt-auto">
                  <p className="price justify-center items-center">
                    {formatCurrency(product.price)}
                  </p>
                  <div className="flex flex-row items-center gap-4 justify-evenly mt-auto">
                    <button
                      className="cart-btn"
                      onClick={() => decreaseItemQuantity(product.id)}
                    >
                      -
                    </button>
                    <p className="cart-item">{quantity} items in Cart: </p>
                    <button
                      className="cart-btn"
                      onClick={() => addItemToCart(product.id)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="cart-add-remove-btn"
                    onClick={() => removeItemFromCart(product.id)}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          );
          })}
      </div>
    </>
  );
}