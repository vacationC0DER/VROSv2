-- Insert sample forum posts
INSERT INTO forum_posts (title, content, category_id, author_id, status, is_pinned, view_count) VALUES
  (
    'Best Practices for Property Photography',
    '<h2>Essential Photography Guidelines</h2>
    <p>Follow these guidelines to ensure consistent, high-quality property photos:</p>
    <ul>
      <li>Use wide-angle lens (16-35mm recommended)</li>
      <li>Shoot in landscape orientation</li>
      <li>Ensure proper lighting (shoot during golden hours)</li>
      <li>Stage rooms appropriately</li>
      <li>Take multiple angles of each room</li>
    </ul>
    <h3>Required Photos</h3>
    <ol>
      <li>Exterior front view</li>
      <li>Main living areas</li>
      <li>Kitchen with amenities</li>
      <li>All bedrooms</li>
      <li>Bathrooms</li>
      <li>Special features (pool, patio, etc.)</li>
    </ol>',
    (SELECT id FROM forum_categories WHERE slug = 'onboarding'),
    (SELECT id FROM users WHERE email = 'admin@grandwelcome.com'),
    'published',
    true,
    156
  ),
  (
    'Guest Communication Templates',
    '<h2>Standard Response Templates</h2>
    <p>Use these templates for consistent guest communication:</p>
    <h3>Booking Confirmation</h3>
    <pre>Dear [Guest Name],
Thank you for choosing Grand Welcome! Your stay at [Property Name] is confirmed.
Check-in: [Date] after [Time]
Check-out: [Date] by [Time]
...</pre>
    <h3>Check-in Instructions</h3>
    <pre>Welcome to [Property Name]!
Access Code: [Code]
Parking: [Details]
WiFi Network: [Name]
WiFi Password: [Password]
...</pre>',
    (SELECT id FROM forum_categories WHERE slug = 'guest-services'),
    (SELECT id FROM users WHERE email = 'admin@grandwelcome.com'),
    'published',
    true,
    243
  ),
  (
    'Monthly Revenue Report Guide',
    '<h2>Understanding Revenue Reports</h2>
    <p>This guide explains how to read and analyze monthly revenue reports.</p>
    <h3>Key Metrics</h3>
    <ul>
      <li>Gross Booking Revenue</li>
      <li>Average Daily Rate (ADR)</li>
      <li>Occupancy Rate</li>
      <li>RevPAR (Revenue Per Available Room)</li>
    </ul>
    <h3>Report Sections</h3>
    <ol>
      <li>Summary Dashboard</li>
      <li>Property Performance</li>
      <li>Booking Trends</li>
      <li>Year-over-Year Comparison</li>
    </ol>',
    (SELECT id FROM forum_categories WHERE slug = 'finance'),
    (SELECT id FROM users WHERE email = 'admin@grandwelcome.com'),
    'published',
    true,
    189
  ),
  (
    'Property Inspection Checklist',
    '<h2>Pre-Guest Inspection</h2>
    <p>Complete this checklist before each guest arrival:</p>
    <h3>General Areas</h3>
    <ul>
      <li>Clean windows and screens</li>
      <li>Dust all surfaces</li>
      <li>Vacuum/sweep floors</li>
      <li>Test all lights</li>
    </ul>
    <h3>Kitchen</h3>
    <ul>
      <li>Clean appliances</li>
      <li>Stock essential supplies</li>
      <li>Check all utensils</li>
      <li>Verify inventory list</li>
    </ul>',
    (SELECT id FROM forum_categories WHERE slug = 'field-operations'),
    (SELECT id FROM users WHERE email = 'admin@grandwelcome.com'),
    'published',
    false,
    127
  ),
  (
    'Marketing Campaign Calendar 2024',
    '<h2>Upcoming Campaigns</h2>
    <p>Overview of marketing initiatives for 2024:</p>
    <h3>Q1 2024</h3>
    <ul>
      <li>Winter Getaway Promotion</li>
      <li>Valentine''s Special</li>
      <li>Spring Break Campaign</li>
    </ul>
    <h3>Q2 2024</h3>
    <ul>
      <li>Summer Booking Early Bird</li>
      <li>Memorial Day Weekend</li>
      <li>Family Vacation Packages</li>
    </ul>',
    (SELECT id FROM forum_categories WHERE slug = 'marketing'),
    (SELECT id FROM users WHERE email = 'admin@grandwelcome.com'),
    'published',
    true,
    167
  ),
  (
    'New Property Onboarding Process',
    '<h2>Step-by-Step Guide</h2>
    <p>Follow this process for all new property onboarding:</p>
    <ol>
      <li>Initial Property Assessment
        <ul>
          <li>Location evaluation</li>
          <li>Market analysis</li>
          <li>Revenue projection</li>
        </ul>
      </li>
      <li>Owner Agreement
        <ul>
          <li>Contract review</li>
          <li>Rate strategy</li>
          <li>Service level agreement</li>
        </ul>
      </li>
      <li>Property Setup
        <ul>
          <li>Photography</li>
          <li>Listing creation</li>
          <li>Channel distribution</li>
        </ul>
      </li>
    </ol>',
    (SELECT id FROM forum_categories WHERE slug = 'onboarding'),
    (SELECT id FROM users WHERE email = 'admin@grandwelcome.com'),
    'published',
    false,
    98
  );

-- Add some sample comments
INSERT INTO forum_comments (post_id, author_id, content) 
SELECT 
  p.id,
  u.id,
  'This guide has been incredibly helpful for maintaining consistency across our properties. Could we also add a section about drone photography best practices?'
FROM forum_posts p
CROSS JOIN users u
WHERE p.title = 'Best Practices for Property Photography'
AND u.email = 'admin@grandwelcome.com'
LIMIT 1;

INSERT INTO forum_comments (post_id, author_id, content)
SELECT 
  p.id,
  u.id,
  'The templates have streamlined our communication process significantly. We should consider adding templates for special occasions and local recommendations too.'
FROM forum_posts p
CROSS JOIN users u
WHERE p.title = 'Guest Communication Templates'
AND u.email = 'admin@grandwelcome.com'
LIMIT 1;