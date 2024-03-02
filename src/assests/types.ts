
export interface ProductType {
    id: number;
    title: string;
    category: string;
    description: string;
    price: number;
    image: string;
}

export interface CartItemType {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
}

export interface CartItemData {
  productId: number;
  quantity: number;
}

