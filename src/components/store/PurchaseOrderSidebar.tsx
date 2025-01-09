import React, { useState } from 'react';
import { ClipboardList, Send, Trash2, X } from 'lucide-react';
import { usePurchaseOrder } from '../../stores/purchaseOrderStore';
import { useStore } from '../../stores/storeStore';

export function PurchaseOrderSidebar() {
  const { currentOrder, updateItem, removeItem, submitOrder } = usePurchaseOrder();
  const { products } = useStore();
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await submitOrder(notes);
      setNotes('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const total = currentOrder.reduce((sum, item) => {
    const product = products.find(p => p.id === item.productId);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  return (
    <div className="w-96 border-l border-gray-200 bg-white flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <ClipboardList className="h-5 w-5 text-indigo-600" />
          <h2 className="font-semibold">Current Order</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {currentOrder.map(item => {
          const product = products.find(p => p.id === item.productId);
          if (!product) return null;

          return (
            <div key={item.productId} className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-sm">{product.name}</p>
                <p className="text-xs text-gray-600 mt-1">
                  ${product.price.toFixed(2)} per {product.unit}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={product.minOrder}
                  value={item.quantity}
                  onChange={(e) => updateItem(item.productId, Number(e.target.value))}
                  className="w-16 px-2 py-1 text-sm border border-gray-300 rounded"
                />
                <button
                  onClick={() => removeItem(item.productId)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}

        {currentOrder.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No items in order yet
          </div>
        )}
      </div>

      {currentOrder.length > 0 && (
        <div className="p-6 border-t border-gray-200 space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Order Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
              rows={3}
              placeholder="Add any special instructions..."
            />
          </div>

          <div className="flex justify-between items-center text-sm font-medium">
            <span>Total Amount:</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
              <span>Submit Order</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}