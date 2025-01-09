import React, { useEffect } from 'react';
import { DollarSign, Home, Users, TrendingUp, Calendar, Target } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useCRMStore } from '../stores/crmStore';

export function SalesDashboard() {
  const { deals, loading, error, fetchDeals } = useCRMStore();

  useEffect(() => {
    fetchDeals();
  }, [fetchDeals]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        {error}
      </div>
    );
  }

  // Calculate key metrics
  const totalRevenue = deals.reduce((sum, deal) => sum + deal.annual_revenue, 0);
  const avgDealSize = totalRevenue / (deals.length || 1);
  const activeDeals = deals.filter(d => d.stage !== 'closed').length;
  const closedDeals = deals.filter(d => d.stage === 'closed').length;
  const conversionRate = (closedDeals / (deals.length || 1)) * 100;

  // Group deals by stage for pipeline visualization
  const pipelineData = [
    { stage: 'Lead', count: deals.filter(d => d.stage === 'lead').length },
    { stage: 'Contacted', count: deals.filter(d => d.stage === 'contacted').length },
    { stage: 'Meeting', count: deals.filter(d => d.stage === 'meeting').length },
    { stage: 'Proposal', count: deals.filter(d => d.stage === 'proposal').length },
    { stage: 'Negotiation', count: deals.filter(d => d.stage === 'negotiation').length },
    { stage: 'Closed', count: deals.filter(d => d.stage === 'closed').length }
  ];

  // Calculate revenue trend by month
  const revenueTrend = deals.reduce((acc, deal) => {
    const month = new Date(deal.created_at).toLocaleString('default', { month: 'short' });
    const existingMonth = acc.find(m => m.month === month);
    if (existingMonth) {
      existingMonth.revenue += deal.annual_revenue;
    } else {
      acc.push({ month, revenue: deal.annual_revenue });
    }
    return acc;
  }, [] as Array<{ month: string; revenue: number }>).sort((a, b) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.indexOf(a.month) - months.indexOf(b.month);
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Sales Dashboard</h1>
        <p className="text-gray-600">Real-time overview of sales pipeline and performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Pipeline Value</p>
              <p className="text-xl font-bold">${totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-green-600">+12% from last month</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Average Deal Size</p>
              <p className="text-xl font-bold">${Math.round(avgDealSize).toLocaleString()}</p>
              <p className="text-sm text-blue-600">+5% from last month</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Home className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Deals</p>
              <p className="text-xl font-bold">{activeDeals}</p>
              <p className="text-sm text-purple-600">+3 new this week</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Conversion Rate</p>
              <p className="text-xl font-bold">{Math.round(conversionRate)}%</p>
              <p className="text-sm text-orange-600">+2% from last month</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pipeline and Revenue Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pipeline Stage Distribution */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Pipeline Distribution</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pipelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="stage" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Trend */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Revenue Trend</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#4f46e5" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {deals.slice(0, 5).map((deal) => (
            <div key={deal.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Home className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium">{deal.property_address}</p>
                  <p className="text-sm text-gray-600">{deal.owner_name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">${deal.annual_revenue.toLocaleString()}</p>
                <p className="text-sm text-gray-600 capitalize">{deal.stage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}