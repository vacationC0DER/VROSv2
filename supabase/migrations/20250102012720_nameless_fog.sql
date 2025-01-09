-- Insert knowledge base articles
INSERT INTO knowledge_articles (
  title,
  content,
  category_id,
  author_id,
  status,
  is_featured
) VALUES
  (
    'Property Management System Overview',
    '<h2>Introduction to Our Property Management System</h2>
    <p>This guide provides an overview of our property management system and its key features.</p>
    
    <h3>Core Features</h3>
    <ul>
      <li>Property Listing Management</li>
      <li>Booking Calendar</li>
      <li>Guest Communication</li>
      <li>Maintenance Tracking</li>
      <li>Financial Reporting</li>
    </ul>

    <h3>Getting Access</h3>
    <p>Contact your department manager to request system access and initial training.</p>

    <h3>Key Workflows</h3>
    <ol>
      <li>Creating Property Listings</li>
      <li>Managing Reservations</li>
      <li>Handling Guest Communications</li>
      <li>Maintenance Request Processing</li>
      <li>Report Generation</li>
    </ol>',
    (SELECT id FROM knowledge_categories WHERE slug = 'getting-started'),
    (SELECT id FROM users WHERE email = 'admin@grandwelcome.com'),
    'published',
    true
  ),
  (
    'Housekeeping Standards Guide',
    '<h2>Property Cleaning Standards</h2>
    <p>Our comprehensive guide to maintaining consistent cleaning standards across all properties.</p>

    <h3>General Standards</h3>
    <ul>
      <li>Use approved cleaning products only</li>
      <li>Follow room-by-room checklist</li>
      <li>Document any damages or maintenance needs</li>
      <li>Take before/after photos</li>
    </ul>

    <h3>Room-Specific Guidelines</h3>
    <h4>Kitchen</h4>
    <ul>
      <li>Clean all appliances inside and out</li>
      <li>Sanitize countertops and sinks</li>
      <li>Check and clean small appliances</li>
      <li>Verify all dishes are clean and properly stored</li>
    </ul>

    <h4>Bathrooms</h4>
    <ul>
      <li>Deep clean all fixtures</li>
      <li>Sanitize all surfaces</li>
      <li>Replace all linens</li>
      <li>Stock toiletries and paper products</li>
    </ul>',
    (SELECT id FROM knowledge_categories WHERE slug = 'best-practices'),
    (SELECT id FROM users WHERE email = 'admin@grandwelcome.com'),
    'published',
    true
  ),
  (
    'Guest Communication Guidelines',
    '<h2>Communication Best Practices</h2>
    <p>Guidelines for maintaining professional and effective guest communication.</p>

    <h3>Key Principles</h3>
    <ul>
      <li>Respond within 1 hour during business hours</li>
      <li>Use approved templates when applicable</li>
      <li>Maintain professional tone</li>
      <li>Document all communications</li>
    </ul>

    <h3>Critical Communications</h3>
    <ol>
      <li>Booking Confirmation</li>
      <li>Check-in Instructions</li>
      <li>Welcome Message</li>
      <li>Mid-stay Check-in</li>
      <li>Check-out Reminder</li>
      <li>Post-stay Thank You</li>
    </ol>',
    (SELECT id FROM knowledge_categories WHERE slug = 'policies'),
    (SELECT id FROM users WHERE email = 'admin@grandwelcome.com'),
    'published',
    true
  ),
  (
    'Property Onboarding Checklist',
    '<h2>New Property Setup Process</h2>
    <p>Complete checklist for onboarding new properties to our management system.</p>

    <h3>Initial Setup</h3>
    <ol>
      <li>Property Inspection
        <ul>
          <li>Document condition</li>
          <li>Take photos</li>
          <li>Note special features</li>
        </ul>
      </li>
      <li>Owner Agreement
        <ul>
          <li>Review terms</li>
          <li>Set pricing strategy</li>
          <li>Define services</li>
        </ul>
      </li>
      <li>System Setup
        <ul>
          <li>Create property profile</li>
          <li>Set up calendar</li>
          <li>Configure pricing rules</li>
        </ul>
      </li>
    </ol>',
    (SELECT id FROM knowledge_categories WHERE slug = 'templates'),
    (SELECT id FROM users WHERE email = 'admin@grandwelcome.com'),
    'published',
    false
  ),
  (
    'Maintenance Request Handling',
    '<h2>Maintenance Process Guide</h2>
    <p>Standard procedures for handling maintenance requests and issues.</p>

    <h3>Priority Levels</h3>
    <ul>
      <li>Emergency - Immediate Response Required</li>
      <li>Urgent - Same Day Response</li>
      <li>Standard - Within 48 Hours</li>
      <li>Non-Critical - Within 1 Week</li>
    </ul>

    <h3>Process Steps</h3>
    <ol>
      <li>Receive and Log Request</li>
      <li>Assess Priority Level</li>
      <li>Assign to Maintenance Team</li>
      <li>Schedule Service</li>
      <li>Complete Work</li>
      <li>Quality Check</li>
      <li>Update Records</li>
    </ol>',
    (SELECT id FROM knowledge_categories WHERE slug = 'tools'),
    (SELECT id FROM users WHERE email = 'admin@grandwelcome.com'),
    'published',
    false
  ),
  (
    'Revenue Management Training',
    '<h2>Revenue Optimization Guide</h2>
    <p>Learn how to effectively manage property pricing and revenue optimization.</p>

    <h3>Key Concepts</h3>
    <ul>
      <li>Dynamic Pricing</li>
      <li>Seasonal Adjustments</li>
      <li>Competitive Analysis</li>
      <li>Occupancy Rate Impact</li>
    </ul>

    <h3>Pricing Strategies</h3>
    <ol>
      <li>Base Rate Calculation</li>
      <li>Seasonal Multipliers</li>
      <li>Special Event Pricing</li>
      <li>Length of Stay Discounts</li>
      <li>Last Minute Deals</li>
    </ol>',
    (SELECT id FROM knowledge_categories WHERE slug = 'training'),
    (SELECT id FROM users WHERE email = 'admin@grandwelcome.com'),
    'published',
    true
  );