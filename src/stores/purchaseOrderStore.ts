import { create } from 'zustand';
import type { PurchaseOrder, PurchaseOrderItem } from '../types/store';

interface PurchaseOrderState {
  currentOrder: PurchaseOrderItem[];
  submittedOrders: PurchaseOrder[];
  addItem: (productId: string, quantity: number) => void;
  updateItem: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  submitOrder: (notes?: string) => Promise<void>;
  clearOrder: () => void;
}

export const usePurchaseOrder = create<PurchaseOrderState>((set, get) => ({
  currentOrder: [],
  submittedOrders: [],

  addItem: (productId: string, quantity: number) => {
    set(state => ({
      currentOrder: [...state.currentOrder, { productId, quantity }]
    }));
  },

  updateItem: (productId: string, quantity: number) => {
    set(state => ({
      currentOrder: state.currentOrder.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      )
    }));
  },

  removeItem: (productId: string) => {
    set(state => ({
      currentOrder: state.currentOrder.filter(item => item.productId !== productId)
    }));
  },

  submitOrder: async (notes?: string) => {
    const order: PurchaseOrder = {
      id: crypto.randomUUID(),
      items: [...get().currentOrder],
      status: 'submitted',
      submittedAt: new Date().toISOString(),
      totalAmount: 0, // Calculate based on items
      notes
    };

    set(state => ({
      submittedOrders: [...state.submittedOrders, order],
      currentOrder: [] // Clear current order after submission
    }));
  },

  clearOrder: () => {
    set({ currentOrder: [] });
  }
}));