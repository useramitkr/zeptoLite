
interface GroceryItems {
    name: string;
    price: number;
    category: string;
    user?: User;
}

interface User {
    name: string;
    price: number;
    category: string;
}

export interface GroceryItem extends GroceryItems {
    user: GroceryItems;
}