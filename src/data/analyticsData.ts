import { addMonths, format } from 'date-fns';

// Generate last 12 months of data
const generateMonthlyData = () => {
  const data = [];
  for (let i = 11; i >= 0; i--) {
    const date = addMonths(new Date(), -i);
    data.push({
      month: format(date, 'MMM'),
      revenue: Math.floor(Math.random() * 50000) + 100000,
      occupancy: Math.floor(Math.random() * 30) + 65,
      bookings: Math.floor(Math.random() * 50) + 100
    });
  }
  return data;
};

// Generate weekly data
const generateWeeklyData = () => {
  return Array.from({ length: 7 }, (_, i) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
    bookings: Math.floor(Math.random() * 20) + 10
  }));
};

// Generate market comparison data
const generateMarketData = () => {
  return [
    { name: 'ADR', yours: 245, market: 225 },
    { name: 'RevPAR', yours: 198, market: 180 },
    { name: 'Occupancy', yours: 78, market: 72 }
  ];
};

// Generate seasonality data
const generateSeasonalityData = () => {
  return Array.from({ length: 12 }, (_, i) => ({
    month: format(addMonths(new Date(2024, 0, 1), i), 'MMM'),
    occupancy: Math.floor(Math.random() * 30) + 60,
    revenue: Math.floor(Math.random() * 50000) + 80000
  }));
};

export const analyticsData = {
  monthlyData: generateMonthlyData(),
  weeklyBookings: generateWeeklyData(),
  marketComparison: generateMarketData(),
  seasonality: generateSeasonalityData()
};