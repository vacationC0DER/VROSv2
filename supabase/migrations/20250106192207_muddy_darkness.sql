-- Insert sample courses
INSERT INTO lms_courses (
  title,
  description,
  category,
  duration,
  scorm_package_path,
  scorm_entry_point,
  author_id,
  published,
  thumbnail_url
) VALUES
  (
    'Email Marketing Best Practices',
    'Learn how to create effective email campaigns for guest communication, including pre-arrival instructions, welcome messages, and post-stay follow-ups.',
    (SELECT id FROM lms_categories WHERE slug = 'operations'),
    45,
    '/courses/email-marketing',
    'index.html',
    (SELECT id FROM users WHERE email = 'admin@grandwelcome.com'),
    true,
    'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&q=80&w=800'
  ),
  (
    'Breezeway Property Care Training',
    'Comprehensive guide to using Breezeway for property inspections, maintenance tracking, and quality control.',
    (SELECT id FROM lms_categories WHERE slug = 'operations'),
    60,
    '/courses/breezeway',
    'index.html',
    (SELECT id FROM users WHERE email = 'admin@grandwelcome.com'),
    true,
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800'
  ),
  (
    'Revenue Management Fundamentals',
    'Learn dynamic pricing strategies, market analysis, and revenue optimization techniques for vacation rentals.',
    (SELECT id FROM lms_categories WHERE slug = 'sales'),
    90,
    '/courses/revenue-management',
    'index.html',
    (SELECT id FROM users WHERE email = 'admin@grandwelcome.com'),
    true,
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800'
  ),
  (
    'Guest Experience Excellence',
    'Master the art of delivering exceptional guest experiences, from first contact to post-stay engagement.',
    (SELECT id FROM lms_categories WHERE slug = 'guest-services'),
    75,
    '/courses/guest-experience',
    'index.html',
    (SELECT id FROM users WHERE email = 'admin@grandwelcome.com'),
    true,
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800'
  ),
  (
    'Property Onboarding Mastery',
    'Step-by-step guide to onboarding new properties, including photography, listing optimization, and owner communication.',
    (SELECT id FROM lms_categories WHERE slug = 'onboarding'),
    120,
    '/courses/property-onboarding',
    'index.html',
    (SELECT id FROM users WHERE email = 'admin@grandwelcome.com'),
    true,
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800'
  );