import React from 'react';
import { X, Clock, CheckCircle, XCircle } from 'lucide-react';
import { usePurchaseOrder } from '../../stores/purchaseOrderStore';
import { useStore } from '../../stores/storeStore';
import { format } from 'date-fns';

interface OrderHistoryProps {
  onClose: () => void;
}

export function OrderHistory({ onClose }: OrderHistoryProps) {
  const { submittedOrders } = usePurchaseOrder();
  const { products } = useStore();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold">Order History</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {submittedOrders.map(order => (
              <div key={order.id} className="border border-gray-200 rounded-lg">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <span className="font-medium capitalize">{order.status}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Submitted {format(new Date(order.submittedAt!), 'MMM d, yyyy')}
                    </p>
                  </div>
                  <span className="text-lg font-medium">
                    ${order.totalAmount.toFixed(2)}
                  </span>
                </div>

                <div className="p-4 space-y-3">
                  {order.items.map(item => {
                    const product = products.find(p => p.id === item.productId);
                    if (!product) return null;

                    return (
                      <div key={item.productId} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-600">
                            ${product.price.toFixed(2)} per {product.unit}
                          </p>
                        </div>
                        <p className="text-sm">
                          {item.quantity} {product.unit}s
                        </p>
                      </div>
                    );
                  })}
                </div>

                {order.notes && (
                  <div className="px-4 pb-4">
                    <p className="text-sm text-gray-600">{order.notes}</p>
                  </div>
                )}
              </div>
            ))}

            {submittedOrders.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                No orders submitted yet
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}