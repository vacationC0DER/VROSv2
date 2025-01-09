import React, { useState } from 'react';
import { StoreHeader } from '../components/store/StoreHeader';
import { ProductGrid } from '../components/store/ProductGrid';
import { CategoryFilter } from '../components/store/CategoryFilter';
import { PurchaseOrderSidebar } from '../components/store/PurchaseOrderSidebar';
import { OrderHistory } from '../components/store/OrderHistory';
import { useStore } from '../stores/storeStore';

export function Store() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const { products, loading } = useStore();

  const filteredProducts = selectedCategory
    ? products.filter(p => p.category === selectedCategory)
    : products;

  return (
    <div className="h-[calc(100vh-theme(spacing.16))] -m-8 flex">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <StoreHeader onShowHistory={() => setShowOrderHistory(true)} />
        <div className="mt-6">
          <CategoryFilter 
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
        <div className="mt-6">
          <ProductGrid products={filteredProducts} loading={loading} />
        </div>
      </div>

      {/* Purchase Order Sidebar */}
      <PurchaseOrderSidebar />

      {/* Order History Modal */}
      {showOrderHistory && (
        <OrderHistory onClose={() => setShowOrderHistory(false)} />
      )}
    </div>
  );
}