-- Create admin user if not exists
DO $$
DECLARE
  admin_id uuid := '00000000-0000-4000-a000-000000000000';
BEGIN
  -- Insert admin user if not exists
  INSERT INTO users (id, email, first_name, last_name, role)
  VALUES (
    admin_id,
    'admin@grandwelcome.com',
    'System',
    'Admin',
    'admin'
  )
  ON CONFLICT (id) DO NOTHING;

  -- Insert department categories
  INSERT INTO knowledge_categories (name, description, slug, icon, position) VALUES
    ('Sales', 'Sales processes, best practices, and resources', 'sales', '💼', 1),
    ('Marketing', 'Marketing strategies, brand guidelines, and campaigns', 'marketing', '📢', 2),
    ('Onboarding', 'Property onboarding procedures and checklists', 'onboarding', '🏠', 3),
    ('Field Operations', 'Field service protocols and maintenance guides', 'field-operations', '🛠️', 4),
    ('Guest Services', 'Guest support guidelines and service standards', 'guest-services', '👥', 5),
    ('Finance', 'Financial procedures and reporting guidelines', 'finance', '💰', 6),
    ('Human Resources', 'HR policies, benefits, and employee resources', 'human-resources', '👤', 7);

  -- Insert initial posts
  INSERT INTO knowledge_posts (title, content, category_id, author_id, status, is_pinned) VALUES
    (
      'Sales Process Overview',
      '<h2>Sales Process Steps</h2><ol><li>Initial Property Assessment</li><li>Owner Consultation</li><li>Contract Review</li><li>Property Onboarding</li></ol><p>Follow these steps for every new property acquisition.</p>',
      (SELECT id FROM knowledge_categories WHERE slug = 'sales'),
      admin_id,
      'published',
      true
    ),
    (
      'Marketing Brand Guidelines',
      '<h2>Brand Identity</h2><p>Our brand represents luxury, comfort, and reliability in vacation rentals.</p><h3>Key Elements</h3><ul><li>Logo Usage</li><li>Color Palette</li><li>Typography</li></ul>',
      (SELECT id FROM knowledge_categories WHERE slug = 'marketing'),
      admin_id,
      'published',
      true
    ),
    (
      'Property Onboarding Checklist',
      '<h2>Required Steps</h2><ol><li>Property Inspection</li><li>Photography</li><li>Inventory Check</li><li>System Setup</li></ol><p>Complete all steps before listing activation.</p>',
      (SELECT id FROM knowledge_categories WHERE slug = 'onboarding'),
      admin_id,
      'published',
      true
    ),
    (
      'Field Operations Manual',
      '<h2>Maintenance Procedures</h2><p>Standard procedures for property maintenance and emergency responses.</p><h3>Key Areas</h3><ul><li>Regular Inspections</li><li>Emergency Protocols</li><li>Vendor Management</li></ul>',
      (SELECT id FROM knowledge_categories WHERE slug = 'field-operations'),
      admin_id,
      'published',
      true
    ),
    (
      'Guest Service Standards',
      '<h2>Service Excellence</h2><p>Our commitment to exceptional guest experiences.</p><h3>Key Principles</h3><ul><li>Quick Response Times</li><li>Problem Resolution</li><li>Guest Communication</li></ul>',
      (SELECT id FROM knowledge_categories WHERE slug = 'guest-services'),
      admin_id,
      'published',
      true
    ),
    (
      'Financial Reporting Guidelines',
      '<h2>Monthly Reporting</h2><p>Standard procedures for financial reporting and reconciliation.</p><h3>Key Reports</h3><ul><li>Owner Statements</li><li>Revenue Reports</li><li>Expense Tracking</li></ul>',
      (SELECT id FROM knowledge_categories WHERE slug = 'finance'),
      admin_id,
      'published',
      true
    ),
    (
      'Employee Handbook',
      '<h2>Company Policies</h2><p>Comprehensive guide to company policies and procedures.</p><h3>Key Topics</h3><ul><li>Benefits Overview</li><li>Code of Conduct</li><li>Leave Policies</li></ul>',
      (SELECT id FROM knowledge_categories WHERE slug = 'human-resources'),
      admin_id,
      'published',
      true
    );
END $$;