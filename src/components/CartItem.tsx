import React from 'react';
import { X } from 'lucide-react';
import { CartItem as CartItemType } from '../types';
import QuantitySelector from './QuantitySelector';
import { Trash2 } from 'lucide-react';

interface CartItemProps {
  item: CartItemType;
  onRemove: (productId: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove, onUpdateQuantity }) => {
  return (
    <div className="flex items-center py-4 border-b border-gray-800 last:border-b-0">
      <img 
        src={item.product.image} 
        alt={item.product.name} 
        className="w-24 h-24 object-cover rounded-md mr-6 border border-gray-700"
      />
      <div className="flex-grow">
        <h3 className="text-lg font-bold text-gray-100 mb-2">{item.product.name}</h3>
        <p className="text-gray-300">Price: ₹{item.product.price.toFixed(2)}</p>
        <div className="flex items-center mt-3">
          <label htmlFor={`quantity-${item.product.id}`} className="sr-only">Quantity</label>
          <input
            type="number"
            id={`quantity-${item.product.id}`}
            min="1"
            value={item.quantity}
            onChange={(e) => onUpdateQuantity(item.product.id, parseInt(e.target.value))}
            className="w-20 px-3 py-1 border border-gray-700 rounded-md bg-[#121212] text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
          />
          <button
            onClick={() => onRemove(item.product.id)}
            className="ml-4 text-red-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
      <p className="font-bold text-xl text-gray-100">₹{(item.product.price * item.quantity).toFixed(2)}</p>
    </div>
  );
};

export default CartItem;