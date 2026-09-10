export type Product = {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
};
export async function getproducts(): Promise<Product[]> {
    const response = await fetch("https://dummyjson.com/products?limit=0");
    const data = await response.json();
    return data.products;
}