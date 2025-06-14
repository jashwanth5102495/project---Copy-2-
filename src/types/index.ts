export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  shortDescription: string;
  highlights: string[];
  ingredients: string[];
  image: string;
  themeColor: string;
  accentColor: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  customerInfo: {
    name: string;
    mobile: string;
    address: string;
    pincode: string;
    landmark: string;
    state: string;
    city: string;
  };
  shippingMethod: 'standard' | 'express';
  paymentMethod: 'upi' | 'card';
  status: 'confirmed' | 'packed' | 'shipped' | 'out_for_delivery' | 'delivered';
  createdAt: Date;
}