import { useNavigate } from "react-router-dom";
import { type Product } from "../api/products";
type homeprops = {
  products: Product[];
};
export function Home({ products }: homeprops) {
  const navigate = useNavigate();
  const featuredproducts = products.slice(78, 81);
    return (
      <>
    <div className="py-5">
      <div className="flex flex-col items-center justify-center ">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold pb-3 mt-4">
          Welcome To our Store
        </h2>
        <p className="text-gray-700 text-lg">Discover Products You'll Love</p>
        <p className="text-gray-700 mt-2 text-lg">
          Explore our collection of high-quality products, carefully selected
          for you.
        </p>
        <div className="m-5">
          <button
            onClick={() => {
              navigate("/store");
            }}
            className="bg-accent-500 font-bold text-white hover:bg-primary  transition-transform hover:scale-105 rounded-full w-60 h-10 mt-5"
          >
            Shop Now
          </button>
        </div>
      </div>

      <div>
        <h2 className="mb-6 mt-5 text-center text-2xl font-bold text-primary sm:text-3xl">
          Featured Products
        </h2>
      </div>
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:grid-cols-3  ">
          {featuredproducts.map((product) => {
            return (
              <div key={product.id} className="neon-card rounded-2xl mx-2 p-3 mb-auto ">
                <div className="flex h-48 items-center justify-center">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="object-contain "
                  />
                </div>
                <div>
                  <h2 className="text-primary font-semibold  flex items-center justify-center">
                    {product.title}
                  </h2>
                </div>
              </div>
            );
          })}
        </div>
      </>
            </div>
        <div className=" w-full bottom-0 flex lg:h-9 lg:fixed md:mt-10 items-center justify-between px-6 h-7 shrink-0 text-white bg-gray-900 shadow-sm ">
        <span> © 2026 MyStore.</span>
        <span> All rights reserved.</span>
            </div>
            </>
  );
}
