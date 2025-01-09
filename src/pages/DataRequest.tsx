import React, { useState } from 'react';
import { Search, AlertCircle } from 'lucide-react';
import { US_STATES } from '../utils/states';

type SearchType = 'property' | 'sales';
type SearchMethod = 'zipcode' | 'address' | 'city-state-zip';

export function DataRequest() {
  const [searchType, setSearchType] = useState<SearchType>('property');
  const [searchMethod, setSearchMethod] = useState<SearchMethod>('zipcode');
  const [formData, setFormData] = useState({
    zipCode: '',
    address: '',
    city: '',
    state: '',
    cityZip: ''
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate based on search method
    switch (searchMethod) {
      case 'zipcode':
        if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
          setError('Please enter a valid ZIP code');
          return;
        }
        break;
      case 'address':
        if (formData.address.length < 5) {
          setError('Please enter a complete address');
          return;
        }
        break;
      case 'city-state-zip':
        if (!formData.city || !formData.state || !formData.cityZip) {
          setError('Please fill in all location fields');
          return;
        }
        if (!/^\d{5}(-\d{4})?$/.test(formData.cityZip)) {
          setError('Please enter a valid ZIP code');
          return;
        }
        break;
    }

    // TODO: Handle data request submission
    console.log('Submitting request:', { searchType, searchMethod, formData });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Data Request</h1>
        <p className="text-gray-600">Search for property and sales data</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Data Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What type of data are you looking for?
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setSearchType('property')}
                className={`p-4 text-left rounded-lg border ${
                  searchType === 'property'
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium">Property Data</div>
                <div className="text-sm text-gray-600">
                  Property details, history, and market analysis
                </div>
              </button>
              <button
                type="button"
                onClick={() => setSearchType('sales')}
                className={`p-4 text-left rounded-lg border ${
                  searchType === 'sales'
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium">Sales Data</div>
                <div className="text-sm text-gray-600">
                  Historical sales data and comparables
                </div>
              </button>
            </div>
          </div>

          {/* Search Method Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search by:
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setSearchMethod('zipcode')}
                className={`px-4 py-2 rounded-lg ${
                  searchMethod === 'zipcode'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                ZIP Code
              </button>
              <button
                type="button"
                onClick={() => setSearchMethod('address')}
                className={`px-4 py-2 rounded-lg ${
                  searchMethod === 'address'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Full Address
              </button>
              <button
                type="button"
                onClick={() => setSearchMethod('city-state-zip')}
                className={`px-4 py-2 rounded-lg ${
                  searchMethod === 'city-state-zip'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                City, State, ZIP
              </button>
            </div>
          </div>

          {/* Search Fields */}
          <div className="space-y-4">
            {searchMethod === 'zipcode' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ZIP Code
                </label>
                <input
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                  placeholder="Enter ZIP code"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            )}

            {searchMethod === 'address' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Enter complete property address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            )}

            {searchMethod === 'city-state-zip' && (
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="City"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select State</option>
                    {US_STATES.map(state => (
                      <option key={state.code} value={state.code}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    value={formData.cityZip}
                    onChange={(e) => setFormData({ ...formData, cityZip: e.target.value })}
                    placeholder="ZIP code"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
              <AlertCircle className="h-5 w-5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
            >
              <Search className="h-4 w-4" />
              <span>Search</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}