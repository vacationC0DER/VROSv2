import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useStaffPayroll } from '../../../hooks/useStaffPayroll';

const STAFF_POSITIONS = [
  'General Manager',
  'Assistant General Manager',
  'Quality Control',
  'Maintenance',
  'Sales',
  'Marketing',
  'Finance',
  'Accounting',
  'Guest Services',
  'Human Resources',
  'Onboarding',
  'Admin Assistant'
];

export function AddStaffMember() {
  const [isOpen, setIsOpen] = useState(false);
  const { addStaffMember } = useStaffPayroll();
  const [formData, setFormData] = useState({
    position: '',
    payType: 'salary',
    payRate: '',
    startDate: '',
    benefits: {
      healthInsurance: 500,
      retirement: 200,
      otherBenefits: 100
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addStaffMember({
      ...formData,
      payRate: Number(formData.payRate)
    });
    setIsOpen(false);
    setFormData({
      position: '',
      payType: 'salary',
      payRate: '',
      startDate: '',
      benefits: {
        healthInsurance: 500,
        retirement: 200,
        otherBenefits: 100
      }
    });
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg"
      >
        <Plus className="h-4 w-4" />
        <span>Add Staff</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add Staff Member</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position
                </label>
                <select
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                >
                  <option value="">Select Position</option>
                  {STAFF_POSITIONS.map((position) => (
                    <option key={position} value={position}>
                      {position}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pay Type
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.payType}
                  onChange={(e) => setFormData({ ...formData, payType: e.target.value as 'salary' | 'hourly' })}
                >
                  <option value="salary">Salary</option>
                  <option value="hourly">Hourly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {formData.payType === 'salary' ? 'Annual Salary' : 'Hourly Rate'}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.payRate}
                    onChange={(e) => setFormData({ ...formData, payRate: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Add Staff Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}