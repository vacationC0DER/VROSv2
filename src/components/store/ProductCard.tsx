import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { usePurchaseOrder } from '../../stores/purchaseOrderStore';
import type { Product } from '../../types/store';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = usePurchaseOrder();
  const [quantity, setQuantity] = useState(product.minOrder || 1);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? product.minOrder : Math.max(product.minOrder, parseInt(e.target.value) || product.minOrder);
    setQuantity(value);
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(product.minOrder, prev - 1));
  };

  const handleAdd = () => {
    addItem(product.id, quantity);
    setQuantity(product.minOrder);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-4">
        <h3 className="font-semibold text-gray-900">{product.name}</h3>
        <p className="text-sm text-gray-600 mt-1">{product.description}</p>
        <p className="text-sm text-gray-500 mt-1">Vendor: {product.vendor}</p>
        
        <div className="mt-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span>Price per {product.unit}:</span>
            <span className="font-medium">${product.price.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Minimum order:</span>
            <span>{product.minOrder} {product.unit}</span>
          </div>
          
          <div className="flex gap-2">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                type="button"
                onClick={decrementQuantity}
                className="p-2 text-gray-600 hover:bg-gray-50 rounded-l-lg"
              >
                <Minus className="h-4 w-4" />
              </button>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                min={product.minOrder}
                value={quantity}
                onChange={handleQuantityChange}
                className="w-16 text-center border-x border-gray-300 py-2"
              />
              <button
                type="button"
                onClick={incrementQuantity}
                className="p-2 text-gray-600 hover:bg-gray-50 rounded-r-lg"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            
            <button 
              onClick={handleAdd}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4" />
              <span>Add to Order</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}