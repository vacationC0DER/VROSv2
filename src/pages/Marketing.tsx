import React from 'react';
import { Mail, FileText, Phone, Users, Building, Star, Download, ExternalLink } from 'lucide-react';
import { MarketingCard } from '../components/marketing/MarketingCard';

export function Marketing() {
  const marketingCategories = [
    {
      id: 'direct-mail',
      title: 'Direct Mail Templates',
      description: 'Professional direct mail templates designed to capture property owner attention',
      icon: <Mail className="h-6 w-6 text-indigo-600" />,
      resources: [
        {
          title: 'Property Owner Introduction Letter',
          description: 'First contact letter introducing your property management services',
          format: 'PDF & Word',
          downloadUrl: '#'
        },
        {
          title: 'Market Analysis Mailer',
          description: 'Custom market analysis with revenue projections',
          format: 'PDF & Word',
          downloadUrl: '#'
        },
        {
          title: 'Seasonal Performance Update',
          description: 'Quarterly market performance and opportunity overview',
          format: 'PDF & Word',
          downloadUrl: '#'
        }
      ]
    },
    {
      id: 'email-templates',
      title: 'Email Templates',
      description: 'Ready-to-use email templates for every stage of owner communication',
      icon: <FileText className="h-6 w-6 text-blue-600" />,
      resources: [
        {
          title: 'Initial Contact Email',
          description: 'Professional introduction and service overview',
          format: 'HTML & Text',
          downloadUrl: '#'
        },
        {
          title: 'Follow-up Sequence',
          description: '5-part email nurture sequence',
          format: 'HTML & Text',
          downloadUrl: '#'
        },
        {
          title: 'Property Analysis Presentation',
          description: 'Custom revenue projection and market analysis',
          format: 'HTML & Text',
          downloadUrl: '#'
        }
      ]
    },
    {
      id: 'handwritten',
      title: 'Handwritten Letter Templates',
      description: 'Personal touch templates for high-value property owners',
      icon: <FileText className="h-6 w-6 text-green-600" />,
      resources: [
        {
          title: 'Personal Introduction',
          description: 'Warm, personal introduction letter template',
          format: 'PDF & Word',
          downloadUrl: '#'
        },
        {
          title: 'Thank You Note',
          description: 'Post-meeting appreciation template',
          format: 'PDF & Word',
          downloadUrl: '#'
        },
        {
          title: 'Holiday Greetings',
          description: 'Seasonal greeting card templates',
          format: 'PDF & Word',
          downloadUrl: '#'
        }
      ]
    },
    {
      id: 'cold-calls',
      title: 'Cold Lead Call Scripts',
      description: 'Proven scripts for initial property owner contact',
      icon: <Phone className="h-6 w-6 text-red-600" />,
      resources: [
        {
          title: 'First Contact Script',
          description: 'Initial cold call conversation guide',
          format: 'PDF & Word',
          downloadUrl: '#'
        },
        {
          title: 'Objection Handling Guide',
          description: 'Common objections and effective responses',
          format: 'PDF & Word',
          downloadUrl: '#'
        },
        {
          title: 'Appointment Setting Script',
          description: 'Guide for scheduling property visits',
          format: 'PDF & Word',
          downloadUrl: '#'
        }
      ]
    },
    {
      id: 'warm-leads',
      title: 'Warm Lead Call Scripts',
      description: 'Follow-up scripts for engaged property owners',
      icon: <Phone className="h-6 w-6 text-orange-600" />,
      resources: [
        {
          title: 'Website Inquiry Follow-up',
          description: 'Script for website lead follow-up',
          format: 'PDF & Word',
          downloadUrl: '#'
        },
        {
          title: 'Referral Contact Script',
          description: 'Guide for approaching referred leads',
          format: 'PDF & Word',
          downloadUrl: '#'
        },
        {
          title: 'Previous Contact Follow-up',
          description: 'Re-engagement script for past contacts',
          format: 'PDF & Word',
          downloadUrl: '#'
        }
      ]
    },
    {
      id: 'referrals',
      title: 'Referral Program Templates',
      description: 'Materials for various referral partner types',
      icon: <Users className="h-6 w-6 text-purple-600" />,
      subCategories: [
        {
          title: 'Vendor Referrals',
          icon: <Building className="h-5 w-5" />,
          resources: [
            {
              title: 'Vendor Partnership Agreement',
              description: 'Formal referral partnership template',
              format: 'PDF & Word',
              downloadUrl: '#'
            }
          ]
        },
        {
          title: 'Owner Referrals',
          icon: <Star className="h-5 w-5" />,
          resources: [
            {
              title: 'Owner Referral Program',
              description: 'Existing owner referral incentives',
              format: 'PDF & Word',
              downloadUrl: '#'
            }
          ]
        },
        {
          title: 'Real Estate Agents',
          icon: <Users className="h-5 w-5" />,
          resources: [
            {
              title: 'Agent Referral Agreement',
              description: 'Real estate agent partnership template',
              format: 'PDF & Word',
              downloadUrl: '#'
            }
          ]
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Marketing Templates</h1>
        <p className="text-gray-600">Download professional templates for vacation rental marketing</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {marketingCategories.map((category) => (
          <MarketingCard
            key={category.id}
            title={category.title}
            description={category.description}
            icon={category.icon}
            resources={category.resources}
            subCategories={category.subCategories}
          />
        ))}
      </div>
    </div>
  );
}