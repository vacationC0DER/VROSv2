import React from 'react';

interface OpexInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
}

export function OpexInput({ label, value, onChange, prefix, suffix }: OpexInputProps) {
  // Convert 0 to empty string for display
  const displayValue = value === 0 ? '' : value.toString();

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-2 text-gray-500">{prefix}</span>
        )}
        <input
          type="number"
          min="0"
          step="0.01"
          className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
            prefix ? 'pl-7' : ''
          } ${suffix ? 'pr-7' : ''}`}
          value={displayValue}
          onChange={(e) => {
            const newValue = e.target.value === '' ? 0 : Number(e.target.value);
            onChange(newValue);
          }}
          placeholder="0"
        />
        {suffix && (
          <span className="absolute right-3 top-2 text-gray-500">{suffix}</span>
        )}
      </div>
    </div>
  );
}