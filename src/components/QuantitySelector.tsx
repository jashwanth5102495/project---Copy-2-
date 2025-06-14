import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onChange,
  min = 1,
  max = 99,
  className = '',
}) => {
  const handleDecrement = () => {
    if (quantity > min) {
      onChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < max) {
      onChange(quantity + 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= min && value <= max) {
      onChange(value);
    } else if (e.target.value === '') {
      onChange(min); // Or some other default behavior for empty input
    }
  };

  return (
    <div className={`flex items-center border border-gray-700 rounded-md overflow-hidden ${className}`}>
      <button
        onClick={handleDecrement}
        disabled={quantity <= min}
        className="px-3 py-2 bg-[#121212] text-gray-100 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <Minus className="w-4 h-4" />
      </button>
      <input
        type="text"
        value={quantity}
        onChange={handleChange}
        className="w-12 text-center bg-[#18181b] text-gray-100 border-x border-gray-700 focus:outline-none focus:ring-0"
        readOnly // Optional: make it read-only if you only want button control
      />
      <button
        onClick={handleIncrement}
        disabled={quantity >= max}
        className="px-3 py-2 bg-[#121212] text-gray-100 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
};

export default QuantitySelector;