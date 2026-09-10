import type { CartItem } from "../context/CartContext";
export type Order = {
    id: string;
    items: CartItem[];
    total: number;
    date: string;
}
