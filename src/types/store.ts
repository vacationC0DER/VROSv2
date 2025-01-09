export interface StoreNotification {
  id: string;
  userId: string;
  purchaseOrderId: string;
  type: 'order_submitted' | 'order_approved' | 'order_rejected';
  message: string;
  readAt: string | null;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'supplies' | 'linens' | 'towels';
  unit: string;
  minOrder: number;
  vendor: string;
}

export interface PurchaseOrderItem {
  productId: string;
  quantity: number;
  unitPrice: number;
  notes?: string;
}

export interface PurchaseOrder {
  id: string;
  userId: string;
  items: PurchaseOrderItem[];
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  notes?: string;
  totalAmount: number;
  submittedAt?: string;
  approvedAt?: string;
  createdAt: string;
  updatedAt: string;
}