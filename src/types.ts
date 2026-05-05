export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: 'Homme' | 'Femme' | 'Accessoires';
  featured?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}
