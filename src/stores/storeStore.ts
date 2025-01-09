import { create } from 'zustand';
import type { Product } from '../types/store';

interface StoreState {
  products: Product[];
  loading: boolean;
  error: string | null;
  cart: { [productId: string]: number };
  fetchProducts: () => Promise<void>;
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
}

export const useStore = create<StoreState>((set, get) => ({
  products: [
    {
      id: '1',
      name: 'GetSojo Integration Kit',
      description: 'Complete integration package for GetSojo property management',
      price: 299.99,
      category: 'supplies',
      image: 'https://images.unsplash.com/photo-1586769852044-692d6e3703f0?auto=format&fit=crop&q=80&w=500',
      inStock: true,
      vendor: 'GetSojo'
    },
    {
      id: '2',
      name: 'Premium Queen Sheet Set',
      description: 'Luxury 600 thread count cotton sheets',
      price: 89.99,
      category: 'linens',
      image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?auto=format&fit=crop&q=80&w=500',
      inStock: true
    },
    {
      id: '3',
      name: 'Luxury Bath Towel Set',
      description: 'Set of 4 premium cotton bath towels',
      price: 59.99,
      category: 'towels',
      image: 'https://images.unsplash.com/photo-1616627547584-bf28cee262db?auto=format&fit=crop&q=80&w=500',
      inStock: true
    }
  ],
  loading: false,
  error: null,
  cart: {},
  
  fetchProducts: async () => {
    set({ loading: true });
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    set({ loading: false });
  },
  
  addToCart: (productId: string) => {
    set(state => ({
      cart: {
        ...state.cart,
        [productId]: (state.cart[productId] || 0) + 1
      }
    }));
  },
  
  removeFromCart: (productId: string) => {
    set(state => {
      const newCart = { ...state.cart };
      delete newCart[productId];
      return { cart: newCart };
    });
  }
}));