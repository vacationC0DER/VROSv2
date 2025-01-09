-- Create store tables
CREATE TABLE store_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price decimal(10,2) NOT NULL,
  category text NOT NULL CHECK (category IN ('supplies', 'linens', 'towels')),
  unit text NOT NULL,
  min_order integer NOT NULL DEFAULT 1,
  vendor text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE purchase_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  status text NOT NULL CHECK (status IN ('draft', 'submitted', 'approved', 'rejected')),
  notes text,
  total_amount decimal(10,2) NOT NULL,
  submitted_at timestamptz,
  approved_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE purchase_order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  purchase_order_id uuid REFERENCES purchase_orders(id) ON DELETE CASCADE NOT NULL,
  product_id uuid REFERENCES store_products(id) NOT NULL,
  quantity integer NOT NULL CHECK (quantity > 0),
  unit_price decimal(10,2) NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE store_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  purchase_order_id uuid REFERENCES purchase_orders(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('order_submitted', 'order_approved', 'order_rejected')),
  message text NOT NULL,
  read_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE store_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchase_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchase_order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can read products"
  ON store_products FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can view their orders"
  ON purchase_orders FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create orders"
  ON purchase_orders FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can view their order items"
  ON purchase_order_items FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM purchase_orders
      WHERE id = purchase_order_id
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view their notifications"
  ON store_notifications FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Create notification trigger function
CREATE OR REPLACE FUNCTION notify_purchase_order_status()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'UPDATE' AND OLD.status != NEW.status) THEN
    INSERT INTO store_notifications (
      user_id,
      purchase_order_id,
      type,
      message
    ) VALUES (
      NEW.user_id,
      NEW.id,
      CASE NEW.status
        WHEN 'approved' THEN 'order_approved'
        WHEN 'rejected' THEN 'order_rejected'
        ELSE 'order_submitted'
      END,
      CASE NEW.status
        WHEN 'approved' THEN 'Your purchase order has been approved'
        WHEN 'rejected' THEN 'Your purchase order has been rejected'
        ELSE 'Your purchase order has been submitted'
      END
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for notifications
CREATE TRIGGER purchase_order_notification_trigger
  AFTER UPDATE ON purchase_orders
  FOR EACH ROW
  EXECUTE FUNCTION notify_purchase_order_status();