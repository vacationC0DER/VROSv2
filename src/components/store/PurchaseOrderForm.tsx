import React, { useState } from 'react';
import { ClipboardList, Trash2, Send } from 'lucide-react';
import { usePurchaseOrder } from '../../stores/purchaseOrderStore';
import { useStore } from '../../stores/storeStore';

export function PurchaseOrderForm() {
  const { currentOrder, updateItem, removeItem, submitOrder } = usePurchaseOrder();
  const { products } = useStore();
  const [notes, setNotes] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitOrder(notes);
    setNotes('');
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <ClipboardList className="h-5 w-5 text-indigo-600" />
        <h2 className="font-semibold">Weekly Purchase Order</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {currentOrder.map(item => {
          const product = products.find(p => p.id === item.productId);
          if (!product) return null;

          return (
            <div key={item.productId} className="flex items-center gap-4">
              <div className="flex-1">
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-gray-600">
                  ${product.price} per {product.unit}
                </p>
              </div>
              <input
                type="number"
                min={product.minOrder}
                value={item.quantity}
                onChange={(e) => updateItem(item.productId, Number(e.target.value))}
                className="w-24 px-3 py-2 border border-gray-300 rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeItem(item.productId)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          );
        })}

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            rows={3}
            placeholder="Add any special instructions or notes..."
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="submit"
            disabled={currentOrder.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
            <span>Submit Order</span>
          </button>
        </div>
      </form>
    </div>
  );
}